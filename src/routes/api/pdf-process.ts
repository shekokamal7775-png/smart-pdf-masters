import { createFileRoute } from "@tanstack/react-router";

const TOOL_MAP: Record<string, string> = {
  "merge-pdf": "merge",
  "compress-pdf": "compress",
  "jpg-to-pdf": "imagepdf",
};

const OUTPUT_NAME: Record<string, string> = {
  "merge-pdf": "merged.pdf",
  "compress-pdf": "compressed.pdf",
  "pdf-to-word": "converted.doc",
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

function baseName(name: string) {
  return name.replace(/\.[^/.]+$/, "");
}

function toRtf(text: string) {
  const escaped = text
    .replace(/\\/g, "\\\\")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/\n/g, "\\par\n");
  return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}\\f0\\fs24 ${escaped}}`;
}

function extractPdfText(raw: string): string {
  const parts = [...raw.matchAll(/\(([^()]{2,})\)\s*Tj/g), ...raw.matchAll(/\(([^()]{2,})\)/g)]
    .map((m) => m[1])
    .filter((v) => /[A-Za-z\u0600-\u06FF0-9]/.test(v));
  return [...new Set(parts)]
    .slice(0, 800)
    .join(" ")
    .replace(/\\([()\\])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

async function pdfToWordLocal(file: File): Promise<Response> {
  const buf = new Uint8Array(await file.arrayBuffer());
  const raw = new TextDecoder("latin1").decode(buf);
  const text = extractPdfText(raw) || `Converted from ${file.name}.`;
  const pages = Math.max(1, (raw.match(/\/Type\s*\/Page\b/g) ?? []).length);
  const rtf = toRtf(`${baseName(file.name)}\n\nPages: ${pages}\n\n${text}`);
  const name = `${baseName(file.name)}.doc`;
  return new Response(rtf, {
    status: 200,
    headers: {
      "Content-Type": "application/msword",
      "Content-Disposition": `attachment; filename="${name}"`,
      "X-Output-Filename": name,
    },
  });
}

async function processWithILovePdf(slug: string, files: File[]): Promise<Response> {
  const tool = TOOL_MAP[slug];
  const token = await getToken();
  const authH = { Authorization: `Bearer ${token}` };

  const startRes = await fetch(`https://api.ilovepdf.com/v1/start/${tool}`, { headers: authH });
  if (!startRes.ok) throw new Error(`start ${startRes.status}: ${await startRes.text()}`);
  const { server, task } = (await startRes.json()) as { server: string; task: string };
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

  const dl = await fetch(`${base}/download/${task}`, { headers: authH });
  if (!dl.ok) throw new Error(`download ${dl.status}: ${await dl.text()}`);

  const buf = await dl.arrayBuffer();
  const cd = dl.headers.get("content-disposition") || "";
  const m = cd.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  const filename = (m && decodeURIComponent(m[1])) || OUTPUT_NAME[slug] || "output";
  const ct =
    dl.headers.get("content-type") ||
    (filename.endsWith(".zip") ? "application/zip" : "application/pdf");

  return new Response(buf, {
    status: 200,
    headers: {
      "Content-Type": ct,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Output-Filename": filename,
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

          if (slug === "pdf-to-word") {
            return await pdfToWordLocal(files[0]);
          }
          if (TOOL_MAP[slug]) {
            return await processWithILovePdf(slug, files);
          }
          return new Response("Unknown tool", { status: 400 });
        } catch (e) {
          console.error("[pdf-process]", e);
          return new Response(`error: ${(e as Error).message}`, { status: 500 });
        }
      },
    },
  },
});
