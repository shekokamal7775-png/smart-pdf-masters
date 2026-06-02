import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.tools": "All Tools",
  "nav.pricing": "Pricing",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.faq": "FAQ",
  "nav.login": "Log in",
  "nav.signup": "Sign up free",
  "hero.badge": "4 focused PDF tools · 100% browser-based",
  "hero.title": "Essential PDF tools, ready in one smart workspace",
  "hero.subtitle": "Merge PDFs, compress files, convert PDF to Word, and turn PNG or JPG images into PDF — fast, private, and ready to download instantly.",
  "hero.cta.primary": "Get started — it's free",
  "hero.cta.secondary": "Browse all tools",
  "hero.stat.users": "users worldwide",
  "hero.stat.files": "files processed",
  "hero.stat.rating": "average rating",
  "tools.heading": "Pick a tool to get started",
  "tools.subheading": "Four focused tools run in your browser, so your files stay on your device.",
  "section.features.title": "Built for speed, security and scale",
  "section.features.subtitle": "From a single freelancer to entire enterprise teams.",
  "feature.fast.title": "Lightning fast",
  "feature.fast.desc": "Optimised processing pipelines deliver results in seconds, even on large files.",
  "feature.secure.title": "Secure by default",
  "feature.secure.desc": "256-bit TLS, automatic file deletion, GDPR-ready, SOC 2 in progress.",
  "feature.cloud.title": "Cloud & desktop",
  "feature.cloud.desc": "Drag-and-drop from Drive, Dropbox, OneDrive — or your computer.",
  "feature.ai.title": "Focused toolkit",
  "feature.ai.desc": "Only the four essential tools stay active, keeping the workspace simple and reliable.",
  "section.how.title": "How it works",
  "section.how.step1.title": "Upload your file",
  "section.how.step1.desc": "Drop a PDF or pick from cloud storage.",
  "section.how.step2.title": "Choose what to do",
  "section.how.step2.desc": "Merge, compress, convert to Word, or create a PDF from PNG/JPG images.",
  "section.how.step3.title": "Download instantly",
  "section.how.step3.desc": "Get your processed file in seconds. We delete it within 1 hour.",
  "section.testimonials.title": "Loved by 12 million users",
  "section.testimonials.subtitle": "Teams at top companies rely on SmartPDFTools every day.",
  "section.cta.title": "Ready to make PDFs simple?",
  "section.cta.subtitle": "Join millions of professionals saving hours every week.",
  "section.cta.button": "Start free now",
  "newsletter.title": "PDF tips, every month",
  "newsletter.subtitle": "Productivity guides, AI updates, and exclusive offers. No spam, ever.",
  "newsletter.placeholder": "you@company.com",
  "newsletter.button": "Subscribe",
  "newsletter.success": "Thanks! Check your inbox to confirm.",
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.resources": "Resources",
  "footer.legal": "Legal",
  "footer.tagline": "All your PDF tools in one secure, lightning-fast workspace.",
  "footer.rights": "All rights reserved.",
  "tool.upload": "Drop your PDF here",
  "tool.upload.or": "or click to browse",
  "tool.upload.cloud": "Import from",
  "tool.process": "Process file",
  "tool.demo": "This is a UI preview. File processing will be enabled when backend is connected.",
  "common.popular": "Popular",
  "common.new": "New",
  "common.ai": "AI",
};

