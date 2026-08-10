import { Link } from "@tanstack/react-router";
import { FileText, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { toggleLang, t } = useI18n();

  const navLinks = [
    { label: t("nav.tools"), to: "/tools" },
    { label: t("nav.blog"), to: "/blog" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.faq"), to: "/faq" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-2 sm:gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-sm sm:text-lg font-bold tracking-tight whitespace-nowrap">
              Smart<span className="text-primary">PDF</span>Masters
            </span>
          </Link>

          {/* Everything else — nav links + language + theme + CTA, all in one row */}
          <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 sm:gap-2 w-max ms-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth whitespace-nowrap"
                  activeProps={{ className: "px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-foreground bg-accent whitespace-nowrap" }}
                >
                  {link.label}
                </Link>
              ))}

              <span className="mx-1 h-5 w-px bg-border flex-shrink-0" aria-hidden="true" />

              <button
                onClick={toggleLang}
                className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
                aria-label="Toggle language"
              >
                <Languages className="h-4 w-4" />
              </button>
              <button
                onClick={toggleTheme}
                className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <Link to="/tools" className="flex-shrink-0">
                <Button variant="hero" size="sm" className="ms-1 whitespace-nowrap">
                  {t("nav.getStarted")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
