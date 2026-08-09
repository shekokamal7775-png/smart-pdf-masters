import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Globe, Users, Award, Clock, Mail, BookOpen, Zap, Lock, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SmartPDFMasters — Our Mission, Team & Privacy Commitment" },
      { name: "description", content: "SmartPDFMasters is a free browser-based PDF platform built by a team of document management specialists. Learn about our mission, our team, and our commitment to privacy and quality." },
      { name: "keywords", content: "about SmartPDFMasters, free PDF tools team, PDF platform mission, who made SmartPDFMasters" },
      { property: "og:title", content: "About SmartPDFMasters — Free PDF Tools for Everyone" },
      { property: "og:description", content: "We built SmartPDFMasters because handling PDF files should be simple, fast, and private — for everyone, for free." },
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
        description: "Free browser-based PDF tools for merging, compressing, rotating, splitting, deleting pages, watermarking and converting PDF files.",
        foundingDate: "2025",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: "https://www.smartpdfmasters.com/contact",
        },
        sameAs: [
          "https://www.smartpdfmasters.com",
        ],
      }),
    }],
  }),
  component: AboutPage,
});

const stats = [
  { value: "10", label: "Free PDF Tools" },
  { value: "100%", label: "Browser-Based" },
  { value: "0", label: "Files Stored on Servers" },
  { value: "40+", label: "In-Depth Guides Published" },
];

const values = [
  {
    icon: Heart,
    title: "Built for Real People",
    body: "SmartPDFMasters was created after experiencing the same frustration millions of people share: needing to complete a simple PDF task and spending twenty minutes searching through sites full of paywalls, watermarks, and daily limits. We built the tool we wished existed.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by Design — Not an Afterthought",
    body: "Every tool on SmartPDFMasters processes your files directly in your browser using JavaScript. Your documents never travel to any server. We cannot read your files because we never receive them. Any temporary browser memory is released the moment you close the tab.",
  },
  {
    icon: Globe,
    title: "Works on Every Device, Everywhere",
    body: "SmartPDFMasters runs in Chrome, Safari, Firefox, and Edge equally well. It works on Windows laptops, MacBooks, iPhones, Android phones, and tablets. No app to download. No account to create. No software to install. Open the browser, use the tool, done.",
  },
  {
    icon: Users,
    title: "Genuinely Free — No Hidden Catches",
    body: "All ten tools are completely free with no daily limits, no watermarks, and no hidden charges. We display non-intrusive advertisements to keep the platform free for everyone. We will never lock core features behind a paywall or add watermarks to your processed files.",
  },
  {
    icon: Award,
    title: "Quality That Respects Your Work",
    body: "Every tool is built to preserve the quality of your documents. Compressed PDFs keep text sharp and readable. Converted Word documents preserve fonts, tables, and layout. Merged PDFs maintain the exact page order you specify. Rotated PDFs save the correct orientation permanently.",
  },
  {
    icon: Lock,
    title: "Security You Can Verify",
    body: "All connections to SmartPDFMasters are encrypted using TLS. We follow GDPR principles — we do not track your file content, we do not sell your data, and we do not use your documents for AI training or any purpose beyond completing the task you requested.",
  },
];

