import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, Globe, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SmartPDFTools — Our Mission & Story" },
      { name: "description", content: "SmartPDFTools is an all-in-one PDF workspace trusted by 12 million users. Learn about our mission, team and security commitments." },
      { property: "og:title", content: "About SmartPDFTools" },
      { property: "og:description", content: "Our mission: make every PDF task effortless, fast and secure for everyone." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">Documents that just work</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          SmartPDFTools is an all-in-one online platform for powerful and easy PDF solutions.
          Convert, merge, compress, split, edit, and manage PDF files quickly and securely from any device — backed by AI when you need it.
        </p>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 gap-6">
        {[
          { icon: Heart, title: "Built for everyone", body: "From students to Fortune 500 teams, our tools work the same: fast, free, and friendly." },
          { icon: ShieldCheck, title: "Privacy first", body: "All uploads are encrypted in transit and deleted within one hour. We never read your file content." },
          { icon: Globe, title: "Works everywhere", body: "Browser-based and responsive. No install needed — and Arabic, English and 30+ other languages out of the box." },
          { icon: Users, title: "12 million strong", body: "We process over 850 million files a year for individuals, freelancers, agencies and enterprises." },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
              <b.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-3xl bg-gradient-card border border-border p-10 sm:p-14">
        <h2 className="font-display text-3xl font-bold">Our story</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          SmartPDFTools started in 2022 as a side project to fix one annoying problem — bouncing between five different sites just to convert, compress and sign a single contract.
          Today we power document workflows for individuals, agencies and enterprises in over 180 countries, and we're just getting started with AI-powered document understanding.
        </p>
      </div>
    </div>
  );
}
