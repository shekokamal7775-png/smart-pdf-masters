import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — SmartPDFTools | Free, Premium and Business Plans" },
      { name: "description", content: "Simple, transparent pricing. Free forever for basics. Premium and Business plans unlock unlimited file size, batch processing and AI tools." },
      { property: "og:title", content: "Pricing — SmartPDFTools" },
      { property: "og:description", content: "Free, Premium and Business plans. Unlock unlimited PDFs, batch tools and AI features." },
    ],
  }),
  component: PricingPage,
});

const plans = (yearly: boolean) => [
  {
    name: "Free",
    price: 0,
    desc: "Perfect for occasional use",
    features: ["All 16 PDF tools", "Files up to 10 MB", "3 tasks per hour", "Basic OCR", "Web access"],
    cta: "Start free",
    variant: "outline" as const,
  },
  {
    name: "Premium",
    price: yearly ? 4 : 6,
    badge: "Most popular",
    desc: "For professionals and freelancers",
    features: ["Everything in Free", "Files up to 5 GB", "Unlimited tasks", "Advanced OCR (100+ languages)", "AI summaries & chat", "Desktop apps", "Priority support"],
    cta: "Go Premium",
    variant: "hero" as const,
  },
  {
    name: "Business",
    price: yearly ? 9 : 12,
    desc: "For teams and organisations",
    features: ["Everything in Premium", "Team management (up to 50 users)", "Single sign-on (SSO)", "API access", "Custom branding", "Audit logs", "Dedicated account manager"],
    cta: "Contact sales",
    variant: "outline" as const,
  },
];

function PricingPage() {
  const { lang } = useI18n();
  const [yearly, setYearly] = useState(true);
  const ps = plans(yearly);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" /> {lang === "ar" ? "وفّر 33% بالسنوي" : "Save 33% with yearly billing"}
        </span>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tight">
          {lang === "ar" ? "أسعار بسيطة وشفافة" : "Simple, transparent pricing"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {lang === "ar" ? "ابدأ مجاناً. ارقَ عندما تحتاج المزيد. ألغِ في أي وقت." : "Start free. Upgrade when you need more. Cancel anytime."}
        </p>
        <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-secondary p-1">
          {[
            { label: lang === "ar" ? "شهري" : "Monthly", on: !yearly },
            { label: lang === "ar" ? "سنوي" : "Yearly", on: yearly },
          ].map((b, i) => (
            <button key={i} onClick={() => setYearly(i === 1)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-smooth ${b.on ? "bg-background shadow-soft" : "text-muted-foreground"}`}>
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {ps.map((p) => (
          <div key={p.name} className={`relative rounded-3xl border p-8 ${p.badge ? "border-primary/40 bg-gradient-card shadow-elegant lg:scale-105" : "border-border bg-card shadow-soft"}`}>
            {p.badge && (
              <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-elegant">
                {p.badge}
              </span>
            )}
            <h3 className="font-display text-2xl font-bold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-extrabold">${p.price}</span>
              <span className="text-sm text-muted-foreground">/{lang === "ar" ? "شهر" : "mo"}</span>
            </div>
            <Button variant={p.variant} className="mt-6 w-full" size="lg">{p.cta}</Button>
            <ul className="mt-8 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-3xl bg-secondary/40 p-10 text-center max-w-3xl mx-auto">
        <div className="flex justify-center">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
        </div>
        <p className="mt-4 font-display text-xl">"We saved $11k a year by replacing three legacy PDF tools with SmartPDFTools Business."</p>
        <p className="mt-3 text-sm text-muted-foreground">Sandra K., Director of Operations · Helix Logistics</p>
      </div>
    </div>
  );
}
