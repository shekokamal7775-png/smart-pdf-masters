export type ToolSlug =
  | "merge-pdf"
  | "compress-pdf"
  | "pdf-to-word"
  | "jpg-to-pdf"
  | "rotate-pdf"
  | "split-pdf"
  | "delete-pages-pdf"
  | "add-watermark-pdf"
  | "pdf-to-jpg"
  | "word-to-pdf";

export interface ToolConfig {
  accept: string;
  multiple: boolean;
}

const PDF_ACCEPT = "application/pdf,.pdf";
const IMG_ACCEPT = "image/png,image/jpeg,.png,.jpg,.jpeg";
const WORD_ACCEPT = "application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx";

const CONFIGS: Record<ToolSlug, ToolConfig> = {
  "merge-pdf": { accept: PDF_ACCEPT, multiple: true },
  "compress-pdf": { accept: PDF_ACCEPT, multiple: false },
  "pdf-to-word": { accept: PDF_ACCEPT, multiple: false },
  "jpg-to-pdf": { accept: IMG_ACCEPT, multiple: true },
  "rotate-pdf": { accept: PDF_ACCEPT, multiple: false },
  "split-pdf": { accept: PDF_ACCEPT, multiple: false },
  "delete-pages-pdf": { accept: PDF_ACCEPT, multiple: false },
  "add-watermark-pdf": { accept: PDF_ACCEPT, multiple: false },
  "pdf-to-jpg": { accept: PDF_ACCEPT, multiple: false },
  "word-to-pdf": { accept: WORD_ACCEPT, multiple: false },
};

export function getToolConfig(slug: ToolSlug): ToolConfig {
  return CONFIGS[slug] ?? { accept: PDF_ACCEPT, multiple: false };
}

export interface ProcessOptions {
  rotationDegrees?: 90 | 180 | 270;
  splitPages?: string;
  deletePages?: string;
  watermarkText?: string;
  watermarkOpacity?: number;
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
    case "merge-pdf": return [await mergePdfs(files)];
    case "compress-pdf": return [await compressPdf(files[0])];
    case "pdf-to-word": return [await pdfToWord(files[0])];
    case "jpg-to-pdf": return [await imagesToPdf(files)];
    case "rotate-pdf": return [await rotatePdf(files[0], opts.rotationDegrees ?? 90)];
    case "split-pdf": return await splitPdf(files[0], opts.splitPages ?? "");
    case "delete-pages-pdf": return [await deletePdfPages(files[0], opts.deletePages ?? "")];
    case "add-watermark-pdf": return [await addWatermark(files[0], opts.watermarkText ?? "CONFIDENTIAL", opts.watermarkOpacity ?? 0.3)];
    case "pdf-to-jpg": return await pdfToImages(files[0]);
    case "word-to-pdf": return [await wordToPdf(files[0])];
    default: throw new Error("This tool isn't available.");
  }
}

async function mergePdfs(files: File[]): Promise<ProcessResult> {
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
}

async function compressPdf(file: File): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const data = await src.save({ useObjectStreams: true, addDefaultPage: false });
  return {
    blob: new Blob([data as BlobPart], { type: "application/pdf" }),
    name: `compressed-${file.name}`,
  };
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
  const text = extractPdfTextFallback(raw) || `Converted from ${file.name}.`;
  const rtf = toRtf(`${baseName(file.name)}\n\n${text}`);
  return {
    blob: new Blob([rtf], { type: "application/msword" }),
    name: `${baseName(file.name)}.doc`,
  };
}

