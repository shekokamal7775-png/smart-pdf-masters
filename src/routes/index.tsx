import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Cloud, Sparkles, Upload, MousePointerClick, Download,
  Star, Quote, ArrowRight, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ToolCard";
import { tools, categories } from "@/lib/tools";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartPDFTools — Free Online PDF Tools, Editor, Converter & AI" },
      { name: "description", content: "All-in-one PDF workspace: merge, split, compress, convert, edit, sign, OCR and unlock PDFs free online. Plus AI tools. Secure and fast." },
      { property: "og:title", content: "SmartPDFTools — Free Online PDF Tools" },
      { property: "og:description", content: "Every PDF tool you need in one fast, secure workspace. 16+ tools including AI." },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Zap, key: "fast" },
  { icon: ShieldCheck, key: "secure" },
  { icon: Cloud, key: "cloud" },
  { icon: Sparkles, key: "ai" },
];

const testimonials = [
  { name: "Amira F.", role: "Operations Lead", body: "Replaced three separate tools we were paying for. The AI summary feature alone saves my team hours every week." },
  { name: "Marcus T.", role: "Legal Counsel", body: "Watermarks, redaction and bates numbering — finally one tool that nails the legal workflow without the Adobe price tag." },
  { name: "Priya R.", role: "PhD Researcher", body: "OCR quality on academic PDFs is astonishing. Even handwritten margin notes get picked up correctly." },
];

function HomePage() {
  const { t, lang } = useI18n();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
        <div className="absolute -top-32 end-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              {t("hero.title").split(",")[0]}
              <span className="block text-gradient">{t("hero.title").split(",").slice(1).join(",") || ""}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/tools">
                <Button variant="hero" size="xl">{t("hero.cta.primary")} <ArrowRight className="h-4 w-4 rtl:rotate-180" /></Button>
              </Link>
              <Link to="/tools">
                <Button variant="outline" size="xl">{t("hero.cta.secondary")}</Button>
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm">
              {[
                { v: "12M+", k: "hero.stat.users" },
                { v: "850M+", k: "hero.stat.files" },
                { v: "4.9★", k: "hero.stat.rating" },
              ].map((s) => (
                <div key={s.k} className="text-center">
                  <div className="font-display text-2xl font-bold text-foreground">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{t(s.k)}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20" id="tools">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">{t("tools.heading")}</h2>
          <p className="mt-4 text-muted-foreground">{t("tools.subheading")}</p>
        </div>

        {categories.map((cat) => {
          const items = tools.filter((tt) => tt.category === cat.id);
          if (!items.length) return null;
          return (
            <div key={cat.id} className="mb-12">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-xl font-bold">{cat[lang]}</h3>
                <span className="text-xs text-muted-foreground">{items.length} tools</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((tt, i) => <ToolCard key={tt.slug} tool={tt} index={i} />)}
              </div>
            </div>
          );
        })}
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl font-bold">{t("section.features.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("section.features.subtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{t(`feature.${f.key}.title`)}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t(`feature.${f.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30 rounded-3xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold">{t("section.how.title")}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: Upload, k: "step1" },
            { icon: MousePointerClick, k: "step2" },
            { icon: Download, k: "step3" },
          ].map((s, i) => (
            <div key={s.k} className="text-center relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <s.icon className="h-7 w-7" />
              </div>
              <div className="absolute top-0 start-1/2 -translate-x-1/2 sm:start-auto sm:translate-x-0 sm:-top-3 sm:end-1/2 font-display text-6xl font-extrabold text-primary/10 -z-10">
                0{i + 1}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{t(`section.how.${s.k}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`section.how.${s.k}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl font-bold">{t("section.testimonials.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("section.testimonials.subtitle")}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((tm, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-gradient-card p-7 shadow-soft"
            >
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-3 text-foreground/90 leading-relaxed">"{tm.body}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold">
                  {tm.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{tm.name}</div>
                  <div className="text-xs text-muted-foreground">{tm.role}</div>
                </div>
                <div className="ms-auto flex">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-gradient-primary p-12 sm:p-16 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">{t("section.cta.title")}</h2>
            <p className="mt-4 text-primary-foreground/90 max-w-xl mx-auto">{t("section.cta.subtitle")}</p>
            <Link to="/signup">
              <Button size="xl" className="mt-8 bg-foreground text-background hover:bg-foreground/90 font-semibold">
                {t("section.cta.button")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/85">
              {["No credit card", "Free forever plan", "Cancel anytime"].map((x) => (
                <span key={x} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> {x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
