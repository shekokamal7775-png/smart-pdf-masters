import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Fragment } from "react";
import { getPost, blogPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) return { meta: [{ title: "Post Not Found" }] };
    return {
      meta: [
        { title: post.metaTitle || post.title },
        { name: "description", content: post.metaDescription || post.excerpt },
        { name: "keywords", content: post.keywords?.join(", ") || "" },
        { property: "og:title", content: post.metaTitle || post.title },
        { property: "og:description", content: post.metaDescription || post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: post.cover },
        { property: "og:url", content: `https://www.smartpdfmasters.com/blog/${post.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.metaTitle || post.title },
        { name: "twitter:description", content: post.metaDescription || post.excerpt },
        { name: "twitter:image", content: post.cover },
        { name: "author", content: post.author },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
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
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "SmartPDFMasters",
              url: "https://www.smartpdfmasters.com",
            },
            datePublished: post.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.smartpdfmasters.com/blog/${post.slug}`,
            },
            keywords: post.keywords?.join(", ") || "",
          }),
        },
        ...(post.content.includes("## Frequently Asked Questions") ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: extractFAQs(post.content).map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
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
    if (line.includes("Frequently Asked Questions")) {
      inFAQ = true;
      continue;
    }
    if (!inFAQ) continue;

    if (line.startsWith("**") && line.endsWith("**") && line.includes("?")) {
      if (currentQuestion && currentAnswer) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
      }
      currentQuestion = line.replace(/\*\*/g, "").trim();
      currentAnswer = "";
    } else if (currentQuestion && line.trim() && !line.startsWith("#") && !line.startsWith("[[")) {
      currentAnswer += " " + line.trim();
    }
  }

  if (currentQuestion && currentAnswer) {
    faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
  }

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
          <div key={key++} className="my-8 flex justify-center">
            <Link to={href}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth">
              {label} →
            </Link>
          </div>
        );
      }
      i++; continue;
    }

    // H1
    if (line.startsWith("# ")) {
      nodes.push(<h1 key={key++} className="font-display text-3xl sm:text-4xl font-bold mt-10 mb-4 tracking-tight">{renderInline(line.slice(2))}</h1>);
      i++; continue;
    }

    // H2
    if (line.startsWith("## ")) {
      nodes.push(<h2 key={key++} className="font-display text-2xl font-bold mt-10 mb-4 text-foreground border-b border-border pb-2">{renderInline(line.slice(3))}</h2>);
      i++; continue;
    }

    // H3
    if (line.startsWith("### ")) {
      nodes.push(<h3 key={key++} className="font-display text-xl font-semibold mt-8 mb-3 text-foreground">{renderInline(line.slice(4))}</h3>);
      i++; continue;
    }

    // H4
    if (line.startsWith("#### ")) {
      nodes.push(<h4 key={key++} className="font-display text-lg font-semibold mt-6 mb-2 text-foreground">{renderInline(line.slice(5))}</h4>);
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
          <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-gradient-primary text-primary-foreground">
                <tr>{rows[0].map((cell, ci) => <th key={ci} className="px-4 py-3 text-left font-semibold">{cell}</th>)}</tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                    {row.map((cell, ci) => <td key={ci} className="px-4 py-3 text-foreground/80">{renderInline(cell)}</td>)}
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
        <ul key={key++} className="my-4 space-y-2 pl-6">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-foreground/80 leading-relaxed">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <span>{renderInline(item.replace(/^\*\*(.*)\*\*/, "$1"))}</span>
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
        <ol key={key++} className="my-4 space-y-2 pl-6 list-none">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
              <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {idx + 1}
              </span>
              <span className="pt-0.5">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Bold FAQ questions
    if (line.startsWith("**") && line.endsWith("**") && line.includes("?")) {
      nodes.push(
        <p key={key++} className="mt-6 mb-1 font-semibold text-foreground text-base">
          {renderInline(line.replace(/^\*\*|\*\*$/g, ""))}
        </p>
      );
      i++; continue;
    }

    // Paragraph
    nodes.push(
      <p key={key++} className="my-4 text-foreground/80 leading-relaxed text-[15px]">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return nodes;
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <h1 className="font-display text-3xl font-bold">Tool not found</h1>
        <Link to="/blog" className="text-primary hover:underline flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to all tools
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      {/* Category badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wide">
          <Tag className="h-3 w-3" />
          {post.category}
        </span>
      </div>

      {/* Title — H1 for SEO */}
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-6">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
        <span className="font-medium text-foreground">{post.author}</span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />{post.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />{post.readTime}
        </span>
      </div>

      {/* Cover image */}
      {post.cover && (
        <div className="mb-10 overflow-hidden rounded-2xl border border-border shadow-soft">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Keywords tags */}
      {post.keywords && post.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.keywords.map((kw) => (
            <span key={kw} className="rounded-full border border-border bg-secondary/50 px-3 py-0.5 text-xs text-muted-foreground">
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="prose-content">
        {renderContent(post.content)}
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="font-display text-xl font-bold mb-6">Related Articles</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link key={related.slug} to={`/blog/${related.slug}`}
                className="group rounded-xl border border-border bg-card p-4 hover:shadow-elegant hover:-translate-y-0.5 transition-smooth">
                <img
                  src={related.cover}
                  alt={related.title}
                  className="w-full aspect-[16/9] object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <p className="text-xs text-primary font-semibold uppercase mb-1">{related.category}</p>
                <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {related.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{related.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to blog */}
      <div className="mt-12 text-center">
        <Link to="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:shadow-elegant transition-smooth">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    </article>
  );
}
