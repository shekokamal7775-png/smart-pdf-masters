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
  { slug: "split-pdf", icon: Scissors, color: "text-orange-500", bg: "bg-orange-500/10", category: "organize",
    title: { en: "Split PDF", ar: "تقسيم PDF" },
    desc: { en: "Extract pages or split a PDF into multiple files in seconds.", ar: "استخرج الصفحات أو قسّم PDF إلى عدة ملفات." },
    seoDesc: { en: "Split a PDF into separate pages or custom ranges instantly. Free, secure online splitter.", ar: "قسّم ملف PDF إلى صفحات أو نطاقات مخصصة فوراً." }},
  { slug: "compress-pdf", icon: Minimize2, color: "text-amber-500", bg: "bg-amber-500/10", category: "organize", badge: "popular",
    title: { en: "Compress PDF", ar: "ضغط PDF" },
    desc: { en: "Reduce PDF file size while keeping the best possible quality.", ar: "قلّل حجم ملف PDF مع الحفاظ على أفضل جودة." },
    seoDesc: { en: "Compress PDF files online for free. Reduce PDF size up to 90% without losing quality.", ar: "اضغط ملفات PDF عبر الإنترنت مجاناً وقلّل الحجم حتى 90% دون فقدان الجودة." }},
  { slug: "pdf-to-word", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", category: "convert", badge: "popular",
    title: { en: "PDF to Word", ar: "PDF إلى Word" },
    desc: { en: "Convert your PDF to an editable Word document with perfect formatting.", ar: "حوّل PDF إلى مستند Word قابل للتعديل بتنسيق مثالي." },
    seoDesc: { en: "Convert PDF to editable Word DOCX files free online. Accurate layout, fonts and tables preserved.", ar: "حوّل PDF إلى DOCX قابل للتعديل عبر الإنترنت مع الحفاظ على التنسيق والجداول." }},
  { slug: "word-to-pdf", icon: FileType, color: "text-blue-600", bg: "bg-blue-600/10", category: "convert",
    title: { en: "Word to PDF", ar: "Word إلى PDF" },
    desc: { en: "Convert Word documents to high-quality PDFs in one click.", ar: "حوّل مستندات Word إلى PDF عالي الجودة بنقرة." },
    seoDesc: { en: "Convert Word DOC and DOCX files to PDF for free with perfect formatting.", ar: "حوّل ملفات Word إلى PDF مجاناً بتنسيق مثالي." }},
  { slug: "jpg-to-pdf", icon: ImageIcon, color: "text-emerald-500", bg: "bg-emerald-500/10", category: "convert",
    title: { en: "JPG to PDF", ar: "JPG إلى PDF" },
    desc: { en: "Convert JPG, PNG and other images into a single PDF file.", ar: "حوّل صور JPG وPNG وغيرها إلى ملف PDF واحد." },
    seoDesc: { en: "Convert JPG, PNG and image files to a PDF online. Adjust orientation and margins.", ar: "حوّل الصور إلى PDF عبر الإنترنت مع التحكم في الاتجاه والهوامش." }},
  { slug: "pdf-to-jpg", icon: FileImage, color: "text-pink-500", bg: "bg-pink-500/10", category: "convert",
    title: { en: "PDF to JPG", ar: "PDF إلى JPG" },
    desc: { en: "Extract images from a PDF or convert each page to a JPG.", ar: "استخرج الصور من PDF أو حوّل كل صفحة إلى JPG." },
    seoDesc: { en: "Convert PDF pages to high-resolution JPG images instantly.", ar: "حوّل صفحات PDF إلى صور JPG عالية الدقة فوراً." }},
  { slug: "excel-to-pdf", icon: Sheet, color: "text-green-600", bg: "bg-green-600/10", category: "convert",
    title: { en: "Excel to PDF", ar: "Excel إلى PDF" },
    desc: { en: "Make Excel spreadsheets easy to read by converting them to PDF.", ar: "اجعل جداول Excel سهلة القراءة بتحويلها إلى PDF." },
    seoDesc: { en: "Convert Excel XLS and XLSX spreadsheets to PDF online.", ar: "حوّل جداول Excel إلى PDF عبر الإنترنت." }},
  { slug: "powerpoint-to-pdf", icon: Presentation, color: "text-orange-600", bg: "bg-orange-600/10", category: "convert",
    title: { en: "PowerPoint to PDF", ar: "PowerPoint إلى PDF" },
    desc: { en: "Convert PowerPoint presentations into shareable PDFs.", ar: "حوّل عروض PowerPoint إلى PDF قابل للمشاركة." },
    seoDesc: { en: "Convert PPT and PPTX presentations to PDF for free, online.", ar: "حوّل عروض PowerPoint إلى PDF مجاناً." }},
  { slug: "edit-pdf", icon: Edit3, color: "text-violet-500", bg: "bg-violet-500/10", category: "edit", badge: "new",
    title: { en: "Edit PDF", ar: "تعديل PDF" },
    desc: { en: "Add text, images, shapes and annotations directly into your PDF.", ar: "أضف نصاً وصوراً وأشكالاً وتعليقات إلى PDF مباشرة." },
    seoDesc: { en: "Edit PDF online: add text, draw, highlight, insert images and more.", ar: "عدّل PDF عبر الإنترنت: أضف نصاً، ارسم، علّم، وأدرج صوراً." }},
  { slug: "rotate-pdf", icon: RotateCw, color: "text-indigo-500", bg: "bg-indigo-500/10", category: "edit",
    title: { en: "Rotate PDF", ar: "تدوير PDF" },
    desc: { en: "Rotate one or all pages in your PDF in one go.", ar: "دوّر صفحة أو كل صفحات PDF بنقرة واحدة." },
    seoDesc: { en: "Rotate PDF pages clockwise or counter-clockwise online for free.", ar: "دوّر صفحات PDF مجاناً عبر الإنترنت." }},
  { slug: "unlock-pdf", icon: Unlock, color: "text-cyan-500", bg: "bg-cyan-500/10", category: "security",
    title: { en: "Unlock PDF", ar: "فتح PDF" },
    desc: { en: "Remove password protection from PDF files you own.", ar: "أزل كلمة المرور من ملفات PDF التي تملكها." },
    seoDesc: { en: "Remove the password from a PDF file you have permission to access.", ar: "أزل كلمة المرور من PDF لديك صلاحية الوصول إليه." }},
  { slug: "protect-pdf", icon: Lock, color: "text-red-500", bg: "bg-red-500/10", category: "security",
    title: { en: "Protect PDF", ar: "حماية PDF" },
    desc: { en: "Add a password and encryption to your PDF documents.", ar: "أضف كلمة مرور وتشفيراً لمستندات PDF." },
    seoDesc: { en: "Encrypt PDF files with a password to keep your documents private.", ar: "شفّر ملفات PDF بكلمة مرور للحفاظ على خصوصيتها." }},
  { slug: "watermark-pdf", icon: Droplet, color: "text-sky-500", bg: "bg-sky-500/10", category: "edit",
    title: { en: "Add Watermark", ar: "إضافة علامة مائية" },
    desc: { en: "Stamp text or images on top of your PDF in seconds.", ar: "أضف نصاً أو صورة كعلامة مائية على PDF بثوانٍ." },
    seoDesc: { en: "Add text or image watermark to PDF files online.", ar: "أضف علامة مائية نصية أو صورية لملفات PDF." }},
  { slug: "ocr-pdf", icon: ScanText, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10", category: "ai", badge: "ai",
    title: { en: "OCR PDF", ar: "OCR للنصوص" },
    desc: { en: "Make scanned PDFs searchable and selectable with smart OCR.", ar: "اجعل PDF الممسوح قابلاً للبحث والتحديد بـ OCR ذكي." },
    seoDesc: { en: "Convert scanned PDFs to searchable text with OCR. Supports 100+ languages.", ar: "حوّل PDF الممسوح إلى نص قابل للبحث بدعم أكثر من 100 لغة." }},
  { slug: "ai-pdf", icon: Sparkles, color: "text-rose-500", bg: "bg-rose-500/10", category: "ai", badge: "ai",
    title: { en: "AI PDF Tools", ar: "أدوات PDF بالذكاء الاصطناعي" },
    desc: { en: "Chat, summarise, translate and extract data from any PDF.", ar: "تحدث، لخّص، ترجم واستخرج البيانات من أي PDF." },
    seoDesc: { en: "AI PDF tools: summarise, chat with documents, translate and extract structured data.", ar: "أدوات PDF بالذكاء الاصطناعي: تلخيص، محادثة، ترجمة، واستخراج بيانات." }},
];

export const categories: { id: ToolCategory; en: string; ar: string }[] = [
  { id: "organize", en: "Organize PDF", ar: "تنظيم PDF" },
  { id: "convert", en: "Convert", ar: "تحويل" },
  { id: "edit", en: "Edit", ar: "تعديل" },
  { id: "security", en: "Security", ar: "أمان" },
  { id: "ai", en: "AI Tools", ar: "ذكاء اصطناعي" },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
