import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/ToolCard";
import { tools, categories, type ToolCategory } from "@/lib/tools";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "PDF Tools — Merge, Compress, PDF to Word, PNG to PDF" },
      { name: "description", content: "Use four focused PDF tools for free: merge PDF, compress PDF, convert PDF to Word, and convert PNG or JPG images to PDF." },
      { property: "og:title", content: "Four Free PDF Tools | SmartPDFTools" },
      { property: "og:description", content: "Merge, compress, PDF to Word, and PNG to PDF — fast browser-based tools." },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ToolCategory | "all">("all");

  const filtered = tools.filter((tt) =>
    (cat === "all" || tt.category === cat) &&
    (q === "" || tt.title[lang].toLowerCase().includes(q.toLowerCase()) || tt.desc[lang].toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
          {t("tools.heading")}
        </h1>
        <p className="mt-4 text-muted-foreground">{t("tools.subheading")}</p>
      </div>

      <div className="mt-10 max-w-xl mx-auto relative">
        <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={lang === "ar" ? "ابحث عن أداة..." : "Search for a tool..."}
          className="h-12 ps-11 rounded-full shadow-soft"
        />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setCat("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-smooth ${
            cat === "all" ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "bg-secondary hover:bg-accent"
          }`}
        >
          {lang === "ar" ? "الكل" : "All"}
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-smooth ${
              cat === c.id ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "bg-secondary hover:bg-accent"
            }`}
          >
            {c[lang]}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((tt, i) => <ToolCard key={tt.slug} tool={tt} index={i} />)}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">No tools match your search.</p>
      )}
    </div>
  );
}
