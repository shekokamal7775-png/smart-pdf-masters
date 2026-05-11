import { useState, type FormEvent } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

export function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <div className="my-12 overflow-hidden rounded-3xl bg-gradient-primary p-8 sm:p-12 shadow-elegant">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Mail className="h-3.5 w-3.5" /> Newsletter
          </div>
          <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {t("newsletter.title")}
          </h3>
          <p className="mt-2 text-primary-foreground/85 max-w-md">{t("newsletter.subtitle")}</p>
        </div>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.placeholder")}
            className="h-12 bg-white/95 text-foreground placeholder:text-muted-foreground border-0 shadow-lg"
            required
          />
          <Button type="submit" size="lg" className="h-12 bg-foreground text-background hover:bg-foreground/90 font-semibold">
            {done ? <><Check className="h-4 w-4" /> {t("newsletter.success")}</> : <>{t("newsletter.button")} <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </form>
      </div>
    </div>
  );
}
