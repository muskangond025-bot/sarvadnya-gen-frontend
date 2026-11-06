import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left" | "right";
  className?: string;
}

/**
 * SectionHeading Component
 * 
 * Editorial, Awwwards-inspired section header following docs/ui-rules.md:
 * - Clean unboxed typography (no capsule pills or lozenges)
 * - Manrope typography
 * - High legibility, zero clipping
 */
export function SectionHeading({
  label,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const displayEyebrow = eyebrow || label;

  const alignClasses = {
    center: "items-center text-center mx-auto",
    left: "items-start text-left",
    right: "items-end text-right ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3.5 max-w-3xl relative",
        alignClasses[align],
        className
      )}
    >
      {/* Clean Unboxed Eyebrow (No pill badge) */}
      {displayEyebrow && (
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF5500] select-none">
          {displayEyebrow}
        </span>
      )}

      {/* Main Section Heading */}
      <h2 className="font-sans font-bold leading-[1.18] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1F1F1E] tracking-tight text-balance">
        {title}
      </h2>

      {/* Supporting Description (Concise & High-Signal) */}
      {description && (
        <p className="text-sm sm:text-base lg:text-lg text-[#625D55] font-normal leading-relaxed max-w-2xl mt-1">
          {description}
        </p>
      )}
    </div>
  );
}
