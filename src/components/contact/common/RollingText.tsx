"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { translateTextForDOM } from "@/lib/autoTranslations";

interface RollingTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  singleLine?: boolean;
}

/**
 * RollingText Component
 *
 * Signature staggered character/word rolling animation with full language support.
 * Uses word-level animation for Devanagari scripts (hi/mr) so matras & ligatures
 * remain intact while animating cleanly.
 */
export function RollingText({
  text,
  className,
  charClassName,
  singleLine = false,
}: RollingTextProps) {
  const { language } = useLanguage();
  const displayText =
    language !== "en" ? translateTextForDOM(text, language) || text : text;
  const isIndic = /[\u0900-\u097F]/.test(displayText);
  const words = displayText.split(" ");
  let globalIndex = 0;

  return (
    <span
      data-no-translate="true"
      className={cn(
        "inline-flex overflow-hidden leading-tight",
        singleLine ? "flex-nowrap whitespace-nowrap" : "flex-wrap",
        className
      )}
    >
      {words.map((word, wordIdx) => {
        const units = isIndic ? [word] : word.split("");
        const wordEl = (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {units.map((unit, unitIdx) => {
              const idx = globalIndex++;
              const delayMs = isIndic ? idx * 65 : idx * 16;
              return (
                <span
                  key={unitIdx}
                  className="relative inline-block overflow-hidden h-[1.2em] align-middle"
                >
                  {/* Primary Unit sliding up */}
                  <span
                    style={{ transitionDelay: `${delayMs}ms` }}
                    className={cn(
                      "inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full will-change-transform",
                      charClassName
                    )}
                  >
                    {unit}
                  </span>

                  {/* Secondary Unit sliding in from below */}
                  <span
                    aria-hidden="true"
                    style={{ transitionDelay: `${delayMs}ms` }}
                    className={cn(
                      "absolute left-0 top-full inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-[#FF5500] will-change-transform",
                      charClassName
                    )}
                  >
                    {unit}
                  </span>
                </span>
              );
            })}
          </span>
        );

        const hasSpaceAfter = wordIdx < words.length - 1;
        if (hasSpaceAfter) {
          globalIndex++;
        }

        return (
          <React.Fragment key={wordIdx}>
            {wordEl}
            {hasSpaceAfter && (
              <span className="inline-block whitespace-pre">{" "}</span>
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
}
