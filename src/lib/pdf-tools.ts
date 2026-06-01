import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun } from "docx";
import jsPDF from "jspdf";
import mammoth from "mammoth";

export type ToolSlug =
  | "merge-pdf" | "split-pdf" | "compress-pdf"
  | "pdf-to-word" | "word-to-pdf"
  | "jpg-to-pdf" | "pdf-to-jpg"
  | "watermark-pdf" | "protect-pdf" | "unlock-pdf"
  | "rotate-pdf" | "edit-pdf"
  | "excel-to-pdf" | "powerpoint-to-pdf"
  | "ocr-pdf" | "ai-pdf";

export interface ToolConfig {
  accept: string;
  multiple: boolean;
  requiresPassword?: boolean;
}

const PDF_ACCEPT = "application/pdf,.pdf";
const IMG_ACCEPT = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";
const DOC_ACCEPT = ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const CONFIGS: Record<string, ToolConfig> = {
  "merge-pdf": { accept: PDF_ACCEPT, multiple: true },
  "split-pdf": { accept: PDF_ACCEPT, multiple: false },
  "compress-pdf": { accept: PDF_ACCEPT, multiple: false },
  "pdf-to-word": { accept: PDF_ACCEPT, multiple: false },
  "word-to-pdf": { accept: DOC_ACCEPT, multiple: false },
  "jpg-to-pdf": { accept: "image/png,image/jpeg,.png,.jpg,.jpeg", multiple: true },
  "pdf-to-jpg": { accept: PDF_ACCEPT, multiple: false },
  "watermark-pdf": { accept: PDF_ACCEPT, multiple: false },
  "protect-pdf": { accept: PDF_ACCEPT, multiple: false, requiresPassword: true },
  "unlock-pdf": { accept: PDF_ACCEPT, multiple: false, requiresPassword: true },
  "rotate-pdf": { accept: PDF_ACCEPT, multiple: false },
  "edit-pdf": { accept: PDF_ACCEPT, multiple: false },
  "excel-to-pdf": { accept: ".xlsx,.xls", multiple: false },
  "powerpoint-to-pdf": { accept: ".pptx,.ppt", multiple: false },
  "ocr-pdf": { accept: PDF_ACCEPT, multiple: false },
  "ai-pdf": { accept: PDF_ACCEPT, multiple: false },
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

// Lazy-load pdfjs only when needed (heavy)
async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  // Use workerSrc from CDN matching version, fallback to disabling worker
  const workerSrc = await import("pdfjs-dist/build/pdf.worker.min.mjs?url").then((m) => m.default).catch(() => null);
  if (workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  }
  return pdfjs;
}

function baseName(name: string): string {
  return name.replace(/\.[^/.]+$/, "");
}

function parseRanges(input: string, total: number): number[][] {
  const trimmed = input.trim();
  if (!trimmed) return Array.from({ length: total }, (_, i) => [i]);
  const groups: number[][] = [];
  for (const part of trimmed.split(",")) {
    const p = part.trim();
    if (!p) continue;
    if (p.includes("-")) {
      const [a, b] = p.split("-").map((x) => parseInt(x.trim(), 10));
      if (isNaN(a) || isNaN(b)) continue;
      const arr: number[] = [];
      for (let i = Math.max(1, a); i <= Math.min(total, b); i++) arr.push(i - 1);
      if (arr.length) groups.push(arr);
    } else {
      const n = parseInt(p, 10);
      if (!isNaN(n) && n >= 1 && n <= total) groups.push([n - 1]);
    }
  }
  return groups.length ? groups : Array.from({ length: total }, (_, i) => [i]);
}

export async function processFiles(
  slug: ToolSlug,
  files: File[],
  opts: ProcessOptions
): Promise<ProcessResult[]> {
  switch (slug) {
    case "merge-pdf": return [await mergePdfs(files)];
    case "split-pdf": return await splitPdf(files[0], opts.ranges ?? "");
    case "compress-pdf": return [await compressPdf(files[0])];
    case "pdf-to-word": return [await pdfToWord(files[0])];
    case "word-to-pdf": return [await wordToPdf(files[0])];
    case "jpg-to-pdf": return [await imagesToPdf(files)];
    case "pdf-to-jpg": return await pdfToImages(files[0]);
    case "watermark-pdf": return [await watermarkPdf(files[0], opts.watermark || "WATERMARK")];
    case "protect-pdf": return [await protectPdf(files[0], opts.password || "")];
    case "unlock-pdf": return [await unlockPdf(files[0])];
    case "rotate-pdf": return [await rotatePdf(files[0], opts.rotation ?? 90)];
    default:
      throw new Error("This tool isn't available yet. Try Merge, Split, Compress, Convert, Watermark, Protect, or Rotate.");
  }
}

