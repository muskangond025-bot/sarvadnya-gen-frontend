"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SectionHeading, type IconName, type ProductDetailsData } from "@/components/common";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

const AUTO_SCROLL_INTERVAL = 5500;

export interface GeneratorItem extends ProductDetailsData {
  icon: IconName;
  application?: string;
  recommendedLoads?: string;
}

interface GeneratorRangeClientProps {
  generators: GeneratorItem[];
}

/**
 * GeneratorRangeClient Component
 * 
 * Re-architected as an open, fluid "Fleet Capacity Spectrum Stage" (NON-CARD DESIGN):
 * - Completely eliminates boxed card borders and nested frames
 * - Interactive horizontal capacity spectrum rail with direct jumping
 * - Real-world application matching so any client understands which size they need in seconds
 * - Interactive 3D mouse parallax with physical generator levitation & floor shadow
 * - Architectural specifications matrix with kinetic reveals
 */
export function GeneratorRangeClient({ generators }: GeneratorRangeClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();
  const visualRef = useRef<HTMLDivElement | null>(null);

  const currentGen = generators[currentIndex] || generators[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? generators.length - 1 : prev - 1));
  }, [generators.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === generators.length - 1 ? 0 : prev + 1));
  }, [generators.length]);

  // Auto-scroll loop with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => handleNext(), AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // 3D Interactive Mouse Tracking on the Visual Stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 140 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14">
        
        {/* Section Heading (Clean, No Unwanted Eyebrow Pills) */}
        <SectionHeading
          title={t("range.title")}
          description={t("range.desc")}
          align="center"
          className="max-w-3xl mx-auto"
        />

        {/* 
          1. INTERACTIVE CAPACITY SPECTRUM RAIL (TOP MASTER TRACK - NO CARD)
        */}
        <div className="w-full flex items-center justify-between gap-3 border-b border-[#E8E2D9] pb-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Capacity"
            className="size-9 sm:size-10 rounded-full border border-[#E8E2D9] bg-white hover:border-[#1F1F1E] flex items-center justify-center text-[#1F1F1E] hover:text-[#FF5500] transition-colors shrink-0 shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Spectrum Rail Nodes */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1 px-2">
            {generators.map((gen, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={gen.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "relative py-2 px-3 sm:px-4 rounded-xl flex flex-col items-center gap-0.5 cursor-pointer select-none transition-all duration-300 min-w-[76px] sm:min-w-[110px]",
                    isActive
                      ? "text-[#1F1F1E] bg-[#FAF8F5]"
                      : "text-[#625D55] hover:text-[#1F1F1E] hover:bg-white/60"
                  )}
                >
                  {/* Rating Numeral */}
                  <span
                    className={cn(
                      "font-sans font-extrabold text-sm sm:text-base tracking-tight transition-colors",
                      isActive ? "text-[#FF5500]" : "text-[#1F1F1E]"
                    )}
                  >
                    {gen.badge}
                  </span>

                  {/* Series Descriptor */}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#625D55] hidden sm:inline-block">
                    {gen.series.replace(" Series", "")}
                  </span>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCapacityNode"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF5500] rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}

                  {/* Progress Timer Line (Active item only) */}
                  {isActive && !isPaused && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E8E2D9] rounded-full overflow-hidden">
                      <motion.div
                        key={`capacity-progress-${currentIndex}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_SCROLL_INTERVAL / 1000, ease: "linear" }}
                        className="h-full bg-[#FF5500]"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next Capacity"
            className="size-9 sm:size-10 rounded-full border border-[#E8E2D9] bg-white hover:border-[#1F1F1E] flex items-center justify-center text-[#1F1F1E] hover:text-[#FF5500] transition-colors shrink-0 shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 
          2. OPEN ARCHITECTURAL STAGE (NO CARD BOX, NO BORDER ENCLOSURE)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: EDITORIAL DETAILS & SIZING CLARITY */}
          <div className="lg:col-span-6 flex flex-col justify-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGen.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                {/* Monospace Telemetry / Category */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="size-2 rounded-full bg-[#FF5500] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FF5500] font-bold">
                    {currentGen.series}
                  </span>
                  <span className="text-[#A8A29E] font-mono text-xs">•</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#625D55] font-semibold">
                    {currentGen.badge} SOUNDPROOF DIESEL FLEET
                  </span>
                </div>

                {/* Main Heading */}
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-[38px] text-[#1F1F1E] tracking-tight leading-[1.16] mb-2">
                  {currentGen.title}
                </h3>

                {/* Subtitle / Best For Highlight */}
                {currentGen.application && (
                  <p className="font-sans font-semibold text-base sm:text-lg text-[#FF5500] mb-4">
                    {t("range.bestFor")}{currentGen.application}
                  </p>
                )}

                {/* Single High-Signal Narrative Paragraph */}
                <p className="text-sm sm:text-base text-[#403C36] leading-relaxed mb-5 font-normal max-w-xl">
                  {currentGen.description}
                </p>

                {/* Recommended Power Loads (Makes sizing instantly easy to understand) */}
                {currentGen.recommendedLoads && (
                  <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D9] mb-6 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-[#1F1F1E]">
                      <span className="font-bold text-[#1F1F1E]">{t("range.powers")}</span>
                      <span className="text-[#625D55]">{currentGen.recommendedLoads}</span>
                    </div>
                  </div>
                )}

                {/* Precision Specifications Matrix (Clean Rows, Zero Card Bloat) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-5 border-y border-[#E8E2D9] mb-7">
                  {currentGen.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-0.5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#625D55]">
                        {spec.label}
                      </span>
                      <span className="font-sans font-bold text-xs sm:text-sm text-[#1F1F1E] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                        <span>{spec.value}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Conversion Action Row */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/book?kVA=${encodeURIComponent(currentGen.badge)}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F1F1E] hover:bg-[#FF5500] text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#1F1F1E]/10 hover:shadow-lg hover:shadow-[#FF5500]/25 group/btn"
                  >
                    <span>{t("range.enquire")} {currentGen.badge} {t("range.fleetSuffix")}</span>
                    <ArrowRight className="w-4 h-4 text-[#FF5500] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </Link>

                  <a
                    href="tel:+916262629944"
                    className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white border border-[#E8E2D9] text-[#1F1F1E] hover:border-[#1F1F1E] hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold transition-all shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span className="font-mono">+91 62626 29944</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: 3D FLOATING EQUIPMENT THEATER (NON-CARD) */}
          <div
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-[480px] flex items-center justify-center select-none"
            style={{ perspective: 1200 }}
          >
            {/* Ambient Warm Volumetric Aura */}
            <div className="absolute w-[440px] sm:w-[520px] h-[300px] sm:h-[380px] bg-[#FF5500]/[0.08] blur-[110px] rounded-full pointer-events-none" />

            {/* Giant Architectural Watermark in Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <motion.span
                key={`watermark-${currentGen.id}`}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 0.18, scale: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="font-sans font-black text-7xl sm:text-9xl lg:text-[140px] text-[#1F1F1E] tracking-tighter select-none"
              >
                {currentGen.badge}
              </motion.span>
            </div>

            {/* 
              FLOATING 3D GENERATOR ASSEMBLY (Continuous Levitation + Dynamic Mouse Parallax)
            */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.6,
                ease: "easeInOut",
              }}
              className="relative z-20 w-4/5 sm:w-3/4 h-[220px] sm:h-[300px] lg:h-[360px] flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGen.id}
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full filter drop-shadow-[0_28px_36px_rgba(31,31,30,0.22)]"
                >
                  <Image
                    src={currentGen.image}
                    alt={currentGen.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* 
              SYNCHRONIZED GROUND CONTACT DROP SHADOW (Pulses inversely with levitation)
            */}
            <motion.div
              animate={{
                scaleX: [1, 0.88, 1],
                scaleY: [1, 0.82, 1],
                opacity: [0.38, 0.20, 0.38],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.6,
                ease: "easeInOut",
              }}
              className="absolute bottom-6 sm:bottom-8 w-2/3 h-8 bg-black/40 blur-xl rounded-full pointer-events-none z-10"
            />
          </div>
        </div>

        {/* 
          3. INSTANT APPLICATION SIZING HELPER (Makes sizing completely effortless)
        */}
        <div className="pt-6 border-t border-[#E8E2D9] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#625D55]">
            {t("range.quickShortcuts")}
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentIndex(0)}
              className="px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-white hover:border-[#FF5500] text-xs font-semibold text-[#1F1F1E] transition-colors"
            >
              Residential & Shops (5 kVA)
            </button>
            <button
              onClick={() => setCurrentIndex(1)}
              className="px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-white hover:border-[#FF5500] text-xs font-semibold text-[#1F1F1E] transition-colors"
            >
              Clinics & Small Events (30 kVA)
            </button>
            <button
              onClick={() => setCurrentIndex(2)}
              className="px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-white hover:border-[#FF5500] text-xs font-semibold text-[#1F1F1E] transition-colors"
            >
              Banquets & Lawns (65 kVA)
            </button>
            <button
              onClick={() => setCurrentIndex(3)}
              className="px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-white hover:border-[#FF5500] text-xs font-semibold text-[#1F1F1E] transition-colors"
            >
              Grand Weddings & Heavy Ind. (125 kVA)
            </button>
            <button
              onClick={() => setCurrentIndex(4)}
              className="px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-white hover:border-[#FF5500] text-xs font-semibold text-[#1F1F1E] transition-colors"
            >
              Hospitals & Mega Power (250+ kVA)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
