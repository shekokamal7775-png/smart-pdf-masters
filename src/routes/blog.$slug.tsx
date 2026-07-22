import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight, BookOpen, Zap, Shield, Star } from "lucide-react";
import { Fragment } from "react";
import { getPost, blogPosts } from "@/lib/blog";
import { tools } from "@/lib/tools";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) return { meta: [{ title: "Post Not Found — SmartPDFMasters" }] };
    return {
      meta: [
        { title: post.metaTitle || post.title },
        { name: "description", content: post.metaDescription || post.excerpt },
        { name: "keywords", content: post.keywords?.join(", ") || "" },
        { name: "author", content: post.author },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: post.metaTitle || post.title },
        { property: "og:description", content: post.metaDescription || post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: post.cover },
        { property: "og:url", content: `https://www.smartpdfmasters.com/blog/${post.slug}` },
        { property: "og:site_name", content: "SmartPDFMasters" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.metaTitle || post.title },
        { name: "twitter:description", content: post.metaDescription || post.excerpt },
        { name: "twitter:image", content: post.cover },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        { property: "article:tag", content: post.keywords?.join(", ") || "" },
      ],
      links: [
        { rel: "canonical", href: `https://www.smartpdfmasters.com/blog/${post.slug}` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            image: post.cover,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "SmartPDFMasters",
              url: "https://www.smartpdfmasters.com",
              logo: { "@type": "ImageObject", url: "https://www.smartpdfmasters.com/favicon.png" },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.smartpdfmasters.com/blog/${post.slug}`,
            },
            keywords: post.keywords?.join(", ") || "",
            articleSection: post.category,
            inLanguage: "en-US",
          }),
        },
        ...(extractFAQs(post.content).length > 0 ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: extractFAQs(post.content).map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }] : []),
      ],
    };
  },
  component: BlogPostPage,
});

function extractFAQs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split("\n");
  let inFAQ = false;
  let currentQuestion = "";
  let currentAnswer = "";
  for (const line of lines) {
    if (line.includes("Frequently Asked Questions")) { inFAQ = true; continue; }
    if (!inFAQ) continue;
    if (line.startsWith("**") && line.endsWith("**") && line.includes("?")) {
      if (currentQuestion && currentAnswer) faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
      currentQuestion = line.replace(/\*\*/g, "").trim();
      currentAnswer = "";
    } else if (currentQuestion && line.trim() && !line.startsWith("#") && !line.startsWith("[[")) {
      currentAnswer += " " + line.trim();
    }
  }
  if (currentQuestion && currentAnswer) faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
  return faqs;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const [, label, url] = match;
    if (url.startsWith("/")) {
      parts.push(
        <Link key={key++} to={url} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors font-medium">
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a key={key++} href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors font-medium">
          {label}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length === 1 ? parts[0] : <Fragment>{parts}</Fragment>;
}

function parseBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return renderInline(text);
  return (
    <Fragment>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-foreground">{renderInline(part.slice(2, -2))}</strong>;
        }
        return <Fragment key={i}>{renderInline(part)}</Fragment>;
      })}
    </Fragment>
  );
}

function renderContent(content: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const lines = content.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    // CTA blocks
    if (line.startsWith("[[cta:")) {
      const match = line.match(/\[\[cta:([^|]+)\|([^\]]+)\]\]/);
      if (match) {
        const [, slug, label] = match;
        const href = slug === "tools" ? "/tools" : `/tools/${slug}`;
        nodes.push(
          <div key={key++} className="my-8 not-prose">
            <Link to={href}
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200">
              <Zap className="h-4 w-4" />
              {label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );
      }
      i++; continue;
    }

    // H1
    if (line.startsWith("# ")) {
      nodes.push(
        <h1 key={key++} className="font-display text-3xl sm:text-4xl font-extrabold mt-10 mb-5 tracking-tight text-foreground leading-tight">
          {parseBold(line.slice(2))}
        </h1>
      );
      i++; continue;
    }

    // H2
    if (line.startsWith("## ")) {
      nodes.push(
        <h2 key={key++} className="font-display text-2xl sm:text-3xl font-bold mt-12 mb-5 text-foreground border-b-2 border-primary/20 pb-3 flex items-center gap-2">
          <span className="inline-block w-1 h-7 rounded-full bg-gradient-primary flex-shrink-0" />
          {parseBold(line.slice(3))}
        </h2>
      );
      i++; continue;
    }

    // H3
    if (line.startsWith("### ")) {
      nodes.push(
        <h3 key={key++} className="font-display text-xl font-bold mt-8 mb-3 text-foreground flex items-center gap-2">
          <span className="inline-block w-1.5 h-5 rounded-full bg-primary/60 flex-shrink-0" />
          {parseBold(line.slice(4))}
        </h3>
      );
      i++; continue;
    }

    // H4
    if (line.startsWith("#### ")) {
      nodes.push(
        <h4 key={key++} className="font-display text-lg font-semibold mt-6 mb-2 text-foreground">
          {parseBold(line.slice(5))}
        </h4>
      );
      i++; continue;
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines
        .filter(l => !l.match(/^\|[-| ]+\|$/))
        .map(l => l.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim()));
      if (rows.length > 0) {
        nodes.push(
          <div key={key++} className="my-8 overflow-x-auto rounded-2xl border border-border shadow-soft not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-primary text-primary-foreground">
                  {rows[0].map((cell, ci) => (
                    <th key={ci} className="px-5 py-3.5 text-left font-semibold text-sm">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} className={`border-t border-border/50 ${ri % 2 === 0 ? "bg-card" : "bg-secondary/20"} hover:bg-primary/5 transition-colors`}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-5 py-3 text-foreground/80">{parseBold(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Unordered list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <ul key={key++} className="my-5 space-y-2.5 not-prose">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-foreground/80 leading-relaxed text-[15px]">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-sm" />
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      nodes.push(
        <ol key={key++} className="my-5 space-y-2.5 not-prose">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-foreground/80 leading-relaxed text-[15px]">
              <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                {idx + 1}
              </span>
              <span className="pt-0.5">{parseBold(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // FAQ bold questions
    if (line.startsWith("**") && line.endsWith("**") && line.includes("?")) {
      nodes.push(
        <p key={key++} className="mt-7 mb-1.5 font-semibold text-foreground text-base">
          {parseBold(line.replace(/^\*\*|\*\*$/g, ""))}
        </p>
      );
      i++; continue;
    }

    // Regular paragraph
    nodes.push(
      <p key={key++} className="my-4 text-foreground/80 leading-relaxed text-[15.5px]">
        {parseBold(line)}
      </p>
    );
    i++;
  }

  return nodes;
}

// Tools sidebar widget
function ToolsSidebar() {
  return (
    <div className="sticky top-24 space-y-4">
      {/* Tools CTA */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-sm">Free PDF Tools</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Process your PDF files instantly — no signup, no watermarks, completely free.
        </p>
        <div className="space-y-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                to="/tools/$slug"
                params={{ slug: tool.slug }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-md ${tool.bg} ${tool.color} flex-shrink-0`}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                {tool.title.en}
                <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
        <Link
          to="/tools"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-200"
        >
          <Zap className="h-3.5 w-3.5" />
          Browse All Tools
        </Link>
      </div>

      {/* Trust badges */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
        <h3 className="font-display font-bold text-xs text-muted-foreground uppercase tracking-wide">Why SmartPDFMasters</h3>
        {[
          { icon: Shield, label: "100% Secure Processing" },
          { icon: Zap, label: "Instant Browser-Based" },
          { icon: Star, label: "No Signup Required" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <Icon className="h-4 w-4 text-primary flex-shrink-0" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <ArrowLeft className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="font-display text-3xl font-bold">Article not found</h1>
        <p className="text-muted-foreground">This article does not exist or has been moved.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const allRelated = blogPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  const displayRelated = relatedPosts.length >= 2 ? relatedPosts : allRelated;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* ── MAIN CONTENT ── */}
        <article className="flex-1 min-w-0 max-w-3xl">

          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wide">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
            <span className="font-semibold text-foreground">{post.author}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />{post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />{post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />{post.category}
            </span>
          </div>

          {/* Cover image */}
          {post.cover && (
            <div className="mb-10 overflow-hidden rounded-2xl border border-border shadow-soft">
              <img
                src={post.cover}
                alt={`${post.title} — SmartPDFMasters guide`}
                className="w-full aspect-[16/9] object-cover"
                loading="eager"
                width="1200"
                height="675"
              />
            </div>
          )}

          {/* Keywords */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.keywords.slice(0, 8).map((kw) => (
                <span key={kw} className="rounded-full border border-border bg-secondary/50 px-3 py-0.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* Excerpt highlight box */}
          <div className="mb-8 rounded-2xl border-l-4 border-primary bg-primary/5 px-6 py-4">
            <p className="text-base font-medium text-foreground/90 leading-relaxed italic">
              {post.excerpt}
            </p>
          </div>

          {/* Quick Tools Banner */}
          <div className="mb-10 rounded-2xl border border-border bg-gradient-to-r from-secondary/50 to-secondary/20 p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              🛠 Free tools mentioned in this article
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    to="/tools/$slug"
                    params={{ slug: tool.slug }}
                    className={`inline-flex items-center gap-1.5 rounded-lg ${tool.bg} ${tool.color} px-3 py-1.5 text-xs font-semibold hover:opacity-80 transition-opacity`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                    {tool.title.en}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Article content */}
          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-primary p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                Ready to work with your PDFs?
              </h3>
              <p className="text-primary-foreground/85 text-sm mb-6">
                All six tools are completely free — no signup, no watermarks, no limits.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/tools"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-6 py-3 text-sm font-bold shadow-elegant hover:shadow-glow hover:-translate-y-0.5 transition-all">
                  <Zap className="h-4 w-4" />
                  Browse All Free Tools
                </Link>
                <Link to="/blog"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
                  <BookOpen className="h-4 w-4" />
                  More Guides
                </Link>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {displayRelated.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="font-display text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {displayRelated.map((related) => (
                  <Link key={related.slug} to="/blog/$slug" params={{ slug: related.slug }}
                    className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <img
                      src={related.cover}
                      alt={`${related.title} — SmartPDFMasters`}
                      className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="400"
                      height="225"
                    />
                    <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-primary">{related.category}</span>
                      <h3 className="text-sm font-semibold leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />{related.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-12 text-center">
            <Link to="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:shadow-elegant hover:border-primary/30 transition-all">
              <ArrowLeft className="h-4 w-4" /> Back to All Articles
            </Link>
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <ToolsSidebar />
        </aside>
      </div>
    </div>
  );
}
