"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Volume2, Users, Truck, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Community Component
 *
 * Ultra-Premium "The Sarvadnya Promise" Section:
 * - Desktop: 4-Pillar client guarantees in symmetric grid
 * - Mobile: Fluid horizontal touch-snap carousel with dot pagination
 * - Clean editorial cards without pill badges or redundant text
 */
export function Community() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const promises = [
    {
      num: "01",
      icon: ShieldCheck,
      title: "Guaranteed Zero Downtime",
      desc: "Synchronized multi-generator setups and automatic load-transfer units ensure zero-second interruptions for mission-critical operations.",
    },
    {
      num: "02",
      icon: Volume2,
      title: "Acoustic Silence (<75 dBA)",
      desc: "Engineered soundproof acoustic canopies with heavy-duty silencers designed specifically for luxury weddings, banquets, and urban healthcare sites.",
    },
    {
      num: "03",
      icon: Users,
      title: "Stationed Field Engineers",
      desc: "Certified mechanical and electrical engineers remain on-site throughout your deployment to manage fuel, live monitoring, and real-time load balancing.",
    },
    {
      num: "04",
      icon: Truck,
      title: "Rapid Transit Fleet",
      desc: "In-house dedicated transportation trailers and mobile quick-response units ready for immediate deployment across 5 districts in Maharashtra.",
    },
  ];

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), promises.length - 1));
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
    <section className="w-full py-14 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#E8E2D9] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Animated Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight leading-[1.12]">
            The Sarvadnya <span className="text-[#FF5500]">Promise</span>
          </h2>
          <p className="text-base sm:text-lg text-[#524E48] font-['Outfit',sans-serif] leading-relaxed mt-4">
            We deliver uninterrupted power with rapid dispatch, meticulously maintained generator sets, and dedicated 24/7 technical engineers on site.
          </p>
        </motion.div>

        {/* Mobile View: Horizontal Touch-Snap Carousel (< md) */}
        <div className="block md:hidden w-full mt-10">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x -mx-4 px-4 pb-4 pt-1 scroll-smooth"
          >
            {promises.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`mobile-promise-${idx}`}
                  className="w-[84vw] max-w-[330px] shrink-0 snap-center bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E2D9] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-sm font-extrabold text-[#FF5500] font-mono tracking-wider">
                        {item.num}
                      </span>
                      <div className="size-10 rounded-2xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#111315] font-['Poppins',sans-serif] leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-[#403C36] font-['Outfit',sans-serif] leading-relaxed mt-3">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Dot Indicators & Arrow Navigation */}
          <div className="flex items-center justify-between pt-3 px-1">
            <div className="flex items-center gap-1.5">
              {promises.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to promise ${i + 1}`}
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
                aria-label="Previous promise"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(Math.min(promises.length - 1, activeIndex + 1))}
                disabled={activeIndex === promises.length - 1}
                className="p-1.5 rounded-full border border-[#E8E2D9] bg-white text-[#111315] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Next promise"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop 4-Pillar Animated Card Grid (md and above) - Text removed for all */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-12 sm:mt-16">
          {promises.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                className="bg-[#FAF8F5] rounded-3xl p-7 sm:p-8 border border-[#E8E2D9] shadow-xs hover:border-[#FF5500]/60 hover:bg-white hover:shadow-xl hover:shadow-[#FF5500]/10 transition-all duration-300 flex flex-col justify-between group cursor-default relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-extrabold text-[#FF5500] font-mono tracking-wider">
                      {item.num}
                    </span>
                    <div className="size-11 rounded-2xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] group-hover:bg-[#FF5500] group-hover:text-white group-hover:border-[#FF5500] transition-all duration-300 shadow-2xs group-hover:scale-105">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#111315] font-['Poppins',sans-serif] leading-snug group-hover:text-[#FF5500] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#403C36] font-['Outfit',sans-serif] leading-relaxed mt-3">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Bottom Consultation Plinth */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs hover:border-[#FF5500]/40 transition-colors"
        >
          <div className="flex flex-col sm:text-left text-center">
            <span className="text-base sm:text-lg font-bold text-[#111315] font-['Poppins',sans-serif]">
              Need a tailored power assessment for your upcoming project?
            </span>
            <span className="text-xs sm:text-sm text-[#71695F] font-['Outfit',sans-serif] mt-0.5">
              Fleet dispatch engineers available 24/7 for sizing calculations and site audits.
            </span>
          </div>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold text-sm shadow-md shadow-[#FF5500]/25 transition-all hover:scale-[1.03] active:scale-[0.98] shrink-0 font-['Outfit',sans-serif]"
          >
            <span>Connect Fleet Experts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
