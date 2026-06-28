import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Terms of Service</h1>
      <p><strong>Last updated:</strong> June 28, 2026</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>By using SmartPDFTools, you agree to these terms.</p>
      
      <h2>2. Use of Services</h2>
      <p>You agree to use our tools for lawful purposes only. You may not use our tools to distribute malware, spam, or illegal content.</p>
      
      <h2>3. Intellectual Property</h2>
      <p>All content on this site, including text, graphics, logos, and tools, is owned by SmartPDFTools.</p>
      
      <h2>4. Disclaimer</h2>
      <p>Our tools are provided "as is" without warranties of any kind. We are not responsible for any damages resulting from use of our tools.</p>
      
      <h2>5. Limitation of Liability</h2>
      <p>SmartPDFTools is not liable for any indirect, incidental, or consequential damages arising from use of our services.</p>
      
      <h2>6. Changes to Terms</h2>
      <p>We may update these terms at any time. Continued use of our services constitutes acceptance of the updated terms.</p>
      
      <h2>7. Contact</h2>
      <p>Questions? Contact us at shekokamal7775@gmail.com</p>
    </div>
  );
}
