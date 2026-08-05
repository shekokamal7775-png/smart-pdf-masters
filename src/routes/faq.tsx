import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Frequently Asked Questions About SmartPDFMasters" },
      { name: "description", content: "Answers to the most common questions about SmartPDFMasters: security, file size limits, supported formats, rotating PDFs, splitting PDFs and all six free tools." },
      { name: "keywords", content: "SmartPDFMasters FAQ, PDF tools questions, free PDF tools help, PDF security questions" },
      { property: "og:title", content: "Frequently Asked Questions — SmartPDFMasters" },
      { property: "og:description", content: "Everything you need to know about SmartPDFMasters — security, file limits, supported formats and all six free tools." },
      { property: "og:url", content: "https://www.smartpdfmasters.com/faq" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQPage,
});

const faqs = [
  {
    q: "Is SmartPDFMasters really free?",
    a: "Yes — all six tools (Merge PDF, Compress PDF, Rotate PDF, Split PDF, PDF to Word, and PNG to PDF) are completely free to use with no daily limits, no sign-up required, and no watermarks added to your files.",
  },
  {
    q: "How many PDF tools does SmartPDFMasters offer?",
    a: "SmartPDFMasters currently offers six free tools: Merge PDF, Compress PDF, Rotate PDF, Split PDF, PDF to Word, and PNG to PDF. All six tools run entirely in your browser.",
  },
  {
    q: "Are my files secure?",
    a: "Yes. All processing happens directly in your browser — your files never leave your device. Any temporary browser memory is released when you close the tool. We never read, store, or share your file content.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Every tool runs entirely in your browser. Nothing to download or install on any device — desktop, tablet, or mobile.",
  },
  {
    q: "What is the maximum file size?",
    a: "There is no fixed file size limit for most tools. Very large files may take longer to process depending on your device and browser. For best results with very large PDFs, try compressing the file first using our free Compress PDF tool.",
  },
  {
    q: "Which file formats do you support?",
    a: "Our tools support PDF, DOCX, JPG, and PNG. Merge PDF accepts multiple PDF files. Compress PDF reduces PDF size. Rotate PDF fixes page orientation. Split PDF divides PDFs into separate files. PDF to Word converts PDF to DOCX. PNG to PDF converts JPG and PNG images to PDF.",
  },
  {
    q: "How do I rotate PDF pages?",
    a: "Open the Rotate PDF tool, upload your PDF file, choose your rotation angle — 90°, 180°, or 270° — and click Rotate & Download. All pages in the PDF are rotated permanently so the correct orientation is saved into the file.",
  },
  {
    q: "How do I split a PDF into separate files?",
    a: "Open the Split PDF tool, upload your PDF, and enter the page ranges you want as separate files (for example: 1-3,5,7-9). Leave the field empty to split every page into its own individual file. Each range downloads as a separate PDF.",
  },
  {
    q: "Does processing happen on my device or a server?",
    a: "Core processing runs directly in your browser — your files never leave your device. This is what makes SmartPDFMasters fast, private, and secure.",
  },
  {
    q: "How long are my files stored?",
    a: "Your files are never stored on any server because all processing happens in your browser. There is no server-side retention period to worry about.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. All six tools work on iPhone, Android, tablet and desktop without needing an app. Just open smartpdfmasters.com in your mobile browser.",
  },
  {
    q: "Does SmartPDFMasters display advertisements?",
    a: "Yes. SmartPDFMasters displays Google AdSense advertisements to generate revenue that keeps the platform free for everyone. Google may use cookies to personalise ad content based on your browsing history. You can opt out of personalised advertising at Google's Ads Settings.",
  },
  {
    q: "Is SmartPDFMasters GDPR compliant?",
    a: "Yes. We do not store user files, do not track file content, and do not share personal data with third parties for advertising or any other purpose. Our Privacy Policy contains full details of our data handling practices.",
  },
  {
    q: "How do I contact support?",
    a: "You can reach us through the Contact page at smartpdfmasters.com/contact. We aim to respond to all messages within one business day.",
  },
];

function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">

      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
          Help Centre
        </span>
        <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">
          Questions, answered
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Everything you need to know about SmartPDFMasters — our tools, privacy practices, and how everything works.
          Can't find what you're looking for?{" "}
          <Link to="/contact" className="text-primary hover:underline">Get in touch</Link>.
        </p>
      </div>

      {/* Quick links */}
      <div className="mt-10 flex flex-wrap justify-center gap-2 mb-10">
        {[
          { label: "Merge PDF", slug: "merge-pdf" },
          { label: "Compress PDF", slug: "compress-pdf" },
          { label: "Rotate PDF", slug: "rotate-pdf" },
          { label: "Split PDF", slug: "split-pdf" },
          { label: "PDF to Word", slug: "pdf-to-word" },
          { label: "PNG to PDF", slug: "jpg-to-pdf" },
        ].map((tool) => (
          <Link
            key={tool.slug}
            to="/tools/$slug"
            params={{ slug: tool.slug }}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
          >
            {tool.label}
          </Link>
        ))}
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`q${i}`}
            className="rounded-2xl border border-border bg-card px-6 shadow-soft"
          >
            <AccordionTrigger className="font-display text-base font-semibold hover:no-underline text-start py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <h2 className="font-display text-xl font-bold mb-2">Still have a question?</h2>
        <p className="text-muted-foreground text-sm mb-4">
          We read every message and respond within one business day.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:-translate-y-0.5 transition-all"
        >
          Contact Us
        </Link>
      </div>

    </div>
  );
}
