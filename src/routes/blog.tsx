import { createFileRoute } from "@tanstack/react-router";

const blogPosts = [
  {
    slug: "the-10-best-pdf-tools-online-in-2026",
    title: "The 10 Best PDF Tools Online in 2026",
    category: "PDF Tutorials",
    author: "Sara Khalil",
    date: "May 8, 2026",
    readTime: "8 min read",
    description: "We tested 40+ PDF platforms and ranked the absolute best for converting, editing, signing and securing your documents.",
    image: "/edit-pdf-banner.png",
  },
  {
    slug: "how-to-convert-pdf-to-word-without-losing-formatting",
    title: "How to Convert PDF to Word (Without Losing Formatting)",
    category: "File Conversion",
    author: "Mohamed Adel",
    date: "May 5, 2026",
    readTime: "5 min read",
    description: "A 2-minute tutorial that preserves fonts, tables, columns and images — even from scanned documents.",
  },
  {
    slug: "how-to-compress-pdf-files-without-losing-quality",
    title: "How to Compress PDF Files Without Losing Quality",
    category: "PDF Tutorials",
    author: "Layla Hassan",
    date: "April 28, 2026",
    readTime: "4 min read",
    description: "Shrink huge PDFs by up to 90% — perfect for email attachments and faster uploads.",
  },
  {
    slug: "ai-pdf-tools-explained-whats-real-and-whats-hype",
    title: "AI PDF Tools Explained: What's Real and What's Hype",
    category: "AI Tools",
    author: "Daniel Park",
    date: "April 20, 2026",
    readTime: "7 min read",
    description: "Chat with PDFs, summarise reports, extract tables — here's how AI is actually changing document workflows.",
  },
  {
    slug: "the-7-best-free-pdf-editors-in-2026",
    title: "The 7 Best Free PDF Editors in 2026",
    category: "Productivity Tips",
    author: "Sara Khalil",
    date: "April 15, 2026",
    readTime: "6 min read",
    description: "Edit text, add images, sign and annotate without paying a cent. Here's what works.",
  },
  {
    slug: "secure-pdf-management-a-practical-guide",
    title: "Secure PDF Management: A Practical Guide",
    category: "Online Security",
    author: "Mohamed Adel",
    date: "April 10, 2026",
    readTime: "9 min read",
    description: "Protect sensitive documents with passwords, encryption, redaction and digital signatures.",
  },
  {
    slug: "edit-pdf-free-guide",
    title: "How to Edit a PDF for Free in 2026 – The Complete Guide",
    category: "PDF Tutorials",
    author: "Sara Khalil",
    date: "June 20, 2026",
    readTime: "6 min read",
    description: "Learn how to edit a PDF for free online. Step-by-step guide for students and professionals.",
  },
];

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
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">From the blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tutorials, productivity guides and the latest in AI-powered document tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <a 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl"
          >
            {post.image && (
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{post.category}</span>
                <span>·</span>
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary">
                Read article
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