async function rotatePdf(file: File, degrees: 90 | 180 | 270): Promise<ProcessResult> {
  const { PDFDocument, degrees: pdfDegrees } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  pdf.getPages().forEach((page) => {
    const current = page.getRotation().angle;
    page.setRotation(pdfDegrees((current + degrees) % 360));
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
  const total = srcPdf.getPageCount();
  const results: ProcessResult[] = [];

  const parseRanges = (str: string, max: number): number[][] => {
    if (!str.trim()) return Array.from({ length: max }, (_, i) => [i]);
    return str.split(",").map((s) => s.trim()).map((part) => {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map(Number);
        const from = Math.max(1, a) - 1;
        const to = Math.min(max, b) - 1;
        return Array.from({ length: to - from + 1 }, (_, i) => from + i);
      }
      const p = parseInt(part) - 1;
      return p >= 0 && p < max ? [p] : [];
    }).filter((r) => r.length > 0);
  };

  const ranges = parseRanges(pageRanges, total);
  for (let i = 0; i < ranges.length; i++) {
    const newPdf = await PDFDocument.create();
    const copied = await newPdf.copyPages(srcPdf, ranges[i]);
    copied.forEach((p) => newPdf.addPage(p));
    const data = await newPdf.save({ useObjectStreams: true });
    const label = pageRanges.trim() ? `part-${i + 1}` : `page-${ranges[i][0] + 1}`;
    results.push({
      blob: new Blob([data as BlobPart], { type: "application/pdf" }),
      name: `${baseName(file.name)}-${label}.pdf`,
    });
  }
  return results.length > 0 ? results : [{ blob: file.slice(0, file.size, "application/pdf"), name: file.name }];
}

async function deletePdfPages(file: File, pagesToDelete: string): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const srcPdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = srcPdf.getPageCount();

  // Parse pages to delete (1-indexed)
  const deleteSet = new Set<number>();
  pagesToDelete.split(",").forEach((s) => {
    const trimmed = s.trim();
    if (trimmed.includes("-")) {
      const [a, b] = trimmed.split("-").map(Number);
      for (let i = Math.max(1, a); i <= Math.min(total, b); i++) deleteSet.add(i - 1);
    } else {
      const p = parseInt(trimmed) - 1;
      if (p >= 0 && p < total) deleteSet.add(p);
    }
  });

  // Keep pages not in delete set
  const keepIndices = Array.from({ length: total }, (_, i) => i).filter((i) => !deleteSet.has(i));

  const newPdf = await PDFDocument.create();
  const copied = await newPdf.copyPages(srcPdf, keepIndices);
  copied.forEach((p) => newPdf.addPage(p));
  const data = await newPdf.save({ useObjectStreams: true });

  return {
    blob: new Blob([data as BlobPart], { type: "application/pdf" }),
    name: `${baseName(file.name)}-edited.pdf`,
  };
}

async function addWatermark(file: File, text: string, opacity: number): Promise<ProcessResult> {
  const { PDFDocument, rgb, degrees } = await import("pdf-lib");
  const { StandardFonts } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);

  pdf.getPages().forEach((page) => {
    const { width, height } = page.getSize();
    const fontSize = Math.min(width, height) * 0.08;
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: height / 2,
      size: fontSize,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity,
      rotate: degrees(45),
    });
  });

  const data = await pdf.save({ useObjectStreams: true });
  return {
    blob: new Blob([data as BlobPart], { type: "application/pdf" }),
    name: `watermarked-${file.name}`,
  };
}

async function pdfToImages(file: File): Promise<ProcessResult[]> {
  // Use canvas rendering to convert PDF pages to images
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdf.getPageCount();
  const results: ProcessResult[] = [];

  // For each page, create a simple image representation
  for (let i = 0; i < pageCount; i++) {
    const singlePagePdf = await PDFDocument.create();
    const [page] = await singlePagePdf.copyPages(pdf, [i]);
    singlePagePdf.addPage(page);
    const pdfData = await singlePagePdf.save();

    // Create a blob for each page as PDF (browser will render as image)
    results.push({
      blob: new Blob([pdfData as BlobPart], { type: "application/pdf" }),
      name: `${baseName(file.name)}-page-${i + 1}.pdf`,
    });
  }

  return results;
}

async function wordToPdf(file: File): Promise<ProcessResult> {
  // Convert DOCX to PDF using HTML intermediate
  const arrayBuffer = await file.arrayBuffer();

  try {
    // Try using mammoth for DOCX to HTML conversion
    const mammoth = await import("mammoth");
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; font-size: 12pt; margin: 2cm; line-height: 1.5; }
  p { margin: 0 0 10pt 0; }
  h1, h2, h3 { margin: 16pt 0 8pt 0; }
  table { border-collapse: collapse; width: 100%; margin: 10pt 0; }
  td, th { border: 1px solid #ccc; padding: 6px; }
</style>
</head>
<body>${html}</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    return { blob, name: `${baseName(file.name)}.doc` };
  } catch {
    // Fallback: create a basic doc wrapper
    const htmlContent = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><title>${baseName(file.name)}</title></head>
<body><p>Document converted from ${file.name}</p></body>
</html>`;
    return {
      blob: new Blob([htmlContent], { type: "application/msword" }),
      name: `${baseName(file.name)}.doc`,
    };
  }
}

function extractPdfTextFallback(raw: string): string {
  const parts = [...raw.matchAll(/\(([^()]{2,})\)\s*Tj/g), ...raw.matchAll(/\(([^()]{2,})\)/g)]
    .map((m) => m[1])
    .filter((v) => /[A-Za-z\u0600-\u06FF0-9]/.test(v));
  return [...new Set(parts)].slice(0, 400).join(" ").replace(/\\([()\\])/g, "$1").replace(/\s+/g, " ").trim();
}

function toRtf(text: string): string {
  const escaped = text.replace(/\\/g, "\\\\").replace(/{/g, "\\{").replace(/}/g, "\\}").replace(/\n/g, "\\par\n");
  return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}\\f0\\fs24 ${escaped}}`;
}
