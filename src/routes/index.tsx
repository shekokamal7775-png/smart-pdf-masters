import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Cloud, Globe, Upload, MousePointerClick, Download,
  ArrowRight, Check, FileText, Layers, Minimize2, Image, CheckCircle2,
  RotateCw, Scissors,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ToolCard";
import { tools, categories } from "@/lib/tools";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartPDFMasters — Free Online PDF Tools" },
      { name: "description", content: "Free browser-based PDF tools to merge, compress, rotate, split, convert and manage PDF files. No installation, no sign-up, no watermarks." },
      { property: "og:title", content: "SmartPDFMasters — Free Online PDF Tools" },
      { property: "og:description", content: "Free browser-based PDF tools to merge, compress, rotate, split, convert and manage PDF files. No installation, no sign-up, no watermarks." },
      { property: "og:url", content: "https://www.smartpdfmasters.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://www.smartpdfmasters.com/" },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Zap, title: "Fast processing", desc: "Your files are processed instantly in your browser — no upload delays, no waiting." },
  { icon: ShieldCheck, title: "Privacy first", desc: "Files are deleted within one hour. We never read or share your documents." },
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
              Free PDF tools — no sign-up required
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              PDF tools that
              <span className="block text-gradient">just work</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Merge, compress, rotate, split, convert and manage your PDF files directly in your browser.
              Fast, free, and completely private — your files never leave your device.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/tools">
                <Button variant="hero" size="xl">Get started — it's free <ArrowRight className="h-4 w-4 rtl:rotate-180" /></Button>
              </Link>
              <Link to="/tools">
                <Button variant="outline" size="xl">Browse all tools</Button>
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm">
              {[
                { v: "100% Free", k: "No hidden costs" },
                { v: "No Sign-up", k: "Use instantly" },
                { v: "1 Hour", k: "File auto-deleted" },
              ].map((s) => (
                <div key={s.k} className="text-center">
                  <div className="font-display text-2xl font-bold text-foreground">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.k}</div>
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

      {/* WHY CHOOSE + COMPARISON */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30 rounded-3xl">
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold">How it works</h2>
          <p className="mt-3 text-muted-foreground">Three steps is all it takes.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: Upload, title: "Upload your file", desc: "Drag and drop your PDF or image onto the tool page, or click to browse." },
            { icon: MousePointerClick, title: "Choose your action", desc: "Select the task — merge, compress, rotate, split, convert or create — and click to process." },
            { icon: Download, title: "Download your result", desc: "Your processed file is ready to download instantly. No waiting, no email required." },
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

      {/* WHY PEOPLE USE PDF */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30 rounded-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl font-bold">Why People Use PDF Tools Every Day</h2>
          <p className="mt-3 text-muted-foreground">PDF is the world's most widely used document format — and for good reason.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Students", desc: "Students use PDF tools daily to submit assignments, combine lecture notes into a single file, compress large presentations before uploading to a portal, and convert scanned handwritten notes into searchable text." },
            { title: "Business & Freelancers", desc: "Businesses rely on PDFs for invoices, proposals, contracts and reports. Compressing files before emailing, merging multi-page quotes into one document, and converting Word drafts to PDF for final delivery are everyday tasks." },
            { title: "Government & Legal", desc: "Government agencies and legal professionals depend on PDFs for official documents, court filings and compliance records. Converting scanned forms into editable files and combining supporting documents into one submission are common needs." },
            { title: "HR & Recruitment", desc: "HR teams handle CVs, offer letters, onboarding packs and policy documents in PDF format daily. Merging multiple applicant documents and compressing large employee files makes document management faster and cleaner." },
            { title: "Banking & Finance", desc: "Banks and finance teams produce statements, loan agreements and audit reports as PDFs. Compressing large financial documents, converting scanned records to searchable PDFs, and merging multi-document packages are routine tasks." },
            { title: "Healthcare", desc: "Medical professionals share referral letters, lab reports and patient summaries as PDFs. Converting scanned prescriptions to editable text and compressing large imaging reports for secure email delivery are frequent requirements." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
            There are no daily limits, no watermarks, and no account required. Your files are processed locally whenever possible and deleted automatically within one hour. We never read or share your documents.
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
            { q: "Is SmartPDFMasters really free to use?", a: "Yes. All six tools are completely free with no hidden charges, no daily limits, and no watermarks." },
            { q: "Do I need to create an account?", a: "No. You can use all tools without signing up or providing any personal information." },
            { q: "Are my files safe and secure?", a: "Yes. Files are transmitted over encrypted connections and automatically deleted within one hour of processing. We never read or share your file content." },
            { q: "What file formats do you support?", a: "Our tools support PDF, DOCX, PNG and JPG. Each tool page lists exactly which formats it accepts." },
            { q: "Can I use SmartPDFMasters on my phone?", a: "Yes. All six tools work on iPhone, Android, tablet and desktop directly in the browser — no app needed." },
            { q: "Does processing happen on my device or a server?", a: "Core processing runs in your browser whenever possible, which means your files never leave your device." },
            { q: "How do I rotate PDF pages?", a: "Use our free Rotate PDF tool. Upload your PDF, choose the rotation angle (90°, 180° or 270°), and download the corrected file in seconds." },
            { q: "How do I split a PDF into separate files?", a: "Use our free Split PDF tool. Upload your PDF, enter the page ranges you want (e.g. 1-3,5,7-9), and each range downloads as a separate PDF file." },
            { q: "How do I contact support?", a: "Use the Contact page or email us directly. We aim to respond within one business day." },
          ].map((item, i) => (
            <div key={i} className="p-5 border rounded-xl bg-card">
              <h3 className="font-semibold text-lg">{item.q}</h3>
              <p className="text-muted-foreground mt-1">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-gradient-primary p-12 sm:p-16 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">Ready to handle your PDFs?</h2>
            <p className="mt-4 text-primary-foreground/90 max-w-xl mx-auto">Six free tools. No account. No limits. Start now.</p>
            <Link to="/tools">
              <Button size="xl" className="mt-8 bg-foreground text-background hover:bg-foreground/90 font-semibold">
                Browse all tools <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/85">
              {["No credit card", "No sign-up required", "Files deleted within 1 hour"].map((x) => (
                <span key={x} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> {x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
