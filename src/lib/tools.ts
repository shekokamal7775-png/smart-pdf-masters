import { Combine, Minimize2, FileText, Image as ImageIcon, RotateCw, Scissors, ImageDown, FileUp, Droplets, Trash2, type LucideIcon } from "lucide-react";

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
      ar: "أداة مجانية لدمج ملفات PDF عبر الإنترنت في مستند واحد بثوانٍ.",
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
      ar: "صحّح اتجاه صفحات PDF المقلوبة أو المائلة.",
    },
    seoDesc: {
      en: "Rotate PDF pages free online. Fix upside down and sideways PDFs permanently. No software needed.",
      ar: "قم بتدوير صفحات PDF مجاناً عبر الإنترنت.",
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
      ar: "قسّم ملف PDF إلى صفحات أو أقسام منفصلة.",
    },
    seoDesc: {
      en: "Split PDF files free online. Extract pages from PDF, divide PDFs into sections. No software needed.",
      ar: "قسّم ملفات PDF مجاناً عبر الإنترنت.",
    },
    relatedArticle: {
      slug: "how-to-split-pdf-files-free",
      title: "How to Split a PDF into Multiple Files — Free Guide",
    },
  },
  {
    slug: "delete-pages-pdf",
    icon: Trash2,
    color: "text-red-500",
    bg: "bg-red-500/10",
    category: "organize",
    badge: "new",
    title: { en: "Delete PDF Pages", ar: "حذف صفحات PDF" },
    desc: {
      en: "Remove specific pages from a PDF — delete blank pages, unwanted sections instantly.",
      ar: "احذف صفحات محددة من ملف PDF — أزل الصفحات الفارغة وغير المرغوب فيها.",
    },
    seoDesc: {
      en: "Delete pages from PDF free online. Remove specific pages, blank pages, or unwanted sections from any PDF instantly. No software needed.",
      ar: "احذف صفحات من PDF مجاناً عبر الإنترنت.",
    },
    relatedArticle: {
      slug: "how-to-delete-pages-from-pdf-free",
      title: "How to Delete Pages from a PDF Free — Complete Guide",
    },
  },
  {
    slug: "add-watermark-pdf",
    icon: Droplets,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    category: "organize",
    badge: "new",
    title: { en: "Watermark PDF", ar: "إضافة علامة مائية" },
    desc: {
      en: "Add a text watermark to every page of your PDF — protect and brand your documents.",
      ar: "أضف علامة مائية نصية إلى كل صفحة من ملف PDF.",
    },
    seoDesc: {
      en: "Add watermark to PDF free online. Protect and brand your PDF documents with custom text watermarks instantly. No software needed.",
      ar: "أضف علامة مائية إلى PDF مجاناً عبر الإنترنت.",
    },
    relatedArticle: {
      slug: "pdf-security-guide-protect-encrypt-watermark",
      title: "PDF Security Guide — Protect, Encrypt and Watermark PDFs",
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
    title: { en: "Image to PDF", ar: "صورة إلى PDF" },
    desc: {
      en: "Convert PNG and JPG images into a single PDF file instantly.",
      ar: "حوّل صور PNG وJPG إلى ملف PDF واحد.",
    },
    seoDesc: {
      en: "Convert PNG and JPG images to a single PDF document online for free. No watermark, no signup.",
      ar: "حوّل صور PNG وJPG إلى ملف PDF واحد مجاناً.",
    },
    relatedArticle: {
      slug: "convert-jpg-to-pdf-free",
      title: "How to Convert JPG to PDF Free — Complete Guide",
    },
  },
  {
    slug: "pdf-to-jpg",
    icon: ImageDown,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    category: "convert",
    badge: "new",
    title: { en: "PDF to Image", ar: "PDF إلى صورة" },
    desc: {
      en: "Convert PDF pages to high-quality JPG or PNG images instantly.",
      ar: "حوّل صفحات PDF إلى صور JPG أو PNG عالية الجودة.",
    },
    seoDesc: {
      en: "Convert PDF to JPG or PNG images free online. Extract PDF pages as high-quality images instantly. No software needed.",
      ar: "حوّل PDF إلى صور JPG أو PNG مجاناً عبر الإنترنت.",
    },
    relatedArticle: {
      slug: "how-to-convert-pdf-to-jpg-free",
      title: "How to Convert PDF to JPG Free — Complete Guide",
    },
  },
  {
    slug: "word-to-pdf",
    icon: FileUp,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    category: "convert",
    badge: "new",
    title: { en: "Word to PDF", ar: "Word إلى PDF" },
    desc: {
      en: "Convert Word documents (DOCX) to PDF instantly — preserve fonts, tables and layout.",
      ar: "حوّل مستندات Word إلى PDF مع الحفاظ على التنسيق.",
    },
    seoDesc: {
      en: "Convert Word to PDF free online. Convert DOCX files to PDF instantly with fonts, tables and layout preserved. No software needed.",
      ar: "حوّل Word إلى PDF مجاناً عبر الإنترنت.",
    },
    relatedArticle: {
      slug: "how-to-convert-word-to-pdf-free",
      title: "How to Convert Word to PDF Free — Complete Guide",
    },
  },
];

export const categories: { id: ToolCategory; en: string; ar: string }[] = [
  { id: "organize", en: "Organize PDF", ar: "تنظيم PDF" },
  { id: "convert", en: "Convert", ar: "تحويل" },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
