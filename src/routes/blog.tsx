import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — PDF Tutorials, AI Tools & Productivity | SmartPDFTools" },
      { name: "description", content: "Tutorials, productivity tips, AI updates and best practices for working with PDFs and document management." },
      { property: "og:title", content: "SmartPDFTools Blog" },
      { property: "og:description", content: "PDF tutorials, AI tools, productivity tips and document security guides." },
    ],
  }),
  component: () => <Outlet />,
});
