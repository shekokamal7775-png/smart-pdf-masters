import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/authors")({
  component: AuthorsPage,
});

function AuthorsPage() {
  const authors = [
    { name: "Sara Khalil", role: "Senior Writer", bio: "Tech writer specializing in productivity and document management. Sara has 5 years of experience in the SaaS industry." },
    { name: "Mohamed Adel", role: "Content Strategist", bio: "Expert in file conversion and digital workflows. Mohamed helps users simplify complex document processes." },
    { name: "Layla Hassan", role: "SEO Specialist", bio: "Layla ensures our content reaches the right audience through smart SEO strategies." },
    { name: "Daniel Park", role: "Tech Editor", bio: "Daniel reviews and edits all technical content to ensure accuracy and clarity." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Our Authors</h1>
      <p>Meet the team behind SmartPDFTools content.</p>
      
      {authors.map((author) => (
        <div key={author.name} className="my-6 p-4 border rounded-lg">
          <h2 className="text-xl font-bold">{author.name}</h2>
          <p className="text-sm text-muted-foreground">{author.role}</p>
          <p>{author.bio}</p>
        </div>
      ))}
      
      <h2>Join Our Team</h2>
      <p>Interested in writing for SmartPDFTools? Contact us at shekokamal7775@gmail.com</p>
    </div>
  );
}
