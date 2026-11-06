"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TOTAL_BULBS = 14;
const DRIVE_DURATION = 24; // 24s slow, steady, majestic commercial drive speed

interface BulbData {
  id: number;
  percent: number;
  triggerTime: number; // in seconds
}

// Staggered trigger timestamps based on truck speed & headlight cone
const BULBS: BulbData[] = Array.from({ length: TOTAL_BULBS }, (_, i) => {
  const percent = (i + 0.5) * (100 / TOTAL_BULBS);
  const triggerTime = Math.max(0.5, (percent - 8) * (20 / 100) + 1.2);
  return {
    id: i,
    percent,
    triggerTime,
  };
});

interface GeneratorTruckTrackProps {
  children?: React.ReactNode;
}

/**
 * GeneratorTruckTrack Component
 * 
 * Hyper-Realistic 3D Generator Truck & Dynamic Lighting Stage:
 * - 100% UNCLIPPED & FULL HEADROOM: The entire chrome silencer exhaust barrel, 
 *   rain flap, lifting gantry frame, and cab roof are completely visible with generous clearance!
 * - Authentic 3D Render of Tata 1109 Ochre-Brown Truck + Sarvadnya Energy Orange Generator (#FF5500)
 * - Razor-sharp Devanagari lettering: "सर्वज्ञ जनरेटर" + Cummins Power Generation logo
 * - Dual high-beam headlights with volumetric light cone sweeping forward along the road
 * - Overhead Edison bulbs chain-reaction spark and warm amber glow as the truck drives under them
 * - GPU-accelerated butter-smooth translate3d motion (zero stutter/glitch)
 * - Tires resting squarely on the asphalt road baseline
 * - Zero unwanted text badges on the road
 */
