"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

/**
 * CTAClient Component
 * 
 * Luxury Architectural Conversion Stage:
 * - High-definition, vibrant 3D Electric Power Symbol with concentric energy aura
 * - Zero background text overlap, zero visual noise
 * - Clear, authoritative typography and verified fleet trust markers
 * - Pure bright luxury theme
 */
export function CTAClient({ data }: CTAClientProps) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center select-none py-6 sm:py-10">
      
      {/* Soft Ambient Volumetric Amber Illumination */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] h-[300px] sm:h-[400px] bg-[#FF5500]/[0.08] blur-[130px] rounded-full pointer-events-none z-0" 
      />

      {/* 
        PREMIUM 3D POWER LIGHTNING SYMBOL STAGE
        Vibrant, high-gloss 3D symbol with smooth levitation & energy ripples
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        animate={{
          y: [-6, 6, -6],
        }}
        className="relative z-10 size-28 sm:size-36 md:size-40 flex items-center justify-center mb-6 sm:mb-8"
      >
        {/* Concentric Energy Aura Ripples */}
        <div className="absolute inset-0 rounded-full border border-[#FF5500]/25 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
        <div className="absolute -inset-4 rounded-full bg-[#FF5500]/10 blur-xl pointer-events-none" />

        {/* 3D Glossy Orange Electric Symbol (Full Visual Fidelity) */}
        <img
          src="/images/cta/electric_symbol_3d_orange.png"
          alt="Sarvadnya 3D Electric Power Symbol"
          width={603}
          height={1016}
          className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(255,85,0,0.32)] filter brightness-105 pointer-events-none"
          draggable={false}
        />
      </motion.div>

      {/* 
        FOREGROUND CONVERSION CLUSTER
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
            className="inline-flex items-center justify-center gap-2.5 font-bold font-sans text-sm sm:text-base px-7 py-4 rounded-xl bg-white border border-[#E8E2D9] text-[#1F1F1E] hover:border-[#FF5500]/50 hover:bg-[#FAF8F5] transition-all shadow-xs w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-[#FF5500]" />
            <span>{t("cta.callUs", data.secondaryButtonText)}</span>
          </a>
        </div>
      </motion.div>

    </div>
  );
}
