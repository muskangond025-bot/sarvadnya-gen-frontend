"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { LocationPin3D } from "./LocationPin3D";

export interface ServiceZone {
  region: string;
  coverage: string;
  highlight: string;
  primary?: boolean;
}

export type TechFeature = ServiceZone;
export const TECH_FEATURES: any[] = [];

interface TechnologyClientProps {
  zones: ServiceZone[];
}

const CYCLE_INTERVAL = 3000; // Exact 3 seconds auto-cycle

/**
 * TechnologyClient Component
 * 
 * Re-architected to user requirements:
 * - Left side: 3D Hyperrealistic Model Map Pointer (Sketchfab 3D Icon by Alexander: a30e2619537a425d90618ae5901c2989)
 *   configured to continuously auto-rotate 360 degrees on loop in place with transparent background
 * - Right side: Open editorial kinetic stage (NO CARDS) auto-cycling text every 3 seconds
 * - Preserves exact region, coverage, and highlight data without alteration
 * - Zero unwanted text added
 */
export function TechnologyClient({ zones }: TechnologyClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  const currentZone = zones[activeIndex] || zones[0];

  // Auto-cycle through service zones every 3 seconds
  useEffect(() => {
    if (isPaused || zones.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % zones.length);
    }, CYCLE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, zones.length]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center select-none"
    >
      {/* 
        LEFT COLUMN: 3D HYPERREALISTIC MODEL (360° CONTINUOUS ROTATING MAP POINTER)
        - Exact Sketchfab 3D model requested: https://sketchfab.com/models/a30e2619537a425d90618ae5901c2989
        - Configured with: autostart=1, transparent=1, autospin=0.6 (continuous 360° loop in place)
        - scrollwheel=0 (allows page scrolling without capture)
        - ui_controls=0, ui_infos=0, ui_watermark=0, ui_hint=0 (clean minimal studio presentation)
      */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full py-4 sm:py-6">
        
        {/* Ambient Warm Volumetric Aura */}
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-[#FF5500]/15 blur-[100px] rounded-full pointer-events-none" />

        {/* 3D Pin & Floating Stage */}
        <div className="relative w-full max-w-[280px] sm:max-w-[400px] h-[280px] sm:h-[400px] flex flex-col items-center justify-center">
          
          {/* Ground Radar Pulse Wave 1 */}
          <motion.div
            animate={{
              scale: [0.6, 1.8],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute bottom-6 w-36 h-16 rounded-full border-2 border-[#FF5500]/40 pointer-events-none"
          />

          {/* Ground Radar Pulse Wave 2 (Staggered) */}
          <motion.div
            animate={{
              scale: [0.6, 2.2],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2.8,
              delay: 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute bottom-6 w-36 h-16 rounded-full border border-amber-400/35 pointer-events-none"
          />

          {/* Ground Contact Shadow */}
          <div className="absolute bottom-8 w-28 h-7 bg-[#1F1F1E]/35 rounded-full blur-md pointer-events-none" />

          {/* 3D Hyperrealistic Map Pointer Canvas Viewport (Continuous 360° Loop, No Drag/Rotate) */}
          <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden flex items-center justify-center pointer-events-none select-none">
            <LocationPin3D />
          </div>

        </div>

      </div>

      {/* 
        RIGHT COLUMN: OPEN EDITORIAL KINETIC STAGE (NO CARDS)
        - Text auto-cycles smoothly every 3 seconds
        - Zero card borders, zero background boxes
        - Exactly preserved data: region, coverage, highlight
      */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        
        {/* 
          1. KINETIC STEP NAVIGATION RAIL (01, 02, 03) WITH 3-SECOND TIMER
        */}
        <div className="flex items-center gap-3 sm:gap-5 border-b border-[#E8E2D9] pb-4 mb-6 sm:mb-8">
          {zones.map((zone, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={zone.region}
                onClick={() => setActiveIndex(idx)}
                className="group relative flex items-center gap-2.5 py-1 px-2 cursor-pointer select-none text-left"
                aria-label={`Select ${zone.region}`}
              >
                {/* Monospace Step Numeral */}
                <span
                  className={`font-mono text-xs sm:text-sm font-extrabold transition-colors duration-300 ${
                    isActive ? "text-[#FF5500]" : "text-[#A8A29E] group-hover:text-[#625D55]"
                  }`}
                >
                  0{idx + 1}
                </span>

                {/* Region Label */}
                <span
                  className={`font-sans font-bold text-xs sm:text-sm tracking-tight transition-colors duration-300 ${
                    isActive ? "text-[#1F1F1E]" : "text-[#88837B] group-hover:text-[#1F1F1E]"
                  }`}
                >
                  {zone.region}
                </span>

                {/* 3-Second Cycle Progress Bar under active node */}
                {isActive && (
                  <div className="absolute -bottom-4 left-0 right-0 h-[2.5px] bg-[#E8E2D9] rounded-full overflow-hidden">
                    <motion.div
                      key={`timer-${activeIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: CYCLE_INTERVAL / 1000,
                        ease: "linear",
                      }}
                      className="h-full bg-[#FF5500]"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 
          2. KINETIC CONTENT DISPLAY (Smooth 0.35s fade + slide transitions every 3s)
          (Completely open, NO CARDS!)
        */}
        <div className="min-h-[170px] sm:min-h-[190px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentZone.region}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Region Display Heading */}
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-[36px] text-[#1F1F1E] tracking-tight leading-[1.16] mb-3">
                {currentZone.region}
              </h3>

              {/* Geographic Coverage Details */}
              <p className="text-base sm:text-lg text-[#625D55] leading-relaxed mb-5 font-normal max-w-xl">
                {currentZone.coverage}
              </p>

              {/* Operational Dispatch Highlight Row */}
              <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#1F1F1E] font-semibold py-3 border-t border-[#E8E2D9] max-w-xl">
                <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>{currentZone.highlight}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 
          3. DIRECT ACTION BUTTON
        */}
        <div className="pt-6 mt-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#1F1F1E] hover:bg-[#FF5500] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-[#1F1F1E]/10 hover:shadow-lg hover:shadow-[#FF5500]/25 group w-full sm:w-auto text-center"
          >
            <span>{t("tech.availability")}</span>
            <ArrowRight className="w-4 h-4 text-[#FF5500] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

      </div>
    </div>
  );
}
