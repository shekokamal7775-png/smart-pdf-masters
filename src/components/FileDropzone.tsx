import { useCallback, useState, type DragEvent } from "react";
import { UploadCloud, FileCheck2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export function FileDropzone({ accept = ".pdf", multiple = false }: { accept?: string; multiple?: boolean }) {
  const { t } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [hover, setHover] = useState(false);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(multiple ? [...files, ...dropped] : dropped.slice(0, 1));
  }, [files, multiple]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const picked = Array.from(e.target.files);
    setFiles(multiple ? [...files, ...picked] : picked.slice(0, 1));
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
          accept={accept}
          multiple={multiple}
          onChange={onPick}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="Upload file"
        />
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-elegant animate-float">
          <UploadCloud className="h-10 w-10 text-primary-foreground" strokeWidth={2} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold">{t("tool.upload")}</h3>
        <p className="mt-1 text-muted-foreground">{t("tool.upload.or")}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
          <span>{t("tool.upload.cloud")}:</span>
          {["Google Drive", "Dropbox", "OneDrive"].map((s) => (
            <button key={s} type="button" className="rounded-full border border-border bg-background px-3 py-1 hover:border-primary hover:text-primary transition-smooth">
              {s}
            </button>
          ))}
        </div>
      </div>

      {files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
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
          <Button
            variant="hero"
            size="lg"
            className="w-full mt-2"
            onClick={() => toast.info(t("tool.demo"))}
          >
            {t("tool.process")}
          </Button>
        </div>
      )}
    </div>
  );
}
