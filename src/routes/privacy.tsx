import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Cookie, Database, Mail, Lock, FileText } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SmartPDFTools" },
      { name: "description", content: "Learn how SmartPDFTools collects, uses, and protects your personal information, including cookies, analytics, and AdSense disclosures." },
      { property: "og:title", content: "Privacy Policy — SmartPDFTools" },
      { property: "og:description", content: "How SmartPDFTools handles your data, cookies, analytics, and third-party advertising." },
      { property: "og:url", content: "https://www.smartpdfmasters.com/privacy" },
    links: [
      { rel: "canonical", href: "https://smart-pdf-masters.lovable.app/privacy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const updated = "May 31, 2026";
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
      </div>

      <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-foreground/90">
        <Section icon={FileText} title="1. Introduction">
          <p>
            Welcome to <strong>SmartPDFTools</strong> (“we”, “us”, “our”). We respect your privacy and are
            committed to protecting your personal data. This Privacy Policy explains how we collect, use,
            and safeguard information when you visit{" "}
            <a href="https://smart-pdf-masters.lovable.app" className="text-primary hover:underline">
              smart-pdf-masters.lovable.app
            </a>{" "}
            and use our online PDF tools.
          </p>
        </Section>

        <Section icon={Database} title="2. Information We Collect">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Files you upload:</strong> processed only to perform the requested task (merge, split, convert, etc.).</li>
            <li><strong>Usage data:</strong> pages visited, browser type, device, language, referring URL, and approximate location.</li>
            <li><strong>Contact data:</strong> name, email, and message you submit through our Contact form.</li>
            <li><strong>Cookies & similar technologies:</strong> see the Cookies section below.</li>
          </ul>
        </Section>

        <Section icon={Lock} title="3. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, operate, and improve our PDF tools and services.</li>
            <li>To respond to your inquiries and customer support requests.</li>
            <li>To analyze website traffic and improve user experience.</li>
            <li>To display relevant advertising and measure ad performance.</li>
            <li>To comply with legal obligations and prevent abuse.</li>
          </ul>
        </Section>

        <Section icon={Shield} title="4. File Processing & Security">
          <p>
            Uploaded files are transmitted over encrypted HTTPS connections and processed automatically.
            Files are <strong>automatically deleted from our servers within a few hours</strong> after
            processing. We never read, share, or sell the content of your documents.
          </p>
        </Section>

        <Section icon={Cookie} title="5. Cookies & Tracking Technologies">
          <p>
            We use cookies and similar technologies to remember your preferences, measure traffic, and
            serve advertisements. You can disable cookies in your browser settings, but some features
            may not work properly.
          </p>
        </Section>

        <Section icon={Database} title="6. Google AdSense & Third-Party Advertising">
          <p>
            We use <strong>Google AdSense</strong> to display advertisements. Google and its partners
            use cookies to serve ads based on your prior visits to this and other websites.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Google uses the <strong>DoubleClick DART cookie</strong> to serve ads based on your visits to our site and other sites.</li>
            <li>You may opt out of personalized advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>.
            </li>
            <li>Learn more about{" "}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">how Google uses information from sites that use its services</a>.
            </li>
            <li>You can also opt out of third-party vendor use of cookies at{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutads.info/choices</a>.
            </li>
          </ul>
        </Section>

        <Section icon={Database} title="7. Google Analytics">
          <p>
            We use <strong>Google Analytics</strong> to understand how visitors interact with our website.
            Google Analytics collects anonymized data such as IP address, browser type, and pages viewed.
            You can opt out using the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </Section>

        <Section icon={Shield} title="8. Your Rights (GDPR & CCPA)">
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Access, update, or delete your personal data.</li>
            <li>Object to or restrict certain processing of your data.</li>
            <li>Withdraw consent for data processing at any time.</li>
            <li>Lodge a complaint with a data protection authority.</li>
          </ul>
        </Section>

        <Section icon={Shield} title="9. Children's Privacy">
          <p>
            Our services are not directed to children under 13. We do not knowingly collect personal
            information from children. If you believe a child has provided us with personal data,
            please contact us so we can remove it.
          </p>
        </Section>

        <Section icon={FileText} title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date.
          </p>
        </Section>

        <Section icon={Mail} title="11. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please{" "}
            <Link to="/contact" className="text-primary hover:underline">contact us</Link>{" "}
            or email <a href="mailto:shekokamal7775@gmail.com" className="text-primary hover:underline">shekokamal7775@gmail.com</a>.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-soft">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-display text-xl font-bold">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
