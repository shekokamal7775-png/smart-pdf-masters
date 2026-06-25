import { blogPosts } from "../../src/lib/blog";

export default defineEventHandler(() => {
  const staticUrls = [
    { loc: "https://www.smartpdfmasters.com/", priority: "1.0" },
    { loc: "https://www.smartpdfmasters.com/about", priority: "0.8" },
    { loc: "https://www.smartpdfmasters.com/contact", priority: "0.8" },
    { loc: "https://www.smartpdfmasters.com/blog", priority: "0.9" },
  ];

  const blogUrls = blogPosts.map((post) => ({
    loc: `https://www.smartpdfmasters.com/blog/${post.slug}`,
    lastmod: post.date,
    priority: "0.8",
  }));

  const allUrls = [...staticUrls, ...blogUrls];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
