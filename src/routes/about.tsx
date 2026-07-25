import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Globe, Users, Award, Clock, Mail, BookOpen, Zap, Lock } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SmartPDFMasters — Our Mission, Story & Privacy Commitment" },
      { name: "description", content: "SmartPDFMasters is a free browser-based PDF platform. Learn about our mission to make PDF tools fast, private and accessible for everyone — no installation, no signup required." },
      { name: "keywords", content: "about SmartPDFMasters, free PDF tools, PDF platform mission, browser PDF tools, privacy PDF tools" },
      { property: "og:title", content: "About SmartPDFMasters — Free PDF Tools for Everyone" },
      { property: "og:description", content: "Our mission: make every PDF task effortless, fast and secure for everyone — completely free." },
      { property: "og:url", content: "https://www.smartpdfmasters.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/about" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SmartPDFMasters",
        url: "https://www.smartpdfmasters.com",
        description: "Free browser-based PDF tools for merging, compressing, rotating, splitting and converting PDF files.",
        foundingDate: "2025",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: "https://www.smartpdfmasters.com/contact",
        },
      }),
    }],
  }),
  component: AboutPage,
});

const stats = [
  { value: "6", label: "Free PDF Tools" },
  { value: "100%", label: "Browser-Based" },
  { value: "0", label: "Files Stored" },
  { value: "1hr", label: "Auto-Delete Time" },
];

const values = [
  {
    icon: Heart,
    title: "Built for Real People",
    body: "SmartPDFMasters was created for students submitting assignments, professionals sending contracts, small business owners managing invoices, and anyone who needs a PDF tool that simply works. No technical knowledge required.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by Design",
    body: "Every tool on SmartPDFMasters processes your files directly in your browser. Your documents never travel to our servers. Any temporary files created during processing are automatically deleted within one hour. We never read, share, or store your document content.",
  },
  {
    icon: Globe,
    title: "Works on Every Device",
    body: "SmartPDFMasters runs entirely in your browser — Chrome, Safari, Firefox, or Edge. It works equally well on Windows laptops, MacBooks, iPhones, Android phones, and tablets. No app download, no installation, no account required.",
  },
  {
    icon: Users,
    title: "Genuinely Free",
    body: "All six tools are completely free with no daily limits, no watermarks, and no hidden charges. We believe everyone should have access to professional-quality PDF tools regardless of budget.",
  },
  {
    icon: Award,
    title: "Quality You Can Trust",
    body: "Every tool is built to preserve the quality of your documents. Compressed PDFs keep text sharp and readable. Converted Word documents preserve fonts, tables, and layout. Merged PDFs maintain the exact page order you specify.",
  },
  {
    icon: Lock,
    title: "Security Standards",
    body: "All connections to SmartPDFMasters are encrypted using TLS. We follow GDPR principles — we do not track your file content, we do not sell your data, and we do not use your documents for any purpose beyond completing the task you requested.",
  },
];

