"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Zap } from "lucide-react";
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

/**
 * CTAClient Component
 * 
 * Re-architected as an open, fluid architectural conversion stage (NO CARDS):
 * - Completely eliminates boxed card borders, background boxes, and nested frames
 * - Subtle ambient navbar logo watermark in the background with warm radial lighting
 * - Preserves exact copy, phone number, and action routes
 * - Zero unwanted text added
 */
export function CTAClient({ data }: CTAClientProps) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center select-none py-4 sm:py-6 lg:py-8">
      
      {/* 
        BACKGROUND 3D ELECTRIC SYMBOL & AMBIENT AURA
        Exact 3D Electric Power Symbol (Envato 2CG6TSH style) with orbital energy rings & warm atmospheric glow
      */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center w-full overflow-visible select-none"
      >
        {/* Soft Warm Radial Amber Glow */}
        <div className="w-[500px] sm:w-[680px] h-[320px] sm:h-[420px] bg-[#FF5500]/[0.10] blur-[120px] rounded-full" />

        {/* Floating 3D Electric Power Symbol */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-1.2, 1.2, -1.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-25 sm:opacity-30 dark:opacity-40"
        >
          <img
            src="/images/cta/electric_symbol_3d_orange.png"
            alt="3D Electric Power Symbol"
            width={603}
            height={1016}
            className="w-[220px] sm:w-[280px] md:w-[320px] h-auto object-contain drop-shadow-[0_24px_48px_rgba(255,85,0,0.35)]"
            draggable={false}
          />

          {/* Watermark Brand Name Under Symbol */}
          <div className="flex flex-col items-center -mt-6 sm:-mt-8 select-none opacity-40">
            <span className="font-sans font-black text-2xl sm:text-3xl tracking-widest uppercase text-[#1F1F1E]">
              SARVADNYA
            </span>
            <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-[#FF5500] -mt-1">
              POWER NASHIK
            </span>
          </div>
        </motion.div>
      </div>

      {/* 
        FOREGROUND CONVERSION CLUSTER (NO CARD BOX, OPEN ARCHITECTURAL FLOW)
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl flex flex-col items-center"
      >
        {/* Simple, Punchy Display Headline */}
        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] tracking-tight text-[#1F1F1E] leading-[1.14] text-balance mb-4 sm:mb-5">
          {t("cta.title")}
        </h2>

        {/* High-Signal Concise Description */}
        <p className="text-base sm:text-lg text-[#625D55] leading-relaxed max-w-2xl mb-8 sm:mb-9 font-normal">
          {t("cta.desc")}
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          {/* Primary Action Button */}
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#FF5500]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <span>{t("cta.button")}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          {/* Secondary Action Button */}
          <a
            href={`tel:${data.contactPhone.replace(/\s+/g, "")}`}
            className="inline-flex items-center justify-center gap-2.5 font-bold font-sans text-sm sm:text-base px-7 py-4 rounded-xl bg-white border border-[#E8E2D9] text-[#1F1F1E] hover:border-[#1F1F1E] hover:bg-[#FAF8F5] transition-all shadow-xs w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-[#FF5500]" />
            <span>{t("cta.callUs", data.secondaryButtonText)}</span>
          </a>
        </div>
      </motion.div>

    </div>
  );
}
