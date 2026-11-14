"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/common";
import { SlicedWavesBackground } from "@/components/common/SlicedWavesBackground";
import { useLanguage } from "@/lib/LanguageContext";
import { HeroClient } from "./HeroClient";

/**
 * Hero Component (Client Component with Multi-Language Support)
 * 
 * Re-architected with React Bits SlicedWaves interactive WebGL stage:
 * - Dynamic SlicedWaves ribbon light canvas reacting in realtime to mouse interaction
 * - Bright luxury ivory scrim (#FAF8F5) ensuring effortless contrast & legibility
 * - Verified operational facts strictly preserved with multi-language support
 * - Zero unwanted text pills or decorative badges
 */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF8F5] border-b border-[#E8E2D9]">
      {/* 
        Interactive SlicedWaves WebGL Canvas Stage
        Reacts to pointer motion with glowing depth ribbons
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <SlicedWavesBackground
          color1="#ff9d4d"
          color2="#ff2d78"
          color3="#3060ff"
          ribbons={3}
          spacing={28}
          perspective={0.45}
          blur={0.6}
          glow={1}
          position={0.78}
          mouseInteraction
          barWidth={0.5}
          ribbonHeight={0.26}
          spread={0.1}
          amplitude={0.1}
          frequency={1}
          curve={0.5}
          slices={0}
          speed={1}
          brightness={1.25}
          rotation={0}
          grain={0.08}
          fade={0}
          opacity={1}
          intro
          lightMode
        />

        {/* 
          Luminous Scrim Gradients:
          Guarantees 100% typography contrast while allowing the waves to illuminate the stage
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/50 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-[#FF5500]/[0.05] blur-[120px] rounded-full pointer-events-none" />
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
