import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SmartPDFMasters" },
      { name: "description", content: "Terms of Service for SmartPDFMasters. Read the terms governing your use of our free browser-based PDF tools." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Terms of Service</h1>
      <p><strong>Last updated:</strong> July 28, 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using SmartPDFMasters (www.smartpdfmasters.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the site.</p>

      <h2>2. Description of Service</h2>
      <p>SmartPDFMasters provides free, browser-based tools for merging, compressing, rotating, splitting, deleting pages from, watermarking, and converting PDF files. All ten tools process files locally in your browser — your files are not uploaded to our servers.</p>

      <h2>3. Use of Services</h2>
      <p>You agree to use our tools for lawful purposes only. You may not use our tools to process, distribute, or create content that is illegal, infringes on intellectual property rights, contains malware, or violates the rights of any third party.</p>

      <h2>4. No Account Required</h2>
      <p>SmartPDFMasters does not require account creation. All tools are available immediately without registration.</p>

      <h2>5. Intellectual Property</h2>
      <p>All content on this site, including text, graphics, logos, and the tool interfaces, is owned by SmartPDFMasters unless otherwise stated. You retain full ownership of any files you process using our tools.</p>

      <h2>6. Advertising</h2>
      <p>SmartPDFMasters displays advertisements through Google AdSense to keep the platform free. By using the site, you agree to the display of these advertisements.</p>

      <h2>7. Disclaimer of Warranties</h2>
      <p>Our tools are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the tools will be error-free, uninterrupted, or fit for any particular purpose.</p>

      <h2>8. Limitation of Liability</h2>
      <p>SmartPDFMasters is not liable for any indirect, incidental, or consequential damages arising from the use of our services, including but not limited to loss of data, loss of profits, or business interruption.</p>

      <h2>9. Changes to These Terms</h2>
      <p>We may update these Terms of Service from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.</p>

      <h2>10. Governing Law</h2>
      <p>These terms are governed by applicable international standards for online services. Any disputes will be handled in accordance with the laws applicable to the service provider.</p>

      <h2>11. Contact</h2>
      <p>Questions about these terms? Contact us at shekokamal7775@gmail.com or through our Contact page.</p>
    </div>
  );
}
