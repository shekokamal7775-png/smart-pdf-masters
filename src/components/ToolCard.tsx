import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { useI18n } from "@/lib/i18n";

const badgeStyles: Record<string, string> = {
  popular: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  new: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  ai: "bg-gradient-primary text-primary-foreground",
};

// SVG preview illustrations for each tool
const toolPreviews: Record<string, React.ReactNode> = {
  "merge-pdf": (
    <svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="120" height="72" rx="8" fill="currentColor" className="text-rose-500/5" />
      {/* PDF file 1 */}
      <rect x="8" y="12" width="28" height="36" rx="3" fill="currentColor" className="text-rose-500/20" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="20" width="16" height="2" rx="1" fill="currentColor" className="text-rose-500/60" />
      <rect x="12" y="25" width="12" height="2" rx="1" fill="currentColor" className="text-rose-500/40" />
      <rect x="12" y="30" width="14" height="2" rx="1" fill="currentColor" className="text-rose-500/40" />
      <text x="10" y="44" fontSize="5" fill="currentColor" className="text-rose-500" fontWeight="bold">PDF</text>
      {/* PDF file 2 */}
      <rect x="8" y="54" width="28" height="14" rx="3" fill="currentColor" className="text-rose-500/20" stroke="currentColor" strokeWidth="1.5" />
      <text x="10" y="63" fontSize="5" fill="currentColor" className="text-rose-500" fontWeight="bold">PDF</text>
      {/* Arrow */}
      <path d="M44 30 L56 30" stroke="currentColor" className="text-rose-500" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 26 L56 30 L52 34" stroke="currentColor" className="text-rose-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Result PDF */}
      <rect x="60" y="8" width="52" height="56" rx="4" fill="currentColor" className="text-rose-500/15" stroke="currentColor" strokeWidth="1.5" />
      <rect x="66" y="18" width="32" height="2.5" rx="1" fill="currentColor" className="text-rose-500/70" />
      <rect x="66" y="24" width="28" height="2" rx="1" fill="currentColor" className="text-rose-500/40" />
      <rect x="66" y="29" width="30" height="2" rx="1" fill="currentColor" className="text-rose-500/40" />
      <rect x="66" y="36" width="32" height="1.5" rx="1" fill="currentColor" className="text-rose-500/30" />
      <rect x="66" y="40" width="24" height="1.5" rx="1" fill="currentColor" className="text-rose-500/30" />
      <rect x="66" y="44" width="28" height="1.5" rx="1" fill="currentColor" className="text-rose-500/30" />
      <text x="63" y="56" fontSize="6" fill="currentColor" className="text-rose-500" fontWeight="bold">MERGED.PDF</text>
    </svg>
  ),
  "compress-pdf": (
    <svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="120" height="72" rx="8" fill="currentColor" className="text-amber-500/5" />
      {/* Large PDF */}
      <rect x="6" y="8" width="44" height="56" rx="4" fill="currentColor" className="text-amber-500/15" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="16" width="30" height="3" rx="1.5" fill="currentColor" className="text-amber-500/60" />
      <rect x="12" y="22" width="28" height="2" rx="1" fill="currentColor" className="text-amber-500/40" />
      <rect x="12" y="27" width="24" height="8" rx="2" fill="currentColor" className="text-amber-500/25" />
      <rect x="12" y="38" width="30" height="2" rx="1" fill="currentColor" className="text-amber-500/30" />
      <rect x="12" y="43" width="26" height="2" rx="1" fill="currentColor" className="text-amber-500/30" />
      <text x="8" y="58" fontSize="5.5" fill="currentColor" className="text-amber-600" fontWeight="bold">12 MB</text>
      {/* Arrow with compress icon */}
      <path d="M56 36 L64 36" stroke="currentColor" className="text-amber-500" strokeWidth="2" strokeLinecap="round" />
      <path d="M61 32 L65 36 L61 40" stroke="currentColor" className="text-amber-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 28 L56 44" stroke="currentColor" className="text-amber-500/40" strokeWidth="1" strokeDasharray="2 2" />
      {/* Small compressed PDF */}
      <rect x="68" y="20" width="32" height="40" rx="4" fill="currentColor" className="text-amber-500/20" stroke="currentColor" strokeWidth="1.5" />
      <rect x="73" y="27" width="20" height="2" rx="1" fill="currentColor" className="text-amber-500/60" />
      <rect x="73" y="32" width="18" height="2" rx="1" fill="currentColor" className="text-amber-500/40" />
      <rect x="73" y="37" width="16" height="2" rx="1" fill="currentColor" className="text-amber-500/40" />
      <text x="70" y="52" fontSize="5" fill="currentColor" className="text-amber-600" fontWeight="bold">1.2 MB</text>
      {/* Down arrow badge */}
      <circle cx="84" cy="18" r="6" fill="currentColor" className="text-amber-500" />
      <path d="M84 14 L84 20 M81 17 L84 20 L87 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "rotate-pdf": (
    <svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="120" height="72" rx="8" fill="currentColor" className="text-purple-500/5" />
      {/* Sideways PDF (wrong) */}
      <rect x="8" y="22" width="40" height="30" rx="3" fill="currentColor" className="text-purple-500/15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="14" y="28" width="18" height="2" rx="1" fill="currentColor" className="text-purple-500/40" />
      <rect x="14" y="33" width="22" height="2" rx="1" fill="currentColor" className="text-purple-500/30" />
      <rect x="14" y="38" width="16" height="2" rx="1" fill="currentColor" className="text-purple-500/30" />
      {/* Rotate arrow */}
      <path d="M54 24 C58 18 66 18 68 24" stroke="currentColor" className="text-purple-500" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M65 20 L68 24 L64 26" stroke="currentColor" className="text-purple-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54 48 C58 54 66 54 68 48" stroke="currentColor" className="text-purple-500" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M57 52 L54 48 L58 46" stroke="currentColor" className="text-purple-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Correct PDF (upright) */}
      <rect x="72" y="8" width="40" height="56" rx="3" fill="currentColor" className="text-purple-500/20" stroke="currentColor" strokeWidth="1.5" />
      <rect x="78" y="16" width="26" height="2.5" rx="1" fill="currentColor" className="text-purple-500/60" />
      <rect x="78" y="22" width="22" height="2" rx="1" fill="currentColor" className="text-purple-500/40" />
      <rect x="78" y="27" width="24" height="2" rx="1" fill="currentColor" className="text-purple-500/40" />
      <rect x="78" y="32" width="20" height="2" rx="1" fill="currentColor" className="text-purple-500/30" />
      {/* Check badge */}
      <circle cx="108" cy="12" r="6" fill="currentColor" className="text-purple-500" />
      <path d="M105 12 L107 14 L111 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "split-pdf": (
    <svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="120" height="72" rx="8" fill="currentColor" className="text-orange-500/5" />
      {/* Large PDF source */}
      <rect x="6" y="8" width="36" height="56" rx="4" fill="currentColor" className="text-orange-500/15" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="16" width="22" height="2" rx="1" fill="currentColor" className="text-orange-500/60" />
      <rect x="12" y="21" width="18" height="1.5" rx="1" fill="currentColor" className="text-orange-500/40" />
      <rect x="12" y="26" width="20" height="1.5" rx="1" fill="currentColor" className="text-orange-500/40" />
      <line x1="12" y1="32" x2="36" y2="32" stroke="currentColor" className="text-orange-500/30" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="12" y="36" width="22" height="1.5" rx="1" fill="currentColor" className="text-orange-500/40" />
      <rect x="12" y="41" width="18" height="1.5" rx="1" fill="currentColor" className="text-orange-500/30" />
      <line x1="12" y1="47" x2="36" y2="47" stroke="currentColor" className="text-orange-500/30" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="12" y="51" width="20" height="1.5" rx="1" fill="currentColor" className="text-orange-500/40" />
      {/* Scissors */}
      <path d="M48 36 L58 36" stroke="currentColor" className="text-orange-500" strokeWidth="2" strokeLinecap="round" />
      <circle cx="46" cy="34" r="3" stroke="currentColor" className="text-orange-500" strokeWidth="1.5" fill="none" />
      <circle cx="46" cy="38" r="3" stroke="currentColor" className="text-orange-500" strokeWidth="1.5" fill="none" />
      <path d="M49 33 L58 28" stroke="currentColor" className="text-orange-500" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M49 39 L58 44" stroke="currentColor" className="text-orange-500" strokeWidth="1.5" strokeLinecap="round" />
      {/* Result files */}
      <rect x="62" y="6" width="26" height="18" rx="3" fill="currentColor" className="text-orange-500/20" stroke="currentColor" strokeWidth="1.5" />
      <rect x="66" y="11" width="14" height="1.5" rx="1" fill="currentColor" className="text-orange-500/50" />
      <rect x="66" y="15" width="10" height="1.5" rx="1" fill="currentColor" className="text-orange-500/30" />
      <rect x="62" y="27" width="26" height="18" rx="3" fill="currentColor" className="text-orange-500/20" stroke="currentColor" strokeWidth="1.5" />
      <rect x="66" y="32" width="14" height="1.5" rx="1" fill="currentColor" className="text-orange-500/50" />
      <rect x="66" y="36" width="10" height="1.5" rx="1" fill="currentColor" className="text-orange-500/30" />
      <rect x="62" y="48" width="26" height="18" rx="3" fill="currentColor" className="text-orange-500/20" stroke="currentColor" strokeWidth="1.5" />
      <rect x="66" y="53" width="14" height="1.5" rx="1" fill="currentColor" className="text-orange-500/50" />
      <rect x="66" y="57" width="10" height="1.5" rx="1" fill="currentColor" className="text-orange-500/30" />
      {/* Part labels */}
      <text x="91" y="17" fontSize="4.5" fill="currentColor" className="text-orange-500" fontWeight="bold">P.1</text>
      <text x="91" y="38" fontSize="4.5" fill="currentColor" className="text-orange-500" fontWeight="bold">P.2</text>
      <text x="91" y="59" fontSize="4.5" fill="currentColor" className="text-orange-500" fontWeight="bold">P.3</text>
    </svg>
  ),
  "pdf-to-word": (
    <svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="120" height="72" rx="8" fill="currentColor" className="text-blue-500/5" />
      {/* PDF file */}
      <rect x="6" y="8" width="40" height="56" rx="4" fill="currentColor" className="text-blue-500/15" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="16" width="26" height="2.5" rx="1" fill="currentColor" className="text-blue-500/60" />
      <rect x="13" y="22" width="20" height="2" rx="1" fill="currentColor" className="text-blue-500/40" />
      <rect x="13" y="27" width="24" height="2" rx="1" fill="currentColor" className="text-blue-500/40" />
      <rect x="13" y="32" width="18" height="2" rx="1" fill="currentColor" className="text-blue-500/30" />
      <rect x="13" y="38" width="22" height="6" rx="2" fill="currentColor" className="text-blue-500/20" />
      <text x="9" y="55" fontSize="6" fill="currentColor" className="text-blue-500" fontWeight="bold">.PDF</text>
      {/* Arrow */}
      <path d="M52 34 L68 34" stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeLinecap="round" />
      <path d="M64 30 L68 34 L64 38" stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Word file */}
      <rect x="72" y="8" width="42" height="56" rx="4" fill="currentColor" className="text-blue-500/20" stroke="currentColor" strokeWidth="1.5" />
      {/* W logo */}
      <rect x="76" y="12" width="34" height="16" rx="2" fill="currentColor" className="text-blue-500/30" />
      <text x="82" y="24" fontSize="12" fill="currentColor" className="text-blue-500" fontWeight="bold">W</text>
      <rect x="78" y="32" width="28" height="2" rx="1" fill="currentColor" className="text-blue-500/50" />
      <rect x="78" y="37" width="24" height="2" rx="1" fill="currentColor" className="text-blue-500/40" />
      <rect x="78" y="42" width="26" height="2" rx="1" fill="currentColor" className="text-blue-500/40" />
      <rect x="78" y="47" width="20" height="2" rx="1" fill="currentColor" className="text-blue-500/30" />
      <text x="74" y="58" fontSize="5.5" fill="currentColor" className="text-blue-500" fontWeight="bold">.DOCX</text>
    </svg>
  ),
  "jpg-to-pdf": (
    <svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="120" height="72" rx="8" fill="currentColor" className="text-emerald-500/5" />
      {/* Image files stack */}
      <rect x="6" y="16" width="38" height="28" rx="4" fill="currentColor" className="text-emerald-500/10" stroke="currentColor" strokeWidth="1" />
      <rect x="10" y="12" width="38" height="28" rx="4" fill="currentColor" className="text-emerald-500/15" stroke="currentColor" strokeWidth="1" />
      <rect x="14" y="8" width="38" height="30" rx="4" fill="currentColor" className="text-emerald-500/20" stroke="currentColor" strokeWidth="1.5" />
      {/* Mountain/landscape icon */}
      <path d="M20 30 L28 18 L36 26 L40 22 L48 30" stroke="currentColor" className="text-emerald-500/60" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="16" r="3" fill="currentColor" className="text-emerald-500/40" />
      <text x="16" y="38" fontSize="5" fill="currentColor" className="text-emerald-600" fontWeight="bold">JPG/PNG</text>
      {/* Arrow */}
      <path d="M56 30 L66 30" stroke="currentColor" className="text-emerald-500" strokeWidth="2" strokeLinecap="round" />
      <path d="M62 26 L66 30 L62 34" stroke="currentColor" className="text-emerald-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* PDF result */}
      <rect x="70" y="8" width="44" height="56" rx="4" fill="currentColor" className="text-emerald-500/20" stroke="currentColor" strokeWidth="1.5" />
      {/* Image inside PDF */}
      <rect x="75" y="14" width="34" height="22" rx="2" fill="currentColor" className="text-emerald-500/25" />
      <path d="M80 28 L87 20 L93 26 L97 22 L105 28" stroke="currentColor" className="text-emerald-500/60" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="83" cy="19" r="2.5" fill="currentColor" className="text-emerald-500/40" />
      <rect x="75" y="40" width="28" height="2" rx="1" fill="currentColor" className="text-emerald-500/40" />
      <rect x="75" y="45" width="22" height="2" rx="1" fill="currentColor" className="text-emerald-500/30" />
      <text x="73" y="58" fontSize="5.5" fill="currentColor" className="text-emerald-500" fontWeight="bold">.PDF</text>
    </svg>
  ),
};

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const { t, lang } = useI18n();
  const Icon = tool.icon;
  const preview = toolPreviews[tool.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className="flex flex-col h-full"
    >
      {/* Tool Card */}
      <Link
        to="/tools/$slug"
        params={{ slug: tool.slug }}
        className="group relative flex flex-col rounded-2xl border border-border bg-gradient-card shadow-soft transition-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30 overflow-hidden"
      >
        {/* Tool badge */}
        {tool.badge && (
          <span className={`absolute top-3 end-3 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeStyles[tool.badge]}`}>
            {t(`common.${tool.badge}`)}
          </span>
        )}

        {/* SVG Preview Image */}
        {preview && (
          <div
            className="w-full h-28 p-3 overflow-hidden"
            role="img"
            aria-label={`${tool.title.en} — free online PDF tool illustration`}
          >
            {preview}
          </div>
        )}

        {/* Content */}
        <div className="p-5 pt-3 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tool.bg} ${tool.color} transition-smooth group-hover:scale-110 flex-shrink-0`}>
              <Icon className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="font-display text-base font-bold leading-tight">{tool.title[lang]}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.desc[lang]}</p>
          <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-smooth">
            {lang === "ar" ? "ابدأ" : "Open tool"} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </div>
        </div>
      </Link>

      {/* Related Article Link */}
      {tool.relatedArticle && (
        <Link
          to="/blog/$slug"
          params={{ slug: tool.relatedArticle.slug }}
          className="mt-2 flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/30 px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-secondary/60 transition-smooth group"
        >
          <BookOpen className="h-3.5 w-3.5 flex-shrink-0 text-primary/70 group-hover:text-primary transition-smooth" />
          <span className="line-clamp-1 flex-1">
            {lang === "ar" ? "اقرأ الدليل: " : "Read guide: "}
            <span className="font-medium">{tool.relatedArticle.title}</span>
          </span>
          <ArrowRight className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-smooth rtl:rotate-180" />
        </Link>
      )}
    </motion.div>
  );
}
