"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Partner {
  name: string;
  spec: string;
}

export function TrustedByClient({ partners }: { partners: Partner[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isInteractingRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Repeat partners 4 times to ensure an unbroken seamless infinite loop
  const repeatedPartners = [...partners, ...partners, ...partners, ...partners];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Auto-scroll only when not hovered and not actively being swiped/dragged
      if (!isPausedRef.current && !isInteractingRef.current && el) {
        el.scrollLeft += delta * 36; // ~36px/sec smooth editorial crawl
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Touch / Swipe interactions
  const handleTouchStart = () => {
    isInteractingRef.current = true;
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = () => {
    isInteractingRef.current = false;
    // Resume auto-scroll after 2s of idle time following a swipe
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 2000);
  };

  // Hover interactions (Desktop / Pointer)
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    if (!isInteractingRef.current) {
      isPausedRef.current = false;
    }
  };

  return (
    <div className="w-full">
      {/* 
        1. DESKTOP VIEW (md+):
        Spacious, centered editorial brand display matching docs/design-system.md
      */}
      <div className="hidden md:flex flex-wrap justify-center items-center gap-10 lg:gap-16 pt-2">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="flex flex-col items-center group cursor-default"
          >
            <span className="font-sans font-bold text-lg sm:text-xl text-[#1F1F1E] group-hover:text-[#FF5500] transition-colors duration-200">
              {partner.name}
            </span>
            <span className="text-[11px] text-[#625D55] font-medium tracking-tight mt-0.5">
              {partner.spec}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 
        2. MOBILE VIEW (< md):
        Horizontal, auto-scrolling, touch-swipeable & hover-pausable marquee track
      */}
      <div
        className="relative md:hidden w-full -mx-4 px-4 overflow-hidden pt-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Soft edge vignette fades for a high-end luxury look */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x py-1"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {repeatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex flex-col items-center justify-center shrink-0 px-4 py-2.5 rounded-xl bg-white border border-[#E8E2D9] shadow-[0_2px_8px_rgba(31,31,30,0.04)] active:border-[#FF5500] active:scale-[0.98] transition-all select-none cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#FF5500] shrink-0" />
                <span className="font-sans font-bold text-sm text-[#1F1F1E] tracking-tight">
                  {partner.name}
                </span>
              </div>
              <span className="text-[10px] text-[#625D55] font-medium tracking-tight mt-0.5 whitespace-nowrap">
                {partner.spec}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

