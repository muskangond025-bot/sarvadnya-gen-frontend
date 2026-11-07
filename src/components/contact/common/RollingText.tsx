"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RollingTextProps {
  text: string;
  className?: string;
  charClassName?: string;
}

/**
 * RollingText Component
 * 
 * Signature Forge Automotive character rolling animation:
 * Each letter rolls vertically on hover with a staggered delay,
 * mimicking luxury split-flap displays and high-end automotive design agency interactions.
 */
export function RollingText({ text, className, charClassName }: RollingTextProps) {
  const characters = text.split("");

  return (
    <span className={cn("inline-flex flex-wrap overflow-hidden leading-tight", className)}>
      {characters.map((char, index) => {
        if (char === " ") {
          return (
            <span key={index} className="inline-block whitespace-pre">
              {" "}
            </span>
          );
        }

        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden h-[1.15em] vertical-align-middle"
          >
            {/* Primary Character sliding up */}
            <span
              style={{ transitionDelay: `${index * 16}ms` }}
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
              style={{ transitionDelay: `${index * 16}ms` }}
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
}

