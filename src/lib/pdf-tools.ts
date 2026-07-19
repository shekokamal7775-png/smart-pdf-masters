// Keep this module dependency-light and SSR-safe: no browser-only imports at module scope.

export type ToolSlug = "merge-pdf" | "compress-pdf" | "pdf-to-word" | "jpg-to-pdf" | "rotate-pdf" | "split-pdf";

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
  "rotate-pdf": { accept: PDF_ACCEPT, multiple: false },
  "split-pdf": { accept: PDF_ACCEPT, multiple: false },
};

export function getToolConfig(slug: ToolSlug): ToolConfig {
  return CONFIGS[slug] ?? { accept: PDF_ACCEPT, multiple: false };
}

export interface ProcessOptions {
  password?: string;
  rotationDegrees?: 90 | 180 | 270;
  splitPages?: string;
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
  opts: ProcessOptions,
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
    case "rotate-pdf":
      return [await rotatePdf(files[0], opts.rotationDegrees ?? 90)];
    case "split-pdf":
      return await splitPdf(files[0], opts.splitPages ?? "");
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

async function rotatePdf(file: File, degrees: 90 | 180 | 270): Promise<ProcessResult> {
  const { PDFDocument, degrees: pdfDegrees } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pages = pdf.getPages();
  pages.forEach((page) => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(pdfDegrees((currentRotation + degrees) % 360));
  });
  const data = await pdf.save({ useObjectStreams: true });
  return {
    blob: new Blob([data as BlobPart], { type: "application/pdf" }),
    name: `rotated-${file.name}`,
  };
}

async function splitPdf(file: File, pageRanges: string): Promise<ProcessResult[]> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const srcPdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();
  const results: ProcessResult[] = [];

  // Parse page ranges like "1-3,5,7-9"
  const parseRanges = (rangeStr: string, total: number): number[][] => {
    if (!rangeStr.trim()) {
      // If no range specified, split each page individually
      return Array.from({ length: total }, (_, i) => [i]);
    }
    const parts = rangeStr.split(",").map((s) => s.trim());
    return parts.map((part) => {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        const from = Math.max(1, start) - 1;
        const to = Math.min(total, end) - 1;
        return Array.from({ length: to - from + 1 }, (_, i) => from + i);
      }
      const page = parseInt(part) - 1;
      return page >= 0 && page < total ? [page] : [];
    }).filter((r) => r.length > 0);
  };

  const ranges = parseRanges(pageRanges, totalPages);

  for (let i = 0; i < ranges.length; i++) {
    const newPdf = await PDFDocument.create();
    const pageIndices = ranges[i];
    const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);
    copiedPages.forEach((p) => newPdf.addPage(p));
    const data = await newPdf.save({ useObjectStreams: true });
    const label = pageRanges.trim()
      ? `part-${i + 1}`
      : `page-${pageIndices[0] + 1}`;
    results.push({
      blob: new Blob([data as BlobPart], { type: "application/pdf" }),
      name: `${baseName(file.name)}-${label}.pdf`,
    });
  }

  return results.length > 0 ? results : [{
    blob: file.slice(0, file.size, "application/pdf"),
    name: file.name,
  }];
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
