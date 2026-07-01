import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/authors")({
  component: AuthorsPage,
});

function AuthorsPage() {
  const authors = [
    { name: "Sara Khalil", role: "Writer", bio: "Covers PDF tools, productivity workflows and document management for everyday users." },
    { name: "Mohamed Adel", role: "Writer", bio: "Focuses on file conversion, digital document processes and practical how-to guides." },
    { name: "Layla Hassan", role: "Writer", bio: "Writes about PDF security, compression and tools for mobile and browser-based workflows." },
    { name: "Daniel Park", role: "Writer", bio: "Covers AI document tools, technical editing and emerging trends in document management." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Our Authors</h1>
      <p>The writers behind SmartPDFTools guides and tutorials.</p>

      {authors.map((author) => (
        <div key={author.name} className="my-6 p-4 border rounded-lg">
          <h2 className="text-xl font-bold">{author.name}</h2>
          <p className="text-sm text-muted-foreground">{author.role}</p>
          <p>{author.bio}</p>
        </div>
      ))}

      <h2>Editorial standards</h2>
      <p>All content on SmartPDFTools is written to be accurate, practical and free of unsupported claims. If you spot an error or have a correction, contact us through the Contact page.</p>
    </div>
  );
}
