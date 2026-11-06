import React from "react";
import Link from "next/link";
import { Button } from "@/components/common";
import { HeroClient } from "./HeroClient";
import { ShieldCheck, Sparkles, MapPin, Gauge } from "lucide-react";

/**
 * Hero Component (Server Component)
 * 
 * Redesigned to Awwwards standards following:
 * - docs/content.md Section 7.1
 * - docs/design-system.md 60/30/10 Energy Orange palette
 * - docs/ui-rules.md (Zero badge pills, zero decorative numbers, zero subtext bloat, zero clipping, absolute visibility, zero overlapping)
 */
export function Hero() {
  return (
    <section className="relative w-full pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#FAF8F5] overflow-hidden border-b border-[#E8E2D9]">
      {/* Subtle ambient warmth - restrained, never overwhelming */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#FF5500]/[0.03] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[350px] bg-[#FFF7EB] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Conversion */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 lg:gap-8 max-w-2xl">
            {/* Primary Display Heading */}
            <h1 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl text-[#1F1F1E] tracking-tight leading-[1.12] text-balance">
              Reliable Power. <br className="hidden sm:inline" />
              <span className="text-[#FF5500]">When It Matters Most.</span>
            </h1>

            {/* Supporting Copy (High-Signal, No Bloat) */}
            <p className="text-base sm:text-lg text-[#625D55] leading-relaxed max-w-xl">
              Specialized silent generator rental solutions for weddings, grand events, and industrial projects. Explore rental requirements across a 5 kVA–250 kVA capacity range and enquire about a solution suited to your application.
            </p>

            {/* Primary & Secondary Conversion Actions */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto pt-1">
              <Button href="/book" variant="primary" size="lg" className="w-full sm:w-auto">
                Request a Quote
              </Button>
              <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Rental Solutions
              </Button>
            </div>

            {/* Verified Operational Facts (Replaces fake stats with genuine service assurances) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-[#E8E2D9] w-full mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold text-[#1F1F1E] font-sans">5 – 250 kVA</span>
                <span className="text-xs text-[#625D55] leading-snug">Capacity fleet for events & industry</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold text-[#1F1F1E] font-sans">Acoustic Silent</span>
                <span className="text-xs text-[#625D55] leading-snug">CPCB-II soundproof enclosures</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold text-[#1F1F1E] font-sans">Nashik & Across MH</span>
                <span className="text-xs text-[#625D55] leading-snug">Dedicated delivery & setup team</span>
              </div>
            </div>

          </div>

          {/* Right Column: Quiet Power Reveal Visual Experience */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <HeroClient />
          </div>

        </div>
      </div>
    </section>
  );
}
