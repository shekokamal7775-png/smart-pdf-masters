import { createFileRoute } from "@tanstack/react-router";

// الأدوات المدعومة حالياً عبر API الخاص بـ iLovePDF
const TOOL_MAP: Record<string, string> = {
  "merge-pdf": "merge",
  "compress-pdf": "compress",
  "jpg-to-pdf": "imagepdf",
  // تم إيقاف pdf-to-word مؤقتاً لتجنب توقف الموقع عن العمل
};

const OUTPUT_NAME: Record<string, string> = {
  "merge-pdf": "merged.pdf",
  "compress-pdf": "compressed.pdf",
  "jpg-to-pdf": "images.pdf",
};

const CONTENT_TYPE: Record<string, string> = {
  "merge-pdf": "application/pdf",
  "compress-pdf": "application/pdf",
  "jpg-to-pdf": "application/pdf",
};

// الدالة المسؤولة عن الحصول على التوكن (Token)
async function getToken(): Promise<string> {
  const publicKey = process.env.ILOVEPDF_PUBLIC_KEY;
  if (!publicKey) throw new Error("ILOVEPDF_PUBLIC_KEY not configured");
  const res = await fetch("https://api.ilovepdf.com/v1/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_key: publicKey }),
  });
  if (!res.ok) throw new Error(`auth ${res.status}: ${await res.text()}`);
  const { token } = (await res.json()) as { token: string };
  return token;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitForTaskSuccess(
  base: string,
  task: string,
  authH: Record<string, string>,
) {
  for (let i = 0; i < 60; i++) {
    const r = await fetch(`${base}/task/${task}`, { headers: authH });
    if (r.ok) {
      const j = (await r.json()) as { status?: string };
      if (j.status === "TaskSuccess") return;
      if (j.status && /Fail|Error|Delete/i.test(j.status)) {
        throw new Error(`task failed: ${j.status}`);
      }
    }
    await sleep(1000);
  }
  throw new Error("task polling timed out");
}

async function processWithILovePdf(slug: string, files: File[]): Promise<Response> {
  const tool = TOOL_MAP[slug];
  const token = await getToken();
  const authH = { Authorization: `Bearer ${token}` };

  // 1. Start
  const startRes = await fetch(`https://api.ilovepdf.com/v1/start/${tool}`, {
    headers: authH,
  });
  if (!startRes.ok) throw new Error(`start ${startRes.status}: ${await startRes.text()}`);
  const { server, task } = (await startRes.json()) as { server: string; task: string };
  if (!server || !task) throw new Error("start: missing server/task");
  const base = `https://${server}/v1`;

  // 2. Upload
  const uploaded: { server_filename: string; filename: string }[] = [];
  for (const f of files) {
    const fd = new FormData();
    fd.append("task", task);
    fd.append("file", f, f.name);
    const up = await fetch(`${base}/upload`, { method: "POST", headers: authH, body: fd });
    if (!up.ok) throw new Error(`upload ${up.status}: ${await up.text()}`);
    const j = (await up.json()) as { server_filename: string };
    uploaded.push({ server_filename: j.server_filename, filename: f.name });
  }

  // 3. Process
  const procBody: Record<string, unknown> = { task, tool, files: uploaded };
  if (slug === "compress-pdf") procBody.compression_level = "recommended";

  const proc = await fetch(`${base}/process`, {
    method: "POST",
    headers: { ...authH, "Content-Type": "application/json" },
    body: JSON.stringify(procBody),
  });
  if (!proc.ok) throw new Error(`process ${proc.status}: ${await proc.text()}`);

  // 4. Poll until TaskSuccess
  await waitForTaskSuccess(base, task, authH);

  // 5. Download
  const dl = await fetch(`${base}/download/${task}`, { headers: authH });
  if (!dl.ok) throw new Error(`download ${dl.status}: ${await dl.text()}`);
  const buf = await dl.arrayBuffer();

  const filename = OUTPUT_NAME[slug] || "output";
  const ct = CONTENT_TYPE[slug] || "application/octet-stream";

  return new Response(buf, {
    status: 200,
    headers: {
      "Content-Type": ct,
      "Content-Length": String(buf.byteLength),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Output-Filename": filename,
      "Cache-Control": "no-store",
    },
  });
}

export const Route = createFileRoute("/api/pdf-process")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const form = await request.formData();
          const slug = String(form.get("slug") || "");
          const files = form.getAll("files").filter((f): f is File => f instanceof File);
          
          if (files.length === 0) return new Response("No files", { status: 400 });
          
          // حماية إضافية: إذا حاول المستخدم استخدام أداة موقوفة
          if (slug === "pdf-to-word") {
            return new Response("Service currently unavailable. Please try later.", { status: 503 });
          }

          if (!TOOL_MAP[slug]) {
            return new Response(`Tool "${slug}" is not supported.`, { status: 400 });
          }

          return await processWithILovePdf(slug, files);
        } catch (e) {
          console.error("[pdf-process]", e);
          return new Response(`error: ${(e as Error).message}`, { status: 500 });
        }
      },
    },
  },
});
