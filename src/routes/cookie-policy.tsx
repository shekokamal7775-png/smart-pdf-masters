import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — SmartPDFMasters" },
      { name: "description", content: "Cookie Policy for SmartPDFMasters. Learn how we use cookies for analytics, preferences, and Google AdSense advertising." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/cookie-policy" }],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Cookie Policy</h1>
      <p><strong>Last updated:</strong> July 28, 2026</p>

      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help sites remember your preferences and understand how visitors use the site.</p>

      <h2>How We Use Cookies</h2>
      <ul>
        <li><strong>Analytics cookies:</strong> We use Google Analytics to understand anonymised visitor behaviour — pages visited, time on site, and general location — so we can improve our tools and content.</li>
        <li><strong>Preference cookies:</strong> We use cookies to remember your language and theme (light or dark mode) preferences between visits.</li>
        <li><strong>Advertising cookies:</strong> We use Google AdSense, which may set cookies to display relevant advertisements based on your browsing behaviour.</li>
      </ul>

      <h2>Third-Party Cookies</h2>
      <p>We use Google Analytics and Google AdSense, both of which may set their own cookies in accordance with Google's own privacy practices. For details on how Google uses this data, see Google's Privacy & Terms at policies.google.com.</p>

      <h2>Cookies and File Processing</h2>
      <p>Cookies used on SmartPDFMasters are unrelated to your file processing. All ten tools process your PDF and image files directly in your browser — no cookie is used to store or transmit your file content.</p>

      <h2>Managing Cookies</h2>
      <p>You can control or disable cookies at any time through your browser settings. You can opt out of personalised Google advertising at google.com/settings/ads. Disabling cookies will not prevent you from using any of our PDF tools, but may affect site preferences like theme and language.</p>

      <h2>Contact</h2>
      <p>Questions about our cookie use? Contact us at shekokamal7775@gmail.com or through our Contact page.</p>
    </div>
  );
}