const ar: Dict = {
  "nav.tools": "كل الأدوات",
  "nav.pricing": "الأسعار",
  "nav.blog": "المدونة",
  "nav.about": "من نحن",
  "nav.contact": "تواصل معنا",
  "nav.faq": "الأسئلة الشائعة",
  "nav.login": "تسجيل الدخول",
  "nav.signup": "إنشاء حساب مجاني",
  "hero.badge": "4 أدوات PDF مركزة · تعمل داخل المتصفح 100%",
  "hero.title": "أدوات PDF الأساسية في مساحة واحدة ذكية",
  "hero.subtitle": "ادمج PDF، اضغط الملفات، حوّل PDF إلى Word، وحوّل صور PNG أو JPG إلى PDF — بسرعة وخصوصية وتحميل فوري.",
  "hero.cta.primary": "ابدأ مجاناً الآن",
  "hero.cta.secondary": "استعرض كل الأدوات",
  "hero.stat.users": "مستخدم حول العالم",
  "hero.stat.files": "ملف تمت معالجته",
  "hero.stat.rating": "متوسط التقييم",
  "tools.heading": "اختر أداة للبدء",
  "tools.subheading": "أربع أدوات مركزة تعمل داخل متصفحك، لذلك تبقى ملفاتك على جهازك.",
  "section.features.title": "مصممة للسرعة والأمان والنمو",
  "section.features.subtitle": "من المستقل الفردي إلى فرق المؤسسات الكبرى.",
  "feature.fast.title": "سرعة فائقة",
  "feature.fast.desc": "معالجة محسّنة تقدم نتائج خلال ثوانٍ حتى للملفات الكبيرة.",
  "feature.secure.title": "آمنة افتراضياً",
  "feature.secure.desc": "تشفير TLS بسعة 256 بت، حذف تلقائي للملفات، متوافق مع GDPR.",
  "feature.cloud.title": "سحابة وسطح مكتب",
  "feature.cloud.desc": "اسحب وأفلت من Drive وDropbox وOneDrive — أو من جهازك.",
  "feature.ai.title": "مجموعة مركزة",
  "feature.ai.desc": "فقط الأدوات الأربع الأساسية مفعّلة لتبقى التجربة بسيطة وموثوقة.",
  "section.how.title": "كيف يعمل",
  "section.how.step1.title": "ارفع ملفك",
  "section.how.step1.desc": "اسحب ملف PDF أو اختر من التخزين السحابي.",
  "section.how.step2.title": "اختر العملية",
  "section.how.step2.desc": "ادمج، اضغط، حوّل إلى Word، أو أنشئ PDF من صور PNG/JPG.",
  "section.how.step3.title": "حمّل على الفور",
  "section.how.step3.desc": "احصل على ملفك خلال ثوانٍ. نحذفه خلال ساعة.",
  "section.testimonials.title": "محبوبة من 12 مليون مستخدم",
  "section.testimonials.subtitle": "فرق في كبرى الشركات تعتمد علينا يومياً.",
  "section.cta.title": "هل أنت جاهز لتبسيط ملفات PDF؟",
  "section.cta.subtitle": "انضم لملايين المحترفين الذين يوفرون ساعات أسبوعياً.",
  "section.cta.button": "ابدأ مجاناً الآن",
  "newsletter.title": "نصائح PDF كل شهر",
  "newsletter.subtitle": "دلائل إنتاجية، تحديثات ذكاء اصطناعي، وعروض حصرية. بدون إزعاج.",
  "newsletter.placeholder": "you@company.com",
  "newsletter.button": "اشترك",
  "newsletter.success": "شكراً! تحقق من بريدك للتأكيد.",
  "footer.product": "المنتج",
  "footer.company": "الشركة",
  "footer.resources": "الموارد",
  "footer.legal": "قانوني",
  "footer.tagline": "كل أدوات PDF الخاصة بك في مساحة عمل واحدة آمنة وسريعة.",
  "footer.rights": "كل الحقوق محفوظة.",
  "tool.upload": "أفلت ملف PDF هنا",
  "tool.upload.or": "أو انقر للتصفح",
  "tool.upload.cloud": "استورد من",
  "tool.process": "معالجة الملف",
  "tool.demo": "هذه معاينة واجهة. ستُفعّل المعالجة عند ربط الخادم.",
  "common.popular": "شائع",
  "common.new": "جديد",
  "common.ai": "ذكاء اصطناعي",
};

const dicts: Record<Lang, Dict> = { en, ar };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string) => dicts[lang][key] ?? dicts.en[key] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
