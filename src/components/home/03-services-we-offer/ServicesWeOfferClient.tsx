"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface ServiceVertical {
  id: string;
  index: string;
  tabLabel: string;
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  capacity: string;
  specs: ServiceSpec[];
  primaryImage: string;
  unitImage: string;
  unitBadge: string;
  statusBadge: string;
  href: string;
  ctaText: string;
}

interface ServicesWeOfferClientProps {
  verticals: ServiceVertical[];
}

const CYCLE_DURATION = 5000;

/**
 * ServicesWeOfferClient
 * 
 * Re-architected as an open, fluid "Kinetic Engineering Stage" (NON-CARD DESIGN):
 * - Completely eliminates the boxed card enclosure / border frame
 * - Interactive 3D mouse parallax with physical generator levitation
 * - Atmospheric environmental aperture with synchronized ground contact shadow
 * - Architectural specifications matrix with kinetic typography reveals
 * - Smooth interactive master timeline with auto-cycle and pause-on-hover
 */
export function ServicesWeOfferClient({ verticals }: ServicesWeOfferClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();
  const visualRef = useRef<HTMLDivElement | null>(null);

  const activeVertical = verticals[activeIndex] || verticals[0];

  // 3D Interactive Mouse Tracking on the Visual Theater
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

  // Auto-cycle timeline
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % verticals.length);
    }, CYCLE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, verticals.length]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full relative flex flex-col"
    >
      {/* 
        MASTER NAVIGATION TIMELINE (OPEN HORIZONTAL TRACK, NO CARD)
      */}
      <div className="w-full flex items-center justify-between border-b border-[#E8E2D9] pb-4 mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 sm:gap-6 min-w-max">
          {verticals.map((vertical, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={vertical.id}
                onClick={() => setActiveIndex(index)}
                aria-label={`Select ${vertical.title}`}
                className={cn(
                  "group relative py-2 px-3 sm:px-4 rounded-xl flex items-center gap-2.5 transition-all duration-300 cursor-pointer select-none text-left",
                  isActive
                    ? "text-[#1F1F1E] bg-[#FAF8F5]"
                    : "text-[#625D55] hover:text-[#1F1F1E] hover:bg-white/60"
                )}
              >
                {/* Numeric Monospace Index */}
                <span
                  className={cn(
                    "font-mono text-xs sm:text-sm font-bold transition-colors",
                    isActive ? "text-[#FF5500]" : "text-[#A8A29E] group-hover:text-[#625D55]"
                  )}
                >
                  {vertical.index}
                </span>

                {/* Vertical Label */}
                <span className="font-sans font-bold text-sm sm:text-base tracking-tight">
                  {vertical.index === "01" ? t("services.tab1") : vertical.index === "02" ? t("services.tab2") : t("services.tab3")}
                </span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeVerticalTab"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF5500] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}

                {/* Linear Cycle Progress Bar (Active tab only) */}
                {isActive && !isPaused && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E8E2D9] rounded-full overflow-hidden">
                    <motion.div
                      key={`progress-${activeIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                      className="h-full bg-[#FF5500]"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Realtime Operational Status Note */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#625D55]">
          <span className="size-2 rounded-full bg-[#FF5500] animate-pulse" />
          <span>{t("services.dispatchFleet")}</span>
        </div>
      </div>

      {/* 
        OPEN KINETIC STAGE (NO CARD, NO BOX BORDER, NO SHADOW CONTAINER)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* 
          LEFT COLUMN: KINETIC EDITORIAL TYPOGRAPHY & SPECS
        */}
        <div className="lg:col-span-6 flex flex-col justify-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVertical.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Capacity Telemetry Pill & Tagline */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF5500] font-bold">
                  {activeVertical.capacity}
                </span>
                <span className="text-[#A8A29E] font-mono text-xs">•</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#625D55] font-semibold">
                  {activeVertical.index === "01" ? t("services.v1.tagline") : activeVertical.index === "02" ? t("services.v2.tagline") : t("services.v3.tagline")}
                </span>
              </div>

              {/* Display Headline */}
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-[38px] text-[#1F1F1E] tracking-tight leading-[1.16] mb-2">
                {activeVertical.index === "01" ? t("services.tab1") : activeVertical.index === "02" ? t("services.tab2") : t("services.tab3")}
              </h3>

              {/* Punchy Subtitle */}
              <p className="font-sans font-semibold text-base sm:text-lg text-[#FF5500] mb-4">
                {activeVertical.index === "01" ? t("services.v1.subtitle") : activeVertical.index === "02" ? t("services.v2.subtitle") : t("services.v3.subtitle")}
              </p>

              {/* Single High-Signal Narrative Paragraph */}
              <p className="text-sm sm:text-base text-[#403C36] leading-relaxed mb-6 font-normal max-w-xl">
                {activeVertical.index === "01" ? t("services.v1.desc") : activeVertical.index === "02" ? t("services.v2.desc") : t("services.v3.desc")}
              </p>

              {/* Precision Specifications Matrix (Minimal Architectural Rows, Zero Card Bloat) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-5 border-y border-[#E8E2D9] mb-7">
                {activeVertical.specs.map((spec) => (
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

              {/* Direct Conversion Action */}
              <div className="flex items-center gap-4">
                <Link
                  href={activeVertical.href}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1F1F1E] hover:bg-[#FF5500] text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#1F1F1E]/10 hover:shadow-lg hover:shadow-[#FF5500]/25 group/btn"
                >
                  <span>{activeVertical.index === "01" ? t("services.v1.cta") : activeVertical.index === "02" ? t("services.v2.cta") : t("services.v3.cta")}</span>
                  <ArrowRight className="w-4 h-4 text-[#FF5500] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#625D55] hover:text-[#1F1F1E] transition-colors py-2"
                >
                  <span>{t("services.guide")}</span>
                  <span className="text-[#FF5500]">→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 
          RIGHT COLUMN: CREATIVE 3D FLOATING EQUIPMENT THEATER (NON-CARD)
        */}
        <div
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-[480px] flex items-center justify-center select-none"
          style={{ perspective: 1200 }}
        >
          {/* Ambient Warm Volumetric Aura */}
          <div className="absolute w-[440px] sm:w-[540px] h-[300px] sm:h-[380px] bg-[#FF5500]/[0.08] blur-[100px] rounded-full pointer-events-none" />

          {/* Environmental Backdrop Aperture (Contextual Photo Fades In Gracefully) */}
          <div className="absolute inset-4 sm:inset-6 rounded-3xl overflow-hidden opacity-35 mix-blend-multiply pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVertical.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeVertical.primaryImage}
                  alt={activeVertical.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover filter saturate-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-transparent to-[#FAF8F5]/60" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Large Architectural Capacity Watermark in Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.span
              key={`watermark-${activeVertical.id}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.22, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-sans font-black text-6xl sm:text-8xl lg:text-9xl text-[#1F1F1E] tracking-tighter select-none"
            >
              {activeVertical.capacity.split(" ")[0]}
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
              duration: 4.8,
              ease: "easeInOut",
            }}
            className="relative z-20 w-4/5 sm:w-3/4 h-[220px] sm:h-[300px] lg:h-[360px] flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVertical.id}
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -12 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full filter drop-shadow-[0_28px_36px_rgba(31,31,30,0.22)]"
              >
                <Image
                  src={activeVertical.unitImage}
                  alt={`${activeVertical.title} Industrial Generator`}
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
              duration: 4.8,
              ease: "easeInOut",
            }}
            className="absolute bottom-6 sm:bottom-8 w-2/3 h-8 bg-black/40 blur-xl rounded-full pointer-events-none z-10"
          />
        </div>
      </div>
    </div>
  );
}
