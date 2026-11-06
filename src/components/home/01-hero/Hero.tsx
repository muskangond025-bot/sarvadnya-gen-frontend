"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/common";
import { useLanguage } from "@/lib/LanguageContext";
import { HeroClient } from "./HeroClient";

/**
 * Hero Component (Client Component with Multi-Language Support)
 * 
 * Re-architected to Awwwards Site of the Day / Luxury Marque standard:
 * - Full-screen / full-bleed immersive photographic stage
 * - Light luminous overlay (NOT dark/pitch-black) preserving the natural warmth
 * - Zero unwanted text pills, zero decorative badges
 * - Exact data and operational facts strictly preserved
 * - Realtime multi-language support (English, Hindi, Marathi)
 */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF8F5] border-b border-[#E8E2D9]">
      {/* 
        Full-Screen Photographic Background
        Provides cinematic depth across the entire viewport
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/story-main.png"
          alt="Sarvadnya Industrial & Event Power Operations"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter saturate-[0.8] contrast-[1.05]"
        />

        {/* 
          LIGHT OVERLAY (NOT DARK OVERLAY)
          Refined luminous ivory scrim & directional gradient:
          - High opacity ivory on the left behind the text for perfect contrast and readability
          - Gentle luminous gradient across the right letting the full-screen photo show through with clarity
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-[#FAF8F5]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/70 via-transparent to-[#FAF8F5] pointer-events-none" />

        {/* Subtle ambient amber warmth */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-[#FF5500]/[0.06] blur-[140px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Conversion */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 lg:gap-8 max-w-2xl">
            {/* Primary Display Heading - No unwanted text pills */}
            <h1 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1F1F1E] tracking-tight leading-[1.12] text-balance">
              {t("hero.title1")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-[#FF5500]">{t("hero.title2")}</span>
            </h1>

            {/* Supporting Copy (High-Signal, High Contrast, No Bloat) */}
            <p className="text-base sm:text-lg text-[#403C36] leading-relaxed max-w-xl font-normal">
              {t("hero.desc")}
            </p>

            {/* Primary & Secondary Conversion Actions */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto pt-1">
              <Button href="/book" variant="primary" size="lg" className="w-full sm:w-auto shadow-md shadow-[#FF5500]/20">
                {t("hero.ctaPrimary")}
              </Button>
              <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto bg-white/80 hover:bg-white">
                {t("hero.ctaSecondary")}
              </Button>
            </div>

            {/* Verified Operational Facts (Clean Architectural Typography, Zero Pill Bubbles) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-[#E8E2D9] w-full mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-[#1F1F1E] font-sans tracking-tight">5 – 250 kVA</span>
                <span className="text-xs text-[#625D55] leading-snug">{t("hero.fact1Desc")}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-[#1F1F1E] font-sans tracking-tight">{t("hero.fact2Title")}</span>
                <span className="text-xs text-[#625D55] leading-snug">{t("hero.fact2Desc")}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-[#1F1F1E] font-sans tracking-tight">{t("hero.fact3Title")}</span>
                <span className="text-xs text-[#625D55] leading-snug">{t("hero.fact3Desc")}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Quiet Power Reveal Visual Experience */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <HeroClient />
          </div>

        </div>
      </div>
    </section>
  );
}
