"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export interface CTAData {
  eyebrow?: string;
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  contactPhone: string;
  contactEmail: string;
}

interface CTAClientProps {
  data: CTAData;
}

export function CTAClient({ data }: CTAClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  // Directly link animation to physical scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Scroll-driven inside-out aperture mask with rounded corners
  const insetY = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const insetX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const cardClipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round 32px)`;

  // Scroll-driven physical scale and opacity
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 0.88, 1.0]);

  // Content optical focus & clarity
  const contentScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.0]);
  const ambientGlowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.0]);
  const ambientGlowOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Light Ivory Architectural CTA Card - Dense, Rounded & Premium */}
      <motion.div
        style={{
          clipPath: cardClipPath,
          scale: cardScale,
          opacity: cardOpacity,
        }}
        className="relative bg-[#FFF7EB] border border-[#E8E2D9] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_60px_-15px_rgba(31,31,30,0.08),0_0_0_1px_rgba(232,226,217,0.7)] flex flex-col items-center will-change-[clip-path,transform]"
      >
        {/* Subtle Warm Amber Ambient Glow tied to scroll */}
        <motion.div
          aria-hidden="true"
          style={{
            scale: ambientGlowScale,
            opacity: ambientGlowOpacity,
          }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[540px] h-[260px] bg-[#FF5500]/[0.08] blur-[100px] rounded-full pointer-events-none"
        />

        {/* Main Content Cluster */}
        <motion.div
          style={{ scale: contentScale }}
          className="relative z-10 max-w-2xl flex flex-col items-center text-center gap-4 sm:gap-5"
        >
          {/* Simple, Punchy Headline */}
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] tracking-tight text-[#1F1F1E] leading-[1.18] text-balance">
            {t("cta.title")}
          </h2>

          {/* High-Signal Concise Description */}
          <p className="text-sm sm:text-base text-[#625D55] leading-relaxed max-w-xl">
            {t("cta.desc")}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-sm sm:text-base shadow-md shadow-[#FF5500]/20 transition-all hover:translate-x-0.5 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>{t("cta.button")}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <a
              href={`tel:${data.contactPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 font-semibold font-sans text-sm sm:text-base px-6 py-3.5 rounded-xl bg-white border border-[#E8E2D9] text-[#1F1F1E] hover:border-[#1F1F1E] hover:bg-[#FAF8F5] transition-all shadow-xs w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-[#FF5500]" />
              <span>{data.secondaryButtonText}</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
