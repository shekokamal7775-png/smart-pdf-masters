import { Link } from "@tanstack/react-router";
import { FileText, Twitter, Facebook, Linkedin, Instagram, Github } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { tools } from "@/lib/tools";
import { Newsletter } from "@/components/Newsletter";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  const groups = [
    {
      title: t("footer.product"),
      links: [
        { label: t("nav.tools"), to: "/tools" },
        { label: t("nav.pricing"), to: "/pricing" },
        ...tools.slice(0, 4).map((x) => ({ label: x.title[lang], to: `/tools/${x.slug}` })),
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("nav.about"), to: "/about" },
        { label: t("nav.contact"), to: "/contact" },
        { label: t("nav.blog"), to: "/blog" },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { label: t("nav.faq"), to: "/faq" },
        { label: t("nav.blog"), to: "/blog" },
        { label: "API docs", to: "/contact" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: "Privacy", to: "/about" },
        { label: "Terms", to: "/about" },
        { label: "Security", to: "/about" },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Newsletter />

        <div className="grid gap-12 py-16 lg:grid-cols-6">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
                <FileText className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold">
                Smart<span className="text-primary">PDF</span>Tools
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">{t("footer.tagline")}</p>
            <div className="flex gap-2">
              {[Twitter, Facebook, Linkedin, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" aria-label="social"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-background text-muted-foreground hover:text-primary hover:shadow-soft transition-smooth">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="font-semibold text-sm mb-3">{g.title}</h4>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {year} SmartPDFTools. {t("footer.rights")}</p>
          <p>Made with care for documents that work.</p>
        </div>
      </div>
    </footer>
  );
}
