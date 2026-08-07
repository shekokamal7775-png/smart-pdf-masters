import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Cloud, Globe, Upload, MousePointerClick, Download,
  ArrowRight, Check, FileText, Layers, Minimize2, Image, CheckCircle2,
  RotateCw, Scissors, Star, Lock, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ToolCard";
import { tools, categories } from "@/lib/tools";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartPDFMasters — Free Online PDF Tools | Merge, Compress, Convert" },
      { name: "description", content: "Free browser-based PDF tools to merge, compress, rotate, split, convert and manage PDF files. No installation, no sign-up, no watermarks. Works on iPhone, Android, Windows and Mac." },
      { name: "keywords", content: "free PDF tools, merge PDF, compress PDF, PDF to Word, rotate PDF, split PDF, PNG to PDF, online PDF tools no signup" },
      { property: "og:title", content: "SmartPDFMasters — Free Online PDF Tools" },
      { property: "og:description", content: "Free browser-based PDF tools to merge, compress, rotate, split, convert and manage PDF files. No installation, no sign-up, no watermarks." },
      { property: "og:url", content: "https://www.smartpdfmasters.com/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.smartpdfmasters.com/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.smartpdfmasters.com/" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "SmartPDFMasters",
        url: "https://www.smartpdfmasters.com",
        description: "Free browser-based PDF tools for merging, compressing, rotating, splitting and converting PDF files.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.smartpdfmasters.com/tools",
          "query-input": "required name=search_term_string",
        },
      }),
    }],
  }),
  component: HomePage,
});

const features = [
  { icon: Zap, title: "Fast processing", desc: "Your files are processed instantly in your browser — no upload delays, no waiting." },
  { icon: ShieldCheck, title: "Privacy first", desc: "Files never leave your device. We never read, store, or share your documents." },
  { icon: Globe, title: "Works everywhere", desc: "Use any tool on desktop, tablet or mobile without installing anything." },
  { icon: Cloud, title: "No sign-up needed", desc: "All six tools are completely free with no account, no daily limits, and no watermarks." },
];

const toolHighlights = [
  { icon: Layers, title: "Merge PDF", desc: "Combine multiple PDF files into one organised document in seconds.", slug: "merge-pdf" },
  { icon: Minimize2, title: "Compress PDF", desc: "Reduce PDF file size while keeping text sharp and images clear.", slug: "compress-pdf" },
  { icon: RotateCw, title: "Rotate PDF", desc: "Fix upside down or sideways PDF pages — rotate 90°, 180° or 270°.", slug: "rotate-pdf" },
  { icon: Scissors, title: "Split PDF", desc: "Extract pages or split a PDF into separate files instantly.", slug: "split-pdf" },
  { icon: FileText, title: "PDF to Word", desc: "Convert any PDF to a fully editable Word document with fonts and layout preserved.", slug: "pdf-to-word" },
  { icon: Image, title: "PNG to PDF", desc: "Turn JPG or PNG images into a clean, shareable PDF file instantly.", slug: "jpg-to-pdf" },
];

const commonTasks = [
  { label: "Merge PDF files", slug: "merge-pdf" },
  { label: "Compress PDF", slug: "compress-pdf" },
  { label: "Rotate PDF pages", slug: "rotate-pdf" },
  { label: "Split PDF file", slug: "split-pdf" },
  { label: "Convert PDF to Word", slug: "pdf-to-word" },
  { label: "JPG to PDF", slug: "jpg-to-pdf" },
  { label: "PNG to PDF", slug: "jpg-to-pdf" },
  { label: "Reduce PDF size for email", slug: "compress-pdf" },
];

const whyChoose = [
  "No installation required",
  "Works on Windows, Mac, Android and iPhone",
  "Fast browser-based processing",
  "Secure encrypted file transfers",
  "No watermarks added to your files",
  "Completely free — no credit card needed",
  "No sign-up or account required",
  "Files automatically deleted within one hour",
];

const comparisonRows = [
  { feature: "Completely free", value: true },
  { feature: "No sign-up required", value: true },
  { feature: "No watermarks", value: true },
  { feature: "Encrypted file transfers", value: true },
  { feature: "Mobile friendly", value: true },
  { feature: "Browser-based (no install)", value: true },
  { feature: "Files deleted within 1 hour", value: true },
  { feature: "No daily limits", value: true },
];