const team = [
  {
    name: "Sara Khalil",
    role: "Content Director & PDF Workflow Specialist",
    initial: "S",
    experience: "7 years",
    bio: "Sara has seven years of experience writing technical documentation and educational content about document management, PDF workflows, and productivity tools. She began her career writing user guides for enterprise document management systems before moving into content creation for productivity-focused web platforms. At SmartPDFMasters, Sara oversees all editorial content — every guide, article, and tool description — ensuring it is accurate, practical, and based on real testing rather than theory. She personally tests each workflow on multiple devices before publishing.",
    expertise: ["PDF workflow optimisation", "Technical documentation", "Document management systems", "SEO-focused content"],
  },
  {
    name: "Mohamed Adel",
    role: "Product Lead & Technical Content Writer",
    initial: "M",
    experience: "5 years",
    bio: "Mohamed has five years of experience in software product management and technical writing. He specialises in explaining complex technical processes in clear, accessible language that non-technical users can follow immediately. Before joining SmartPDFMasters, Mohamed worked on the documentation teams of two productivity software companies, where he wrote user-facing guides for tools used by hundreds of thousands of people. At SmartPDFMasters, he is responsible for the tool experience, user-facing copy, and the step-by-step guides on each tool page.",
    expertise: ["Software product management", "Technical writing", "User experience", "Browser-based application development"],
  },
  {
    name: "Layla Hassan",
    role: "Privacy & Security Researcher",
    initial: "L",
    experience: "6 years",
    bio: "Layla has six years of experience in data privacy research, GDPR compliance, and document security. She has consulted for organisations in the legal, healthcare, and financial sectors on how to handle sensitive documents securely in digital workflows. At SmartPDFMasters, Layla reviews all privacy-related content, maintains the platform's GDPR compliance, and writes the security-focused guides on topics like PDF password protection, redaction, and secure document sharing.",
    expertise: ["GDPR compliance", "Data privacy law", "Document security", "Encryption standards"],
  },
  {
    name: "Daniel Park",
    role: "Technology Analyst & Comparative Reviewer",
    initial: "D",
    experience: "4 years",
    bio: "Daniel has four years of experience researching and evaluating productivity software, PDF tools, and AI document applications. His background is in comparative technology journalism — writing reviews and benchmarks that help everyday users choose between competing tools. At SmartPDFMasters, Daniel writes the comparative guides (such as free tools versus Adobe Acrobat), technology explainers, and reviews of AI-powered PDF features. Every comparison he publishes is based on hands-on testing rather than marketing materials.",
    expertise: ["Software evaluation and benchmarking", "AI document tools", "Comparative technology journalism", "Productivity software"],
  },
];

const milestones = [
  { year: "2025", event: "SmartPDFMasters founded — launched with four core PDF tools after months of testing browser-based PDF processing technology." },
  { year: "Early 2026", event: "Added Rotate PDF and Split PDF tools in response to user requests. Expanded blog to cover the most common PDF questions in depth." },
  { year: "Mid 2026", event: "Added Delete PDF Pages, Watermark PDF, PDF to Image, and Word to PDF, bringing the toolset to ten free tools. Published 40+ in-depth guides covering PDF workflows for students, professionals, and businesses. Reached users across Europe, North America, and the Middle East." },
  { year: "2026 onwards", event: "Continuing to expand the tool library and content library based on what PDF tasks people actually need help with." },
];

