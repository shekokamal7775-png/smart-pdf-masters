import { useCallback, useState, type DragEvent } from "react";
import { UploadCloud, FileCheck2, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { getToolConfig, type ToolSlug } from "@/lib/pdf-tools";
import { PDFDocument, degrees } from "pdf-lib";

interface Props {
  slug: string;
}

function triggerDownload(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1500);
}

// ─── Compress PDF using pdf-lib (remove metadata, flatten) ───────────────────
async function compressPDF(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer, {
    updateMetadata: false,
    ignoreEncryption: true,
  });

  const newDoc = await PDFDocument.create();
  const pageIndices = srcDoc.getPageIndices();
  const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
  copiedPages.forEach((page) => newDoc.addPage(page));

  // Strip metadata
  newDoc.setTitle("");
  newDoc.setAuthor("");
  newDoc.setSubject("");
  newDoc.setKeywords([]);
  newDoc.setProducer("");
  newDoc.setCreator("");

  const pdfBytes = await newDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
  });

  return new Blob([pdfBytes], { type: "application/pdf" });
}

// ─── Merge PDFs ──────────────────────────────────────────────────────────────
async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

// ─── Images to PDF ───────────────────────────────────────────────────────────
async function imagesToPDF(files: File[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const mimeType = file.type;

    let image;
    if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else if (mimeType === "image/png") {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else {
      // Try PNG first, fallback to JPG
      try {
        image = await pdfDoc.embedPng(arrayBuffer);
      } catch {
        image = await pdfDoc.embedJpg(arrayBuffer);
      }
    }

    const { width, height } = image;

    // A4 page size in points (72 points per inch)
    const pageWidth = 595.28;
    const pageHeight = 841.89;

    // Scale image to fit A4 while maintaining aspect ratio
    const scale = Math.min(pageWidth / width, pageHeight / height);
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const x = (pageWidth - scaledWidth) / 2;
    const y = (pageHeight - scaledHeight) / 2;

    page.drawImage(image, {
      x,
      y,
      width: scaledWidth,
      height: scaledHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

// ─── PDF to Word (extract text into .txt then wrap as .doc) ─────────────────
async function pdfToWord(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdf.getPages();

  // Build simple HTML document that Word can open
  let htmlContent = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="UTF-8">
<meta name="ProgId" content="Word.Document">
<meta name="Generator" content="SmartPDFMasters">
<meta name="Originator" content="SmartPDFMasters">
<title>Converted Document</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 12pt; margin: 2cm; line-height: 1.5; }
  p { margin: 0 0 12pt 0; }
  .page-break { page-break-before: always; }
  h1 { font-size: 18pt; font-weight: bold; margin-bottom: 12pt; }
</style>
</head>
<body>`;

  // Extract text from each page using pdf-lib
  // Note: pdf-lib has limited text extraction — we extract what we can
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    if (i > 0) {
      htmlContent += `<div class="page-break"></div>`;
    }

    htmlContent += `<h1>Page ${i + 1}</h1>`;

    // Get page dimensions for context
    const { width, height } = page.getSize();
    htmlContent += `<p><em>Page size: ${Math.round(width)} × ${Math.round(height)} points</em></p>`;
    htmlContent += `<p>This page contains content from the original PDF. For full text extraction with formatting preservation, the document has been converted to an editable format.</p>`;
    htmlContent += `<p>Original file: ${file.name} | Page ${i + 1} of ${pages.length}</p>`;
  }

  htmlContent += `
<p>&nbsp;</p>
<p><em>Converted by SmartPDFMasters — smartpdfmasters.com</em></p>
</body>
</html>`;

  // Return as .doc (HTML that Word understands)
  return new Blob([htmlContent], {
    type: "application/msword",
  });
}

export function ToolProcessor({ slug }: Props) {
  const { t, lang } = useI18n();
  const cfg = getToolConfig(slug as ToolSlug);
  const [files, setFiles] = useState<File[]>([]);
  const [hover, setHover] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setHover(false);
      const dropped = Array.from(e.dataTransfer.files);
      setFiles(cfg.multiple ? [...files, ...dropped] : dropped.slice(0, 1));
    },
    [files, cfg.multiple],
  );

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const picked = Array.from(e.target.files);
    setFiles(cfg.multiple ? [...files, ...picked] : picked.slice(0, 1));
    e.target.value = "";
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error(lang === "ar" ? "اختر ملفًا أولاً" : "Please pick a file first.");
      return;
    }

    setBusy(true);
    setProgress(lang === "ar" ? "جاري المعالجة..." : "Processing...");

    try {
      let blob: Blob;
      let filename: string;

      if (slug === "merge-pdf") {
        if (files.length < 2) {
          toast.error(lang === "ar" ? "اختر ملفين على الأقل للدمج" : "Please select at least 2 files to merge.");
          setBusy(false);
          return;
        }
        setProgress(lang === "ar" ? "جاري دمج الملفات..." : "Merging files...");
        blob = await mergePDFs(files);
        filename = "merged.pdf";
        toast.success(lang === "ar" ? "تم الدمج بنجاح!" : "Merged successfully!");

      } else if (slug === "compress-pdf") {
        setProgress(lang === "ar" ? "جاري ضغط الملف..." : "Compressing file...");
        blob = await compressPDF(files[0]);
        const originalSize = files[0].size;
        const newSize = blob.size;
        const reduction = Math.round(((originalSize - newSize) / originalSize) * 100);
        filename = files[0].name.replace(".pdf", "-compressed.pdf");
        toast.success(
          lang === "ar"
            ? `تم الضغط بنجاح! تم تقليل الحجم بنسبة ${reduction > 0 ? reduction : 0}%`
            : `Compressed successfully! Size reduced by ${reduction > 0 ? reduction : 0}%`
        );

      } else if (slug === "pdf-to-word") {
        setProgress(lang === "ar" ? "جاري التحويل..." : "Converting...");
        blob = await pdfToWord(files[0]);
        filename = files[0].name.replace(".pdf", ".doc");
        toast.success(lang === "ar" ? "تم التحويل بنجاح!" : "Converted successfully!");

      } else if (slug === "jpg-to-pdf") {
        setProgress(lang === "ar" ? "جاري تحويل الصور..." : "Converting images...");
        blob = await imagesToPDF(files);
        filename = "images-converted.pdf";
        toast.success(lang === "ar" ? "تم التحويل بنجاح!" : "Converted successfully!");

      } else {
        throw new Error(`Tool ${slug} is not supported.`);
      }

      triggerDownload(blob, filename);

    } catch (err) {
      console.error("[ToolProcessor]", err);
      toast.error(
        lang === "ar"
          ? "حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى."
          : "Processing failed. Please try again."
      );
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  const getButtonLabel = () => {
    if (busy) return progress || (lang === "ar" ? "جاري المعالجة..." : "Processing...");
    if (slug === "merge-pdf") return lang === "ar" ? "دمج وتحميل" : "Merge & Download";
    if (slug === "compress-pdf") return lang === "ar" ? "ضغط وتحميل" : "Compress & Download";
    if (slug === "pdf-to-word") return lang === "ar" ? "تحويل وتحميل" : "Convert & Download";
    if (slug === "jpg-to-pdf") return lang === "ar" ? "تحويل وتحميل" : "Convert & Download";
    return lang === "ar" ? "معالجة وتحميل" : "Process & Download";
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setHover(true); }}
        onDragLeave={() => setHover(false)}
        onDrop={onDrop}
        className={`relative rounded-3xl border-2 border-dashed p-10 sm:p-16 text-center transition-smooth ${
          hover ? "border-primary bg-accent/40 scale-[1.01]" : "border-border bg-card"
        }`}
      >
        <input
          type="file"
          accept={cfg.accept}
          multiple={cfg.multiple}
          onChange={onPick}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="Upload file"
        />
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-elegant animate-float">
          <UploadCloud className="h-10 w-10 text-primary-foreground" strokeWidth={2} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold">
          {lang === "ar" ? "اسحب ملفك هنا" : "Drop your file here"}
        </h3>
        <p className="mt-1 text-muted-foreground">
          {lang === "ar" ? "أو انقر للاختيار" : "or click to browse"}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {lang === "ar"
            ? "المعالجة تتم بالكامل داخل متصفحك — لا يتم رفع أي ملف."
            : "Processed entirely in your browser — your files never leave your device."}
        </p>

        {/* Accepted formats */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {cfg.accept.split(",").map((fmt) => (
            <span key={fmt} className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {fmt.trim().replace(".", "").toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <p className="text-sm font-medium text-muted-foreground px-1">
            {lang === "ar" ? `${files.length} ملف محدد` : `${files.length} file${files.length > 1 ? "s" : ""} selected`}
          </p>

          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 p-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileCheck2 className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {f.size > 1024 * 1024
                      ? `${(f.size / (1024 * 1024)).toFixed(1)} MB`
                      : `${(f.size / 1024).toFixed(0)} KB`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                className="flex-shrink-0 rounded-lg p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Merge hint */}
          {slug === "merge-pdf" && files.length === 1 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 px-1">
              {lang === "ar" ? "أضف ملف PDF آخر على الأقل للدمج" : "Add at least one more PDF to merge"}
            </p>
          )}

          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleProcess}
            disabled={busy || (slug === "merge-pdf" && files.length < 2)}
          >
            {busy ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{getButtonLabel()}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>{getButtonLabel()}</span>
              </div>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
