import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: "Our Authors — SmartPDFMasters" },
      { name: "description", content: "Meet the writers and researchers behind SmartPDFMasters guides and tutorials — document management, PDF security, and productivity specialists." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/authors" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Our Authors — SmartPDFMasters",
        url: "https://www.smartpdfmasters.com/authors",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [
            { "@type": "Person", name: "Sara Khalil", jobTitle: "Content Director & PDF Workflow Specialist" },
            { "@type": "Person", name: "Mohamed Adel", jobTitle: "Product Lead & Technical Content Writer" },
            { "@type": "Person", name: "Layla Hassan", jobTitle: "Privacy & Security Researcher" },
            { "@type": "Person", name: "Daniel Park", jobTitle: "Technology Analyst & Comparative Reviewer" },
          ],
        },
      }),
    }],
  }),
  component: AuthorsPage,
});

const authors = [
  {
    name: "Sara Khalil",
    role: "Content Director & PDF Workflow Specialist",
    experience: "7 years",
    bio: "Sara has seven years of experience writing technical documentation and educational content about document management, PDF workflows, and productivity tools. She oversees all editorial content on SmartPDFMasters and personally tests each workflow on multiple devices before publishing.",
  },
  {
    name: "Mohamed Adel",
    role: "Product Lead & Technical Content Writer",
    experience: "5 years",
    bio: "Mohamed has five years of experience in software product management and technical writing. He is responsible for the tool experience, user-facing copy, and the step-by-step guides on each SmartPDFMasters tool page.",
  },
  {
    name: "Layla Hassan",
    role: "Privacy & Security Researcher",
    experience: "6 years",
    bio: "Layla has six years of experience in data privacy research, GDPR compliance, and document security. She reviews all privacy-related content on SmartPDFMasters and writes our security-focused guides on password protection, redaction, and secure document sharing.",
  },
  {
    name: "Daniel Park",
    role: "Technology Analyst & Comparative Reviewer",
    experience: "4 years",
    bio: "Daniel has four years of experience researching and evaluating productivity software, PDF tools, and AI document applications. He writes our comparative guides and technology explainers based on hands-on testing rather than marketing materials.",
  },
];

function AuthorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Our Authors</h1>
      <p>The writers and researchers behind every SmartPDFMasters guide and tutorial. Each author specialises in a specific area of document management, and every guide is tested hands-on before publication.</p>

      {authors.map((author) => (
        <div key={author.name} className="my-6 p-5 border rounded-lg not-prose">
          <h2 className="text-xl font-bold">{author.name}</h2>
          <p className="text-sm text-primary font-medium">{author.role}</p>
          <p className="text-xs text-muted-foreground mt-0.5 mb-2">{author.experience} experience</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{author.bio}</p>
        </div>
      ))}

      <h2>Editorial Standards</h2>
      <p>All content on SmartPDFMasters is written to be accurate, practical, and free of unsupported claims. Every method described has been personally tested by the author on multiple devices. If you spot an error or have a correction, contact us through the <Link to="/contact">Contact page</Link>.</p>

      <p>For more on how we research, test, and publish our guides, see our <Link to="/editorial-policy">Editorial Policy</Link>.</p>
    </div>
  );
}
