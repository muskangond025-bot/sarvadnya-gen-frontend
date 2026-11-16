"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Innovation Component
 *
 * Ultra-Premium Fleet Technology & OEM Partner Showcase:
 * - Desktop: 5-Column technical OEM partner cards
 * - Mobile: Fluid horizontal touch-snap carousel with dot pagination
 */
export function Innovation() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const partners = [
    {
      brand: "Cummins",
      type: "Heavy Industrial Sets",
      range: "65 – 250 kVA",
      tech: "Turbocharged • Electronic Governor",
    },
    {
      brand: "Kirloskar",
      type: "Prime Commercial Series",
      range: "15 – 125 kVA",
      tech: "Sound-Attenuated Canopy (<75 dBA)",
    },
    {
      brand: "Honda",
      type: "Portable Ultra-Silent",
      range: "5 – 10 kVA",
      tech: "Clean Sine-Wave • Compact Event Power",
    },
    {
      brand: "Mahindra",
      type: "Construction & Prime",
      range: "15 – 65 kVA",
      tech: "High Fuel Economy • Rapid Cold-Start",
    },
    {
      brand: "Leyland",
      type: "High-Torque Industrial",
      range: "30 – 125 kVA",
      tech: "Continuous Heavy Load Endurance",
    },
  ];

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), partners.length - 1));
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
    <section className="w-full py-14 sm:py-28 px-4 sm:px-6 lg:px-12 flex flex-col items-center bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      {/* Subtle Radial Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF5500]/[0.04] blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 w-full">
        
        {/* Animated Title Block (Zero Pill Badges) */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight leading-[1.12]">
            Expanding Horizons for <br className="hidden sm:inline" />
            Sustainable <span className="text-[#FF5500]">Power</span>
          </h2>

          <p className="text-[#403C36] text-center font-['Outfit',sans-serif] text-base sm:text-lg leading-relaxed mt-4">
            Over the next five years, Sarvadnya Generators aims to expand fleet capacity across Maharashtra, introducing advanced fuel-efficient, CPCB-IV+ compliant silent systems and remaining the primary partner for industrial and flagship event power solutions.
          </p>
        </motion.div>

        {/* Mobile View: Horizontal Touch-Snap Carousel (< sm) */}
        <div className="block sm:hidden w-full mt-10">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x -mx-4 px-4 pb-4 pt-1 scroll-smooth"
          >
            {partners.map((item, idx) => (
              <div
                key={`mobile-${item.brand}`}
                className="w-[76vw] max-w-[280px] shrink-0 snap-center bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-9 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] shadow-2xs">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8275] font-['Outfit',sans-serif]">
                      Certified
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#111315] font-['Poppins',sans-serif]">
                    {item.brand}
                  </h3>
                  
                  <p className="text-xs font-semibold text-[#FF5500] mt-1 font-['Outfit',sans-serif]">
                    {item.type}
                  </p>

                  <p className="text-xs text-[#524E48] font-['Outfit',sans-serif] mt-2 leading-relaxed">
                    {item.tech}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#E8E2D9] flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-tight">Capacity</span>
                  <span className="text-xs font-bold text-[#111315] font-sans">{item.range}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dot Indicators & Arrow Navigation */}
          <div className="flex items-center justify-between pt-3 px-1">
            <div className="flex items-center gap-1.5">
              {partners.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to OEM partner ${i + 1}`}
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
                aria-label="Previous partner"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(Math.min(partners.length - 1, activeIndex + 1))}
                disabled={activeIndex === partners.length - 1}
                className="p-1.5 rounded-full border border-[#E8E2D9] bg-white text-[#111315] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Next partner"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop 5-Column Animated OEM Partner Cards (sm and above) - 100% UNCHANGED */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 mt-12 sm:mt-16 w-full">
          {partners.map((item, idx) => (
            <motion.div
              key={item.brand}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D9] shadow-xs hover:border-[#FF5500]/60 hover:shadow-xl hover:shadow-[#FF5500]/10 transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="size-9 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] group-hover:bg-[#FF5500] group-hover:text-white group-hover:border-[#FF5500] transition-colors shadow-2xs">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8275] font-['Outfit',sans-serif]">
                    Certified
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111315] font-['Poppins',sans-serif] group-hover:text-[#FF5500] transition-colors">
                  {item.brand}
                </h3>
                
                <p className="text-xs font-semibold text-[#FF5500] mt-1 font-['Outfit',sans-serif]">
                  {item.type}
                </p>

                <p className="text-xs text-[#524E48] font-['Outfit',sans-serif] mt-2 leading-relaxed">
                  {item.tech}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-[#E8E2D9] flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-tight">Capacity</span>
                <span className="text-xs font-bold text-[#111315] font-sans">{item.range}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
