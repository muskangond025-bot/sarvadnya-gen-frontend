"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "on-dark";
  layout?: "horizontal" | "stacked";
  className?: string;
  iconOnly?: boolean;
  compact?: boolean;
}

/**
 * Logo Component
 *
 * Renders the official Sarvadnya Generator brand identity:
 * - Square double-orange-border G + lightning emblem
 * - Adaptive light (#111315) and on-dark (#FFFFFF) variants
 * - Supports iconOnly, horizontal lockup, and stacked full-emblem lockup
 */
export default function Logo({
  variant = "default",
  layout = "horizontal",
  className,
  iconOnly = false,
  compact = false,
}: LogoProps) {
  const isOnDark = variant === "on-dark";

  if (iconOnly) {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex items-center justify-center group cursor-pointer select-none",
          className
        )}
        aria-label="Sarvadnya Generator Home"
      >
        <img
          src={
            isOnDark
              ? "/images/brand/sarvadnya-emblem-dark.png"
              : "/images/brand/sarvadnya-emblem.png"
          }
          alt="Sarvadnya Generator Logo"
          width={524}
          height={524}
          className="size-11 sm:size-13 object-contain transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />
      </Link>
    );
  }

  if (layout === "stacked") {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex flex-col items-center group cursor-pointer select-none",
          className
        )}
        aria-label="Sarvadnya Generator Home"
      >
        <img
          src={
            isOnDark
              ? "/images/brand/sarvadnya-logo-dark.png"
              : "/images/brand/sarvadnya-logo-full.png"
          }
          alt="Sarvadnya Generator — Power You Can Trust"
          width={704}
          height={659}
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          draggable={false}
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none",
        className
      )}
      aria-label="Sarvadnya Generator Home"
    >
      {/* Square Emblem Frame */}
      <div
        className={cn(
          "shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
          compact ? "size-9 sm:size-10 rounded-xl bg-white p-0.5 shadow-sm" : "size-11 sm:size-12"
        )}
      >
        <img
          src={
            compact || !isOnDark
              ? "/images/brand/sarvadnya-emblem.png"
              : "/images/brand/sarvadnya-emblem-dark.png"
          }
          alt="Sarvadnya Generator Emblem"
          width={524}
          height={524}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Official English + Devanagari Wordmark */}
      <div className="flex flex-col text-left leading-none gap-0.5">
        <span
          className={cn(
            "font-sans font-extrabold tracking-tight uppercase whitespace-nowrap transition-colors",
            compact ? "text-xs sm:text-sm" : "text-sm sm:text-base",
            isOnDark
              ? "text-white group-hover:text-[#FF5500]"
              : "text-[#1F1F1E] group-hover:text-[#FF5500]"
          )}
        >
          SARVADNYA GENERATOR
        </span>
        <span
          className={cn(
            "font-sans font-bold whitespace-nowrap text-[#F36805]",
            compact ? "text-[11px]" : "text-xs sm:text-[13px]"
          )}
        >
          सर्वज्ञ जनरेटर
        </span>
        {!compact && (
          <span
            className={cn(
              "font-mono text-[8.5px] uppercase tracking-[0.22em] font-semibold whitespace-nowrap",
              isOnDark ? "text-white/70" : "text-[#C75B0A]"
            )}
          >
            POWER YOU CAN TRUST
          </span>
        )}
      </div>
    </Link>
  );
}
