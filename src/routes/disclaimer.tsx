import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — SmartPDFMasters" },
      { name: "description", content: "Disclaimer for SmartPDFMasters. Important information about the use of our free PDF tools and content on this site." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Disclaimer</h1>
      <p><strong>Last updated:</strong> July 28, 2026</p>

      <h2>General Information</h2>
      <p>SmartPDFMasters provides free online PDF tools and educational content for informational purposes. While we test every tool and verify every guide before publishing, we make no warranties about the completeness, accuracy, or reliability of our tools or content.</p>

      <h2>No Professional Advice</h2>
      <p>Content on SmartPDFMasters — including our security, privacy, and document management guides — is provided for general informational purposes and is not a substitute for professional legal, financial, or technical advice. For matters involving regulated documents, legal contracts, or sensitive data, consult a qualified professional.</p>

      <h2>Tool Accuracy</h2>
      <p>Our PDF tools are built to process files accurately, but results can vary depending on the original document's structure, fonts, and formatting. Always review the output of any tool before relying on it for important documents.</p>

      <h2>External Links</h2>
      <p>Our site and articles may contain links to external websites, including Google, Mozilla, W3C, and other authoritative sources cited for reference. We are not responsible for the content, accuracy, or privacy practices of external sites.</p>

      <h2>File Security</h2>
      <p>All ten SmartPDFMasters tools process files directly in your browser — your files are never uploaded to our servers. While this design means we cannot access your file content, we still recommend caution when processing highly sensitive documents on any online tool.</p>

      <h2>Advertising Disclosure</h2>
      <p>SmartPDFMasters displays advertisements through Google AdSense to keep our tools free for everyone. We do not control the specific ads shown and are not responsible for the content of third-party advertisements.</p>

      <h2>Contact</h2>
      <p>Questions about this disclaimer? Contact us at shekokamal7775@gmail.com or through our Contact page.</p>
    </div>
  );
}
