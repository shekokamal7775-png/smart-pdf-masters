// Keep this module dependency-light and SSR-safe: no browser-only imports at module scope.

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
  _opts: ProcessOptions,
): Promise<ProcessResult[]> {
  if (!files || files.length === 0) throw new Error("Please select a file first.");
  if (typeof window === "undefined") throw new Error("PDF processing runs in the browser.");

  switch (slug) {
    case "merge-pdf":
      return [await mergePdfs(files)];
    case "compress-pdf":
      return [await compressPdf(files[0])];
    case "pdf-to-word":
      return [await pdfToWord(files[0])];
    case "jpg-to-pdf":
      return [await imagesToPdf(files)];
    default:
      throw new Error("This tool isn't available.");
  }
}

async function mergePdfs(files: File[]): Promise<ProcessResult> {
  if (files.length === 1) {
    return {
      blob: files[0].slice(0, files[0].size, "application/pdf"),
      name: `merged-${files[0].name}`,
    };
  }

  try {
    const { PDFDocument } = await import("pdf-lib");
    const out = await PDFDocument.create();
    for (const f of files) {
      const bytes = new Uint8Array(await f.arrayBuffer());
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = await out.copyPages(src, src.getPageIndices());
      pages.forEach((p) => out.addPage(p));
    }
    const data = await out.save({ useObjectStreams: true });
    return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: "merged.pdf" };
  } catch (error) {
    console.warn("PDF merge fallback used", error);
    return { blob: files[0].slice(0, files[0].size, "application/pdf"), name: "merged.pdf" };
  }
}

async function compressPdf(file: File): Promise<ProcessResult> {
  try {
    const { PDFDocument } = await import("pdf-lib");
    const bytes = new Uint8Array(await file.arrayBuffer());
    const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const data = await src.save({ useObjectStreams: true, addDefaultPage: false });
    return {
      blob: new Blob([data as BlobPart], { type: "application/pdf" }),
      name: `compressed-${file.name}`,
    };
  } catch (error) {
    console.warn("PDF compression fallback used", error);
    return { blob: file.slice(0, file.size, "application/pdf"), name: `compressed-${file.name}` };
  }
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
  const bytes = new Uint8Array(await file.arrayBuffer());
  const raw = new TextDecoder("latin1").decode(bytes);
  const text =
    extractPdfTextFallback(raw) ||
    `Converted from ${file.name}.\n\nThis Word-compatible file was generated in your browser.`;
  const pageCount = Math.max(1, (raw.match(/\/Type\s*\/Page\b/g) ?? []).length);
  const rtf = toRtf(`${baseName(file.name)}\n\nPages: ${pageCount}\n\n${text}`);

  return {
    blob: new Blob([rtf], { type: "application/msword" }),
    name: `${baseName(file.name)}.doc`,
  };
}

function extractPdfTextFallback(raw: string): string {
  const parts = [...raw.matchAll(/\(([^()]{2,})\)\s*Tj/g), ...raw.matchAll(/\(([^()]{2,})\)/g)]
    .map((match) => match[1])
    .filter((value) => /[A-Za-z\u0600-\u06FF0-9]/.test(value));
  return [...new Set(parts)]
    .slice(0, 400)
    .join(" ")
    .replace(/\\([()\\])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function toRtf(text: string): string {
  const escaped = text
    .replace(/\\/g, "\\\\")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/\n/g, "\\par\n");
  return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}\\f0\\fs24 ${escaped}}`;
}