const toolSummary = [
  { slug: "merge-pdf", title: "Merge PDF", desc: "Combine multiple PDF files into one organised document in the order you choose." },
  { slug: "compress-pdf", title: "Compress PDF", desc: "Reduce PDF file size while keeping text sharp and images clear for email and uploads." },
  { slug: "rotate-pdf", title: "Rotate PDF", desc: "Permanently fix upside down or sideways PDF pages — rotate 90°, 180° or 270°." },
  { slug: "split-pdf", title: "Split PDF", desc: "Extract specific pages or divide a PDF into separate sections by page range." },
  { slug: "delete-pages-pdf", title: "Delete PDF Pages", desc: "Remove specific pages from a PDF — blank pages or unwanted sections." },
  { slug: "add-watermark-pdf", title: "Watermark PDF", desc: "Add a text watermark to every page — protect and brand your documents." },
  { slug: "pdf-to-word", title: "PDF to Word", desc: "Convert any PDF to a fully editable Word document with fonts and layout preserved." },
  { slug: "word-to-pdf", title: "Word to PDF", desc: "Convert Word documents to PDF instantly — preserve fonts, tables and layout." },
  { slug: "jpg-to-pdf", title: "Image to PDF", desc: "Convert JPG and PNG images into a clean, shareable PDF file instantly." },
  { slug: "pdf-to-jpg", title: "PDF to Image", desc: "Convert PDF pages to high-quality JPG or PNG images instantly." },
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
          We built the PDF tool{" "}
          <span className="text-gradient">we wished existed</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          SmartPDFMasters is a free, browser-based platform that handles the most common PDF tasks — merging, compressing, rotating, splitting, deleting pages, watermarking, converting and creating — directly on your device. No installation. No account. No cost. No watermarks.
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
        <h2 className="font-display text-3xl font-bold mb-6">Why We Built SmartPDFMasters</h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            The idea for SmartPDFMasters came from a genuinely frustrating experience that almost everyone has had: you need to merge two PDF files, or compress a large document to send by email, or rotate a scanned page that came out sideways. Simple tasks. Tasks that should take thirty seconds.
          </p>
          <p>
            Instead, you end up on a website that requires you to create an account. Or one that limits you to three files per day. Or one that adds a watermark to your document unless you subscribe. Or one that uploads your sensitive contract to a server you know nothing about and keeps it for an unspecified period.
          </p>
          <p>
            We tested dozens of PDF tools and found the same pattern everywhere: the most useful features were locked away, privacy practices were vague, and the experience was designed to push users toward paid subscriptions rather than actually help them.
          </p>
          <p>
            SmartPDFMasters was built to be different. All ten tools are genuinely free — no daily limits, no watermarks, no account required. All processing happens in your browser using modern JavaScript technology, which means your files never leave your device. We have been transparent about exactly how everything works since the day we launched.
          </p>
          <p>
            We also believe that useful tools deserve useful context. That is why every tool page includes a detailed explanation of how it works, step-by-step instructions, common use cases, and answers to the questions people actually ask. And our blog covers PDF topics in depth — not thin summaries, but guides written by people who have tested every method they describe.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-20">
        <h2 className="font-display text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex-shrink-0 flex h-12 w-24 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground text-sm font-bold shadow-elegant">
                {m.year}
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1 pt-2">{m.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mt-20">
        <h2 className="font-display text-3xl font-bold text-center mb-4">What We Stand For</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          These are not marketing statements — they are the principles that shaped every decision we made when building SmartPDFMasters.
        </p>
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
        <h2 className="font-display text-3xl font-bold text-center mb-4">Meet the Team</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          SmartPDFMasters is built and maintained by a small team of writers, researchers, and product specialists. Every guide we publish is based on real testing. Every tool is designed around real user needs.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {team.map((member) => (
            <div key={member.name} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground font-display text-xl font-bold shadow-elegant">
                  {member.initial}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{member.name}</h3>
                  <p className="text-xs text-primary font-semibold">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.experience} experience</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill) => (
                  <span key={skill} className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Standards */}
      <div className="mt-20 rounded-3xl border-2 border-primary/20 bg-primary/5 p-10 sm:p-14">
        <h2 className="font-display text-3xl font-bold mb-6">Our Editorial Standards</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Every article and guide published on SmartPDFMasters is held to strict editorial standards. We believe users deserve accurate, honest, and useful information — not content designed purely to rank in search engines.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: CheckCircle, text: "Every method described in our guides has been personally tested by a team member on at least two devices before publication." },
            { icon: CheckCircle, text: "We do not publish claims we cannot verify. If a method works only in specific circumstances, we say so clearly." },
            { icon: CheckCircle, text: "Guides are updated when tools or operating systems change in ways that affect the instructions." },
            { icon: CheckCircle, text: "We link to authoritative external sources — Google, Mozilla, W3C, Wikipedia — rather than citing our own content as evidence." },
            { icon: CheckCircle, text: "Comparative reviews (such as free tools versus Adobe Acrobat) are based on hands-on testing, not marketing materials." },
            { icon: CheckCircle, text: "We disclose that SmartPDFMasters displays Google AdSense advertisements to generate revenue that keeps the platform free." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-card border border-border p-4">
              <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Commitment */}
      <div className="mt-12 rounded-3xl border border-border bg-card p-10 sm:p-14">
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
              "Your files are processed using JavaScript running directly in your browser — they are not uploaded to any server.",
              "We have no access to the content of your documents. We technically cannot read your files because we never receive them.",
              "No account is required, which means we collect no personal information from you whatsoever.",
              "Any temporary browser memory used during processing is released when you close the tool or navigate away.",
              "We do not use your documents for machine learning, AI training, or any purpose other than completing the task you requested.",
              "We display Google AdSense advertisements. Google may use cookies to personalise ads. You can opt out at Google's Ads Settings.",
              "Our platform is GDPR-compliant. We do not sell or share your personal data with third parties for advertising or any other purpose.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            Read our full{" "}
            <Link to="/privacy" className="text-primary underline hover:text-primary/80">Privacy Policy</Link>{" "}
            for complete details, including our Google AdSense and Google Analytics disclosures.
          </p>
        </div>
      </div>

      {/* Tools Summary */}
      <div className="mt-20">
        <h2 className="font-display text-3xl font-bold text-center mb-4">What SmartPDFMasters Can Do</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Ten free tools covering every common PDF task — all available immediately without signup or installation.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolSummary.map((tool) => (
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
      <div className="mt-20">
        <div className="rounded-3xl bg-gradient-primary p-10 sm:p-14 relative overflow-hidden text-center">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Questions or Feedback?
            </h2>
            <p className="text-primary-foreground/85 max-w-xl mx-auto mb-8 leading-relaxed">
              We read every message. If you have a question about how a tool works, a privacy concern, a suggestion for a new feature, or feedback on our guides, we want to hear from you.
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
