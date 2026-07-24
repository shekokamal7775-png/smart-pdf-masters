import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SmartPDFMasters — Free Online PDF Tools" },
      { name: "description", content: "Free online PDF tools to merge, compress, convert and edit PDF files. Fast, secure and easy to use with no installation required. Try SmartPDFMasters free." },
      { name: "keywords", content: "SmartPDFMasters, PDF tools, merge PDF, compress PDF, PDF to Word, convert PDF, edit PDF, free PDF editor, online PDF tools, PDF compressor, PDF merger" },
      { name: "author", content: "SmartPDFMasters" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "SmartPDFMasters — Free Online PDF Tools" },
      { property: "og:description", content: "Free online PDF tools to merge, compress, convert and edit PDF files. Fast, secure and easy to use with no installation required." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SmartPDFMasters" },
      { property: "og:url", content: "https://www.smartpdfmasters.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@SmartPDFMasters" },
      { name: "theme-color", content: "#dc2626" },
      { name: "google-site-verification", content: "bPdyWSIDRVm1WxiTdQBi6z90aQZv2tQQRKwhMI5djCk" },
      { name: "twitter:title", content: "SmartPDFMasters — Free Online PDF Tools" },
      { name: "twitter:description", content: "Free online PDF tools to merge, compress, convert and edit PDF files. Fast, secure and easy to use with no installation required." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/080b78fc-1c45-4405-ae43-c91c494bad11/id-preview-9d17de04--c32813af-7de2-491b-b3ba-577d01487480.lovable.app-1778468325197.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/080b78fc-1c45-4405-ae43-c91c494bad11/id-preview-9d17de04--c32813af-7de2-491b-b3ba-577d01487480.lovable.app-1778468325197.png" },
    ],
    links: [
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Tajawal:wght@400;500;700;800&display=swap" },
      { rel: "canonical", href: "https://www.smartpdfmasters.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SmartPDFMasters",
          url: "https://www.smartpdfmasters.com/",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-RJR9RK8L7R",
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RJR9RK8L7R');
        `,
      },
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2068276839048778",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />

        {/* Monetag */}
        <script
          src="https://quge5.com/88/tag.min.js"
          async
          data-zone="263284"
          data-cfasync="false"
        ></script>

      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
  
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1"><Outlet /></main>
            <Footer />
          </div>
          <Toaster richColors position="top-center" />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
