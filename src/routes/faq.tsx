import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Common Questions About SmartPDFTools" },
      { name: "description", content: "Answers to the most common questions about SmartPDFTools: pricing, security, file size limits, AI tools and more." },
      { property: "og:title", content: "Frequently Asked Questions — SmartPDFTools" },
      { property: "og:description", content: "Everything you need to know about pricing, security, file limits and AI tools." },
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
  { q: "Is SmartPDFTools really free?", a: "Yes — all 16 PDF tools are free to use with files up to 10 MB and 3 tasks per hour. Premium unlocks unlimited usage, larger files and AI features." },
  { q: "Are my files secure?", a: "Absolutely. All uploads are encrypted with TLS 1.3 in transit, processed in isolated containers, and permanently deleted within one hour. We never read your file content." },
  { q: "Do I need to install anything?", a: "No. Every tool runs in your browser. We also offer optional desktop apps for Mac, Windows and Linux on Premium plans." },
  { q: "What's the maximum file size?", a: "Free users can upload files up to 10 MB. Premium supports up to 5 GB per file." },
  { q: "Which file formats do you support?", a: "PDF, DOCX, DOC, XLSX, XLS, PPTX, PPT, JPG, PNG, HEIC, TIFF and more." },
  { q: "Do the AI tools work in Arabic?", a: "Yes — our AI summary, chat and translation tools support over 100 languages including Arabic, with right-to-left layout preserved." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel any plan with a single click — no calls, no questions. Your account stays on the free plan." },
  { q: "Do you offer team or business plans?", a: "Yes. Business plans include team management for up to 50 users, SSO, API access, custom branding and a dedicated account manager." },
  { q: "Is there an API?", a: "Yes, available on Business plans. RESTful endpoints for every tool, with generous rate limits and webhook support." },
  { q: "Are you GDPR compliant?", a: "Yes. We're fully GDPR compliant, hosted in EU data centres for European customers, and SOC 2 Type II certification is in progress." },
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
