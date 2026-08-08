<rect x="104" y="16" width="50" height="6" fill="#4f46e5" />
    <text x="109" y="18" fontSize="8" fill="white" fontWeight="bold">PDF</text>
    <rect x="112" y="30" width="34" height="3" rx="1.5" fill="white" fillOpacity="0.8" />
    <rect x="112" y="36" width="28" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
    <rect x="112" y="41" width="32" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
    <rect x="112" y="48" width="28" height="10" rx="3" fill="white" fillOpacity="0.2" />
    <rect x="112" y="61" width="34" height="2" rx="1" fill="white" fillOpacity="0.4" />
    <rect x="112" y="66" width="26" height="2" rx="1" fill="white" fillOpacity="0.3" />
    <rect x="112" y="71" width="30" height="2" rx="1" fill="white" fillOpacity="0.3" />
  </g>
</svg>
  ),
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { t, language } = useI18n();
  const isRTL = language === "ar";
  const preview = toolPreviews[tool.id];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-card rounded-2xl border border-border/60 hover:border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* 3D Preview Header */}
      <div className="relative w-full h-36 bg-muted/40 overflow-hidden border-b border-border/40 p-3 flex items-center justify-center">
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
          {preview || (
            <div className="w-full h-full flex items-center justify-center bg-primary/5 rounded-xl text-primary font-bold">
              PDF
            </div>
          )}
        </div>

        {/* Badge */}
        {tool.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                badgeStyles[tool.badge] || "bg-primary/15 text-primary"
              }`}
            >
              {tool.badge === "popular" && (isRTL ? "شائع" : "Popular")}
              {tool.badge === "new" && (isRTL ? "جديد" : "New")}
              {tool.badge === "ai" && (isRTL ? "ذكاء اصطناعي" : "AI")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{tool.icon}</span>
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {t(`tools.${tool.id}.name`) || tool.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
            {t(`tools.${tool.id}.description`) || tool.description}
          </p>
        </div>

        <div className="pt-3 border-t border-border/40 flex items-center justify-between">
          <Link
            to={`/${language}/tools/${tool.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform duration-200"
          >
            <span>{isRTL ? "استخدام الأداة" : "Use Tool"}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          </Link>

          <span className="text-[11px] text-muted-foreground/70 font-medium">
            {isRTL ? "مجاني وسريع" : "Free & Fast"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