const useCases = [
  { icon: Users, title: "Students", desc: "Merge lecture notes, compress assignments before uploading to university portals, and convert scanned handwritten notes into searchable PDFs." },
  { icon: FileText, title: "Business & Freelancers", desc: "Combine invoices and contracts, compress files before emailing, and convert PDF drafts to Word for final editing." },
  { icon: Lock, title: "Legal & Government", desc: "Combine supporting documents into single submission packages and extract specific pages from large official documents." },
  { icon: Star, title: "HR & Recruitment", desc: "Merge applicant CVs and cover letters, compress large employee files, and split multi-candidate documents into individual files." },
];

// Hero illustration SVG
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="SmartPDFMasters — free PDF tools illustration showing merge, compress, rotate, split, convert and create PDF operations"
      role="img"
    >
      <defs>
        <linearGradient id="hero-grad1" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#dc2626" /><stop offset="1" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="hero-grad2" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f59e0b" /><stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="hero-grad3" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a855f7" /><stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <filter id="card-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Background decoration */}
      <circle cx="500" cy="60" r="80" fill="#dc2626" fillOpacity="0.04" />
      <circle cx="100" cy="280" r="60" fill="#f97316" fillOpacity="0.04" />

      {/* PDF File Card 1 — Merge */}
      <g filter="url(#card-shadow)">
        <rect x="20" y="40" width="120" height="150" rx="10" fill="white" stroke="#f3f4f6" strokeWidth="1" />
        <rect x="20" y="40" width="120" height="30" rx="10" fill="url(#hero-grad1)" />
        <rect x="20" y="60" width="120" height="10" fill="url(#hero-grad1)" />
        <text x="30" y="58" fontSize="9" fill="white" fontWeight="bold">PDF</text>
        <rect x="32" y="82" width="80" height="6" rx="3" fill="#dc2626" fillOpacity="0.3" />
        <rect x="32" y="94" width="65" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="32" y="104" width="72" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="32" y="114" width="58" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="32" y="128" width="72" height="16" rx="4" fill="#dc2626" fillOpacity="0.08" />
        <rect x="32" y="150" width="80" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="32" y="160" width="60" height="5" rx="2.5" fill="#e5e7eb" />
        <text x="24" y="206" fontSize="8" fill="#dc2626" fontWeight="bold">MERGE</text>
      </g>

      {/* Arrow */}
      <path d="M148 115 L175 115" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M171 110 L176 115 L171 120" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* PDF File Card 2 — Result */}
      <g filter="url(#card-shadow)">
        <rect x="180" y="20" width="140" height="190" rx="10" fill="white" stroke="#f3f4f6" strokeWidth="1" />
        <rect x="180" y="20" width="140" height="32" rx="10" fill="url(#hero-grad1)" />
        <rect x="180" y="42" width="140" height="10" fill="url(#hero-grad1)" />
        <text x="192" y="40" fontSize="10" fill="white" fontWeight="bold">MERGED.PDF</text>
        <rect x="194" y="62" width="108" height="7" rx="3.5" fill="#dc2626" fillOpacity="0.4" />
        <rect x="194" y="74" width="90" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="194" y="84" width="100" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="194" y="94" width="78" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="194" y="108" width="108" height="5" rx="2.5" fill="#dc2626" fillOpacity="0.2" />
        <rect x="194" y="118" width="95" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="194" y="128" width="100" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="194" y="138" width="80" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="194" y="152" width="108" height="5" rx="2.5" fill="#dc2626" fillOpacity="0.2" />
        <rect x="194" y="162" width="90" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="194" y="172" width="100" height="5" rx="2.5" fill="#e5e7eb" />
        {/* Check badge */}
        <circle cx="304" cy="28" r="10" fill="#16a34a" />
        <path d="M299 28 L302 31 L309 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Compress Tool */}
      <g filter="url(#card-shadow)">
        <rect x="355" y="30" width="110" height="70" rx="10" fill="white" stroke="#f3f4f6" strokeWidth="1" />
        <rect x="355" y="30" width="110" height="22" rx="10" fill="url(#hero-grad2)" />
        <rect x="355" y="44" width="110" height="8" fill="url(#hero-grad2)" />
        <text x="365" y="43" fontSize="8" fill="white" fontWeight="bold">COMPRESS</text>
        <text x="365" y="72" fontSize="11" fill="#f59e0b" fontWeight="bold">12MB → 2MB</text>
        <text x="365" y="85" fontSize="7" fill="#6b7280">↓ 83% smaller</text>
      </g>

      {/* Rotate Tool */}
      <g filter="url(#card-shadow)">
        <rect x="355" y="118" width="110" height="70" rx="10" fill="white" stroke="#f3f4f6" strokeWidth="1" />
        <rect x="355" y="118" width="110" height="22" rx="10" fill="url(#hero-grad3)" />
        <rect x="355" y="132" width="110" height="8" fill="url(#hero-grad3)" />
        <text x="365" y="131" fontSize="8" fill="white" fontWeight="bold">ROTATE PDF</text>
        <text x="400" y="165" fontSize="28" fill="#a855f7" fontWeight="bold" textAnchor="middle">↻</text>
        <text x="400" y="180" fontSize="7" fill="#6b7280" textAnchor="middle">90° • 180° • 270°</text>
      </g>

      {/* Split Tool */}
      <g filter="url(#card-shadow)">
        <rect x="355" y="206" width="110" height="70" rx="10" fill="white" stroke="#f3f4f6" strokeWidth="1" />
        <rect x="355" y="206" width="110" height="22" rx="10" fill="url(#hero-grad1)" />
        <rect x="355" y="220" width="110" height="8" fill="url(#hero-grad1)" />
        <text x="365" y="219" fontSize="8" fill="white" fontWeight="bold">SPLIT PDF</text>
        <rect x="368" y="236" width="30" height="28" rx="4" fill="#dc2626" fillOpacity="0.15" stroke="#dc2626" strokeWidth="1" />
        <rect x="403" y="236" width="30" height="28" rx="4" fill="#dc2626" fillOpacity="0.15" stroke="#dc2626" strokeWidth="1" />
        <rect x="438" y="236" width="20" height="28" rx="4" fill="#dc2626" fillOpacity="0.15" stroke="#dc2626" strokeWidth="1" />
        <text x="376" y="254" fontSize="7" fill="#dc2626" fontWeight="bold" textAnchor="middle">P.1</text>
        <text x="418" y="254" fontSize="7" fill="#dc2626" fontWeight="bold" textAnchor="middle">P.2</text>
        <text x="448" y="254" fontSize="7" fill="#dc2626" fontWeight="bold" textAnchor="middle">P.3</text>
      </g>

      {/* PDF to Word */}
      <g filter="url(#card-shadow)">
        <rect x="480" y="60" width="110" height="80" rx="10" fill="white" stroke="#f3f4f6" strokeWidth="1" />
        <rect x="480" y="60" width="110" height="22" rx="10" fill="#2563eb" />
        <rect x="480" y="74" width="110" height="8" fill="#2563eb" />
        <text x="490" y="73" fontSize="8" fill="white" fontWeight="bold">PDF → WORD</text>
        <text x="525" y="118" fontSize="32" fill="#2563eb" fontWeight="bold" textAnchor="middle">W</text>
        <text x="525" y="132" fontSize="7" fill="#6b7280" textAnchor="middle">Editable DOCX</text>
      </g>

      {/* PNG to PDF */}
      <g filter="url(#card-shadow)">
        <rect x="480" y="160" width="110" height="80" rx="10" fill="white" stroke="#f3f4f6" strokeWidth="1" />
        <rect x="480" y="160" width="110" height="22" rx="10" fill="#16a34a" />
        <rect x="480" y="174" width="110" height="8" fill="#16a34a" />
        <text x="490" y="173" fontSize="8" fill="white" fontWeight="bold">PNG → PDF</text>
        <rect x="492" y="192" width="40" height="30" rx="4" fill="#16a34a" fillOpacity="0.2" />
        <circle cx="502" cy="200" r="4" fill="#fde68a" fillOpacity="0.8" />
        <path d="M494 218 L502 206 L510 212 L516 204 L528 218" stroke="#16a34a" strokeWidth="1.5" fill="none" />
        <text x="544" y="210" fontSize="18" fill="#16a34a">→</text>
        <rect x="554" y="192" width="30" height="30" rx="4" fill="#16a34a" fillOpacity="0.15" stroke="#16a34a" strokeWidth="1" />
        <text x="569" y="212" fontSize="7" fill="#16a34a" fontWeight="bold" textAnchor="middle">PDF</text>
      </g>

      {/* Floating labels */}
      <rect x="22" y="198" width="116" height="20" rx="6" fill="#dc2626" fillOpacity="0.1" />
      <text x="80" y="212" fontSize="8" fill="#dc2626" fontWeight="bold" textAnchor="middle">✓ Free • No Watermark</text>
    </svg>
  );
}

