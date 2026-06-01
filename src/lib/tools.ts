import {
  Combine, Scissors, Minimize2, FileText, FileType, Image as ImageIcon,
  FileImage, Sheet, Presentation, Edit3, RotateCw, Unlock, Lock,
  Droplet, ScanText, Sparkles, type LucideIcon,
} from "lucide-react";

export type ToolCategory = "organize" | "convert" | "edit" | "security" | "ai";

export interface Tool {
  slug: string;
  icon: LucideIcon;
  color: string; // tailwind text color class
  bg: string;   // tailwind bg tint class
  category: ToolCategory;
  badge?: "popular" | "new" | "ai";
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  seoDesc: { en: string; ar: string };
}

export const tools: Tool[] = [
  { slug: "merge-pdf", icon: Combine, color: "text-rose-500", bg: "bg-rose-500/10", category: "organize", badge: "popular",
    title: { en: "Merge PDF", ar: "دمج PDF" },
    desc: { en: "Combine multiple PDFs in the order you want into one document.", ar: "ادمج عدة ملفات PDF في ملف واحد بالترتيب الذي تريده." },
    seoDesc: { en: "Free online tool to merge PDF files. Combine multiple PDFs into a single document in seconds. No watermark, secure.", ar: "أداة مجانية لدمج ملفات PDF عبر الإنترنت في مستند واحد بثوانٍ. آمنة ومن دون علامة مائية." }},
  { slug: "compress-pdf", icon: Minimize2, color: "text-amber-500", bg: "bg-amber-500/10", category: "organize", badge: "popular",
    title: { en: "Compress PDF", ar: "ضغط PDF" },
    desc: { en: "Reduce PDF file size while keeping the best possible quality.", ar: "قلّل حجم ملف PDF مع الحفاظ على أفضل جودة." },
    seoDesc: { en: "Compress PDF files online for free. Reduce PDF size without losing quality.", ar: "اضغط ملفات PDF عبر الإنترنت مجاناً دون فقدان الجودة." }},
  { slug: "pdf-to-word", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", category: "convert", badge: "popular",
    title: { en: "PDF to Word", ar: "PDF إلى Word" },
    desc: { en: "Convert your PDF to an editable Word document.", ar: "حوّل PDF إلى مستند Word قابل للتعديل." },
    seoDesc: { en: "Convert PDF to editable Word DOCX files free online.", ar: "حوّل PDF إلى DOCX قابل للتعديل عبر الإنترنت مجاناً." }},
  { slug: "jpg-to-pdf", icon: ImageIcon, color: "text-emerald-500", bg: "bg-emerald-500/10", category: "convert",
    title: { en: "PNG to PDF", ar: "PNG إلى PDF" },
    desc: { en: "Convert PNG (and JPG) images into a single PDF file.", ar: "حوّل صور PNG وJPG إلى ملف PDF واحد." },
    seoDesc: { en: "Convert PNG and JPG images to a single PDF document online for free.", ar: "حوّل صور PNG وJPG إلى ملف PDF واحد مجاناً عبر الإنترنت." }},
];

export const categories: { id: ToolCategory; en: string; ar: string }[] = [
  { id: "organize", en: "Organize PDF", ar: "تنظيم PDF" },
  { id: "convert", en: "Convert", ar: "تحويل" },
  { id: "edit", en: "Edit", ar: "تعديل" },
  { id: "security", en: "Security", ar: "أمان" },
  { id: "ai", en: "AI Tools", ar: "ذكاء اصطناعي" },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
