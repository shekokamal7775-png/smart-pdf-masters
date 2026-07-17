import { createFileRoute } from "@tanstack/react-router";

const TOOL_MAP: Record<string, string> = {
  "merge-pdf": "merge",
  "compress-pdf": "compress",
  "jpg-to-pdf": "imagepdf",
  "pdf-to-word": "pdf-to-word",
};

const OUTPUT_NAME: Record<string, string> = {
  "merge-pdf": "merged.pdf",
  "compress-pdf": "compressed.pdf",
  "jpg-to-pdf": "images.pdf",
  "pdf-to-word": "converted.docx",
};

const CONTENT_TYPE: Record<string, string> = {
  "merge-pdf": "application/pdf",
  "compress-pdf": "application/pdf",
  "jpg-to-pdf": "application/pdf",
  "pdf-to-word": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

async function processWithComPDF(file: File, tool: string): Promise<Response> {
  const publicKey = process.env.COMPDF_PUBLIC_KEY;
  const secretKey = process.env.COMPDF_SECRET_KEY;

  if (!publicKey || !secretKey) {
    throw new Error("COMPDF_PUBLIC_KEY or COMPDF_SECRET_KEY not configured");
  }

  // 1. الحصول على Token
  const authResponse = await fetch("https://api.compdf.com/api/v1/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicKey, secretKey }),
  });

  if (!authResponse.ok) {
    throw new Error(`Auth failed: ${authResponse.status}`);
  }

  const { token } = await authResponse.json();

  // 2. إنشاء مهمة (Task)
  const taskResponse = await fetch("https://api.compdf.com/api/v1/task", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tool: TOOL_MAP[tool] }),
  });

  if (!taskResponse.ok) {
    throw new Error(`Task creation failed: ${taskResponse.status}`);
  }

  const { taskId, server } = await taskResponse.json();

  // 3. رفع الملف
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("taskId", taskId);

  const uploadResponse = await fetch(`https://${server}/api/v1/upload`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Upload failed: ${uploadResponse.status}`);
  }

  // 4. تنفيذ المهمة
  const processResponse = await fetch(`https://${server}/api/v1/process`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId }),
  });

  if (!processResponse.ok) {
    throw new Error(`Processing failed: ${processResponse.status}`);
  }

  // 5. انتظار الانتهاء (Polling)
  let status = "processing";
  let result: any;

  while (status === "processing" || status === "queued") {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const statusResponse = await fetch(`https://${server}/api/v1/task/${taskId}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!statusResponse.ok) {
      throw new Error(`Status check failed: ${statusResponse.status}`);
    }

    result = await statusResponse.json();
    status = result.status;

    if (status === "failed" || status === "error") {
      throw new Error(`Task failed: ${result.message || "Unknown error"}`);
    }
  }

  if (status !== "success" || !result.fileUrl) {
    throw new Error("Task completed but no file URL returned");
  }

  // 6. تحميل الملف الناتج
  const downloadResponse = await fetch(result.fileUrl);

  if (!downloadResponse.ok) {
    throw new Error(`Download failed: ${downloadResponse.status}`);
  }

  const buffer = await downloadResponse.arrayBuffer();
  const filename = OUTPUT_NAME[tool] || "output.pdf";
  const contentType = CONTENT_TYPE[tool] || "application/octet-stream";

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(buffer.byteLength),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Output-Filename": filename,
      "Cache-Control": "no-store",
    },
  });
}

async function processWithILovePdf(slug: string, files: File[]): Promise<Response> {
  const publicKey = process.env.ILOVEPDF_PUBLIC_KEY;
  if (!publicKey) throw new Error("ILOVEPDF_PUBLIC_KEY not configured");
  
  // ... كود iLovePDF القديم (لو موجود)
  // أو استخدم ComPDF لجميع الأدوات
  return processWithComPDF(files[0], slug);
}

export const Route = createFileRoute("/api/pdf-process")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const form = await request.formData();
          const slug = String(form.get("slug") || "");
          const files = form.getAll("files").filter((f): f is File => f instanceof File);

          if (files.length === 0) {
            return new Response("No files", { status: 400 });
          }

          if (!TOOL_MAP[slug]) {
            return new Response(
              `Tool "${slug}" is not supported.`,
              { status: 400 }
            );
          }

          // استخدام ComPDF لجميع الأدوات
          return await processWithComPDF(files[0], slug);
        } catch (e) {
          console.error("[pdf-process]", e);
          return new Response(`error: ${(e as Error).message}`, { status: 500 });
        }
      },
    },
  },
});
