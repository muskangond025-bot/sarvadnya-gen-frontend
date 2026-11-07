"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TOTAL_BULBS = 14;
const DRIVE_DURATION = 20; // 20s steady commercial drive speed

interface BulbData {
  id: number;
  percent: number;
  triggerTime: number; // in seconds
}

// Staggered trigger timestamps based on truck speed & headlight cone
const BULBS: BulbData[] = Array.from({ length: TOTAL_BULBS }, (_, i) => {
  const percent = (i + 0.5) * (100 / TOTAL_BULBS);
  const triggerTime = Math.max(0.5, (percent - 6) * (17 / 100) + 1.0);
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
 * - Proportioned cleanly to fit within a single screen view (100vh / ~640px) without vertical bloat!
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

    // When truck exits at right (20s), turn headlights off
    const exitTimer = setTimeout(() => {
      setHeadlightsOn(false);
    }, DRIVE_DURATION * 1000);
    timers.push(exitTimer);

    // Restart cycle after 21.5 seconds (20s drive + 1.5s seamless reset)
    const restartTimer = setTimeout(() => {
      setCycleKey((prev) => prev + 1);
    }, (DRIVE_DURATION + 1.5) * 1000);
    timers.push(restartTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [cycleKey]);

  return (
    <div
      className="relative w-full overflow-hidden select-none border-b border-black/10 flex flex-col justify-between flex-1"
      style={{
        background: "linear-gradient(180deg, #FAF8F5 0%, #F4EFE6 100%)",
      }}
      aria-label="Interactive Generator Delivery Stage"
    >
      {/* Ambient Warm Golden Aurora Glow */}
      <div className="absolute top-0 left-1/4 w-[450px] h-36 bg-[#FF5500]/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[450px] h-36 bg-amber-500/[0.06] blur-3xl pointer-events-none" />

      {/* 
        1. OVERHEAD ELECTRICAL CATENARY WIRE & BULBS (Chain Reaction Lighting)
        Compact height: h-10 sm:h-12
      */}
      <div className="relative w-full h-10 sm:h-12 flex items-center justify-between px-2 sm:px-6 z-20 shrink-0">
        {/* Electrical Cable Wire */}
        <svg
          className="absolute inset-x-0 top-2 w-full h-5 pointer-events-none opacity-40"
          preserveAspectRatio="none"
          viewBox="0 0 1200 20"
        >
          <path
            d="M0,6 Q300,15 600,6 T1200,6"
            fill="none"
            stroke="rgba(31,31,30,0.35)"
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
                <div className="w-1.5 h-1.5 bg-[#8E7958] rounded-xs border border-black/30 shadow-xs" />

                {/* Glass Bulb Body */}
                <div
                  className={cn(
                    "relative size-3 sm:size-4 rounded-full border transition-all duration-500 flex items-center justify-center",
                    isLit
                      ? "bg-amber-100 border-amber-400 shadow-[0_0_16px_#FF9900,0_0_36px_rgba(255,153,0,0.7)] scale-110"
                      : "bg-black/5 border-black/20 shadow-none scale-100"
                  )}
                >
                  {/* Tungsten Filament Wire */}
                  <div
                    className={cn(
                      "w-1 h-1 rounded-xs transition-all duration-300",
                      isLit
                        ? "bg-amber-500 shadow-[0_0_6px_#FF9900] animate-pulse"
                        : "bg-black/25"
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
                    "absolute top-4 w-12 sm:w-20 h-20 rounded-full pointer-events-none transition-opacity duration-700 blur-xl",
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
        <div className="relative z-30 w-full flex-1 flex flex-col justify-center">
          {children}
        </div>
      )}

      {/* 
        3. ASPHALT ROADWAY & VEHICLE STAGE
        Guaranteed 100% UNCLIPPED & FULL HEADROOM:
        - overflow-x-clip prevents page scrollbars
        - overflow-y-visible guarantees truck cabin roof, sun visor, and exhaust silencer NEVER clip!
        - Roadway fully engulfs lower undercarriage so zero white/beige gap is ever visible!
        - Truck drives directly ON the asphalt road where the black surface and dashed line are!
      */}
      <div className="relative w-full h-[210px] sm:h-[235px] lg:h-[255px] overflow-x-clip overflow-y-visible shrink-0">
        
        {/* Asphalt Road Surface with Centerline & Shoulder */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-[#181B20] via-[#101216] to-[#0A0B0E] border-t-2 border-[#2E333C] z-10">
          {/* Road Asphalt Reflection & Wet Sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5 pointer-events-none" />

          {/* Dashed Center Road Line running along the driving lane */}
          <div className="absolute inset-x-0 bottom-[14px] sm:bottom-[18px] lg:bottom-[22px] flex justify-between gap-4 px-2 opacity-40 pointer-events-none">
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} className="inline-block w-6 sm:w-10 h-1 bg-amber-400 shrink-0 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
            ))}
          </div>
        </div>

        {/* 
          GPU-ACCELERATED BUTTER-SMOOTH TRUCK DRIVE
          Translates from -380px to calc(100vw + 60px) in 20 seconds with pure transform3d.
          Zero layout reflows, zero stuttering, 60fps cinematic motion!
          Tires drive directly ON the asphalt road lane where the black surface and line are (bottom: 12px to 18px).
          Steady commercial drive (zero bounce).
        */}
        <motion.div
          key={cycleKey}
          initial={{ transform: "translate3d(-380px, 0px, 0px)" }}
          animate={{ transform: "translate3d(calc(100vw + 60px), 0px, 0px)" }}
          transition={{
            duration: DRIVE_DURATION,
            ease: "linear",
          }}
          className="absolute bottom-[12px] sm:bottom-[16px] lg:bottom-[18px] left-0 z-20 flex items-end will-change-transform pointer-events-none"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* 
            VOLUMETRIC HIGH-BEAM HEADLIGHT CONE
            Physically aligned with the Tata 1109 front bumper headlight:
            left: 97%, bottom: 20% of the truck height!
          */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: headlightsOn ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-[97%] bottom-[20%] sm:bottom-[22%] pointer-events-none z-30"
            style={{
              width: "400px",
              height: "105px",
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
            <div className="absolute left-0 top-1/2 -translate-y-1/2 size-4.5 rounded-full bg-white shadow-[0_0_24px_#FFFFFF,0_0_50px_#FFB800] blur-[0.8px]" />
          </motion.div>

          {/* 
            HYPER-REALISTIC 3D TATA 1109 GENERATOR TRUCK
            - 100% Full Uncut Headroom: Complete chrome silencer barrel, exhaust elbow pipe, 
              rain flap, crane-lifting rails, and curved aerodynamic cabin roof with sun visor!
            - Tata 1109 Ochre-Brown Finish (#B86A28) + Sarvadnya Energy Orange Canopy (#FF5500)
            - Authentic Devanagari "सर्वज्ञ जनरेटर" + Cummins Power Generation logo
            - Zero floating blur smudge: Rubber tires sit squarely and flush on the asphalt road!
            - Pristine, single unified 3D truck render with zero overlay artifacts or double wheels!
          */}
          <div className="relative group cursor-default select-none">
            {/* 3D Mobile DG Delivery Truck Body with Grounded Tires */}
            <img
              src="/images/generators/truck_3d_realistic.png"
              alt="Sarvadnya Tata 1109 Mobile Silent DG Delivery Truck"
              width={1276}
              height={638}
              className="w-[260px] sm:w-[300px] lg:w-[330px] h-auto object-contain pointer-events-none select-none block"
              draggable={false}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
