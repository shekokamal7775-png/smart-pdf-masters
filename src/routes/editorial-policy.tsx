import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy — SmartPDFMasters" },
      { name: "description", content: "Editorial Policy for SmartPDFMasters. Learn about our content standards, accuracy commitment, and how we test every guide we publish." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/editorial-policy" }],
  }),
  component: EditorialPolicyPage,
});

function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Editorial Policy</h1>
      <p><strong>Last updated:</strong> July 28, 2026</p>

      <h2>Our Mission</h2>
      <p>SmartPDFMasters provides accurate, practical, and unbiased information about PDF tools and document management. Every guide is written to genuinely help someone complete a task — not to rank in search engines with thin, generic content.</p>

      <h2>Content Standards</h2>
      <ul>
        <li><strong>Accuracy:</strong> Every method described in our guides is personally tested by a team member on at least two devices before publication.</li>
        <li><strong>Independence:</strong> Our content is not influenced by advertisers. We display Google AdSense ads to keep the platform free, but ad placement never affects what we write or recommend.</li>
        <li><strong>Transparency:</strong> We disclose our use of Google AdSense and Google Analytics clearly in our Privacy Policy and Cookie Policy.</li>
        <li><strong>Currency:</strong> Guides are reviewed and updated when tools, browsers, or operating systems change in ways that affect the instructions.</li>
        <li><strong>Sourcing:</strong> We link to authoritative external sources — Google, Mozilla, W3C, Wikipedia, and official documentation — rather than citing only our own content as evidence.</li>
      </ul>

      <h2>Comparative Reviews</h2>
      <p>Comparative guides, such as our review of free PDF tools versus Adobe Acrobat, are based on hands-on testing of every tool discussed, not on marketing materials or press releases.</p>

      <h2>Tool Testing</h2>
      <p>Every one of our ten PDF tools is tested across multiple browsers (Chrome, Safari, Firefox, Edge) and devices (Windows, Mac, iPhone, Android) before release and after any significant update.</p>

      <h2>Corrections Policy</h2>
      <p>If you find an error, an outdated instruction, or a broken method in any of our guides, please contact us. We review every correction request and update content promptly when an issue is confirmed.</p>

      <h2>Contact</h2>
      <p>Questions about our editorial process? Contact us at shekokamal7775@gmail.com or through our Contact page.</p>
    </div>
  );
}
