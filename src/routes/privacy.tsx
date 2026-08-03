import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SmartPDFMasters" },
      { name: "description", content: "SmartPDFMasters privacy policy. Learn how we handle your data, files, and personal information. We process all files in your browser and never store your documents." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated: July 28, 2026
        </p>
      </div>

      <div className="space-y-10 text-foreground/80 leading-relaxed">

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
          <p>
            Welcome to SmartPDFMasters ("we," "our," or "us"). SmartPDFMasters is a free, browser-based PDF tools platform available at <strong>www.smartpdfmasters.com</strong>. This Privacy Policy explains how we collect, use, and protect information when you use our website and tools.
          </p>
          <p className="mt-3">
            By using SmartPDFMasters, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of the site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>

          <h3 className="font-semibold text-lg text-foreground mb-2">2.1 Files You Upload</h3>
          <p>
            All PDF and image files you upload to SmartPDFMasters are processed <strong>entirely in your browser</strong> using JavaScript. Your files are never transmitted to our servers, never stored on our infrastructure, and never accessed by our team. The processing happens locally on your device. Once you close the browser tab or navigate away, all file data is immediately discarded from browser memory.
          </p>

          <h3 className="font-semibold text-lg text-foreground mt-5 mb-2">2.2 Usage Data</h3>
          <p>
            We use Google Analytics to collect anonymised usage data including pages visited, time spent on the site, browser type, operating system, and general geographic location (country level). This data helps us understand how visitors use SmartPDFMasters so we can improve the tools and content. No personally identifiable information is collected through Google Analytics.
          </p>

          <h3 className="font-semibold text-lg text-foreground mt-5 mb-2">2.3 Cookies</h3>
          <p>
            SmartPDFMasters uses cookies for the following purposes:
          </p>
          <ul className="mt-3 space-y-2 list-none">
            {[
              "Analytics cookies — used by Google Analytics to track anonymised visitor behaviour and site usage statistics.",
              "Advertising cookies — used by Google AdSense to serve relevant advertisements to visitors. These cookies may track browsing behaviour across websites to personalise ad content.",
              "Preference cookies — used to remember your theme preference (light or dark mode) and language setting between sessions.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            You can control or disable cookies through your browser settings. Disabling advertising cookies will not remove advertisements from the site but will result in less personalised ad content.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Google AdSense and Advertising</h2>
          <p>
            SmartPDFMasters uses <strong>Google AdSense</strong> to display advertisements. Google AdSense is an advertising service provided by Google LLC. When you visit our website, Google AdSense may use cookies and similar technologies to:
          </p>
          <ul className="mt-3 space-y-2 list-none">
            {[
              "Display advertisements relevant to your interests based on your browsing history.",
              "Measure the effectiveness of advertisements shown on our site.",
              "Prevent you from seeing the same advertisement too frequently.",
              "Understand which advertisements you have interacted with.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            Google's use of advertising cookies enables it and its partners to serve ads based on your visits to SmartPDFMasters and other sites on the internet. You may opt out of personalised advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Google's Ads Settings
            </a>{" "}
            or by visiting{" "}
            <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              www.aboutads.info
            </a>.
          </p>
          <p className="mt-4">
            For more information about how Google uses data collected through AdSense, please review{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Google's Privacy & Terms
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Google Analytics</h2>
          <p>
            We use Google Analytics, a web analytics service provided by Google LLC, to help us understand how visitors use SmartPDFMasters. Google Analytics uses cookies to collect anonymised information about your visit, including pages viewed, time on site, and general location data.
          </p>
          <p className="mt-3">
            Google Analytics data is processed by Google in accordance with their privacy policy. We do not combine Google Analytics data with any personally identifiable information. You can opt out of Google Analytics tracking by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">5. How We Use Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="mt-3 space-y-2 list-none">
            {[
              "Improve the tools, content, and user experience on SmartPDFMasters.",
              "Understand which tools and articles are most useful to our visitors.",
              "Display relevant advertisements through Google AdSense.",
              "Monitor site performance and identify technical issues.",
              "Comply with legal obligations.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">6. Data Sharing and Third Parties</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. We share anonymised, aggregated usage data with:
          </p>
          <ul className="mt-3 space-y-2 list-none">
            {[
              "Google LLC — for Google Analytics (anonymised usage statistics) and Google AdSense (advertising).",
              "Vercel Inc. — our hosting provider, which serves the website files to your browser.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            We do not share file content — your documents are never transmitted to any third party.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">7. Your Rights (GDPR)</h2>
          <p>
            If you are located in the European Economic Area (EEA) or United Kingdom, you have the following rights under GDPR:
          </p>
          <ul className="mt-3 space-y-2 list-none">
            {[
              "Right to access — you can request information about what data we hold about you.",
              "Right to erasure — you can request deletion of any personal data we hold.",
              "Right to object — you can object to the processing of your data for marketing or advertising purposes.",
              "Right to data portability — you can request a copy of your data in a machine-readable format.",
              "Right to withdraw consent — you can withdraw consent for cookies at any time through your browser settings.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us through our{" "}
            <a href="/contact" className="text-primary underline hover:text-primary/80">Contact page</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
          <p>
            SmartPDFMasters is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided personal information through our site, please contact us and we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">9. Security</h2>
          <p>
            We take reasonable technical measures to protect the information we collect. All connections to SmartPDFMasters are encrypted using TLS (HTTPS). Since your files are processed locally in your browser and never transmitted to our servers, the security risk to your document content is minimised by design.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">10. Links to Other Websites</h2>
          <p>
            Our articles and tool pages may contain links to external websites for reference and further reading. These external sites have their own privacy policies and we are not responsible for their content or practices. We encourage you to review the privacy policy of any external site you visit.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make significant changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of SmartPDFMasters after changes are made constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, how we handle your data, or your rights under applicable privacy laws, please contact us:
          </p>
          <div className="mt-4 rounded-2xl border border-border bg-card p-6">
            <p><strong>SmartPDFMasters</strong></p>
            <p className="mt-1">Website: <a href="https://www.smartpdfmasters.com" className="text-primary underline">www.smartpdfmasters.com</a></p>
            <p className="mt-1">Contact: <a href="/contact" className="text-primary underline">www.smartpdfmasters.com/contact</a></p>
          </div>
        </section>

      </div>
    </div>
  );
}
