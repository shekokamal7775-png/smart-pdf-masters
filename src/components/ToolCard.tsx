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

// 3D-style SVG previews with gradients and shadows
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
      {/* File 1 */}
      <g filter="url(#mg-shadow)">
        <rect x="8" y="10" width="36" height="46" rx="4" fill="url(#mg-card1)" />
        <rect x="8" y="10" width="36" height="10" rx="4" fill="#f43f5e" />
        <rect x="13" y="26" width="22" height="2.5" rx="1.2" fill="white" fillOpacity="0.8" />
        <rect x="13" y="31" width="18" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="13" y="36" width="20" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="13" y="41" width="14" height="2" rx="1" fill="white" fillOpacity="0.4" />
        <text x="11" y="21" fontSize="6" fill="white" fontWeight="bold">PDF</text>
      </g>
      {/* File 2 */}
      <g filter="url(#mg-shadow)">
        <rect x="8" y="62" width="36" height="20" rx="4" fill="url(#mg-card2)" />
        <rect x="13" y="68" width="22" height="2" rx="1" fill="white" fillOpacity="0.8" />
        <rect x="13" y="73" width="16" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <text x="32" y="79" fontSize="5" fill="white" fontWeight="bold" fillOpacity="0.7">PDF</text>
      </g>
      {/* Arrow */}
      <circle cx="60" cy="45" r="10" fill="#f43f5e" fillOpacity="0.15" />
      <path d="M55 45 L65 45" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M61 41 L65 45 L61 49" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Result */}
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
      {/* Big PDF */}
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
      {/* Arrow with compress badge */}
      <g>
        <circle cx="85" cy="45" r="12" fill="#f59e0b" fillOpacity="0.2" />
        <path d="M79 45 L91 45" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M87 41 L91 45 L87 49" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M82 38 L82 34 M82 52 L82 56" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      </g>
      {/* Small PDF */}
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
      {/* Down arrow badge */}
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
      {/* Sideways PDF */}
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
      {/* Rotation arrows */}
      <g>
        <path d="M68 22 C76 12 90 12 94 22" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M91 18 L94 22 L90 25" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M68 68 C76 78 90 78 94 68" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M71 72 L68 68 L72 65" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="81" cy="45" r="10" fill="#a855f7" fillOpacity="0.15" />
        <text x="76" y="49" fontSize="12" fill="#9333ea">↻</text>
      </g>
      {/* Correct PDF */}
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
      {/* Check badge */}
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
      {/* Source PDF */}
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
      {/* Scissors */}
      <circle cx="72" cy="45" r="10" fill="#f97316" fillOpacity="0.15" />
      <circle cx="68" cy="42" r="4" stroke="#f97316" strokeWidth="2" fill="none" />
      <circle cx="68" cy="48" r="4" stroke="#f97316" strokeWidth="2" fill="none" />
      <path d="M71 40 L80 34" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <path d="M71 50 L80 56" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 45 L80 45" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      {/* Parts */}
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
      {/* PDF Source */}
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
      {/* Arrow */}
      <circle cx="86" cy="45" r="12" fill="#3b82f6" fillOpacity="0.15" />
      <path d="M79 45 L93 45" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 41 L93 45 L88 49" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Word Result */}
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
      {/* Image stack */}
      <g filter="url(#jp-shadow)">
        <rect x="4" y="22" width="50" height="34" rx="4" fill="url(#jp-img1)" fillOpacity="0.4" stroke="#22c55e" strokeWidth="1" />
        <rect x="8" y="16" width="50" height="34" rx="4" fill="url(#jp-img1)" fillOpacity="0.6" stroke="#22c55e" strokeWidth="1" />
        <rect x="12" y="10" width="50" height="36" rx="4" fill="url(#jp-img2)" />
        {/* Mountain scene */}
        <rect x="12" y="10" width="50" height="10" rx="4" fill="#15803d" fillOpacity="0.4" />
        <circle cx="24" cy="22" r="5" fill="#fde68a" fillOpacity="0.8" />
        <path d="M18 38 L28 22 L38 32 L44 24 L58 38" fill="#15803d" fillOpacity="0.5" />
        <path d="M18 38 L28 22 L38 32 L44 24 L58 38" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <text x="14" y="52" fontSize="6" fill="white" fontWeight="bold">JPG/PNG</text>
      </g>
      {/* Arrow */}
      <circle cx="86" cy="45" r="12" fill="#22c55e" fillOpacity="0.15" />
      <path d="M79 45 L93 45" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 41 L93 45 L88 49" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* PDF result */}
      <g filter="url(#jp-shadow)">
        <rect x="100" y="6" width="54" height="78" rx="5" fill="url(#jp-pdf)" />
        <rect x="100" y="6" width="54" height="13" rx="5" fill="#16a34a" />
        <rect x="100" y="13" width="54" height="6" fill="#16a34a" />
        <text x="104" y="16" fontSize="7" fill="white" fontWeight="bold">PDF</text>
        {/* Image inside PDF */}
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
};

const quickBenefits = [
  { label: "Free", icon: "✓" },
  { label: "Secure", icon: "✓" },
  { label: "No Sign-up", icon: "✓" },
];

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const { t, lang } = useI18n();
  const Icon = tool.icon;
  const preview = toolPreviews[tool.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      className="flex flex-col h-full"
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex flex-col h-full"
      >
        <Link
          to="/tools/$slug"
          params={{ slug: tool.slug }}
          className="group relative flex flex-col rounded-2xl border border-border bg-gradient-card shadow-soft hover:shadow-elegant hover:border-primary/30 overflow-hidden transition-colors duration-300"
        >
          {/* Badge */}
          {tool.badge && (
            <span className={`absolute top-3 end-3 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm ${badgeStyles[tool.badge]}`}>
              {t(`common.${tool.badge}`)}
            </span>
          )}

          {/* SVG Preview */}
          {preview ? (
            <div
              className="w-full h-32 overflow-hidden rounded-t-2xl"
              role="img"
              aria-label={`${tool.title.en} — free online PDF tool`}
            >
              {preview}
            </div>
          ) : (
            <div className="w-full h-32 flex items-center justify-center rounded-t-2xl bg-gradient-to-br from-secondary/50 to-secondary/20">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tool.bg} ${tool.color} shadow-lg`}>
                <Icon className="h-8 w-8" strokeWidth={2} />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-2">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tool.bg} ${tool.color} shadow-sm transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <h3 className="font-display text-base font-bold leading-tight">{tool.title[lang]}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-3">
              {tool.desc[lang]}
            </p>

            {/* Quick Benefits */}
            <div className="flex items-center gap-3 mb-3">
              {quickBenefits.map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3 w-3" />
                  {b.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {lang === "ar" ? "ابدأ الآن" : "Open tool"}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Related Article */}
      {tool.relatedArticle && (
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Link
            to="/blog/$slug"
            params={{ slug: tool.relatedArticle.slug }}
            className="mt-2 flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/30 px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-secondary/60 transition-all duration-200 group"
          >
            <BookOpen className="h-3.5 w-3.5 flex-shrink-0 text-primary/70 group-hover:text-primary transition-colors" />
            <span className="line-clamp-1 flex-1">
              {lang === "ar" ? "اقرأ الدليل: " : "Read guide: "}
              <span className="font-medium">{tool.relatedArticle.title}</span>
            </span>
            <ArrowRight className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 rtl:rotate-180" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
