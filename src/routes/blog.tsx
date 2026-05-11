import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts, blogCategories } from "@/lib/blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — PDF Tutorials, AI Tools & Productivity | SmartPDFTools" },
      { name: "description", content: "Tutorials, productivity tips, AI updates and best practices for working with PDFs and document management." },
      { property: "og:title", content: "SmartPDFTools Blog" },
      { property: "og:description", content: "PDF tutorials, AI tools, productivity tips and document security guides." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [cat, setCat] = useState<string>("All");
  const posts = cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);
  const featured = blogPosts[0];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">From the blog</h1>
        <p className="mt-4 text-muted-foreground">Tutorials, productivity guides and the latest in AI-powered document tools.</p>
      </div>

      {/* Featured */}
      <Link to="/blog/$slug" params={{ slug: featured.slug }}
        className="mt-14 grid lg:grid-cols-2 gap-8 rounded-3xl border border-border bg-gradient-card p-6 shadow-soft hover:shadow-elegant transition-smooth group">
        <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-secondary">
          <img src={featured.cover} alt={featured.title} loading="lazy" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wide text-primary">{featured.category}</span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight">{featured.title}</h2>
          <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
          <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Read article <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </span>
        </div>
      </Link>

      {/* Filters */}
      <div className="mt-14 flex flex-wrap justify-center gap-2">
        {["All", ...blogCategories].map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-smooth ${
              cat === c ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "bg-secondary hover:bg-accent"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <motion.div key={p.slug}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Link to="/blog/$slug" params={{ slug: p.slug }}
              className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
              </div>
              <div className="flex-1 p-6">
                <span className="text-xs font-bold uppercase tracking-wide text-primary">{p.category}</span>
                <h3 className="mt-2 font-display text-lg font-bold leading-tight group-hover:text-primary transition-smooth">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{p.author}</span>·<span>{p.readTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
