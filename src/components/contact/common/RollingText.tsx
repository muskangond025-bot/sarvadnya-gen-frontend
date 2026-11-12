"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RollingTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  singleLine?: boolean;
}

/**
 * RollingText Component
 *
 * Signature staggered character rolling animation.
 * Keeps words intact (no mid-word breaking) and supports single-line mode.
 */
export function RollingText({
  text,
  className,
  charClassName,
  singleLine = false,
}: RollingTextProps) {
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <span
      className={cn(
        "inline-flex overflow-hidden leading-tight",
        singleLine ? "flex-nowrap whitespace-nowrap" : "flex-wrap",
        className
      )}
    >
      {words.map((word, wordIdx) => {
        const chars = word.split("");
        const wordEl = (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {chars.map((char, charIdx) => {
              const idx = globalIndex++;
              return (
                <span
                  key={charIdx}
                  className="relative inline-block overflow-hidden h-[1.15em] align-middle"
                >
                  {/* Primary Character sliding up */}
                  <span
                    style={{ transitionDelay: `${idx * 16}ms` }}
                    className={cn(
                      "inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full will-change-transform",
                      charClassName
                    )}
                  >
                    {char}
                  </span>

                  {/* Secondary Character sliding in from below */}
                  <span
                    aria-hidden="true"
                    style={{ transitionDelay: `${idx * 16}ms` }}
                    className={cn(
                      "absolute left-0 top-full inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-[#FF5500] will-change-transform",
                      charClassName
                    )}
                  >
                    {char}
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
