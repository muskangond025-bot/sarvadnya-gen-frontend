"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, ShieldCheck, Truck, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkflowStage } from "./ProcessWorkflow";

const ICONS = {
  audit: Cpu,
  allocation: ShieldCheck,
  deployment: Truck,
  assurance: Activity,
};

export function ProcessWorkflowClient({ stages }: { stages: WorkflowStage[] }) {
  const containerRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16; // 16px gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), stages.length - 1));
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
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(activeIndex + 1, stages.length - 1));
  };

  return (
    <div ref={containerRef} className="relative py-4 sm:py-10">
      
      {/* High-Tech Dynamic Power Path Spine (Desktop Only) */}
      <div className="absolute top-[48px] left-8 right-8 h-0.5 bg-[#E8E2D9] hidden lg:block overflow-hidden">
        <motion.div 
          style={{ scaleX: smoothProgress }}
          className="absolute inset-0 bg-gradient-to-r from-[#FFAA00] via-[#FF5500] to-[#E04400] origin-left"
        />
        <motion.div 
          style={{ left: useTransform(smoothProgress, [0, 1], ["-10%", "110%"]) }}
          className="absolute top-0 w-24 h-full bg-[#FF5500] blur-sm opacity-80"
        />
      </div>

      {/* 
        1. DESKTOP VIEW (sm+):
        Responsive 4-Column Architectural Grid (100% untouched)
      */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {stages.map((stage, i) => {
          const Icon = ICONS[stage.iconName];

          return (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="flex flex-col group"
            >
              {/* Node Connector */}
              <div className="relative mb-6 sm:mb-8 flex items-center justify-start">
                <div className="size-16 sm:size-18 rounded-2xl bg-white border border-[#E8E2D9] flex items-center justify-center relative z-10 shadow-sm group-hover:border-[#FF5500]/50 group-hover:shadow-md transition-all duration-300">
                  <Icon className="size-7 sm:size-8 text-[#FF5500] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* Stage Card */}
              <div className="flex flex-col justify-between flex-grow p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E2D9] bg-white group-hover:border-[#FF5500]/40 group-hover:shadow-xl transition-all duration-300 shadow-xs relative overflow-hidden">
                {/* Subtle Amber Top Accent Beam on Hover */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[#FF5500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Stage Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111315] font-['Poppins',sans-serif] tracking-tight mb-3 group-hover:text-[#FF5500] transition-colors duration-300">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#625D55] font-['Outfit',sans-serif] leading-relaxed font-normal">
                    {stage.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 
        2. MOBILE VIEW (< sm):
        Horizontal, Snap-Swipe Pipeline Carousel (Clean, Zero Pill Badges, Zero Fluff)
      */}
      <div className="block sm:hidden w-full">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth touch-pan-x -mx-4 px-4 pb-4 pt-1"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {stages.map((stage, i) => {
            const Icon = ICONS[stage.iconName];
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={`mobile-stage-${stage.number}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "w-[82vw] max-w-[320px] shrink-0 snap-center group flex flex-col justify-between p-6 rounded-2xl border bg-white transition-all duration-300 select-none",
                  isActive
                    ? "border-[#FF5500]/40 shadow-[0_12px_28px_rgba(255,85,0,0.07)] scale-[1.01]"
                    : "border-[#E8E2D9] shadow-xs"
                )}
              >
                <div>
                  {/* Clean Node Connector & Stage Number (No Pill Badges) */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-13 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] shadow-2xs group-active:scale-105 transition-transform">
                      <Icon className="size-6 text-[#FF5500]" />
                    </div>
                    <span className="font-mono text-sm font-extrabold text-[#FF5500]">
                      {stage.number}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3 className="text-xl font-bold text-[#111315] font-['Poppins',sans-serif] tracking-tight mb-2 group-active:text-[#FF5500] transition-colors">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#625D55] font-['Outfit',sans-serif] leading-relaxed line-clamp-3">
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Tactile Stepper & Progress Dots */}
        <div className="flex items-center justify-between pt-3 mt-1 px-1">
          {/* Active Progress Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {stages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to stage ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i
                    ? "w-7 bg-[#FF5500]"
                    : "w-2 bg-[#E8E2D9] hover:bg-[#625D55]"
                )}
              />
            ))}
          </div>

          {/* Stepper Controls & Monospace Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-xs text-[#625D55]">
              <span className="text-[#FF5500]">0{activeIndex + 1}</span> / 0{stages.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous pipeline stage"
                className="size-8 rounded-full border border-[#E8E2D9] bg-white flex items-center justify-center text-[#1F1F1E] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === stages.length - 1}
                aria-label="Next pipeline stage"
                className="size-8 rounded-full border border-[#E8E2D9] bg-white flex items-center justify-center text-[#1F1F1E] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

