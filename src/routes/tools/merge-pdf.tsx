import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Zap, Cloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolProcessor } from "@/components/ToolProcessor";
import { ToolCard } from "@/components/ToolCard";
import { getTool, tools } from "@/lib/tools";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/tools/merge-pdf")({
  loader: () => {
    const tool = getTool("merge-pdf");
    if (!tool) throw notFound();
    return {
      tool: {
        slug: tool.slug,
        category: tool.category,
        title: tool.title,
        desc: tool.desc,
        seoDesc: tool.seoDesc,
      },
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Tool not found" }] };
    const { tool } = loaderData;
    return {
      meta: [
        { title: `${tool.title.en} — Free Online | SmartPDFTools` },
        { name: "description", content: tool.seoDesc.en },
        { property: "og:title", content: `${tool.title.en} — SmartPDFTools` },
        { property: "og:description", content: tool.seoDesc.en },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.title.en,
            description: tool.seoDesc.en,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        },
      ],
    };
  },
  component: ToolPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Tool not found</h1>
      <Link to="/tools" className="mt-6 inline-block text-primary hover:underline">
        ← Back to all tools
      </Link>
    </div>
  ),
});

function ToolPage() {
  const { tool: loaderTool } = Route.useLoaderData();
  const tool = getTool(loaderTool.slug) ?? loaderTool;
  const { t, lang } = useI18n();
  const Icon = "icon" in tool ? tool.icon : FileText;
  const related = tools
    .filter((x) => x.category === tool.category && x.slug !== tool.slug)
    .slice(0, 4);

  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            to="/tools"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />{" "}
            {lang === "ar" ? "كل الأدوات" : "All tools"}
          </Link>
          <div className="text-center">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${tool.bg} ${tool.color} shadow-soft`}
            >
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-tight">
              {tool.title[lang]}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{tool.desc[lang]}</p>
          </div>

          <div className="mt-10">
            <ToolProcessor slug={tool.slug} />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Zap, label: lang === "ar" ? "نتائج فورية" : "Instant results" },
              { icon: ShieldCheck, label: lang === "ar" ? "تشفير 256 بت" : "256-bit encryption" },
              { icon: Cloud, label: lang === "ar" ? "حذف تلقائي" : "Auto-delete in 1h" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3"
              >
                <f.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="font-display text-2xl font-bold">
            {lang === "ar" ? `حول أداة ${tool.title.ar}` : `About the ${tool.title.en} tool`}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{tool.seoDesc[lang]}</p>
        </div>

        {/* روابط المقالات */}
        <div className="mt-8 p-6 bg-muted rounded-2xl">
          <h3 className="text-xl font-bold mb-4">📚 Learn More About PDF Tools</h3>
          <ul className="space-y-2">
            <li>
              <a href="/blog/best-pdf-tools-online-2026" className="text-blue-600 hover:underline">
                The 10 Best PDF Tools Online in 2026
              </a>
            </li>
            <li>
              <a href="/blog/how-to-compress-pdf-files" className="text-blue-600 hover:underline">
                How to Compress PDF Files Without Losing Quality
              </a>
            </li>
            <li>
              <a href="/blog/how-to-convert-pdf-to-word" className="text-blue-600 hover:underline">
                How to Convert PDF to Word (Without Losing Formatting)
              </a>
            </li>
          </ul>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display text-xl font-bold mb-4">
              {lang === "ar" ? "أدوات ذات صلة" : "Related tools"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => (
                <ToolCard key={r.slug} tool={r} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
          }
