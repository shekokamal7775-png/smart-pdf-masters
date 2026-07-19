import { useCallback, useState, type DragEvent } from "react";
import { UploadCloud, FileCheck2, X, Loader2, Download, RotateCw, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { getToolConfig, processFiles, type ToolSlug } from "@/lib/pdf-tools";

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

export function ToolProcessor({ slug }: Props) {
  const { lang } = useI18n();
  const cfg = getToolConfig(slug as ToolSlug);
  const [files, setFiles] = useState<File[]>([]);
  const [hover, setHover] = useState(false);
  const [busy, setBusy] = useState(false);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [splitPages, setSplitPages] = useState("");

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
    if (slug === "merge-pdf" && files.length < 2) {
      toast.error(lang === "ar" ? "اختر ملفين على الأقل للدمج" : "Please select at least 2 files to merge.");
      return;
    }

    setBusy(true);
    try {
      const results = await processFiles(slug as ToolSlug, files, {
        rotationDegrees: rotation,
        splitPages: splitPages,
      });
      results.forEach(({ blob, name }) => triggerDownload(blob, name));
      toast.success(
        results.length > 1
          ? lang === "ar" ? `تم تحميل ${results.length} ملفات!` : `${results.length} files downloaded!`
          : lang === "ar" ? "تمت المعالجة بنجاح!" : "Done! Your file is ready."
      );
    } catch (err: unknown) {
      console.error("[ToolProcessor]", err);
      toast.error(
        lang === "ar"
          ? "حدث خطأ. يرجى المحاولة مرة أخرى."
          : "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  const getButtonLabel = () => {
    if (busy) return lang === "ar" ? "جاري المعالجة..." : "Processing...";
    const labels: Record<string, string> = {
      "merge-pdf": lang === "ar" ? "دمج وتحميل" : "Merge & Download",
      "compress-pdf": lang === "ar" ? "ضغط وتحميل" : "Compress & Download",
      "pdf-to-word": lang === "ar" ? "تحويل وتحميل" : "Convert & Download",
      "jpg-to-pdf": lang === "ar" ? "تحويل وتحميل" : "Convert & Download",
      "rotate-pdf": lang === "ar" ? "تدوير وتحميل" : "Rotate & Download",
      "split-pdf": lang === "ar" ? "تقسيم وتحميل" : "Split & Download",
    };
    return labels[slug] || (lang === "ar" ? "معالجة وتحميل" : "Process & Download");
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
        <p className="mt-3 text-xs text-muted-foreground">
          {lang === "ar"
            ? "المعالجة تتم بالكامل داخل متصفحك — لا يتم رفع أي ملف."
            : "Processed entirely in your browser — your files never leave your device."}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {cfg.accept.split(",").map((fmt) => (
            <span key={fmt} className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {fmt.trim().replace(".", "").replace("application/pdf", "PDF").replace("image/png", "PNG").replace("image/jpeg", "JPG").toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Rotate Options */}
      {slug === "rotate-pdf" && files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-sm font-medium mb-3">
            {lang === "ar" ? "اختر زاوية التدوير:" : "Choose rotation angle:"}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {([90, 180, 270] as const).map((deg) => (
              <button
                key={deg}
                onClick={() => setRotation(deg)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-smooth ${
                  rotation === deg
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <RotateCw className="h-5 w-5" style={{ transform: `rotate(${deg - 90}deg)` }} />
                <span className="text-xs font-semibold">{deg}°</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Split Options */}
      {slug === "split-pdf" && files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <p className="text-sm font-medium">
            {lang === "ar" ? "خيارات التقسيم:" : "Split options:"}
          </p>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">
              {lang === "ar"
                ? "أدخل نطاقات الصفحات (مثال: 1-3,5,7-9) أو اتركها فارغة لتقسيم كل صفحة:"
                : "Enter page ranges (e.g. 1-3,5,7-9) or leave empty to split every page:"}
            </label>
            <input
              type="text"
              value={splitPages}
              onChange={(e) => setSplitPages(e.target.value)}
              placeholder={lang === "ar" ? "مثال: 1-3,5,7-9" : "e.g. 1-3,5,7-9"}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
            <Scissors className="h-4 w-4 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              {lang === "ar"
                ? "كل نطاق سيتم تحميله كملف PDF منفصل."
                : "Each range will be downloaded as a separate PDF file."}
            </p>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground px-1">
            {lang === "ar"
              ? `${files.length} ملف محدد`
              : `${files.length} file${files.length > 1 ? "s" : ""} selected`}
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

          {slug === "merge-pdf" && files.length === 1 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 px-1">
              {lang === "ar"
                ? "أضف ملف PDF آخر على الأقل للدمج"
                : "Add at least one more PDF to merge"}
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
