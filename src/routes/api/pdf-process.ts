import { createFileRoute } from "@tanstack/react-router";

const TOOL_MAP: Record<string, string> = {
  "merge-pdf": "merge",
  "compress-pdf": "compress",
  "pdf-to-word": "pdfoffice",
  "jpg-to-pdf": "imagepdf",
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
  if (!res.ok) throw new Error(`auth failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { token: string };
  return json.token;
}

export const Route = createFileRoute("/api/pdf-process")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const form = await request.formData();
          const slug = String(form.get("slug") || "");
          const tool = TOOL_MAP[slug];
          if (!tool) return new Response("Unknown tool", { status: 400 });

          const files = form.getAll("files").filter((f): f is File => f instanceof File);
          if (files.length === 0) return new Response("No files", { status: 400 });

          const token = await getToken();
          const authH = { Authorization: `Bearer ${token}` };

          // start
          const startRes = await fetch(`https://api.ilovepdf.com/v1/start/${tool}`, {
            headers: authH,
          });
          if (!startRes.ok)
            return new Response(`start failed: ${await startRes.text()}`, { status: 502 });
          const { server, task } = (await startRes.json()) as { server: string; task: string };
          const base = `https://${server}/v1`;

          // upload each file
          const uploaded: { server_filename: string; filename: string }[] = [];
          for (const f of files) {
            const fd = new FormData();
            fd.append("task", task);
            fd.append("file", f, f.name);
            const up = await fetch(`${base}/upload`, {
              method: "POST",
              headers: authH,
              body: fd,
            });
            if (!up.ok)
              return new Response(`upload failed: ${await up.text()}`, { status: 502 });
            const j = (await up.json()) as { server_filename: string };
            uploaded.push({ server_filename: j.server_filename, filename: f.name });
          }

          // process
          const procBody: Record<string, unknown> = {
            task,
            tool,
            files: uploaded,
          };
          if (slug === "compress-pdf") procBody.compression_level = "recommended";

          const proc = await fetch(`${base}/process`, {
            method: "POST",
            headers: { ...authH, "Content-Type": "application/json" },
            body: JSON.stringify(procBody),
          });
          if (!proc.ok)
            return new Response(`process failed: ${await proc.text()}`, { status: 502 });

          // download
          const dl = await fetch(`${base}/download/${task}`, { headers: authH });
          if (!dl.ok)
            return new Response(`download failed: ${await dl.text()}`, { status: 502 });

          const buf = await dl.arrayBuffer();
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
              "Content-Disposition": `attachment; filename="${filename}"`,
              "X-Output-Filename": filename,
            },
          });
        } catch (e) {
          console.error("[pdf-process]", e);
          return new Response(`error: ${(e as Error).message}`, { status: 500 });
        }
      },
    },
  },
});
