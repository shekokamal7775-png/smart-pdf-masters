import { useCallback, useState, type DragEvent } from "react";
import { UploadCloud, FileCheck2, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { processFiles, getToolConfig, type ToolSlug } from "@/lib/pdf-tools";

interface Props {
  slug: string;
}

export function ToolProcessor({ slug }: Props) {
  const { t, lang } = useI18n();
  const cfg = getToolConfig(slug as ToolSlug);
  const [files, setFiles] = useState<File[]>([]);
  const [hover, setHover] = useState(false);
  const [busy, setBusy] = useState(false);
  const [password, setPassword] = useState("");
  const [watermark, setWatermark] = useState("CONFIDENTIAL");
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [splitRanges, setSplitRanges] = useState("");

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(cfg.multiple ? [...files, ...dropped] : dropped.slice(0, 1));
  }, [files, cfg.multiple]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const picked = Array.from(e.target.files);
    setFiles(cfg.multiple ? [...files, ...picked] : picked.slice(0, 1));
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    if (cfg.requiresPassword && !password) {
      toast.error(lang === "ar" ? "أدخل كلمة المرور" : "Please enter a password");
      return;
    }
    setBusy(true);
    try {
      const results = await processFiles(slug as ToolSlug, files, {
        password,
        watermark,
        rotation,
        ranges: splitRanges,
      });
      for (const r of results) {
        saveAs(r.blob, r.name);
      }
      toast.success(lang === "ar" ? "تم بنجاح! بدأ التنزيل." : "Done! Your download has started.");
    } catch (err) {
      console.error(err);
      toast.error(
        (lang === "ar" ? "فشلت العملية: " : "Processing failed: ") +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
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
        <h3 className="mt-6 font-display text-2xl font-bold">{t("tool.upload")}</h3>
        <p className="mt-1 text-muted-foreground">{t("tool.upload.or")}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {lang === "ar" ? "المعالجة تتم بالكامل داخل متصفحك — لا يتم رفع أي ملف." : "Processed entirely in your browser — no upload."}
        </p>
      </div>

      {files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 p-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileCheck2 className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
              <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {cfg.requiresPassword && (
            <div className="space-y-1.5">
              <Label htmlFor="pw">{lang === "ar" ? "كلمة المرور" : "Password"}</Label>
              <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder={lang === "ar" ? "أدخل كلمة المرور" : "Enter a strong password"} />
            </div>
          )}

          {slug === "watermark-pdf" && (
            <div className="space-y-1.5">
              <Label htmlFor="wm">{lang === "ar" ? "نص العلامة المائية" : "Watermark text"}</Label>
              <Input id="wm" value={watermark} onChange={(e) => setWatermark(e.target.value)} />
            </div>
          )}

          {slug === "rotate-pdf" && (
            <div className="space-y-1.5">
              <Label>{lang === "ar" ? "زاوية التدوير" : "Rotation"}</Label>
              <div className="flex gap-2">
                {[90, 180, 270].map((d) => (
                  <button key={d} type="button" onClick={() => setRotation(d as 90 | 180 | 270)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-smooth ${
                      rotation === d ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"
                    }`}>
                    {d}°
                  </button>
                ))}
              </div>
            </div>
          )}

          {slug === "split-pdf" && (
            <div className="space-y-1.5">
              <Label htmlFor="rg">{lang === "ar" ? "النطاقات (اختياري)" : "Page ranges (optional)"}</Label>
              <Input id="rg" value={splitRanges} onChange={(e) => setSplitRanges(e.target.value)}
                placeholder={lang === "ar" ? "مثال: 1-3,5,7-9 (افتراضي: كل صفحة)" : "e.g. 1-3,5,7-9 (default: every page)"} />
            </div>
          )}

          <Button variant="hero" size="lg" className="w-full" onClick={handleProcess} disabled={busy}>
            {busy ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> {lang === "ar" ? "جاري المعالجة..." : "Processing..."}</>
            ) : (
              <><Download className="h-4 w-4" /> {lang === "ar" ? "معالجة وتحميل" : "Process & Download"}</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
