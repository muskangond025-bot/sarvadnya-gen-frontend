"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AssuranceItem {
  index: string;
  category: string;
  title: string;
  description: string;
  backgroundImage: string;
  equipmentImage: string;
  href: string;
}

interface IndustriesServedClientProps {
  items: AssuranceItem[];
}

export function IndustriesServedClient({ items }: IndustriesServedClientProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync active slide index as user touch-swipes horizontally
  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16; // 16px gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  };

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16; // 16px gap
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(activeIndex + 1, items.length - 1));
  };

  return (
    <div className="w-full">
      {/* 
        1. DESKTOP VIEW (md+):
        Iconic Endcap.design Editorial Asymmetric Print Grid (Column 2 Staggered by 100px)
        100% UNTOUCHED on PC
      */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
        {items.map((item, i) => {
          const isEvenColumn = i % 2 === 1;

          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: (i % 2) * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "group flex flex-col cursor-pointer",
                isEvenColumn && "md:pt-16 lg:pt-24" // The iconic Endcap vertical column offset
              )}
            >
              <Link href={item.href} className="block w-full">
                {/* One-by-One Scroll Aperture Reveal: Image physically uncurtains/opens as scrolled into view */}
                <motion.div
                  initial={{
                    clipPath: "inset(22% 14% 22% 14% round 26px)",
                    scale: 0.96,
                    opacity: 0.65,
                  }}
                  whileInView={{
                    clipPath: "inset(0% 0% 0% 0% round 26px)",
                    scale: 1,
                    opacity: 1,
                  }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{
                    duration: 0.95,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative aspect-[16/11] sm:aspect-[16/11] w-full rounded-2xl sm:rounded-[26px] overflow-hidden bg-[#FAF8F5] border border-[#E8E2D9] shadow-[0_12px_40px_rgba(31,31,30,0.05)] transition-colors duration-500 group-hover:border-[#1F1F1E] will-change-[clip-path,transform]"
                >
                  {/* Atmospheric Backdrop Photo with Endcap film-scale hover transition */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                      src={item.backgroundImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-35 mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Gentle Surface Scrim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none"
                  />

                  {/* Foreground Equipment Unit Visual with gentle depth settle */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-none">
                    <div className="relative w-3/4 h-3/4 max-h-[220px] sm:max-h-[250px] filter drop-shadow-[0_18px_24px_rgba(31,31,30,0.14)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                      <Image
                        src={item.equipmentImage}
                        alt={`${item.title} Unit`}
                        fill
                        sizes="(max-width: 768px) 70vw, 35vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Floating Action Badge (Endcap ed-image-link) */}
                  <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20">
                    <div className="size-10 sm:size-11 rounded-xl bg-[#FF5500] text-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1F1F1E]">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.div>

                {/* Caption Bar (Endcap ed-print-caption) */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#1F1F1E] grid grid-cols-[36px_1fr] sm:grid-cols-[44px_1fr] gap-3 sm:gap-4 items-start">
                  {/* Monospace Index Numeral */}
                  <span className="font-mono font-extrabold text-sm sm:text-base text-[#FF5500] pt-0.5">
                    {item.index}
                  </span>

                  {/* Title & Description */}
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#625D55] mb-1">
                      {item.category}
                    </span>

                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#1F1F1E] group-hover:text-[#FF5500] transition-colors leading-[1.25]">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#625D55] leading-relaxed mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>

      {/* 
        2. MOBILE VIEW (< md):
        Horizontal, Snap-Swipe Carousel with Full Uncurtaining Aperture Animation & Equipment Settle
        - Touch-pan horizontal swipe with peek next-card affordance
        - Complete preservation of Endcap aperture reveal and 3D floating visual depth
        - Elegant interactive tactile controls (dots, arrows, counter)
      */}
      <div className="block md:hidden w-full">
        {/* Horizontal Peek Carousel Track */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth touch-pan-x -mx-4 px-4 pb-4 pt-1"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.map((item, i) => (
            <motion.article
              key={`mobile-${item.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-[84vw] max-w-[335px] shrink-0 snap-center group flex flex-col cursor-pointer"
            >
              <Link href={item.href} className="block w-full">
                {/* Mobile Uncurtaining Scroll Aperture Reveal */}
                <motion.div
                  initial={{
                    clipPath: "inset(14% 10% 14% 10% round 20px)",
                    scale: 0.96,
                    opacity: 0.7,
                  }}
                  whileInView={{
                    clipPath: "inset(0% 0% 0% 0% round 20px)",
                    scale: 1,
                    opacity: 1,
                  }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E8E2D9] shadow-[0_10px_28px_rgba(31,31,30,0.06)] active:border-[#1F1F1E] transition-colors will-change-[clip-path,transform]"
                >
                  {/* Atmospheric Backdrop Photo with Scale Animation */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                      src={item.backgroundImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 85vw, 40vw"
                      className="object-cover opacity-35 mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[1.04]"
                    />
                  </div>

                  {/* Gentle Surface Scrim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none"
                  />

                  {/* Foreground Equipment Unit Visual with Realistic 3D Float */}
                  <div className="absolute inset-0 flex items-center justify-center p-5 z-10 pointer-events-none">
                    <div className="relative w-3/4 h-3/4 max-h-[190px] filter drop-shadow-[0_14px_20px_rgba(31,31,30,0.14)] transition-transform duration-500 group-active:-translate-y-1.5 group-active:scale-105">
                      <Image
                        src={item.equipmentImage}
                        alt={`${item.title} Unit`}
                        fill
                        sizes="(max-width: 768px) 65vw, 30vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Floating Action Badge */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <div className="size-9 rounded-xl bg-[#FF5500] text-white flex items-center justify-center shadow-md transition-all duration-300 group-active:scale-110 group-active:bg-[#1F1F1E]">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-active:translate-x-0.5 group-active:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Caption Bar */}
                <div className="mt-4 pt-3.5 border-t border-[#1F1F1E] grid grid-cols-[32px_1fr] gap-3 items-start">
                  {/* Monospace Index Numeral */}
                  <span className="font-mono font-extrabold text-sm text-[#FF5500] pt-0.5">
                    {item.index}
                  </span>

                  {/* Title & Description */}
                  <div>
                    <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#625D55] mb-0.5">
                      {item.category}
                    </span>

                    <h3 className="font-sans font-extrabold text-lg text-[#1F1F1E] group-active:text-[#FF5500] transition-colors leading-[1.25]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#625D55] leading-relaxed mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile Tactile Carousel Pagination & Stepper Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D9] mt-2 px-1">
          {/* Active Progress Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to industry ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i
                    ? "w-6 bg-[#FF5500]"
                    : "w-2 bg-[#E8E2D9] hover:bg-[#625D55]"
                )}
              />
            ))}
          </div>

          {/* Stepper Controls & Monospace Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-xs text-[#625D55]">
              <span className="text-[#FF5500]">0{activeIndex + 1}</span> / 0{items.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous industry slide"
                className="size-8 rounded-full border border-[#E8E2D9] bg-white flex items-center justify-center text-[#1F1F1E] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === items.length - 1}
                aria-label="Next industry slide"
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

