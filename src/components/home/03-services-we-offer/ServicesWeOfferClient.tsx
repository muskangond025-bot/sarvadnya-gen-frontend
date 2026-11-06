"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

// 4.5-second pacing: perfectly calibrated so it never feels rushed or too quick
const CYCLE_DURATION = 4500;

// Ultra-cinematic, silky smooth center-outward aperture mask transition
const cinematicMaskVariants = {
  initial: {
    clipPath: "inset(48% 48% 48% 48% round 40px)",
    opacity: 0,
    scale: 0.975,
    filter: "blur(4px)",
  },
  animate: {
    clipPath: "inset(0% 0% 0% 0% round 24px)",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    filter: "blur(2px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/**
 * CardContent Component
 * Clean layout: Title, line divider, single paragraph, and large visual stage.
 * Strictly adheres to user specification (no eyebrows, no arrows, no pills, no bullet clutter).
 */
function CardContent({ vertical }: { vertical: ServiceVertical }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center h-full">
      {/* Left Column: Clean Title, Line Divider, and Single Paragraph */}
      <div className="lg:col-span-6 flex flex-col justify-center z-10">
        <div>
          {/* Clean Prominent Headline */}
          <h3 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#1F1F1E] tracking-tight leading-[1.15] mb-4">
            {vertical.title}
          </h3>

          {/* Clean Architectural Line Divider */}
          <div className="w-16 h-0.5 bg-[#FF5500] mb-5" />

          {/* Single Narrative Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-[#625D55] leading-relaxed font-normal max-w-xl">
            {vertical.description}
          </p>
        </div>
      </div>

      {/* Right Column: Clean Panoramic Equipment Visual Stage */}
      <div className="lg:col-span-6 relative w-full h-[240px] sm:h-[300px] lg:h-full min-h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-[#F4F0E8] to-[#EAE5DC] border border-[#E8E2D9] flex items-center justify-center group/visual">
        {/* Atmospheric Backdrop Photo with calm, cinematic scale settle */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={vertical.primaryImage}
            alt={vertical.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-25 mix-blend-multiply group-hover/visual:scale-105 transition-transform duration-1000 ease-out"
          />
        </motion.div>

        {/* Light Scrim Gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent hidden lg:block pointer-events-none"
        />

        {/* Foreground Equipment Unit Visual with graceful optical settle */}
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 z-10 pointer-events-none">
          <motion.div
            initial={{ scale: 1.07, y: 10, opacity: 0.85 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-4/5 h-4/5 max-h-[250px] sm:max-h-[300px] filter drop-shadow-[0_22px_28px_rgba(31,31,30,0.16)] group-hover/visual:-translate-y-1.5 transition-transform duration-500"
          >
            <Image
              src={vertical.unitImage}
              alt={`${vertical.title} Generator Unit`}
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ServicesWeOfferClient({ verticals }: ServicesWeOfferClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Calibrated 4.5-second automatic smooth cinematic transition
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
      className="w-full relative flex flex-col gap-4"
    >
      {/* Stacked Cards Stage Frame (Seamless, overlapping center-outward mask animation) */}
      <div className="relative w-full h-[480px] sm:h-[500px] lg:h-[520px] rounded-2xl sm:rounded-3xl border border-[#E8E2D9] bg-white overflow-hidden shadow-[0_16px_45px_rgba(31,31,30,0.08)]">
        {/* Underlying Base Card: always provides background continuity */}
        <div className="absolute inset-0 w-full h-full bg-white z-0">
          <CardContent vertical={verticals[activeIndex]} />
        </div>

        {/* Incoming Card: blooms seamlessly from the center over the previous card */}
        <AnimatePresence initial={false}>
          <motion.div
            key={verticals[activeIndex].id}
            variants={cinematicMaskVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full bg-white z-10 will-change-[clip-path,transform,filter]"
          >
            <CardContent vertical={verticals[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimalist Cinematic Progress Line (Smooth 4.5s Indicators) */}
      <div className="flex items-center gap-4 px-1 pt-1">
        {verticals.map((vertical, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={vertical.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Switch to ${vertical.title}`}
              className="group flex flex-col gap-1.5 cursor-pointer py-1 text-left"
            >
              {/* Smooth Progress Bar */}
              <div className="relative w-16 sm:w-24 h-1 rounded-full bg-[#E8E2D9] overflow-hidden">
                {isActive && !isPaused && (
                  <motion.div
                    key={`progress-${index}-${activeIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                    className="absolute inset-0 bg-[#FF5500] rounded-full"
                  />
                )}
                {isActive && isPaused && (
                  <div className="absolute inset-0 bg-[#FF5500] rounded-full" />
                )}
              </div>

              {/* Subtle Label */}
              <span
                className={cn(
                  "text-xs font-semibold transition-colors duration-200 hidden sm:inline-block",
                  isActive
                    ? "text-[#1F1F1E]"
                    : "text-[#A8A29E] group-hover:text-[#625D55]"
                )}
              >
                {vertical.tabLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
