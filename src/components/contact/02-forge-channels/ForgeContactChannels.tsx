"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Truck,
  MapPin,
  ArrowUpRight,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RollingText } from "../common/RollingText";
import { cn } from "@/lib/utils";

/**
 * ForgeContactChannels Component (Bright Luxury Theme)
 *
 * - Desktop: 4-Column architectural grid with hairline dividers
 * - Mobile: Fluid horizontal touch-snap carousel with dot pagination
 */
export function ForgeContactChannels() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), 3));
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
    <section className="relative w-full bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#111315] z-20 overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Mobile Horizontal Snap-Swipe Carousel (< md) */}
        <div className="block md:hidden w-full py-6 px-4">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x -mx-4 px-4 pb-4 pt-1 scroll-smooth"
          >
            {/* Card 1: Phone */}
            <div className="w-[84vw] max-w-[320px] shrink-0 snap-center p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5500] font-bold">
                    Phone
                  </span>
                  <div className="size-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] shrink-0">
                    <Phone className="size-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 my-2">
                  <a
                    href="tel:+916262629944"
                    className="font-serif text-lg text-[#111315] font-semibold tracking-tight inline-flex items-center gap-1.5"
                  >
                    <span>+91 62626 29944</span>
                    <ArrowUpRight className="size-3.5 text-[#FF5500]" />
                  </a>
                  <span className="text-[11px] font-mono text-[#8C8275]">
                    Tanmay Avhad (Lead Dispatch)
                  </span>

                  <a
                    href="tel:+919823197881"
                    className="font-serif text-base text-[#524E48] font-medium tracking-tight pt-2 inline-flex items-center gap-1.5"
                  >
                    <span>+91 98231 97881</span>
                    <ArrowUpRight className="size-3.5 text-[#FF5500]" />
                  </a>
                  <span className="text-[11px] font-mono text-[#8C8275]">
                    Gopal Avhad (Technical Operations)
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#625D55] mt-4 pt-3 border-t border-[#E8E2D9] font-sans">
                Mon — Sat: 9:00 AM — 7:00 PM • <strong className="text-[#FF5500]">24/7 Dispatch</strong>
              </p>
            </div>

            {/* Card 2: Email */}
            <div className="w-[84vw] max-w-[320px] shrink-0 snap-center p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5500] font-bold">
                    Email
                  </span>
                  <div className="size-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] shrink-0">
                    <Mail className="size-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 my-2">
                  <a
                    href="mailto:info@sarvadnyagenerators.com"
                    className="font-serif text-base text-[#111315] font-semibold tracking-tight truncate inline-flex items-center gap-1.5"
                  >
                    <span className="truncate">info@sarvadnyagenerators.com</span>
                    <ArrowUpRight className="size-3.5 text-[#FF5500] shrink-0" />
                  </a>

                  <div className="flex flex-col text-[11px] text-[#625D55] gap-1 pt-2 font-sans">
                    <span className="truncate">Support: support@sarvadnyagenerators.com</span>
                    <span className="truncate">Sales: sales@sarvadnyagenerators.com</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#625D55] mt-4 pt-3 border-t border-[#E8E2D9] font-sans">
                Response within 1–2 hours for rental inquiries.
              </p>
            </div>

            {/* Card 3: Concierge / Logistics */}
            <div className="w-[84vw] max-w-[320px] shrink-0 snap-center p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5500] font-bold">
                    Logistics
                  </span>
                  <div className="size-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] shrink-0">
                    <Truck className="size-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 my-2">
                  <h3 className="font-serif text-base text-[#111315] font-semibold tracking-tight">
                    Statewide Mobilization
                  </h3>
                  <p className="text-xs text-[#625D55] leading-relaxed font-sans">
                    Heavy hydraulic fleet transport, professional loading, and on-site electrical distribution.
                  </p>

                  <div className="pt-2">
                    <a
                      href="https://wa.me/916262629944"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FF5500] font-bold"
                    >
                      <MessageSquare className="size-3.5 shrink-0" />
                      <span>WhatsApp Quick Dispatch</span>
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#625D55] mt-4 pt-3 border-t border-[#E8E2D9] font-sans">
                Guaranteed &lt; 60 minute emergency response in Nashik.
              </p>
            </div>

            {/* Card 4: Visit Us */}
            <div className="w-[84vw] max-w-[320px] shrink-0 snap-center p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5500] font-bold">
                    Visit Us
                  </span>
                  <div className="size-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] shrink-0">
                    <MapPin className="size-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 my-2">
                  <h3 className="font-serif text-base text-[#111315] font-semibold tracking-tight">
                    Nashik Central Depot
                  </h3>
                  <p className="text-xs text-[#625D55] leading-relaxed font-sans">
                    Wadala - Pathardi Rd, behind Sudarshan Lawns, Indira Nagar, Nashik 422009
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E8E2D9] text-[#524E48] font-bold">
                      MIDC Ambad
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E8E2D9] text-[#524E48] font-bold">
                      Satpur
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E8E2D9] text-[#524E48] font-bold">
                      Sinnar
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#625D55] mt-4 pt-3 border-t border-[#E8E2D9] font-sans">
                Inspections &amp; consultations by appointment.
              </p>
            </div>
          </div>

          {/* Carousel Indicators & Controls */}
          <div className="flex items-center justify-between pt-2 px-1">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={`channel-dot-${i}`}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to channel ${i + 1}`}
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
                aria-label="Previous channel"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(Math.min(3, activeIndex + 1))}
                disabled={activeIndex === 3}
                className="p-1.5 rounded-full border border-[#E8E2D9] bg-white text-[#111315] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Next channel"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop 4-Column Grid (md and above) - 100% UNCHANGED */}
        <ul className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E8E2D9]">
          {/* Channel 1: Phone */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6 sm:p-7 xl:p-9 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold whitespace-nowrap">
                  Phone
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
                  <Phone className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                <a
                  href="tel:+916262629944"
                  className="font-serif text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <RollingText text="+91 62626 29944" singleLine />
                  <ArrowUpRight className="size-4 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </a>
                <span className="text-[11px] font-mono text-[#8C8275] whitespace-nowrap truncate">
                  Tanmay Avhad (Lead Dispatch Desk)
                </span>

                <a
                  href="tel:+919823197881"
                  className="font-serif text-lg xl:text-[20px] text-[#524E48] font-normal tracking-tight transition-colors pt-2.5 inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <RollingText text="+91 98231 97881" singleLine />
                  <ArrowUpRight className="size-3.5 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </a>
                <span className="text-[11px] font-mono text-[#8C8275] whitespace-nowrap truncate">
                  Gopal Avhad (Technical Operations)
                </span>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              <span className="whitespace-nowrap">Mon — Sat: 9:00 AM — 7:00 PM</span>
              <br />
              <strong className="text-[#FF5500] font-semibold">
                24/7 Rapid Emergency Dispatch
              </strong>
            </p>
          </motion.li>

          {/* Channel 2: Email */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="p-6 sm:p-7 xl:p-9 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold whitespace-nowrap">
                  Email
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
                  <Mail className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                <a
                  href="mailto:info@sarvadnyagenerators.com"
                  className="font-serif text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <RollingText text="Send Us A Message" singleLine />
                  <ArrowUpRight className="size-4 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </a>
                <span className="text-[11px] font-mono text-[#8C8275] whitespace-nowrap truncate">
                  info@sarvadnyagenerators.com
                </span>

                <div className="flex flex-col text-[11px] text-[#625D55] gap-1 pt-2.5 font-sans">
                  <span className="whitespace-nowrap truncate">
                    Support: support@sarvadnyagenerators.com
                  </span>
                  <span className="whitespace-nowrap truncate">
                    Sales: sales@sarvadnyagenerators.com
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Response within 1–2 hours for rental inquiries and mobilization.
            </p>
          </motion.li>

          {/* Channel 3: Concierge / Logistics */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="p-6 sm:p-7 xl:p-9 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold whitespace-nowrap">
                  Concierge &amp; Logistics
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
                  <Truck className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-2">
                <h3 className="font-serif text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight whitespace-nowrap">
                  <RollingText text="Statewide Mobilization" singleLine />
                </h3>
                <p className="text-xs text-[#625D55] leading-relaxed mt-1 font-sans">
                  Dedicated heavy hydraulic fleet transport, professional loading,
                  and on-site electrical distribution.
                </p>

                <div className="pt-2">
                  <a
                    href="https://wa.me/916262629944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF5500] hover:underline font-bold whitespace-nowrap"
                  >
                    <MessageSquare className="size-3.5 shrink-0" />
                    <span>WhatsApp Quick Dispatch</span>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Guaranteed &lt; 60 minute emergency response in Nashik.
            </p>
          </motion.li>

          {/* Channel 4: Visit Us / Depots */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="p-6 sm:p-7 xl:p-9 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold whitespace-nowrap">
                  Visit Us
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
                  <MapPin className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-2">
                <h3 className="font-serif text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight whitespace-nowrap">
                  <RollingText text="Nashik Central Depot" singleLine />
                </h3>
                <p className="text-xs text-[#625D55] leading-relaxed mt-1 font-sans">
                  Wadala - Pathardi Rd, behind Sudarshan Lawns, Indira Nagar,
                  Nashik 422009
                </p>
              </div>

              {/* Regional Depots Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold whitespace-nowrap">
                  MIDC Ambad
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold whitespace-nowrap">
                  Satpur
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold whitespace-nowrap">
                  Sinnar
                </span>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Equipment inspections &amp; consultations by appointment.
            </p>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