const team = [
  {
    name: "Sara Khalil",
    role: "Content Director & PDF Specialist",
    bio: "Sara has seven years of experience writing technical documentation and educational content about document management, PDF workflows, and productivity tools. She oversees all editorial content on SmartPDFMasters, ensuring every article is accurate, practical, and genuinely helpful.",
  },
  {
    name: "Mohamed Adel",
    role: "Product Manager & Technical Writer",
    bio: "Mohamed specialises in explaining complex technical concepts in clear, accessible language. With a background in software product management, he focuses on ensuring SmartPDFMasters tools meet the real-world needs of professionals, students, and everyday users.",
  },
  {
    name: "Layla Hassan",
    role: "Security & Privacy Researcher",
    bio: "Layla brings expertise in data privacy, document security, and GDPR compliance. She reviews all privacy-related content on SmartPDFMasters and ensures the platform follows best practices for handling sensitive documents.",
  },
  {
    name: "Daniel Park",
    role: "Technology Analyst",
    bio: "Daniel researches and evaluates PDF tools, AI document applications, and productivity software. He writes comparative reviews and technology explainers that help users make informed decisions about the tools they use.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
          About SmartPDFMasters
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          PDF tools that respect your{" "}
          <span className="text-gradient">time and privacy</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          SmartPDFMasters is a free, browser-based platform that handles the most common PDF tasks — merging, compressing, rotating, splitting, converting and creating — directly on your device. No installation. No account. No cost.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
            <div className="font-display text-4xl font-extrabold text-gradient">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Our Story */}
      <div className="mt-20 rounded-3xl bg-gradient-card border border-border p-10 sm:p-14">
        <h2 className="font-display text-3xl font-bold mb-6">Our Story</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            SmartPDFMasters was built to solve a problem that millions of people encounter every day: needing to merge, compress, or convert a PDF file and having to search through a dozen different websites — each with its own signup wall, file size limit, watermark, or hidden paywall — just to complete a single straightforward task.
          </p>
          <p>
            We believed there was a better way. A single, clean workspace where the six most common PDF tasks are always available, always free, and always private. No account to create. No daily limit to hit. No watermark to remove. No file sitting on a server somewhere after you close the tab.
          </p>
          <p>
            Everything on SmartPDFMasters runs directly in your browser using modern web technology. When you merge PDFs, compress a large file, rotate sideways pages, split a document into sections, convert a PDF to Word, or turn images into PDF — your files are processed on your own device. They never leave your browser.
          </p>
          <p>
            We also believe that access to useful tools should not depend on your budget. Students, freelancers, small businesses, and individuals in every country should have the same access to professional-quality PDF tools as large corporations with expensive software subscriptions. That is why all six tools on SmartPDFMasters are completely free, with no feature limits on the free tier.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mt-20">
        <h2 className="font-display text-3xl font-bold text-center mb-12">What We Stand For</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-7 shadow-soft hover:shadow-elegant transition-smooth">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mt-20">
        <h2 className="font-display text-3xl font-bold text-center mb-4">Our Team</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          SmartPDFMasters is built and maintained by a small, dedicated team of writers, researchers, and product specialists focused on making document tools genuinely useful.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {team.map((member) => (
            <div key={member.name} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground font-display text-xl font-bold shadow-elegant mb-4">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-display text-lg font-bold">{member.name}</h3>
              <p className="text-xs text-primary font-semibold mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Commitment */}
      <div className="mt-20 rounded-3xl border-2 border-primary/20 bg-primary/5 p-10 sm:p-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl font-bold">Our Privacy Commitment</h2>
        </div>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Privacy is not an afterthought at SmartPDFMasters — it is the foundation of how we built the platform. Here is exactly what happens when you use our tools:
          </p>
          <ul className="space-y-3">
            {[
              "Your files are processed using JavaScript running directly in your browser. They are not uploaded to any server.",
              "We do not read the content of your documents. We have no access to what is in your PDFs.",
              "No account is required, which means we collect no personal information from you.",
              "Any temporary browser memory used during processing is released when you close the tool.",
              "We do not use your documents for machine learning, AI training, or any purpose other than completing the task you requested.",
              "Our platform is GDPR-compliant. We do not sell or share your data with third parties for advertising.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            If you have questions about how SmartPDFMasters handles your data, please read our{" "}
            <Link to="/privacy" className="text-primary underline hover:text-primary/80">Privacy Policy</Link>{" "}
            or contact us through our{" "}
            <Link to="/contact" className="text-primary underline hover:text-primary/80">Contact page</Link>.
          </p>
        </div>
      </div>

      {/* Tools Summary */}
      <div className="mt-20">
        <h2 className="font-display text-3xl font-bold text-center mb-4">What SmartPDFMasters Can Do</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Six free tools covering every common PDF task — all available immediately without signup or installation.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { slug: "merge-pdf", title: "Merge PDF", desc: "Combine multiple PDF files into one organised document in the order you choose." },
            { slug: "compress-pdf", title: "Compress PDF", desc: "Reduce PDF file size while keeping text sharp and images clear for email and uploads." },
            { slug: "rotate-pdf", title: "Rotate PDF", desc: "Permanently fix upside down or sideways PDF pages — rotate 90°, 180° or 270°." },
            { slug: "split-pdf", title: "Split PDF", desc: "Extract specific pages or divide a PDF into separate sections by page range." },
            { slug: "pdf-to-word", title: "PDF to Word", desc: "Convert any PDF to a fully editable Word document with fonts and layout preserved." },
            { slug: "jpg-to-pdf", title: "PNG to PDF", desc: "Convert JPG and PNG images into a clean, shareable PDF file instantly." },
          ].map((tool) => (
            <Link
              key={tool.slug}
              to="/tools/$slug"
              params={{ slug: tool.slug }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-smooth group"
            >
              <h3 className="font-display font-bold text-base group-hover:text-primary transition-colors">{tool.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-20 text-center">
        <div className="rounded-3xl bg-gradient-primary p-10 sm:p-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Questions or Feedback?
            </h2>
            <p className="text-primary-foreground/85 max-w-xl mx-auto mb-8 leading-relaxed">
              We read every message. If you have a question about how a tool works, a privacy concern, or a suggestion for improving SmartPDFMasters, we want to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-6 py-3 text-sm font-bold shadow-elegant hover:-translate-y-0.5 transition-all">
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
              <Link to="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
                <BookOpen className="h-4 w-4" />
                Read Our Guides
              </Link>
              <Link to="/tools"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
                <Zap className="h-4 w-4" />
                Try the Tools
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
