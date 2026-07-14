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

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const { t, lang } = useI18n();
  const Icon = tool.icon;

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
        className="group relative flex flex-col rounded-2xl border border-border bg-gradient-card p-6 shadow-soft transition-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30"
      >
        {tool.badge && (
          <span className={`absolute top-4 end-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeStyles[tool.badge]}`}>
            {t(`common.${tool.badge}`)}
          </span>
        )}
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.bg} ${tool.color} transition-smooth group-hover:scale-110`}>
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-tight">{tool.title[lang]}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed flex-1">{tool.desc[lang]}</p>
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-smooth">
          {lang === "ar" ? "ابدأ" : "Open tool"} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
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
