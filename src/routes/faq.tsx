import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Common Questions About SmartPDFTools" },
      { name: "description", content: "Answers to the most common questions about SmartPDFTools: security, file size limits, supported formats and more." },
      { property: "og:title", content: "Frequently Asked Questions — SmartPDFTools" },
      { property: "og:description", content: "Everything you need to know about security, file limits and supported formats." },
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
  { q: "Is SmartPDFTools really free?", a: "Yes — all four tools (Merge PDF, Compress PDF, PDF to Word, and PNG to PDF) are completely free to use with no daily limits, no sign-up required, and no watermarks." },
  { q: "Are my files secure?", a: "Yes. All uploads are encrypted in transit and deleted within one hour of processing. We never read, store, or share your file content." },
  { q: "Do I need to install anything?", a: "No. Every tool runs entirely in your browser. Nothing to download or install on any device." },
  { q: "What is the maximum file size?", a: "There is no fixed file size limit for most tools. Very large files may take longer to process depending on your internet connection and device." },
  { q: "Which file formats do you support?", a: "Our tools support PDF, DOCX, JPG, and PNG. Merge PDF accepts multiple PDF files, Compress PDF reduces PDF size, PDF to Word converts PDF to DOCX, and PNG to PDF converts JPG and PNG images to PDF." },
  { q: "Does processing happen on my device or a server?", a: "Core processing runs directly in your browser whenever possible, which means your files never leave your device. This is what makes SmartPDFTools fast and private." },
  { q: "How long are my files stored?", a: "Any temporary files are deleted automatically within one hour of processing. We do not retain copies of your documents." },
  { q: "Does it work on mobile?", a: "Yes. All tools work on iPhone, Android, tablet and desktop without needing an app. Just open the site in your mobile browser." },
  { q: "Is SmartPDFTools GDPR compliant?", a: "Yes. We do not store user files beyond one hour, do not track file content, and do not share data with third parties." },
  { q: "How do I contact support?", a: "You can reach us through the Contact page. We aim to respond to all messages within one business day." },
];

function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">Questions, answered</h1>
        <p className="mt-4 text-muted-foreground">Can't find what you're looking for? Get in touch on the contact page.</p>
      </div>
      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`q${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-soft">
            <AccordionTrigger className="font-display text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