async function mergePdfs(files: File[]): Promise<ProcessResult> {
  if (files.length < 2) throw new Error("Select at least 2 PDF files to merge");
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

async function splitPdf(file: File, ranges: string): Promise<ProcessResult[]> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = src.getPageCount();
  const groups = parseRanges(ranges, total);
  const base = baseName(file.name);
  const out: ProcessResult[] = [];
  for (let g = 0; g < groups.length; g++) {
    const doc = await PDFDocument.create();
    const pages = await doc.copyPages(src, groups[g]);
    pages.forEach((p) => doc.addPage(p));
    const data = await doc.save();
    const label = groups[g].length === 1 ? `page-${groups[g][0] + 1}` : `pages-${groups[g][0] + 1}-${groups[g][groups[g].length - 1] + 1}`;
    out.push({ blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: `${base}-${label}.pdf` });
  }
  return out;
}

async function compressPdf(file: File): Promise<ProcessResult> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const data = await src.save({ useObjectStreams: true, addDefaultPage: false });
  return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: `compressed-${file.name}` };
}

async function rotatePdf(file: File, deg: 90 | 180 | 270): Promise<ProcessResult> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  src.getPages().forEach((p) => {
    const current = p.getRotation().angle;
    p.setRotation(degrees((current + deg) % 360));
  });
  const data = await src.save();
  return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: `rotated-${file.name}` };
}

async function watermarkPdf(file: File, text: string): Promise<ProcessResult> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const font = await src.embedFont(StandardFonts.HelveticaBold);
  src.getPages().forEach((p) => {
    const { width, height } = p.getSize();
    const size = Math.min(width, height) / 8;
    p.drawText(text, {
      x: width / 2 - (text.length * size) / 4,
      y: height / 2,
      size,
      font,
      color: rgb(0.75, 0.1, 0.1),
      opacity: 0.25,
      rotate: degrees(45),
    });
  });
  const data = await src.save();
  return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: `watermarked-${file.name}` };
}

async function protectPdf(file: File, password: string): Promise<ProcessResult> {
  if (!password) throw new Error("Password required");
  const { PDFDocument: EncDoc } = await import("@cantoo/pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await EncDoc.load(bytes, { ignoreEncryption: true });
  const data = await src.save({
    userPassword: password,
    ownerPassword: password,
    permissions: { printing: "highResolution", modifying: false, copying: false, annotating: false },
  } as never);
  return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: `protected-${file.name}` };
}

async function unlockPdf(file: File): Promise<ProcessResult> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  try {
    const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const data = await src.save();
    return { blob: new Blob([data as BlobPart], { type: "application/pdf" }), name: `unlocked-${file.name}` };
  } catch {
    throw new Error("Could not open this PDF. It may use strong encryption.");
  }
}

async function imagesToPdf(files: File[]): Promise<ProcessResult> {
  if (files.length === 0) throw new Error("Pick at least one image");
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

async function pdfToImages(file: File): Promise<ProcessResult[]> {
  const pdfjs = await loadPdfJs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data: bytes }).promise;
  const base = baseName(file.name);
  const out: ProcessResult[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvas, canvasContext: ctx, viewport } as never).promise;
    const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/jpeg", 0.92)!);
    out.push({ blob, name: `${base}-page-${i}.jpg` });
  }
  return out;
}

async function pdfToWord(file: File): Promise<ProcessResult> {
  const pdfjs = await loadPdfJs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data: bytes }).promise;
  const paragraphs: Paragraph[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((it) => ("str" in it ? (it as { str: string }).str : "")).join(" ");
    paragraphs.push(new Paragraph({ children: [new TextRun({ text, size: 24 })] }));
    paragraphs.push(new Paragraph({ children: [new TextRun({ text: "", break: 1 })] }));
  }
  const wordDoc = new Document({ sections: [{ children: paragraphs }] });
  const blob = await Packer.toBlob(wordDoc);
  return { blob, name: `${baseName(file.name)}.docx` };
}

async function wordToPdf(file: File): Promise<ProcessResult> {
  const buffer = await file.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer: buffer });
  // Strip HTML tags to plain text but preserve paragraph breaks
  const text = html
    .replace(/<\/(p|h\d|li|div)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 50;
  const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2;
  const lineHeight = 16;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  const lines = pdf.splitTextToSize(text, maxWidth);
  let y = margin;
  for (const line of lines) {
    if (y > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      y = margin;
    }
    pdf.text(line, margin, y);
    y += lineHeight;
  }
  const blob = pdf.output("blob");
  return { blob, name: `${baseName(file.name)}.pdf` };
}
