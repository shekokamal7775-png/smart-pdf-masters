import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, Globe, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SmartPDFTools — Our Mission & Story" },
      { name: "description", content: "SmartPDFTools is a free, browser-based PDF workspace. Learn about our mission, privacy commitment, and the tools we offer." },
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
          SmartPDFTools is a free, browser-based platform for fast and secure PDF solutions.
          Merge, compress, convert and manage PDF files from any device — no installation required.
        </p>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 gap-6">
        {[
          { icon: Heart, title: "Built for everyone", body: "From students to enterprise teams, our tools work the same: fast, free, and straightforward." },
          { icon: ShieldCheck, title: "Privacy first", body: "All uploads are encrypted in transit and deleted within one hour. We never read your file content." },
          { icon: Globe, title: "Works everywhere", body: "Browser-based and fully responsive. No installation needed — works on desktop, tablet and mobile." },
          { icon: Users, title: "Simple and reliable", body: "Four focused tools that cover the most common PDF tasks, built to work correctly every time." },
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
          SmartPDFTools was built to solve a simple problem — having to visit multiple different websites just to merge, compress and convert a single PDF file.
          We built one clean workspace that handles the most common PDF tasks quickly, privately and for free, so you can get back to what actually matters.
        </p>
      </div>
    </div>
  );
}