function HomePage() {
  const { t, lang } = useI18n();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
        <div className="absolute -top-32 end-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
                Free PDF tools — no sign-up required
              </span>
              <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
                PDF tools that
                <span className="block text-gradient">just work</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Merge, compress, rotate, split, convert and manage your PDF files directly in your browser.
                Fast, free, and completely private — your files never leave your device.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/tools">
                  <Button variant="hero" size="xl">
                    Get started — it's free <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="outline" size="xl">Browse all tools</Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {[
                  { v: "100% Free", k: "No hidden costs" },
                  { v: "No Sign-up", k: "Use instantly" },
                  { v: "6 Tools", k: "All in one place" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-display text-2xl font-bold text-foreground">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.k}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="rounded-3xl border border-border bg-card/50 shadow-elegant p-6 backdrop-blur-sm">
                <HeroIllustration />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-y border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
            {[
              { icon: ShieldCheck, text: "Files processed in your browser — never uploaded" },
              { icon: Star, text: "No watermarks added to any file" },
              { icon: Zap, text: "Results in under 30 seconds" },
              { icon: Globe, text: "Works on iPhone, Android, Windows & Mac" },
              { icon: Lock, text: "100% free — no credit card needed" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                {text}
              </span>
            ))}
          </div>
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

      {/* TOOL HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30 rounded-3xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl font-bold">Six tools. Every PDF task covered.</h2>
          <p className="mt-3 text-muted-foreground">Everything you need to handle PDFs, in one place.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {toolHighlights.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link to="/tools/$slug" params={{ slug: tool.slug }}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{tool.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Open tool <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMON PDF TASKS */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold">Common PDF Tasks</h2>
          <p className="mt-3 text-muted-foreground">The most frequent PDF tasks — all handled for free, right here.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {commonTasks.map((task) => (
            <Link key={task.label} to="/tools/$slug" params={{ slug: task.slug }}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-elegant hover:-translate-y-0.5 transition-smooth">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium text-sm">{task.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground ms-auto" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl font-bold">Why SmartPDFMasters</h2>
          <p className="mt-3 text-muted-foreground">Built around the things that actually matter when handling documents.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHO USES SMARTPDFMASTERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30 rounded-3xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl font-bold">Who uses SmartPDFMasters?</h2>
          <p className="mt-3 text-muted-foreground">From students to enterprises — PDF tasks that used to take minutes now take seconds.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant mb-4">
                <uc.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">{uc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE + COMPARISON */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl font-bold">Why Choose SmartPDFMasters?</h2>
          <p className="mt-3 text-muted-foreground">Everything you need, nothing you don't.</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="grid gap-3 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card shadow-soft">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
            <div className="grid grid-cols-2 bg-gradient-primary text-primary-foreground px-6 py-4">
              <span className="font-display font-bold">Feature</span>
              <span className="font-display font-bold text-center">SmartPDFMasters</span>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-2 px-6 py-3 ${i % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}>
                <span className="text-sm text-foreground/80">{row.feature}</span>
                <span className="text-center text-green-500 font-bold text-lg">✅</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30 rounded-3xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold">How it works</h2>
          <p className="mt-3 text-muted-foreground">Three steps is all it takes — on any device, in any browser.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: Upload, title: "Upload your file", desc: "Drag and drop your PDF or image onto the tool page, or click to browse. Your file stays on your device." },
            { icon: MousePointerClick, title: "Choose your action", desc: "Select the task — merge, compress, rotate, split, convert or create — and click to process instantly." },
            { icon: Download, title: "Download your result", desc: "Your processed file is ready to download in seconds. No waiting, no email, no account required." },
          ].map((s, i) => (
            <div key={s.title} className="text-center relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <s.icon className="h-7 w-7" />
              </div>
              <div className="absolute top-0 start-1/2 -translate-x-1/2 sm:start-auto sm:translate-x-0 sm:-top-3 sm:end-1/2 font-display text-6xl font-extrabold text-primary/10 -z-10">
                0{i + 1}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROSE */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-bold mb-6">The simplest way to handle PDF files</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            SmartPDFMasters is a free, browser-based platform built to handle the most common PDF tasks without the complexity or cost of desktop software. Whether you need to combine documents, reduce a file size before emailing it, rotate pages that came out sideways, split a large document into sections, convert a PDF into an editable Word file, or turn phone photos into a PDF — everything runs directly in your browser.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            There are no daily limits, no watermarks, and no account required. Your files are processed locally in your browser and never transmitted to any server. We never read or share your documents.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SmartPDFMasters works on any device — desktop, tablet or mobile — with no installation needed. Just open the tool, process your file, and download the result.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="font-display text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Is SmartPDFMasters really free to use?", a: "Yes. All six tools are completely free with no hidden charges, no daily limits, and no watermarks added to your files." },
            { q: "Do I need to create an account?", a: "No. You can use all six tools without signing up or providing any personal information whatsoever." },
            { q: "Are my files safe and secure?", a: "Yes. All processing happens in your browser — your files never leave your device. We never read, store, or share your file content." },
            { q: "What file formats do you support?", a: "Our tools support PDF, DOCX, PNG and JPG. Each tool page lists exactly which formats it accepts." },
            { q: "Can I use SmartPDFMasters on my phone?", a: "Yes. All six tools work on iPhone, Android, tablet and desktop directly in the browser — no app download needed." },
            { q: "Does SmartPDFMasters display advertisements?", a: "Yes. We display Google AdSense advertisements to generate revenue that keeps the platform free for everyone. You can opt out of personalised ads at Google's Ads Settings." },
            { q: "How do I rotate PDF pages?", a: "Use our free Rotate PDF tool. Upload your PDF, choose the rotation angle (90°, 180° or 270°), and download the corrected file in seconds." },
            { q: "How do I split a PDF into separate files?", a: "Use our free Split PDF tool. Upload your PDF, enter the page ranges you want (e.g. 1-3,5,7-9), and each range downloads as a separate PDF file." },
            { q: "How do I contact support?", a: "Use the Contact page at smartpdfmasters.com/contact. We respond to every message within one business day." },
          ].map((item, i) => (
            <div key={i} className="p-5 border rounded-xl bg-card">
              <h3 className="font-semibold text-lg">{item.q}</h3>
              <p className="text-muted-foreground mt-1 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold">PDF Guides & Tutorials</h2>
          <p className="mt-3 text-muted-foreground">In-depth guides for every common PDF task — written and tested by our team.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "How to Merge PDF Files Free", slug: "how-to-merge-pdf-files-free", cat: "PDF Tutorials" },
            { title: "How to Compress PDF Online Free", slug: "how-to-compress-pdf-online-free", cat: "PDF Tutorials" },
            { title: "How to Convert PDF to Word Free", slug: "how-to-convert-pdf-to-word", cat: "File Conversion" },
            { title: "How to Rotate PDF Pages Free", slug: "how-to-rotate-pdf-pages-free", cat: "PDF Tutorials" },
            { title: "How to Split a PDF Free", slug: "how-to-split-pdf-files-free", cat: "PDF Tutorials" },
            { title: "What Is a PDF File?", slug: "what-is-a-pdf-file", cat: "Document Management" },
          ].map((article) => (
            <Link
              key={article.slug}
              to="/blog/$slug"
              params={{ slug: article.slug }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-smooth"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-primary">{article.cat}</span>
              <h3 className="mt-1 font-display font-bold text-base group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium">
                Read guide <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/blog">
            <Button variant="outline" size="lg">
              View all guides <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-gradient-primary p-12 sm:p-16 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">
              Ready to handle your PDFs?
            </h2>
            <p className="mt-4 text-primary-foreground/90 max-w-xl mx-auto">
              Six free tools. No account. No limits. Works on every device. Start now.
            </p>
            <Link to="/tools">
              <Button size="xl" className="mt-8 bg-foreground text-background hover:bg-foreground/90 font-semibold">
                Browse all tools <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/85">
              {["No credit card", "No sign-up required", "Files never leave your device"].map((x) => (
                <span key={x} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
