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
} from "lucide-react";
import { SectionHeading, type IconName, type ProductDetailsData } from "@/components/common";
import { cn, scrollChildCenterX } from "@/lib/utils";
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
  const railRef = useRef<HTMLDivElement | null>(null);
  const capacityRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartXRef = useRef<number | null>(null);

  const currentGen = generators[currentIndex] || generators[0];

  // Center active capacity horizontally within its own rail (never scrolls window vertically)
  useEffect(() => {
    scrollChildCenterX(railRef.current, capacityRefs.current[currentIndex]);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? generators.length - 1 : prev - 1));
  }, [generators.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === generators.length - 1 ? 0 : prev + 1));
  }, [generators.length]);

  // Touch swipe support on the 3D equipment stage
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (deltaX < -45) {
      handleNext();
    } else if (deltaX > 45) {
      handlePrev();
    }
  };

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
      className="w-full py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-10 lg:gap-14">
        
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
        <div className="relative w-full">
          {/* Mobile Capacity Counter & Hint */}
          <div className="flex sm:hidden items-center justify-between px-1 mb-1.5 text-[11px] font-mono text-[#7A756D]">
            <span className="text-[#FF5500] font-bold tracking-wider">
              0{currentIndex + 1} / 0{generators.length}
            </span>
            <span className="flex items-center gap-1 text-[#FF5500] font-semibold text-[10px]">
              Tap or Swipe <ArrowRight className="w-3 h-3 animate-pulse" />
            </span>
          </div>

          <div className="w-full flex items-center justify-between gap-1.5 sm:gap-3 border-b border-[#E8E2D9] pb-3 sm:pb-4">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Capacity"
              className="size-7.5 sm:size-10 rounded-full border border-[#E8E2D9] bg-white hover:border-[#1F1F1E] flex items-center justify-center text-[#1F1F1E] hover:text-[#FF5500] transition-colors shrink-0 shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>

            {/* Spectrum Rail Container with Peeking Edge Masks */}
            <div className="relative flex-1 overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 sm:hidden" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 sm:hidden" />

              <div ref={railRef} className="flex items-center gap-1.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 touch-pan-x">
                {generators.map((gen, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={gen.id}
                      ref={(el) => { capacityRefs.current[idx] = el; }}
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "relative py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-xl flex flex-col items-center gap-0.5 cursor-pointer select-none transition-all duration-300 min-w-[64px] sm:min-w-[110px] shrink-0",
                        isActive
                          ? "text-[#1F1F1E] bg-[#FAF8F5]"
                          : "text-[#625D55] hover:text-[#1F1F1E] hover:bg-white/60"
                      )}
                    >
                      {/* Rating Numeral */}
                      <span
                        className={cn(
                          "font-sans font-extrabold text-xs sm:text-base tracking-tight transition-colors",
                          isActive ? "text-[#FF5500]" : "text-[#1F1F1E]"
                        )}
                      >
                        {gen.badge}
                      </span>

                      {/* Series Descriptor */}
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#625D55] hidden sm:inline-block">
                        {gen.id === "gen-5" ? t("range.entrySeries") : gen.id === "gen-30" || gen.id === "gen-65" ? t("range.midSeries") : t("range.heavySeries")}
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
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next Capacity"
              className="size-7.5 sm:size-10 rounded-full border border-[#E8E2D9] bg-white hover:border-[#1F1F1E] flex items-center justify-center text-[#1F1F1E] hover:text-[#FF5500] transition-colors shrink-0 shadow-xs active:scale-95"
            >
              <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
          </div>
        </div>

        {/* 
          2. OPEN ARCHITECTURAL STAGE (NO CARD BOX, NO BORDER ENCLOSURE)
          On mobile (< lg): 3D Equipment Visual comes FIRST (order-1), details below (order-2).
          On desktop (lg+): Editorial details on left (order-1), visual on right (order-2).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
          
          {/* 
            3D FLOATING EQUIPMENT THEATER:
            Appears FIRST on mobile right under the capacity switcher for instant visual feedback!
          */}
          <div
            ref={visualRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="order-1 lg:order-2 lg:col-span-6 relative w-full h-[220px] sm:h-[340px] lg:h-[480px] flex items-center justify-center select-none touch-pan-y"
            style={{ perspective: 1200 }}
          >
            {/* Ambient Warm Volumetric Aura */}
            <div className="absolute w-[240px] sm:w-[520px] h-[180px] sm:h-[380px] bg-[#FF5500]/[0.08] blur-[60px] sm:blur-[110px] rounded-full pointer-events-none" />

            {/* Giant Architectural Watermark in Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <motion.span
                key={`watermark-${currentGen.id}`}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 0.16, scale: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="font-sans font-black text-6xl sm:text-9xl lg:text-[140px] text-[#1F1F1E] tracking-tighter select-none"
              >
                {currentGen.badge}
              </motion.span>
            </div>

            {/* 
              FLOATING 3D GENERATOR ASSEMBLY (Continuous Levitation + Dynamic Mouse Parallax + Mobile Swipe)
            */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.6,
                ease: "easeInOut",
              }}
              className="relative z-20 w-[88%] sm:w-3/4 h-[170px] sm:h-[280px] lg:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGen.id}
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full filter drop-shadow-[0_20px_28px_rgba(31,31,30,0.18)]"
                >
                  <Image
                    src={currentGen.image}
                    alt={currentGen.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 85vw, 40vw"
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
              className="absolute bottom-3 sm:bottom-8 w-2/3 h-6 sm:h-8 bg-black/40 blur-xl rounded-full pointer-events-none z-10"
            />
          </div>

          {/* 
            EDITORIAL DETAILS & SIZING CLARITY:
            Renders cleanly below visual on mobile (order-2) without congestion.
          */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGen.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                {/* Series Micro-Tag for Mobile */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF5500] px-2 py-0.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/20">
                    {currentGen.series}
                  </span>
                  <span className="text-[11px] font-mono text-[#7A756D]">
                    {currentGen.badge} Prime Power
                  </span>
                </div>

                {/* Main Heading */}
                <h3 className="font-sans font-extrabold text-xl sm:text-3xl lg:text-[38px] text-[#1F1F1E] tracking-tight leading-[1.18] mb-1.5 sm:mb-2">
                  {t(`range.${currentGen.id.replace("-", "")}.title`, currentGen.title)}
                </h3>

                {/* Subtitle / Best For Highlight */}
                {currentGen.application && (
                  <p className="font-sans font-semibold text-xs sm:text-base text-[#FF5500] mb-3 sm:mb-4">
                    {t("range.bestFor")}{t(`range.${currentGen.id.replace("-", "")}.app`, currentGen.application)}
                  </p>
                )}

                {/* High-Signal Narrative Paragraph */}
                <p className="text-xs sm:text-base text-[#403C36] leading-relaxed mb-3.5 sm:mb-5 font-normal max-w-xl line-clamp-3 sm:line-clamp-none">
                  {t(`range.${currentGen.id.replace("-", "")}.desc`, currentGen.description)}
                </p>

                {/* Precision Load Engineering Metric */}
                {currentGen.recommendedLoads && (
                  <div className="flex items-baseline gap-2 py-2 sm:py-3 border-b border-[#E8E2D9] mb-4 sm:mb-6 text-xs sm:text-sm">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FF5500] shrink-0">
                      {t("range.powers")}
                    </span>
                    <span className="text-[#1F1F1E] font-medium leading-relaxed text-[11px] sm:text-sm">
                      {t(`range.${currentGen.id.replace("-", "")}.loads`, currentGen.recommendedLoads)}
                    </span>
                  </div>
                )}

                {/* 
                  Compact 2x2 Specifications Tiles:
                  Replaces crowded vertical rows with sleek executive spec tiles on mobile.
                */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 py-3 sm:py-5 border-y border-[#E8E2D9] mb-5 sm:mb-7">
                  {currentGen.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-2 sm:p-2.5 rounded-lg bg-white/70 border border-[#E8E2D9]/80 flex flex-col gap-0.5"
                    >
                      <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-wider text-[#625D55] truncate">
                        {spec.label}
                      </span>
                      <span className="font-sans font-bold text-[11px] sm:text-sm text-[#1F1F1E] flex items-center gap-1 sm:gap-1.5 truncate">
                        <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FF5500] shrink-0" />
                        <span className="truncate">{spec.value}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Conversion Action Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full">
                  <Link
                    href={`/book?kVA=${encodeURIComponent(currentGen.badge)}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl bg-[#1F1F1E] hover:bg-[#FF5500] text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-[#1F1F1E]/10 hover:shadow-lg hover:shadow-[#FF5500]/25 group/btn w-full sm:w-auto text-center active:scale-[0.99]"
                  >
                    <span>{t("range.enquire")} {currentGen.badge} {t("range.fleetSuffix")}</span>
                    <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#FF5500] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </Link>

                  <a
                    href="tel:+916262629944"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3.5 rounded-xl bg-white border border-[#E8E2D9] text-[#1F1F1E] hover:border-[#1F1F1E] hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold transition-all shadow-xs w-full sm:w-auto active:scale-[0.99]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span className="font-mono">+91 62626 29944</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 
          3. INSTANT APPLICATION SIZING HELPER:
          Horizontal smooth scrollable chip track on mobile (no wrapping clutter),
          maintains full responsive accessibility on desktop.
        */}
        <div className="pt-4 sm:pt-6 border-t border-[#E8E2D9] flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#625D55]">
            {t("range.quickShortcuts")}
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
            <button
              onClick={() => setCurrentIndex(0)}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap shrink-0 transition-colors select-none",
                currentIndex === 0
                  ? "border-[#FF5500] bg-[#FF5500]/10 text-[#FF5500]"
                  : "border-[#E8E2D9] bg-white hover:border-[#FF5500] text-[#1F1F1E]"
              )}
            >
              Residential & Shops (5 kVA)
            </button>
            <button
              onClick={() => setCurrentIndex(1)}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap shrink-0 transition-colors select-none",
                currentIndex === 1
                  ? "border-[#FF5500] bg-[#FF5500]/10 text-[#FF5500]"
                  : "border-[#E8E2D9] bg-white hover:border-[#FF5500] text-[#1F1F1E]"
              )}
            >
              Clinics & Small Events (30 kVA)
            </button>
            <button
              onClick={() => setCurrentIndex(2)}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap shrink-0 transition-colors select-none",
                currentIndex === 2
                  ? "border-[#FF5500] bg-[#FF5500]/10 text-[#FF5500]"
                  : "border-[#E8E2D9] bg-white hover:border-[#FF5500] text-[#1F1F1E]"
              )}
            >
              Banquets & Lawns (65 kVA)
            </button>
            <button
              onClick={() => setCurrentIndex(3)}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap shrink-0 transition-colors select-none",
                currentIndex === 3
                  ? "border-[#FF5500] bg-[#FF5500]/10 text-[#FF5500]"
                  : "border-[#E8E2D9] bg-white hover:border-[#FF5500] text-[#1F1F1E]"
              )}
            >
              Grand Weddings & Heavy Ind. (125 kVA)
            </button>
            <button
              onClick={() => setCurrentIndex(4)}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap shrink-0 transition-colors select-none",
                currentIndex === 4 || currentIndex === 5
                  ? "border-[#FF5500] bg-[#FF5500]/10 text-[#FF5500]"
                  : "border-[#E8E2D9] bg-white hover:border-[#FF5500] text-[#1F1F1E]"
              )}
            >
              Hospitals & Mega Power (250+ kVA)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
