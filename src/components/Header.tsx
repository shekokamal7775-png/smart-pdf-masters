import { Link, useRouter } from "@tanstack/react-router";
import { FileText, Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useI18n();
  const router = useRouter();

  const navLinks = [
    { label: t("nav.tools"), to: "/tools" },
    { label: t("nav.blog"), to: "/blog" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.faq"), to: "/faq" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
              <FileText className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              Smart<span className="text-primary">PDF</span>Masters
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
                activeProps={{ className: "px-3 py-2 rounded-lg text-sm font-medium text-foreground bg-accent" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/tools">
              <Button variant="hero" size="sm" className="ms-1">
                {t("nav.getStarted") || "Get started"}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleLang}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
                activeProps={{ className: "flex w-full px-3 py-2.5 rounded-lg text-sm font-medium text-foreground bg-accent" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link to="/tools" onClick={() => setOpen(false)}>
                <Button variant="hero" size="sm" className="w-full">
                  {t("nav.getStarted") || "Get started"}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
