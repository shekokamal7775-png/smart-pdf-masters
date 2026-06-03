import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getPost, blogPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found" }] };
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | SmartPDFTools Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.cover },
        { property: "og:type", content: "article" },
        { name: "twitter:image", content: post.cover },
      ],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          image: post.cover,
          author: { "@type": "Person", name: post.author },
          datePublished: post.date,
          publisher: { "@type": "Organization", name: "SmartPDFTools" },
        }),
      }],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-primary hover:underline">← Back to the blog</Link>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Back to blog
      </Link>
      <span className="text-xs font-bold uppercase tracking-wide text-primary">{post.category}</span>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
        <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
        <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
      </div>
      <img src={post.cover} alt={post.title} loading="lazy" className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-soft" />

      <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none mt-10
        prose-headings:font-display prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-10
        prose-a:text-primary prose-a:font-semibold prose-strong:text-foreground">
        {post.content.split("\n\n").map((block: string, i: number) => {
          const ctaMatch = block.match(/^\[\[cta:([a-z0-9-]+)\|([^\]]+)\]\]$/);
          if (ctaMatch) {
            const [, slug, label] = ctaMatch;
            return (
              <div key={i} className="not-prose my-8 flex justify-center">
                <Link
                  to="/tools/$slug"
                  params={{ slug }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-elegant hover:shadow-glow hover:-translate-y-0.5 transition-smooth"
                >
                  {label}
                  <ArrowLeft className="h-4 w-4 rotate-180 rtl:rotate-0" />
                </Link>
              </div>
            );
          }
          if (block.startsWith("## ")) return <h2 key={i}>{renderInline(block.slice(3))}</h2>;
          if (block.startsWith("- ") || /^\d+\./.test(block)) {
            const items = block.split("\n");
            const ordered = /^\d+\./.test(items[0]);
            return ordered
              ? <ol key={i}>{items.map((li: string, j: number) => <li key={j}>{renderInline(li.replace(/^\d+\.\s*/, ""))}</li>)}</ol>
              : <ul key={i}>{items.map((li: string, j: number) => <li key={j}>{renderInline(li.replace(/^- /, ""))}</li>)}</ul>;
          }
          return <p key={i}>{renderInline(block)}</p>;
        })}
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <h3 className="font-display text-2xl font-bold mb-6">Continue reading</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }}
                className="group rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elegant transition-smooth">
                <img src={r.cover} alt={r.title} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <div className="p-5">
                  <span className="text-xs font-bold uppercase text-primary">{r.category}</span>
                  <h4 className="mt-2 font-display font-bold group-hover:text-primary">{r.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
