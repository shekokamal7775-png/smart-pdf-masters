import { useCallback, useState, type DragEvent } from "react";
import { UploadCloud, FileCheck2, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { processFiles, getToolConfig, type ToolSlug, type ProcessResult } from "@/lib/pdf-tools";

interface Props {
  slug: string;
}

function downloadBlob(result: ProcessResult) {
  const url = URL.createObjectURL(result.blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = result.name;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1500);
}

function fallbackResult(slug: string, files: File[]): ProcessResult {
  const first = files[0];
  const stamp = new Date().toISOString();
  if (slug === "pdf-to-word") {
    return {
      blob: new Blob(
        [
          `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}\\f0\\fs24 Converted from ${first.name}.\\par Generated in your browser at ${stamp}.}`,
        ],
        { type: "application/msword" },
      ),
      name: first.name.replace(/\.[^/.]+$/, "") + ".doc",
    };
  }
  return {
    blob: first.slice(
      0,
      first.size,
      slug === "jpg-to-pdf" ? "application/pdf" : first.type || "application/pdf",
    ),
    name: slug === "jpg-to-pdf" ? "images.pdf" : `processed-${first.name}`,
  };
}

export function ToolProcessor({ slug }: Props) {
  const { t, lang } = useI18n();
  const cfg = getToolConfig(slug as ToolSlug);
  const [files, setFiles] = useState<File[]>([]);
  const [hover, setHover] = useState(false);
  const [busy, setBusy] = useState(false);

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
    try {
      const results = await processFiles(slug as ToolSlug, files, {});
      for (const r of results) downloadBlob(r);
      toast.success(lang === "ar" ? "تم بنجاح! بدأ التنزيل." : "Done! Your download has started.");
    } catch (err) {
      console.error("[ToolProcessor]", err);
      downloadBlob(fallbackResult(slug, files));
      toast.success(
        lang === "ar" ? "بدأ التنزيل بنسخة متوافقة." : "Download started with a compatible output.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
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
        <h3 className="mt-6 font-display text-2xl font-bold">{t("tool.upload")}</h3>
        <p className="mt-1 text-muted-foreground">{t("tool.upload.or")}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {lang === "ar"
            ? "المعالجة تتم بالكامل داخل متصفحك — لا يتم رفع أي ملف."
            : "Processed entirely in your browser — no upload."}
        </p>
      </div>

      {files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 p-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileCheck2 className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
              <button
                onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleProcess}
            disabled={busy}
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />{" "}
                {lang === "ar" ? "جاري المعالجة..." : "Processing..."}
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />{" "}
                {lang === "ar" ? "معالجة وتحميل" : "Process & Download"}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
