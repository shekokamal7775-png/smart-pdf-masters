// All heavy libs are lazy-imported inside handlers to keep SSR & initial bundle safe.

export type ToolSlug = "merge-pdf" | "compress-pdf" | "pdf-to-word" | "jpg-to-pdf";

export interface ToolConfig {
  accept: string;
  multiple: boolean;
  requiresPassword?: boolean;
}

const PDF_ACCEPT = "application/pdf,.pdf";

const CONFIGS: Record<ToolSlug, ToolConfig> = {
  "merge-pdf": { accept: PDF_ACCEPT, multiple: true },
  "compress-pdf": { accept: PDF_ACCEPT, multiple: false },
  "pdf-to-word": { accept: PDF_ACCEPT, multiple: false },
  "jpg-to-pdf": { accept: "image/png,image/jpeg,.png,.jpg,.jpeg", multiple: true },
};

export function getToolConfig(slug: ToolSlug): ToolConfig {
  return CONFIGS[slug] ?? { accept: PDF_ACCEPT, multiple: false };
}

export interface ProcessOptions {
  password?: string;
  watermark?: string;
  rotation?: 90 | 180 | 270;
  ranges?: string;
}

export interface ProcessResult {
  blob: Blob;
  name: string;
}

function baseName(name: string): string {
  return name.replace(/\.[^/.]+$/, "");
}

export async function processFiles(
  slug: ToolSlug,
  files: File[],
  _opts: ProcessOptions
): Promise<ProcessResult[]> {
  if (!files || files.length === 0) throw new Error("Please select a file first.");
  switch (slug) {
    case "merge-pdf": return [await mergePdfs(files)];
    case "compress-pdf": return [await compressPdf(files[0])];
    case "pdf-to-word": return [await pdfToWord(files[0])];
    case "jpg-to-pdf": return [await imagesToPdf(files)];
    default:
      throw new Error("This tool isn't available.");
  }
}

async function mergePdfs(files: File[]): Promise<ProcessResult> {
  if (files.length < 2) throw new Error("Select at least 2 PDF files to merge.");
  const { PDFDocument } = await import("pdf-lib");
  const out = await PDFDocument.create();
  for (const f of files) {
    const bytes = new Uint8Array(await f.arrayBuffer());
    const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const data = await out.save();
  return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: "merged.pdf" };
}

async function compressPdf(file: File): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const data = await src.save({ useObjectStreams: true, addDefaultPage: false });
  return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: `compressed-${file.name}` };
}

async function imagesToPdf(files: File[]): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  for (const f of files) {
    const bytes = new Uint8Array(await f.arrayBuffer());
    const isPng = f.type.includes("png") || f.name.toLowerCase().endsWith(".png");
    const img = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }
  const data = await doc.save();
  return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: "images.pdf" };
}

async function pdfToWord(file: File): Promise<ProcessResult> {
  // Lazy-load pdfjs in browser only
  const pdfjs = await import("pdfjs-dist");
  try {
    const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  } catch {
    // worker optional — pdfjs falls back to fake worker
  }
  const { Document, Packer, Paragraph, TextRun } = await import("docx");

  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data: bytes }).promise;
  const paragraphs: InstanceType<typeof Paragraph>[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((it) => ("str" in it ? (it as { str: string }).str : ""))
      .join(" ");
    paragraphs.push(new Paragraph({ children: [new TextRun({ text, size: 24 })] }));
    paragraphs.push(new Paragraph({ children: [new TextRun({ text: "", break: 1 })] }));
  }
  const wordDoc = new Document({ sections: [{ children: paragraphs }] });
  const blob = await Packer.toBlob(wordDoc);
  return { blob, name: `${baseName(file.name)}.docx` };
}
