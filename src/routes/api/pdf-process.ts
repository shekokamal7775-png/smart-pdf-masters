import { createFileRoute } from "@tanstack/react-router";

const TOOL_MAP: Record<string, string> = {
  "merge-pdf": "merge",
  "compress-pdf": "compress",
  "jpg-to-pdf": "imagepdf",
  "pdf-to-word": "pdfoffice",
};

const OUTPUT_NAME: Record<string, string> = {
  "merge-pdf": "merged.pdf",
  "compress-pdf": "compressed.pdf",
  "pdf-to-word": "converted.docx",
  "jpg-to-pdf": "images.pdf",
};

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

async function waitForTask(base: string, task: string, authH: Record<string, string>) {
  // Poll task status until TaskSuccess or failure. Max ~30s.
  for (let i = 0; i < 30; i++) {
    const r = await fetch(`${base}/task/${task}`, { headers: authH });
    if (r.ok) {
      const j = (await r.json()) as { status?: string };
      const s = j.status;
      if (s === "TaskSuccess" || s === "TaskSuccessOK") return;
      if (s && /Fail|Error|Delete/i.test(s)) {
        throw new Error(`task ${s}: ${JSON.stringify(j)}`);
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

  const startRes = await fetch(`https://api.ilovepdf.com/v1/start/${tool}`, { headers: authH });
  if (!startRes.ok) throw new Error(`start ${startRes.status}: ${await startRes.text()}`);
  const { server, task } = (await startRes.json()) as { server: string; task: string };
  if (!server || !task) throw new Error("start: missing server/task");
  const base = `https://${server}/v1`;

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

  const procBody: Record<string, unknown> = { task, tool, files: uploaded };
  if (slug === "compress-pdf") procBody.compression_level = "recommended";

  const proc = await fetch(`${base}/process`, {
    method: "POST",
    headers: { ...authH, "Content-Type": "application/json" },
    body: JSON.stringify(procBody),
  });
  if (!proc.ok) throw new Error(`process ${proc.status}: ${await proc.text()}`);
  const procJson = (await proc.json().catch(() => ({}))) as { status?: string };

  // Wait until task is finished before downloading.
  if (procJson.status !== "TaskSuccess" && procJson.status !== "TaskSuccessOK") {
    await waitForTask(base, task, authH);
  }

  const dl = await fetch(`${base}/download/${task}`, { headers: authH });
  if (!dl.ok) throw new Error(`download ${dl.status}: ${await dl.text()}`);

  const buf = await dl.arrayBuffer();
  if (buf.byteLength === 0) throw new Error("download returned empty body");

  const cd = dl.headers.get("content-disposition") || "";
  const m = cd.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  const filename = (m && decodeURIComponent(m[1])) || OUTPUT_NAME[slug] || "output";
  const ct =
    dl.headers.get("content-type") ||
    (filename.endsWith(".zip")
      ? "application/zip"
      : filename.endsWith(".docx")
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "application/pdf");

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
          if (!TOOL_MAP[slug]) return new Response("Unknown tool", { status: 400 });
          return await processWithILovePdf(slug, files);
        } catch (e) {
          console.error("[pdf-process]", e);
          return new Response(`error: ${(e as Error).message}`, { status: 500 });
        }
      },
    },
  },
});
