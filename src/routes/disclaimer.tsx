import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Disclaimer</h1>
      <p><strong>Last updated:</strong> June 28, 2026</p>
      
      <h2>General Information</h2>
      <p>SmartPDFTools provides online PDF tools for informational and educational purposes. While we strive for accuracy, we make no warranties about the completeness or reliability of our tools.</p>
      
      <h2>No Professional Advice</h2>
      <p>Our tools are not a substitute for professional advice. For legal, financial, or technical matters, consult a qualified professional.</p>
      
      <h2>External Links</h2>
      <p>Our site may contain links to external websites. We are not responsible for the content or privacy practices of these sites.</p>
      
      <h2>File Security</h2>
      <p>While we take security seriously, we recommend not uploading sensitive documents. Files are automatically deleted within 1 hour.</p>
      
      <h2>Contact</h2>
      <p>Questions? Contact us at shekokamal7775@gmail.com</p>
    </div>
  );
}
