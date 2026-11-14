"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck, Zap, Award, Clock } from "lucide-react";
import { SlicedWavesBackground } from "@/components/common/SlicedWavesBackground";

/**
 * AboutHeroClient Component
 *
 * Ultra-Premium Bright Luxury Hero Section:
 * - Dynamic SlicedWaves WebGL canvas with real-time pointer interaction
 * - Refined editorial typography (no cheap pill badges, zero unwanted cards)
 * - 4-pillar architectural executive metric horizon
 * - Precision conversion actions with smooth story navigation
 */
export function AboutHeroClient() {
  return (
    <section className="w-full pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 lg:pb-28 flex flex-col items-center justify-center relative min-h-[85vh] lg:min-h-[92vh] overflow-hidden bg-[#FAF8F5] border-b border-[#E8E2D9]">
      {/* 
        Interactive SlicedWaves WebGL Canvas Stage from React Bits
        Reacts dynamically to pointer coordinates across depth
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <SlicedWavesBackground
          color1="#ff9d4d"
          color2="#ff2d78"
          color3="#3060ff"
          ribbons={3}
          spacing={28}
          perspective={0.45}
          blur={0.6}
          glow={1}
          position={0.76}
          mouseInteraction={true}
          barWidth={0.5}
          ribbonHeight={0.26}
          spread={0.1}
          amplitude={0.1}
          frequency={1}
          curve={0.5}
          slices={0}
          speed={1}
          brightness={1.25}
          rotation={0}
          grain={0.08}
          fade={0}
          opacity={1}
          intro={true}
          lightMode={true}
        />

        {/* Luminous Ivory Scrim Gradients for Maximum Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/92 via-[#FAF8F5]/40 to-[#FAF8F5] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_50%_35%] from-transparent via-[#FAF8F5]/30 to-[#FAF8F5]/90 pointer-events-none" />
      </div>

      {/* Subtle Warm Amber Atmospheric Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#FF5500]/[0.05] blur-[150px] rounded-full pointer-events-none z-0" 
      />

      {/* Subtle Architectural Grid */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#111315_1px,transparent_1px),linear-gradient(to_bottom,#111315_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0" 
      />

      <div className="w-full flex flex-col items-center text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Headline & Narrative Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Pure Typography Heritage Marker (No Pill Bubble) */}
          <span className="font-['Outfit',sans-serif] uppercase tracking-[0.25em] text-xs sm:text-sm font-bold text-[#8C8275] mb-5">
            EST. 2009 • NASHIK, MAHARASHTRA • 17 YEARS OF OPERATIONAL EXCELLENCE
          </span>

          {/* Monumental Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[78px] font-extrabold font-['Poppins',sans-serif] text-[#111315] leading-[1.06] tracking-tight text-balance">
            Powering Nashik&apos;s <br />
            <span className="text-[#FF5500]">Grandest Milestones.</span>
          </h1>

          {/* High-Signal Editorial Copy */}
          <p className="text-base sm:text-xl text-[#403C36] max-w-3xl font-['Outfit',sans-serif] leading-relaxed font-normal mt-6 text-balance">
            Since 2009, Sarvadnya has engineered uninterrupted silent power solutions across Maharashtra. From high-stakes industrial operations and weddings to critical healthcare grids, we keep the state running with 5 to 250 kVA silent DG sets and 24/7 on-site technical dispatch.
          </p>

          {/* Dual Action Conversion Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8 w-full sm:w-auto">
            <Link
              href="/generators"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#FF5500]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Explore Fleet &amp; Rates</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <a
              href="#story"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/90 border border-[#E8E2D9] text-[#111315] hover:border-[#FF5500]/50 hover:bg-white font-bold font-sans text-sm sm:text-base shadow-xs transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              <span>Our Founding Story</span>
              <ChevronDown className="w-4 h-4 text-[#FF5500]" />
            </a>
          </div>
        </motion.div>

        {/* 
          Executive Metric Pillars Horizon
          Architectural 4-column glass plinth resting seamlessly above the SlicedWaves canvas
        */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mt-14 sm:mt-20 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#E8E2D9] shadow-xl shadow-[#111315]/5 p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E2D9]">
            
            {/* Metric 1 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0">
              <div className="flex items-center gap-2 mb-1.5 text-[#FF5500]">
                <Award className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#8C8275]">Established</span>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111315] font-sans tracking-tight">2009</span>
              <span className="text-xs text-[#524E48] mt-1 font-medium">17+ Years of Unbroken Trust</span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2 mb-1.5 text-[#FF5500]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#8C8275]">Track Record</span>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111315] font-sans tracking-tight">10,000+</span>
              <span className="text-xs text-[#524E48] mt-1 font-medium">Successful Project Deployments</span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2 mb-1.5 text-[#FF5500]">
                <Zap className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#8C8275]">Fleet Range</span>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111315] font-sans tracking-tight">5 – 250 kVA</span>
              <span className="text-xs text-[#524E48] mt-1 font-medium">Silent CPCB-IV+ Certified Sets</span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2 mb-1.5 text-[#FF5500]">
                <Clock className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#8C8275]">Readiness</span>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111315] font-sans tracking-tight">24/7/365</span>
              <span className="text-xs text-[#524E48] mt-1 font-medium">On-Site Technical Engineers</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
