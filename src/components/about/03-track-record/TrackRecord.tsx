"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TrackRecord Component
 *
 * Ultra-Premium Operational Impact Section:
 * - Desktop: Symmetric 4-column luxury metric architecture
 * - Mobile: Fluid horizontal touch-snap carousel with dot pagination
 */
export function TrackRecord() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const stats = [
    {
      value: "17+",
      label: "Years Experience",
      desc: "Continuous silent power rental operations across Maharashtra since 2009.",
    },
    {
      value: "2,000+",
      label: "Satisfied Clients",
      desc: "Trusted by premier industrial plants, wedding venues, and corporate enterprises.",
    },
    {
      value: "24/7",
      label: "Emergency Support",
      desc: "Immediate on-site technical dispatch with active standby backup readiness.",
    },
    {
      value: "10,000+",
      label: "Successful Deployments",
      desc: "Proven track record of zero critical downtime power operations delivered.",
    },
  ];

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), stats.length - 1));
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
    <section className="w-full py-14 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF8F5] border-b border-[#E8E2D9] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-16">
        
        {/* Title Block (Zero Pill Badges) */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight leading-[1.12]">
            Driven by Reliability, <br className="hidden sm:inline" />
            <span className="text-[#FF5500]">Measured by Results.</span>
          </h2>
        </div>

        {/* Mobile View: Horizontal Touch-Snap Carousel (< sm) */}
        <div className="block sm:hidden w-full">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x -mx-4 px-4 pb-4 pt-1 scroll-smooth"
          >
            {stats.map((stat, idx) => (
              <div
                key={`mobile-stat-${idx}`}
                className="w-[80vw] max-w-[300px] shrink-0 snap-center bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-extrabold text-[#111315] tracking-tight font-['Poppins',sans-serif] block text-[#FF5500]">
                    {stat.value}
                  </span>
                  <h3 className="text-base font-bold text-[#111315] mt-3 font-['Poppins',sans-serif]">
                    {stat.label}
                  </h3>
                </div>
                <p className="text-xs text-[#625D55] font-['Outfit',sans-serif] mt-2 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Dot Indicators & Arrow Navigation */}
          <div className="flex items-center justify-between pt-3 px-1">
            <div className="flex items-center gap-1.5">
              {stats.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to metric ${i + 1}`}
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
                aria-label="Previous metric"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(Math.min(stats.length - 1, activeIndex + 1))}
                disabled={activeIndex === stats.length - 1}
                className="p-1.5 rounded-full border border-[#E8E2D9] bg-white text-[#111315] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Next metric"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop 4-Pillar Luxury Metric Grid (sm and above) - 100% UNCHANGED */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[#E8E2D9] shadow-xs hover:border-[#FF5500]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111315] tracking-tight font-['Poppins',sans-serif] block group-hover:text-[#FF5500] transition-colors">
                  {stat.value}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#111315] mt-4 font-['Poppins',sans-serif]">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#625D55] font-['Outfit',sans-serif] mt-2 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
