import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookie-policy")({
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Cookie Policy</h1>
      <p><strong>Last updated:</strong> June 28, 2026</p>
      
      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device that help us improve your experience on SmartPDFTools.</p>
      
      <h2>How We Use Cookies</h2>
      <ul>
        <li><strong>Analytics:</strong> We use Google Analytics to understand how visitors interact with our site.</li>
        <li><strong>Preferences:</strong> We use cookies to remember your language and tool preferences.</li>
        <li><strong>Advertising:</strong> We may use cookies to show relevant ads through Google AdSense.</li>
      </ul>
      
      <h2>Third-Party Cookies</h2>
      <p>We use Google Analytics and Google AdSense, which may set their own cookies. For more information, see Google's Privacy Policy.</p>
      
      <h2>Managing Cookies</h2>
      <p>You can control cookies through your browser settings. Disabling cookies may affect some features of our site.</p>
      
      <h2>Contact</h2>
      <p>Questions? Contact us at shekokamal7775@gmail.com</p>
    </div>
  );
}
