"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, type Language } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// VECTOR CIRCULAR FLAG BADGES (Retina-Crisp, Self-Contained, Zero Asset 404s)
// ============================================================================

function FlagUK() {
  return (
    <svg className="size-4.5 rounded-full overflow-hidden shrink-0 shadow-xs" viewBox="0 0 60 60">
      <clipPath id="flag-uk-circle">
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath="url(#flag-uk-circle)">
        <path fill="#012169" d="M0 0h60v60H0z" />
        <path stroke="#fff" strokeWidth="8" d="M0 0l60 60M60 0L0 60" />
        <path stroke="#C8102E" strokeWidth="5" d="M0 0l60 60M60 0L0 60" />
        <path stroke="#fff" strokeWidth="12" d="M30 0v60M0 30h60" />
        <path stroke="#C8102E" strokeWidth="7" d="M30 0v60M0 30h60" />
      </g>
    </svg>
  );
}

function FlagIndia() {
  return (
    <svg className="size-4.5 rounded-full overflow-hidden shrink-0 shadow-xs" viewBox="0 0 60 60">
      <clipPath id="flag-in-circle">
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath="url(#flag-in-circle)">
        <path fill="#FF9933" d="M0 0h60v20H0z" />
        <path fill="#FFFFFF" d="M0 20h60v20H0z" />
        <path fill="#128807" d="M0 40h60v20H0z" />
        <circle cx="30" cy="30" r="6" fill="none" stroke="#000088" strokeWidth="1.2" />
        <circle cx="30" cy="30" r="1.5" fill="#000088" />
      </g>
    </svg>
  );
}

function FlagMaharashtra() {
  return (
    <svg className="size-4.5 rounded-full overflow-hidden shrink-0 shadow-xs" viewBox="0 0 60 60">
      <clipPath id="flag-mr-circle">
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath="url(#flag-mr-circle)">
        <path fill="#FF5500" d="M0 0h60v20H0z" />
        <path fill="#FFFFFF" d="M0 20h60v20H0z" />
        <path fill="#128807" d="M0 40h60v20H0z" />
        <circle cx="30" cy="30" r="6" fill="none" stroke="#FF5500" strokeWidth="1.4" />
        <circle cx="30" cy="30" r="1.8" fill="#FF5500" />
      </g>
    </svg>
  );
}

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: React.FC;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: FlagUK },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: FlagIndia },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", flag: FlagMaharashtra },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: "dropdown" | "drawer" | "pill";
  theme?: "light" | "dark" | "glass";
}

/**
 * LanguageSwitcher Component
 * 
 * Precision pill dropdown matching the exact visual provided in user feedback:
 * - Rounded pill trigger with circular flag, language name, and chevron arrow
 * - Floating rounded popover card with flag icons and high-contrast hover feedback
 * - Outside-click auto-close with keyboard navigation support
 */
export function LanguageSwitcher({
  className,
  variant = "dropdown",
  theme = "light",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentOpt = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const ActiveFlag = currentOpt.flag;

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isDark = theme === "dark" || theme === "glass";

  // Drawer / Mobile layout format
  if (variant === "drawer") {
    return (
      <div className={cn("flex flex-col gap-2 w-full", className)}>
        <span
          className={cn(
            "text-[11px] font-mono uppercase tracking-wider",
            isDark ? "text-white/60" : "text-[#625D55]"
          )}
        >
          Language / भाषा:
        </span>
        <div className="grid grid-cols-3 gap-2 w-full">
          {LANGUAGES.map((opt) => {
            const isActive = language === opt.code;
            const Flag = opt.flag;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => setLanguage(opt.code)}
                className={cn(
                  "py-2 px-2.5 rounded-xl flex items-center justify-center gap-2 border transition-all duration-200 cursor-pointer text-xs font-semibold",
                  isActive
                    ? "bg-[#FF5500] text-white border-[#FF5500] shadow-sm"
                    : isDark
                      ? "bg-white/10 text-white border-white/15 hover:bg-white/20 hover:border-white/30"
                      : "bg-white text-[#1F1F1E] border-[#E8E2D9] hover:border-[#1F1F1E]"
                )}
              >
                <Flag />
                <span>{opt.nativeLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Exact Match to Screenshot: Floating Pill Trigger + Dropdown Card
  return (
    <div ref={containerRef} className={cn("relative inline-block text-left shrink-0", className)}>
      {/* Pill Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group flex items-center gap-2 py-1.5 px-3 rounded-full border transition-all shadow-xs cursor-pointer select-none",
          isDark
            ? isOpen
              ? "bg-white/25 border-white/40 text-white"
              : "bg-white/10 hover:bg-white/20 border-white/15 text-white"
            : isOpen
              ? "border-[#1F1F1E] ring-2 ring-[#1F1F1E]/5 bg-[#FAF8F5] text-[#1F1F1E]"
              : "border-[#E8E2D9] hover:border-[#1F1F1E] hover:bg-[#FAF8F5] text-[#1F1F1E]"
        )}
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <ActiveFlag />
        <span
          className={cn(
            "text-xs font-semibold tracking-tight font-sans whitespace-nowrap",
            isDark ? "text-white" : "text-[#1F1F1E]"
          )}
        >
          {currentOpt.nativeLabel}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200 shrink-0",
            isDark
              ? "text-white/70 group-hover:text-white"
              : "text-[#625D55] group-hover:text-[#1F1F1E]",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Floating Dropdown Card (Exact Styling as Provided in Screenshot) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full mt-2 right-0 z-[100] min-w-[155px] bg-white border border-[#E8E2D9] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.25)] p-1.5 overflow-hidden text-[#1F1F1E]"
          >
            <div className="flex flex-col gap-0.5">
              {LANGUAGES.map((opt) => {
                const isActive = language === opt.code;
                const Flag = opt.flag;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer text-left",
                      isActive
                        ? "bg-[#FAF8F5] text-[#FF5500]"
                        : "text-[#1F1F1E] hover:bg-[#FAF8F5] hover:text-[#FF5500]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Flag />
                      <span className="font-sans whitespace-nowrap">{opt.nativeLabel}</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
