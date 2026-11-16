"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RollingText } from "../common/RollingText";
import { cn } from "@/lib/utils";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "We’ll Review Your Enquiry",
    description:
      "Our senior electrical engineering team reviews your site parameters, harmonic loads, peak kVA demand, and acoustics within 60 minutes.",
  },
  {
    number: "02",
    title: "Discovery Call Or Site Visit",
    description:
      "We’ll arrange an immediate technical consultation or rapid on-site survey in Nashik to inspect distribution boards, cable length, and safety clearances.",
  },
  {
    number: "03",
    title: "Tailored Proposal Delivered",
    description:
      "You’ll receive a transparent, all-inclusive proposal detailing the exact CPCB-IV+ DG set capacity, heavy hydraulic mobilization, and turnkey fuel logistics.",
  },
];

/**
 * ForgeProcessCards Component (Bright Luxury Theme)
 * 
 * - Desktop: 3 Crisp white architectural cards in symmetric grid
 * - Mobile: Fluid horizontal touch-snap carousel with dot pagination
 */
export function ForgeProcessCards() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), PROCESS_STEPS.length - 1));
  };

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section className="relative w-full bg-[#FAF8F5] text-[#111315] py-14 sm:py-28 px-4 sm:px-10 lg:px-20 overflow-hidden select-none z-20">
      
      {/* Background Architectural Texture with Soft Ambient Wash */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: "url('/images/services/service_engineer_bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/90 to-[#FAF8F5]/95 pointer-events-none" />

      {/* Ambient Warm Golden-Amber Core Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 size-[500px] bg-[#FF5500]/[0.05] blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 size-[500px] bg-amber-500/[0.04] blur-[160px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-2xl sm:text-5xl lg:text-6xl text-[#111315] font-normal leading-[1.15] sm:leading-[1.1] tracking-tight"
          >
            A considered process built around you
          </motion.h2>
        </div>

        {/* Mobile Horizontal Snap-Swipe Carousel (< md) */}
        <div className="block md:hidden w-full">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x -mx-4 px-4 pb-4 pt-1 scroll-smooth"
          >
            {PROCESS_STEPS.map((step) => (
              <div
                key={`mobile-step-${step.number}`}
                className="w-[84vw] max-w-[340px] shrink-0 snap-center flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-xl text-[#FF5500] italic font-bold tracking-tight">
                      {step.number}
                    </span>
                    <ArrowUpRight className="size-4 text-[#FF5500]" />
                  </div>

                  <h3 className="font-serif text-lg text-[#111315] font-semibold tracking-tight leading-snug mb-2.5">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs text-[#625D55] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators & Controls */}
          <div className="flex items-center justify-between pt-3 px-1">
            <div className="flex items-center gap-1.5">
              {PROCESS_STEPS.map((_, i) => (
                <button
                  key={`step-dot-${i}`}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    activeIndex === i
                      ? "w-6 bg-[#FF5500]"
                      : "w-1.5 bg-[#DDD6CA] hover:bg-[#B8B0A2]"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="p-1.5 rounded-full border border-[#E8E2D9] bg-white text-[#111315] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Previous step"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(Math.min(PROCESS_STEPS.length - 1, activeIndex + 1))}
                disabled={activeIndex === PROCESS_STEPS.length - 1}
                className="p-1.5 rounded-full border border-[#E8E2D9] bg-white text-[#111315] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Next step"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop 3 Process Cards Grid (Exact Forge 3-Card Architecture) - 100% UNCHANGED */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between p-6 sm:p-8 xl:p-10 rounded-2xl bg-white hover:bg-white border border-[#E8E2D9] hover:border-[#FF5500]/50 transition-all duration-500 shadow-sm hover:shadow-2xl min-h-[auto] sm:min-h-[340px] overflow-hidden"
            >
              {/* Top Accent Orange Beam on Hover */}
              <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-[#FF5500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top: Numeral */}
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xl sm:text-2xl text-[#FF5500] italic font-bold tracking-tight whitespace-nowrap">
                  {step.number}
                </span>
              </div>

              {/* Bottom: Title & Narrative */}
              <div className="pt-10">
                <h3 className="font-serif text-[19px] sm:text-lg lg:text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight leading-snug mb-4 transition-colors duration-300 flex items-center justify-between gap-2 whitespace-nowrap">
                  <RollingText text={step.title} singleLine />
                  <ArrowUpRight className="size-4 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#625D55] leading-relaxed transition-colors duration-300">
                  {step.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
