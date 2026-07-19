import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Common Questions About SmartPDFMasters" },
      { name: "description", content: "Answers to the most common questions about SmartPDFMasters: security, file size limits, supported formats, rotating PDFs, splitting PDFs and more." },
      { property: "og:title", content: "Frequently Asked Questions — SmartPDFMasters" },
      { property: "og:description", content: "Everything you need to know about SmartPDFMasters — security, file limits, supported formats and all six free tools." },
    ],
    links: [
      { rel: "canonical", href: "https://www.smartpdfmasters.com/faq" },
    ],
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
    a: "Yes. All processing happens directly in your browser whenever possible, which means your files never leave your device. Any temporary server files are deleted automatically within one hour. We never read, store permanently, or share your file content.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Every tool runs entirely in your browser. Nothing to download or install on any device — desktop, tablet, or mobile.",
  },
  {
    q: "What is the maximum file size?",
    a: "There is no fixed file size limit for most tools. Very large files may take longer to process depending on your device and browser. For best results with very large PDFs, try compressing the file first using our Compress PDF tool.",
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
    a: "Core processing runs directly in your browser whenever possible, which means your files never leave your device. This is what makes SmartPDFMasters fast and private.",
  },
  {
    q: "How long are my files stored?",
    a: "Any temporary files are deleted automatically within one hour of processing. We do not retain copies of your documents beyond this period.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. All six tools work on iPhone, Android, tablet and desktop without needing an app. Just open smartpdfmasters.com in your mobile browser.",
  },
  {
    q: "Is SmartPDFMasters GDPR compliant?",
    a: "Yes. We do not store user files beyond one hour, do not track file content, and do not share data with third parties. All core processing runs in your browser with no server involvement wherever possible.",
  },
  {
    q: "How do I contact support?",
    a: "You can reach us through the Contact page at smartpdfmasters.com/contact. We aim to respond to all messages within one business day.",
  },
];

function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">Questions, answered</h1>
        <p className="mt-4 text-muted-foreground">
          Can't find what you're looking for?{" "}
          <a href="/contact" className="text-primary hover:underline">Get in touch</a>.
        </p>
      </div>
      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`q${i}`}
            className="rounded-2xl border border-border bg-card px-6 shadow-soft"
          >
            <AccordionTrigger className="font-display text-base font-semibold hover:no-underline text-start">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
