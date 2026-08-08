import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { useI18n } from "@/lib/i18n";

const badgeStyles: Record<string, string> = {
  popular: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  new: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  ai: "bg-gradient-primary text-primary-foreground",
};

// 3D-style SVG previews with gradients and shadows for every tool
const toolPreviews: Record<string, React.ReactNode> = {
  "merge-pdf": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="mg-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff1f2" /><stop offset="1" stopColor="#ffe4e6" />
        </linearGradient>
        <linearGradient id="mg-card1" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fda4af" /><stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="mg-card2" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fb7185" /><stop offset="1" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="mg-result" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff1f2" /><stop offset="1" stopColor="#fda4af" />
        </linearGradient>
        <filter id="mg-shadow"><feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.15" /></filter>
        <filter id="mg-shadow2"><feDropShadow dx="3" dy="4" stdDeviation="5" floodOpacity="0.2" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#mg-bg)" />
      <g filter="url(#mg-shadow)">
        <rect x="8" y="10" width="36" height="46" rx="4" fill="url(#mg-card1)" />
        <rect x="8" y="10" width="36" height="10" rx="4" fill="#f43f5e" />
        <rect x="13" y="26" width="22" height="2.5" rx="1.2" fill="white" fillOpacity="0.8" />
        <rect x="13" y="31" width="18" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="13" y="36" width="20" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="13" y="41" width="14" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <text x="11" y="21" fontSize="6" fill="white" fontWeight="bold">PDF</text>
      </g>
      <g filter="url(#mg-shadow)">
        <rect x="8" y="62" width="36" height="20" rx="4" fill="url(#mg-card2)" />
        <rect x="13" y="68" width="22" height="2" rx="1" fill="white" fillOpacity="0.8" />
        <rect x="13" y="73" width="16" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <text x="32" y="79" fontSize="5" fill="white" fontWeight="bold" fillOpacity="0.7">PDF</text>
      </g>
      <circle cx="60" cy="45" r="10" fill="#f43f5e" fillOpacity="0.15" />
      <path d="M55 45 L65 45" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M61 41 L65 45 L61 49" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g filter="url(#mg-shadow2)">
        <rect x="78" y="6" width="74" height="78" rx="6" fill="url(#mg-result)" stroke="#fda4af" strokeWidth="1.5" />
        <rect x="78" y="6" width="74" height="14" rx="6" fill="#f43f5e" />
        <rect x="78" y="14" width="74" height="6" fill="#f43f5e" />
        <text x="82" y="17" fontSize="7" fill="white" fontWeight="bold">MERGED.PDF</text>
        <rect x="86" y="28" width="52" height="3" rx="1.5" fill="#f43f5e" fillOpacity="0.6" />
        <rect x="86" y="34" width="44" height="2.5" rx="1.2" fill="#f43f5e" fillOpacity="0.35" />
        <rect x="86" y="39" width="48" height="2.5" rx="1.2" fill="#f43f5e" fillOpacity="0.35" />
        <rect x="86" y="44" width="40" height="2.5" rx="1.2" fill="#f43f5e" fillOpacity="0.25" />
        <rect x="86" y="52" width="52" height="2.5" rx="1.2" fill="#f43f5e" fillOpacity="0.35" />
        <rect x="86" y="57" width="36" height="2.5" rx="1.2" fill="#f43f5e" fillOpacity="0.25" />
        <rect x="86" y="62" width="44" height="2.5" rx="1.2" fill="#f43f5e" fillOpacity="0.25" />
        <rect x="86" y="68" width="40" height="2.5" rx="1.2" fill="#f43f5e" fillOpacity="0.2" />
        <rect x="86" y="73" width="48" height="2.5" rx="1.2" fill="#f43f5e" fillOpacity="0.2" />
      </g>
    </svg>
  ),
  "compress-pdf": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="cp-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbeb" /><stop offset="1" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="cp-big" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fcd34d" /><stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="cp-small" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fbbf24" /><stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <filter id="cp-shadow"><feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.18" /></filter>
        <filter id="cp-shadow2"><feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.15" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#cp-bg)" />
      <g filter="url(#cp-shadow)">
        <rect x="6" y="6" width="54" height="72" rx="5" fill="url(#cp-big)" />
        <rect x="6" y="6" width="54" height="14" rx="5" fill="#f59e0b" />
        <rect x="6" y="14" width="54" height="6" fill="#f59e0b" />
        <text x="10" y="17" fontSize="7.5" fill="white" fontWeight="bold">PDF</text>
        <rect x="14" y="28" width="36" height="3" rx="1.5" fill="white" fillOpacity="0.7" />
        <rect x="14" y="34" width="30" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="14" y="39" width="34" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="14" y="46" width="32" height="10" rx="3" fill="white" fillOpacity="0.2" />
        <rect x="14" y="59" width="36" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="14" y="64" width="28" height="2" rx="1" fill="white" fillOpacity="0.3" />
        <text x="8" y="74" fontSize="9" fill="white" fontWeight="bold" fillOpacity="0.9">12 MB</text>
      </g>
      <g>
        <circle cx="85" cy="45" r="12" fill="#f59e0b" fillOpacity="0.2" />
        <path d="M79 45 L91 45" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M87 41 L91 45 L87 49" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M82 38 L82 34 M82 52 L82 56" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      </g>
      <g filter="url(#cp-shadow2)">
        <rect x="100" y="18" width="54" height="48" rx="5" fill="url(#cp-small)" />
        <rect x="100" y="18" width="54" height="12" rx="5" fill="#d97706" />
        <rect x="100" y="24" width="54" height="6" fill="#d97706" />
        <text x="104" y="28" fontSize="7" fill="white" fontWeight="bold">PDF</text>
        <rect x="108" y="36" width="36" height="2.5" rx="1.2" fill="white" fillOpacity="0.7" />
        <rect x="108" y="41" width="28" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="108" y="46" width="32" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <text x="102" y="60" fontSize="9" fill="white" fontWeight="bold" fillOpacity="0.9">1.2 MB</text>
      </g>
      <circle cx="127" cy="14" r="8" fill="#16a34a" />
      <text x="121" y="18" fontSize="10" fill="white" fontWeight="bold">↓</text>
      <text x="107" y="72" fontSize="6" fill="#92400e" fontWeight="bold">90% SMALLER</text>
    </svg>
  ),
  "rotate-pdf": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="rp-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#faf5ff" /><stop offset="1" stopColor="#ede9fe" />
        </linearGradient>
        <linearGradient id="rp-wrong" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#d8b4fe" /><stop offset="1" stopColor="#9333ea" />
        </linearGradient>
        <linearGradient id="rp-right" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e9d5ff" /><stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <filter id="rp-shadow"><feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.18" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#rp-bg)" />
      <g filter="url(#rp-shadow)">
        <rect x="6" y="26" width="54" height="38" rx="4" fill="url(#rp-wrong)" fillOpacity="0.7" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 2" />
        <rect x="6" y="26" width="12" height="38" rx="4" fill="#9333ea" fillOpacity="0.5" />
        <text x="7" y="48" fontSize="7" fill="white" fontWeight="bold" transform="rotate(90 7 48)">PDF</text>
        <rect x="24" y="33" width="30" height="2" rx="1" fill="white" fillOpacity="0.6" />
        <rect x="24" y="38" width="24" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="24" y="43" width="28" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="24" y="48" width="22" height="2" rx="1" fill="white" fillOpacity="0.3" />
        <text x="8" y="70" fontSize="6" fill="#7e22ce" fontWeight="bold">SIDEWAYS</text>
      </g>
      <g>
        <path d="M68 22 C76 12 90 12 94 22" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M91 18 L94 22 L90 25" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M68 68 C76 78 90 78 94 68" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M71 72 L68 68 L72 65" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="81" cy="45" r="10" fill="#a855f7" fillOpacity="0.15" />
        <text x="76" y="49" fontSize="12" fill="#9333ea">↻</text>
      </g>
      <g filter="url(#rp-shadow)">
        <rect x="100" y="6" width="54" height="78" rx="5" fill="url(#rp-right)" />
        <rect x="100" y="6" width="54" height="14" rx="5" fill="#9333ea" />
        <rect x="100" y="14" width="54" height="6" fill="#9333ea" />
        <text x="104" y="17" fontSize="7" fill="white" fontWeight="bold">PDF</text>
        <rect x="108" y="28" width="38" height="3" rx="1.5" fill="white" fillOpacity="0.7" />
        <rect x="108" y="34" width="30" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="108" y="39" width="34" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="108" y="44" width="28" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="108" y="52" width="38" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="108" y="57" width="32" height="2" rx="1" fill="white" fillOpacity="0.3" />
      </g>
      <circle cx="148" cy="10" r="8" fill="#16a34a" />
      <path d="M144 10 L147 13 L152 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "split-pdf": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="sp-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff7ed" /><stop offset="1" stopColor="#ffedd5" />
        </linearGradient>
        <linearGradient id="sp-main" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fdba74" /><stop offset="1" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="sp-part" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fed7aa" /><stop offset="1" stopColor="#fb923c" />
        </linearGradient>
        <filter id="sp-shadow"><feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.15" /></filter>
        <filter id="sp-shadow2"><feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.12" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#sp-bg)" />
      <g filter="url(#sp-shadow)">
        <rect x="6" y="6" width="48" height="78" rx="5" fill="url(#sp-main)" />
        <rect x="6" y="6" width="48" height="13" rx="5" fill="#ea580c" />
        <rect x="6" y="13" width="48" height="6" fill="#ea580c" />
        <text x="10" y="16" fontSize="7" fill="white" fontWeight="bold">PDF</text>
        <rect x="13" y="26" width="32" height="2.5" rx="1.2" fill="white" fillOpacity="0.7" />
        <rect x="13" y="31" width="28" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="13" y="36" width="30" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <line x1="13" y1="42" x2="46" y2="42" stroke="white" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.5" />
        <rect x="13" y="46" width="32" height="2.5" rx="1.2" fill="white" fillOpacity="0.7" />
        <rect x="13" y="51" width="26" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="13" y="56" width="30" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <line x1="13" y1="62" x2="46" y2="62" stroke="white" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.5" />
        <rect x="13" y="66" width="32" height="2.5" rx="1.2" fill="white" fillOpacity="0.7" />
        <rect x="13" y="71" width="28" height="2" rx="1" fill="white" fillOpacity="0.5" />
      </g>
      <circle cx="72" cy="45" r="10" fill="#f97316" fillOpacity="0.15" />
      <circle cx="68" cy="42" r="4" stroke="#f97316" strokeWidth="2" fill="none" />
      <circle cx="68" cy="48" r="4" stroke="#f97316" strokeWidth="2" fill="none" />
      <path d="M71 40 L80 34" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <path d="M71 50 L80 56" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 45 L80 45" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <g filter="url(#sp-shadow2)">
        <rect x="88" y="4" width="66" height="22" rx="4" fill="url(#sp-part)" />
        <rect x="88" y="4" width="66" height="8" rx="4" fill="#ea580c" fillOpacity="0.8" />
        <rect x="88" y="8" width="66" height="4" fill="#ea580c" fillOpacity="0.8" />
        <text x="92" y="10" fontSize="5.5" fill="white" fontWeight="bold">PART 1</text>
        <rect x="94" y="16" width="40" height="2" rx="1" fill="white" fillOpacity="0.7" />
        <rect x="94" y="20" width="32" height="2" rx="1" fill="white" fillOpacity="0.5" />
      </g>
      <g filter="url(#sp-shadow2)">
        <rect x="88" y="34" width="66" height="22" rx="4" fill="url(#sp-part)" />
        <rect x="88" y="34" width="66" height="8" rx="4" fill="#ea580c" fillOpacity="0.8" />
        <rect x="88" y="38" width="66" height="4" fill="#ea580c" fillOpacity="0.8" />
        <text x="92" y="40" fontSize="5.5" fill="white" fontWeight="bold">PART 2</text>
        <rect x="94" y="46" width="40" height="2" rx="1" fill="white" fillOpacity="0.7" />
        <rect x="94" y="50" width="32" height="2" rx="1" fill="white" fillOpacity="0.5" />
      </g>
      <g filter="url(#sp-shadow2)">
        <rect x="88" y="64" width="66" height="22" rx="4" fill="url(#sp-part)" />
        <rect x="88" y="64" width="66" height="8" rx="4" fill="#ea580c" fillOpacity="0.8" />
        <rect x="88" y="68" width="66" height="4" fill="#ea580c" fillOpacity="0.8" />
        <text x="92" y="70" fontSize="5.5" fill="white" fontWeight="bold">PART 3</text>
        <rect x="94" y="76" width="40" height="2" rx="1" fill="white" fillOpacity="0.7" />
        <rect x="94" y="80" width="32" height="2" rx="1" fill="white" fillOpacity="0.5" />
      </g>
    </svg>
  ),
  "delete-pages-pdf": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dp-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef2f2" /><stop offset="1" stopColor="#fee2e2" />
        </linearGradient>
        <linearGradient id="dp-main" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fca5a5" /><stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <filter id="dp-shadow"><feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.18" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#dp-bg)" />
      <g filter="url(#dp-shadow)">
        <rect x="20" y="6" width="54" height="78" rx="5" fill="url(#dp-main)" />
        <rect x="20" y="6" width="54" height="13" rx="5" fill="#dc2626" />
        <rect x="20" y="13" width="54" height="6" fill="#dc2626" />
        <text x="24" y="16" fontSize="7" fill="white" fontWeight="bold">PDF</text>
        <rect x="27" y="26" width="34" height="2.5" rx="1.2" fill="white" fillOpacity="0.7" />
        <rect x="27" y="31" width="28" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <g opacity="0.5">
          <rect x="27" y="38" width="34" height="14" rx="2" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M27 38 L61 52 M61 38 L27 52" stroke="white" strokeWidth="1.5" />
        </g>
        <rect x="27" y="56" width="34" height="2.5" rx="1.2" fill="white" fillOpacity="0.7" />
        <rect x="27" y="61" width="26" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="27" y="66" width="30" height="2" rx="1" fill="white" fillOpacity="0.4" />
      </g>
      <g transform="translate(95, 30)">
        <circle cx="30" cy="20" r="26" fill="#dc2626" fillOpacity="0.12" />
        <path d="M18 16 L42 16 L40 40 C40 42 38 44 36 44 L24 44 C22 44 20 42 20 40 Z" fill="#dc2626" fillOpacity="0.8" />
        <rect x="15" y="12" width="30" height="4" rx="2" fill="#dc2626" />
        <rect x="24" y="8" width="12" height="4" rx="2" fill="#dc2626" />
        <line x1="25" y1="22" x2="25" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="22" x2="30" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="35" y1="22" x2="35" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  ),
  "add-watermark-pdf": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="wm-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ecfeff" /><stop offset="1" stopColor="#cffafe" />
        </linearGradient>
        <linearGradient id="wm-main" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#67e8f9" /><stop offset="1" stopColor="#0891b2" />
        </linearGradient>
        <filter id="wm-shadow"><feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.18" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#wm-bg)" />
      <g filter="url(#wm-shadow)">
        <rect x="30" y="6" width="100" height="78" rx="6" fill="url(#wm-main)" />
        <rect x="30" y="6" width="100" height="14" rx="6" fill="#0e7490" />
        <rect x="30" y="14" width="100" height="6" fill="#0e7490" />
        <text x="36" y="17" fontSize="7" fill="white" fontWeight="bold">DOCUMENT.PDF</text>
        <rect x="40" y="28" width="70" height="2.5" rx="1.2" fill="white" fillOpacity="0.6" />
        <rect x="40" y="34" width="60" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="40" y="39" width="65" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="40" y="52" width="70" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="40" y="57" width="55" height="2" rx="1" fill="white" fillOpacity="0.3" />
        <rect x="40" y="62" width="60" height="2" rx="1" fill="white" fillOpacity="0.3" />
        <text
          x="80" y="55"
          fontSize="16" fontWeight="bold"
          fill="white" fillOpacity="0.35"
          textAnchor="middle"
          transform="rotate(-30 80 55)"
        >
          CONFIDENTIAL
        </text>
      </g>
      <circle cx="130" cy="18" r="9" fill="#0891b2" />
      <path d="M130 12 C133 17 133 20 130 23 C127 20 127 17 130 12 Z" fill="white" />
    </svg>
  ),
  "pdf-to-word": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="pw-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eff6ff" /><stop offset="1" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="pw-pdf" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#93c5fd" /><stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="pw-word" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#dbeafe" /><stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="pw-shadow"><feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.18" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#pw-bg)" />
      <g filter="url(#pw-shadow)">
        <rect x="6" y="8" width="50" height="74" rx="5" fill="url(#pw-pdf)" />
        <rect x="6" y="8" width="50" height="14" rx="5" fill="#1d4ed8" />
        <rect x="6" y="16" width="50" height="6" fill="#1d4ed8" />
        <text x="11" y="18" fontSize="8" fill="white" fontWeight="bold">PDF</text>
        <rect x="14" y="30" width="34" height="3" rx="1.5" fill="white" fillOpacity="0.8" />
        <rect x="14" y="36" width="28" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="14" y="41" width="32" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="14" y="48" width="28" height="10" rx="3" fill="white" fillOpacity="0.2" />
        <rect x="14" y="61" width="34" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="14" y="66" width="26" height="2" rx="1" fill="white" fillOpacity="0.3" />
        <rect x="14" y="71" width="30" height="2" rx="1" fill="white" fillOpacity="0.3" />
      </g>
      <circle cx="86" cy="45" r="12" fill="#3b82f6" fillOpacity="0.15" />
      <path d="M79 45 L93 45" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 41 L93 45 L88 49" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g filter="url(#pw-shadow)">
        <rect x="104" y="8" width="50" height="74" rx="5" fill="url(#pw-word)" />
        <rect x="104" y="8" width="50" height="22" rx="5" fill="#2563eb" />
        <rect x="104" y="22" width="50" height="8" fill="#2563eb" />
        <text x="116" y="24" fontSize="20" fill="white" fontWeight="bold">W</text>
        <rect x="112" y="36" width="36" height="3" rx="1.5" fill="#2563eb" fillOpacity="0.5" />
        <rect x="112" y="42" width="30" height="2.5" rx="1.2" fill="#2563eb" fillOpacity="0.35" />
        <rect x="112" y="47" width="34" height="2.5" rx="1.2" fill="#2563eb" fillOpacity="0.35" />
        <rect x="112" y="52" width="28" height="2" rx="1" fill="#2563eb" fillOpacity="0.25" />
        <rect x="112" y="59" width="36" height="2" rx="1" fill="#2563eb" fillOpacity="0.3" />
        <rect x="112" y="64" width="26" height="2" rx="1" fill="#2563eb" fillOpacity="0.25" />
        <rect x="112" y="69" width="30" height="2" rx="1" fill="#2563eb" fillOpacity="0.25" />
        <text x="106" y="77" fontSize="6" fill="#1e3a8a" fontWeight="bold">.DOCX — EDITABLE</text>
      </g>
    </svg>
  ),
  "jpg-to-pdf": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="jp-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0fdf4" /><stop offset="1" stopColor="#dcfce7" />
        </linearGradient>
        <linearGradient id="jp-img1" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#86efac" /><stop offset="1" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="jp-img2" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4ade80" /><stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="jp-pdf" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#bbf7d0" /><stop offset="1" stopColor="#22c55e" />
        </linearGradient>
        <filter id="jp-shadow"><feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.15" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#jp-bg)" />
      <g filter="url(#jp-shadow)">
        <rect x="4" y="22" width="50" height="34" rx="4" fill="url(#jp-img1)" fillOpacity="0.4" stroke="#22c55e" strokeWidth="1" />
        <rect x="8" y="16" width="50" height="34" rx="4" fill="url(#jp-img1)" fillOpacity="0.6" stroke="#22c55e" strokeWidth="1" />
        <rect x="12" y="10" width="50" height="36" rx="4" fill="url(#jp-img2)" />
        <rect x="12" y="10" width="50" height="10" rx="4" fill="#15803d" fillOpacity="0.4" />
        <circle cx="24" cy="22" r="5" fill="#fde68a" fillOpacity="0.8" />
        <path d="M18 38 L28 22 L38 32 L44 24 L58 38" fill="#15803d" fillOpacity="0.5" />
        <path d="M18 38 L28 22 L38 32 L44 24 L58 38" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <text x="14" y="52" fontSize="6" fill="white" fontWeight="bold">JPG/PNG</text>
      </g>
      <circle cx="86" cy="45" r="12" fill="#22c55e" fillOpacity="0.15" />
      <path d="M79 45 L93 45" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 41 L93 45 L88 49" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g filter="url(#jp-shadow)">
        <rect x="100" y="6" width="54" height="78" rx="5" fill="url(#jp-pdf)" />
        <rect x="100" y="6" width="54" height="13" rx="5" fill="#16a34a" />
        <rect x="100" y="13" width="54" height="6" fill="#16a34a" />
        <text x="104" y="16" fontSize="7" fill="white" fontWeight="bold">PDF</text>
        <rect x="107" y="24" width="40" height="26" rx="3" fill="#16a34a" fillOpacity="0.3" />
        <circle cx="115" cy="32" r="4" fill="#fde68a" fillOpacity="0.7" />
        <path d="M109 44 L118 32 L126 38 L132 30 L145 44" fill="#16a34a" fillOpacity="0.3" />
        <path d="M109 44 L118 32 L126 38 L132 30 L145 44" stroke="white" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <rect x="107" y="55" width="40" height="2.5" rx="1.2" fill="#16a34a" fillOpacity="0.5" />
        <rect x="107" y="60" width="32" height="2" rx="1" fill="#16a34a" fillOpacity="0.35" />
        <rect x="107" y="65" width="36" height="2" rx="1" fill="#16a34a" fillOpacity="0.35" />
        <rect x="107" y="70" width="28" height="2" rx="1" fill="#16a34a" fillOpacity="0.25" />
      </g>
    </svg>
  ),
  "pdf-to-jpg": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="pj-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fdf2f8" /><stop offset="1" stopColor="#fce7f3" />
        </linearGradient>
        <linearGradient id="pj-pdf" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fbcfe8" /><stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="pj-img" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f9a8d4" /><stop offset="1" stopColor="#db2777" />
        </linearGradient>
        <filter id="pj-shadow"><feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.18" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#pj-bg)" />
      <g filter="url(#pj-shadow)">
        <rect x="6" y="8" width="50" height="74" rx="5" fill="url(#pj-pdf)" />
        <rect x="6" y="8" width="50" height="14" rx="5" fill="#db2777" />
        <rect x="6" y="16" width="50" height="6" fill="#db2777" />
        <text x="11" y="18" fontSize="8" fill="white" fontWeight="bold">PDF</text>
        <rect x="14" y="30" width="34" height="3" rx="1.5" fill="white" fillOpacity="0.8" />
        <rect x="14" y="36" width="28" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="14" y="41" width="32" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="14" y="48" width="28" height="10" rx="3" fill="white" fillOpacity="0.2" />
        <rect x="14" y="61" width="34" height="2" rx="1" fill="white" fillOpacity="0.4" />
      </g>
      <circle cx="86" cy="45" r="12" fill="#ec4899" fillOpacity="0.15" />
      <path d="M79 45 L93 45" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 41 L93 45 L88 49" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g filter="url(#pj-shadow)">
        <rect x="104" y="14" width="50" height="38" rx="5" fill="url(#pj-img)" />
        <circle cx="116" cy="26" r="4" fill="#fde68a" fillOpacity="0.8" />
        <path d="M108 44 L118 30 L126 36 L134 26 L148 44" fill="white" fillOpacity="0.3" />
        <path d="M108 44 L118 30 L126 36 L134 26 L148 44" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <text x="107" y="12" fontSize="6" fill="#be185d" fontWeight="bold">.JPG</text>
      </g>
      <g filter="url(#pj-shadow)">
        <rect x="104" y="56" width="50" height="26" rx="4" fill="url(#pj-img)" fillOpacity="0.7" />
        <text x="112" y="72" fontSize="7" fill="white" fontWeight="bold">.PNG</text>
      </g>
    </svg>
  ),
  "word-to-pdf": (
    <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="wp-bg" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eef2ff" /><stop offset="1" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="wp-word" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a5b4fc" /><stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="wp-pdf" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c7d2fe" /><stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <filter id="wp-shadow"><feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.18" /></filter>
      </defs>
      <rect width="160" height="90" rx="10" fill="url(#wp-bg)" />
      <g filter="url(#wp-shadow)">
        <rect x="6" y="8" width="50" height="74" rx="5" fill="url(#wp-word)" />
        <rect x="6" y="8" width="50" height="22" rx="5" fill="#4338ca" />
        <rect x="6" y="22" width="50" height="8" fill="#4338ca" />
        <text x="18" y="24" fontSize="20" fill="white" fontWeight="bold">W</text>
        <rect x="14" y="36" width="34" height="3" rx="1.5" fill="white" fillOpacity="0.7" />
        <rect x="14" y="42" width="28" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="14" y="47" width="32" height="2.5" rx="1.2" fill="white" fillOpacity="0.5" />
        <rect x="14" y="52" width="26" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="14" y="59" width="34" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="14" y="64" width="24" height="2" rx="1" fill="white" fillOpacity="0.3" />
        <text x="8" y="77" fontSize="6" fill="white" fontWeight="bold" fillOpacity="0.9">.DOCX</text>
      </g>
      <circle cx="86" cy="45" r="12" fill="#6366f1" fillOpacity="0.15" />
      <path d="M79 45 L93 45" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 41 L93 45 L88 49" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g filter="url(#wp-shadow)">
        <rect x="104" y="8" width="50" height="74" rx="5" fill="url(#wp-pdf)" />
        <rect x="104" y="8" width="50" height="14" rx="5" fill="#4f46e5" />
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

export function ToolCard({ tool }: { tool: Tool }) {
  const { t } = useI18n();
  const preview = toolPreviews[tool.id];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-card rounded-xl border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
    >
      {/* 3D Preview Header */}
      <div className="h-36 w-full bg-muted/30 border-b border-border/40 overflow-hidden relative">
        {preview ? (
          preview
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <BookOpen className="w-8 h-8 opacity-40" />
          </div>
        )}
        
        {tool.badge && (
          <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm ${badgeStyles[tool.badge] || "bg-primary/10 text-primary"}`}>
            {t(`badges.${tool.badge}`)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
            {t(`tools.${tool.id}.title`)}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
            {t(`tools.${tool.id}.description`)}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between">
          <Link
            to={tool.path}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span>{t("common.getStarted")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex items-center gap-1 text-xs text-muted-foreground/80">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t("common.freeSecure")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