export function GeneratorTruckTrack({ children }: GeneratorTruckTrackProps) {
  const [cycleKey, setCycleKey] = useState<number>(0);
  const [activeBulbs, setActiveBulbs] = useState<Set<number>>(new Set());
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(false);

  // Synchronized cycle controller for headlights and overhead bulbs
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Reset for fresh cycle
    setActiveBulbs(new Set());
    setHeadlightsOn(false);

    // Turn headlights ON shortly after truck enters from left edge
    const headTimer = setTimeout(() => {
      setHeadlightsOn(true);
    }, 800);
    timers.push(headTimer);

    // Sequentially ignite each overhead bulb as truck passes under it
    BULBS.forEach((bulb) => {
      const t = setTimeout(() => {
        setActiveBulbs((prev) => new Set(prev).add(bulb.id));
      }, bulb.triggerTime * 1000);
      timers.push(t);
    });

    // When truck exits at right (24s), turn headlights off
    const exitTimer = setTimeout(() => {
      setHeadlightsOn(false);
    }, DRIVE_DURATION * 1000);
    timers.push(exitTimer);

    // Restart cycle after 28 seconds (24s drive + 4s pause)
    const restartTimer = setTimeout(() => {
      setCycleKey((prev) => prev + 1);
    }, (DRIVE_DURATION + 4) * 1000);
    timers.push(restartTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [cycleKey]);

  return (
    <div
      className="relative w-full overflow-hidden select-none border-b border-white/10"
      style={{
        background: "linear-gradient(180deg, rgba(6,8,10,0.98) 0%, rgba(10,13,16,0.94) 100%)",
      }}
      aria-label="Interactive Generator Delivery Stage"
    >
      {/* Ambient Night Aurora Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-44 bg-[#FF5500]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-44 bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* 
        1. OVERHEAD ELECTRICAL CATENARY WIRE & BULBS (Chain Reaction Lighting)
      */}
      <div className="relative w-full h-16 sm:h-20 flex items-center justify-between px-2 sm:px-6 z-20">
        {/* Electrical Cable Wire */}
        <svg
          className="absolute inset-x-0 top-3 w-full h-6 pointer-events-none opacity-40"
          preserveAspectRatio="none"
          viewBox="0 0 1200 24"
        >
          <path
            d="M0,8 Q300,18 600,8 T1200,8"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          />
        </svg>

        {/* The 14 Industrial Power Bulbs */}
        <div className="relative w-full flex items-center justify-between">
          {BULBS.map((bulb) => {
            const isLit = activeBulbs.has(bulb.id);

            return (
              <div
                key={bulb.id}
                className="relative flex flex-col items-center group cursor-default"
                style={{
                  left: `${bulb.percent}%`,
                  position: "absolute",
                  transform: "translateX(-50%)",
                }}
              >
                {/* Brass Socket Cap */}
                <div className="w-1.5 sm:w-2 h-2 sm:h-2.5 bg-[#8E7958] rounded-xs border border-black/40 shadow-xs" />

                {/* Glass Bulb Body */}
                <div
                  className={cn(
                    "relative size-3.5 sm:size-5 lg:size-6 rounded-full border transition-all duration-500 flex items-center justify-center",
                    isLit
                      ? "bg-amber-100 border-amber-300 shadow-[0_0_20px_#FF9900,0_0_45px_rgba(255,153,0,0.75)] scale-110"
                      : "bg-white/10 border-white/20 shadow-none scale-100"
                  )}
                >
                  {/* Tungsten Filament Wire */}
                  <div
                    className={cn(
                      "w-1 sm:w-1.5 h-1.5 sm:h-2 rounded-xs transition-all duration-300",
                      isLit
                        ? "bg-amber-400 shadow-[0_0_8px_#FFF] animate-pulse"
                        : "bg-white/30"
                    )}
                  />

                  {/* Spark Burst Effect on Ignition */}
                  {isLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-full bg-amber-400 pointer-events-none blur-xs"
                    />
                  )}
                </div>

                {/* Radial Amber Floor Wash when lit */}
                <div
                  className={cn(
                    "absolute top-6 w-16 sm:w-28 h-28 rounded-full pointer-events-none transition-opacity duration-700 blur-2xl",
                    isLit
                      ? "bg-[#FF9900]/25 opacity-100"
                      : "bg-transparent opacity-0"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        2. FOREGROUND FLOATING ARCHITECTURAL FOOTER CARDS
        (Text and cards layer cleanly on top of the stage)
      */}
      {children && (
        <div className="relative z-30 w-full">
          {children}
        </div>
      )}

      {/* 
        3. ASPHALT ROADWAY & VEHICLE STAGE
        Height:
        - Mobile: h-[270px] (truck is 163px high, baseline 38px -> 201px total, leaving 69px clear headroom)
        - Tablet: sm:h-[320px] (truck is 214px high, baseline 44px -> 258px total, leaving 62px clear headroom)
        - Desktop: lg:h-[350px] (truck is 245px high, baseline 46px -> 291px total, leaving 59px clear headroom)
        RESULT: 100% UNCLIPPED & UNTOUCHED ROOF SILENCER, EXHAUST FLAP, AND CAB!
      */}
      <div className="relative w-full h-[270px] sm:h-[320px] lg:h-[350px] overflow-hidden">
        
        {/* Asphalt Road Surface with Top Baseline Border */}
        <div className="absolute inset-x-0 bottom-0 h-10 sm:h-12 bg-[#090B0D] border-t-2 border-[#2E333C] z-10">
          {/* Dashed Center Road Line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between gap-4 px-2 opacity-30">
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} className="inline-block w-8 sm:w-12 h-1 bg-amber-400 shrink-0 rounded-full" />
            ))}
          </div>

          {/* Road Asphalt Reflection & Wet Sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-white/5 pointer-events-none" />
        </div>

        {/* 
          GPU-ACCELERATED BUTTER-SMOOTH TRUCK DRIVE
          Translates from -550px to calc(100vw + 150px) in 24 seconds with pure transform3d.
          Zero layout reflows, zero stuttering, 60fps cinematic motion!
          Tires rest EXACTLY on the baseline (bottom: 38px on mobile, 44px on tablet, 46px on desktop).
        */}
        <motion.div
          key={cycleKey}
          initial={{ transform: "translate3d(-550px, 0px, 0px)" }}
          animate={{ transform: "translate3d(calc(100vw + 150px), 0px, 0px)" }}
          transition={{
            duration: DRIVE_DURATION,
            ease: "linear",
          }}
          className="absolute bottom-[38px] sm:bottom-[44px] lg:bottom-[46px] left-0 z-20 flex items-end will-change-transform pointer-events-none"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* 
            VOLUMETRIC HIGH-BEAM HEADLIGHT CONE
            Physically aligned with the Tata 1109 front bumper headlight:
            left: 98%, bottom: 26% of the truck height!
          */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: headlightsOn ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-[97%] bottom-[22%] sm:bottom-[24%] pointer-events-none z-30"
            style={{
              width: "480px",
              height: "125px",
              transform: "translateY(15%)",
            }}
          >
            {/* Volumetric High-beam Light Cone */}
            <div
              className="w-full h-full opacity-90"
              style={{
                background:
                  "radial-gradient(ellipse at left center, rgba(255, 245, 205, 0.98) 0%, rgba(255, 180, 20, 0.6) 26%, rgba(255, 140, 0, 0.22) 65%, transparent 88%)",
                clipPath: "polygon(0% 42%, 100% 0%, 100% 100%, 0% 58%)",
                filter: "blur(4px)",
              }}
            />

            {/* Intense Bumper Headlight Flare Spot */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 size-5 rounded-full bg-white shadow-[0_0_26px_#FFFFFF,0_0_55px_#FFB800] blur-[0.8px]" />
          </motion.div>

          {/* 
            HYPER-REALISTIC 3D TATA 1109 GENERATOR TRUCK
            - 100% Full Uncut Headroom: Complete chrome silencer barrel, exhaust elbow pipe, 
              rain flap, crane-lifting rails, and cab roof!
            - Tata 1109 Ochre-Brown Finish (#B86A28) + Sarvadnya Energy Orange Canopy (#FF5500)
            - Authentic Devanagari "सर्वज्ञ जनरेटर" + Cummins Power Generation logo
            - Drop-shadow grounding the tires squarely on the asphalt road!
          */}
          <div className="relative group cursor-default">
            {/* Soft Ambient Contact Shadow Under Tires */}
            <div 
              className="absolute -bottom-2 inset-x-4 h-5 bg-black/80 blur-md rounded-full pointer-events-none" 
            />

            {/* Realistic 3D Mobile DG Delivery Truck Image */}
            <img
              src="/images/generators/truck_3d_realistic.png"
              alt="Sarvadnya Tata 1109 Mobile Silent DG Delivery Truck"
              width={1268}
              height={646}
              className="w-[320px] sm:w-[420px] lg:w-[480px] h-auto object-contain pointer-events-none select-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.95)]"
              draggable={false}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
