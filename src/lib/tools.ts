import { Combine, Minimize2, FileText, Image as ImageIcon, RotateCw, Scissors, type LucideIcon } from "lucide-react";

export type ToolCategory = "organize" | "convert";

export interface Tool {
  slug: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  category: ToolCategory;
  badge?: "popular" | "new" | "ai";
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  seoDesc: { en: string; ar: string };
  relatedArticle?: {
    slug: string;
    title: string;
  };
}

export const tools: Tool[] = [
  {
    slug: "merge-pdf",
    icon: Combine,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    category: "organize",
    badge: "popular",
    title: { en: "Merge PDF", ar: "دمج PDF" },
    desc: {
      en: "Combine multiple PDFs in the order you want into one document.",
      ar: "ادمج عدة ملفات PDF في ملف واحد بالترتيب الذي تريده.",
    },
    seoDesc: {
      en: "Free online tool to merge PDF files. Combine multiple PDFs into a single document in seconds. No watermark, secure.",
      ar: "أداة مجانية لدمج ملفات PDF عبر الإنترنت في مستند واحد بثوانٍ. آمنة ومن دون علامة مائية.",
    },
    relatedArticle: {
      slug: "how-to-merge-pdf-files-free",
      title: "How to Merge PDF Files Free — Complete Guide",
    },
  },
  {
    slug: "compress-pdf",
    icon: Minimize2,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    category: "organize",
    badge: "popular",
    title: { en: "Compress PDF", ar: "ضغط PDF" },
    desc: {
      en: "Reduce PDF file size while keeping the best possible quality.",
      ar: "قلّل حجم ملف PDF مع الحفاظ على أفضل جودة.",
    },
    seoDesc: {
      en: "Compress PDF files online for free. Reduce PDF size without losing quality. Fast, secure, no watermark.",
      ar: "اضغط ملفات PDF عبر الإنترنت مجاناً دون فقدان الجودة.",
    },
    relatedArticle: {
      slug: "how-to-compress-pdf-online-free",
      title: "How to Compress PDF Online Free — Complete Guide",
    },
  },
  {
    slug: "rotate-pdf",
    icon: RotateCw,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    category: "organize",
    badge: "new",
    title: { en: "Rotate PDF", ar: "تدوير PDF" },
    desc: {
      en: "Fix upside down or sideways PDF pages — rotate 90°, 180° or 270°.",
      ar: "صحّح اتجاه صفحات PDF المقلوبة أو المائلة بتدوير 90° أو 180° أو 270°.",
    },
    seoDesc: {
      en: "Rotate PDF pages free online. Fix upside down and sideways PDFs permanently. Rotate 90, 180 or 270 degrees. No software needed.",
      ar: "قم بتدوير صفحات PDF مجاناً عبر الإنترنت. صحّح اتجاه صفحات PDF المقلوبة أو المائلة بشكل دائم.",
    },
    relatedArticle: {
      slug: "how-to-rotate-pdf-pages-free",
      title: "How to Rotate PDF Pages Free — Fix Upside Down PDFs",
    },
  },
  {
    slug: "split-pdf",
    icon: Scissors,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    category: "organize",
    badge: "new",
    title: { en: "Split PDF", ar: "تقسيم PDF" },
    desc: {
      en: "Split a PDF into separate pages or sections — extract exactly what you need.",
      ar: "قسّم ملف PDF إلى صفحات أو أقسام منفصلة — استخرج ما تحتاجه بالضبط.",
    },
    seoDesc: {
      en: "Split PDF files free online. Extract pages from PDF, divide PDFs into sections, or separate every page. No software needed.",
      ar: "قسّم ملفات PDF مجاناً عبر الإنترنت. استخرج صفحات من PDF أو قسّمه إلى أقسام منفصلة.",
    },
    relatedArticle: {
      slug: "how-to-split-pdf-files-free",
      title: "How to Split a PDF into Multiple Files — Free Guide",
    },
  },
  {
    slug: "pdf-to-word",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    category: "convert",
    badge: "popular",
    title: { en: "PDF to Word", ar: "PDF إلى Word" },
    desc: {
      en: "Convert your PDF to an editable Word document.",
      ar: "حوّل PDF إلى مستند Word قابل للتعديل.",
    },
    seoDesc: {
      en: "Convert PDF to editable Word DOCX files free online. Preserve fonts, tables and layout.",
      ar: "حوّل PDF إلى DOCX قابل للتعديل عبر الإنترنت مجاناً.",
    },
    relatedArticle: {
      slug: "how-to-convert-pdf-to-word",
      title: "How to Convert PDF to Word Without Losing Formatting",
    },
  },
  {
    slug: "jpg-to-pdf",
    icon: ImageIcon,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    category: "convert",
    title: { en: "PNG to PDF", ar: "PNG إلى PDF" },
    desc: {
      en: "Convert PNG (and JPG) images into a single PDF file.",
      ar: "حوّل صور PNG وJPG إلى ملف PDF واحد.",
    },
    seoDesc: {
      en: "Convert PNG and JPG images to a single PDF document online for free. No watermark, no signup.",
      ar: "حوّل صور PNG وJPG إلى ملف PDF واحد مجاناً عبر الإنترنت.",
    },
    relatedArticle: {
      slug: "convert-jpg-to-pdf-free",
      title: "How to Convert JPG to PDF Free — Complete Guide",
    },
  },
];

export const categories: { id: ToolCategory; en: string; ar: string }[] = [
  { id: "organize", en: "Organize PDF", ar: "تنظيم PDF" },
  { id: "convert", en: "Convert", ar: "تحويل" },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
