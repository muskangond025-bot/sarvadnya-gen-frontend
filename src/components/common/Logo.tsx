"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "on-dark";
  className?: string;
  iconOnly?: boolean;
}

/**
 * Logo Component
 * 
 * Luxury architectural brand emblem & typography:
 * - High-contrast automotive marque styling inspired by spykercars.com
 * - Vector SVG electric crest that never fails or renders as a broken image
 * - Monospace precision tracking
 * - Supports default (light background) and on-dark (footer/dark mode) variants
 */
export default function Logo({
  variant = "default",
  className,
  iconOnly = false,
}: LogoProps) {
  const isOnDark = variant === "on-dark";

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none", className)}
      aria-label="Sarvadnya Generators Home"
    >
      {/* Precision Circular Power Crest */}
      <div
        className={cn(
          "size-9 sm:size-10 rounded-full flex items-center justify-center shadow-xs transition-all duration-300",
          isOnDark
            ? "bg-white/10 border border-white/20 group-hover:border-[#FF5500] group-hover:bg-[#FF5500]"
            : "bg-[#1F1F1E] border border-[#FF5500]/40 group-hover:border-[#FF5500] group-hover:bg-[#FF5500]"
        )}
      >
        <Zap className="size-4 sm:size-4.5 text-[#FF5500] fill-[#FF5500] group-hover:text-white group-hover:fill-white transition-colors duration-300" />
      </div>

      {/* Architectural Wordmark Typography */}
      {!iconOnly && (
        <div className="flex flex-col text-left leading-none gap-0.5">
          <span
            className={cn(
              "font-sans font-extrabold text-base sm:text-lg tracking-tight transition-colors",
              isOnDark ? "text-white group-hover:text-[#FF5500]" : "text-[#1F1F1E] group-hover:text-[#FF5500]"
            )}
          >
            SARVADNYA
          </span>
          <span
            className={cn(
              "font-mono text-[9px] uppercase tracking-[0.24em] font-semibold",
              isOnDark ? "text-white/60" : "text-[#625D55]"
            )}
          >
            GENERATORS
          </span>
        </div>
      )}
    </Link>
  );
}
