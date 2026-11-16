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
  yOffset: number; // Exact integer for 100% deterministic SSR/Client hydration
}

// Staggered trigger timestamps based on truck drive speed across the stage
const BULBS: BulbData[] = Array.from({ length: TOTAL_BULBS }, (_, i) => {
  const percent = Number(((i + 0.5) * (100 / TOTAL_BULBS)).toFixed(2));
  const triggerTime = Number((Math.max(0.5, (percent - 6) * (17 / 100) + 1.0)).toFixed(2));
  const yOffset = Math.round(Math.sin((percent / 100) * Math.PI) * 10);
  return {
    id: i,
    percent,
    triggerTime,
    yOffset,
  };
});

interface GeneratorTruckTrackProps {
  children?: React.ReactNode;
}

/**
 * Bespoke Photorealistic Vintage ST64 Edison Light Bulb SVG
 * - Threaded brass socket with screw ridges
 * - Authentic teardrop pear glass envelope
 * - Glowing squirrel-cage tungsten filament wire with incandescent halo
 * - Specular reflection gloss curve
 */
function EdisonBulbSvg({ isLit }: { isLit: boolean }) {
  return (
    <svg
      viewBox="0 0 28 42"
      className={cn(
        "w-3 sm:w-4 lg:w-4.5 h-auto transition-transform duration-300 drop-shadow-xs",
        isLit ? "scale-110" : "scale-100"
      )}
      fill="none"
      aria-hidden="true"
    >
      {/* Top Threaded Brass Socket Base with Screws & Insulator */}
      <rect
        x="10.5"
        y="0"
        width="7"
        height="3"
        rx="0.5"
        fill="url(#edison-brass)"
        stroke="#4A3B18"
        strokeWidth="0.5"
      />
      <rect
        x="11"
        y="3"
        width="6"
        height="2"
        rx="0.5"
        fill="url(#edison-brass)"
        stroke="#4A3B18"
        strokeWidth="0.5"
      />
      <rect
        x="11.5"
        y="5"
        width="5"
        height="1.8"
        rx="0.5"
        fill="url(#edison-brass)"
        stroke="#4A3B18"
        strokeWidth="0.5"
      />

      {/* Classic ST64 Pear / Teardrop Glass Envelope */}
      <path
        d="M11.5 6.8 C11.5 6.8 7.5 13 6 18.5 C4.5 24 7 32 14 32 C21 32 23.5 24 22 18.5 C20.5 13 16.5 6.8 16.5 6.8 Z"
        fill={isLit ? "url(#edison-glass-lit)" : "url(#edison-glass-off)"}
        stroke={isLit ? "#FFB703" : "rgba(31,31,30,0.35)"}
        strokeWidth={isLit ? "1.2" : "0.85"}
      />

      {/* Inner Central Glass Mount Stem */}
      <path
        d="M13 7 L13 15 L15 15 L15 7"
        fill="none"
        stroke={isLit ? "rgba(255,220,130,0.8)" : "rgba(80,80,80,0.35)"}
        strokeWidth="0.75"
      />
      <circle cx="14" cy="15" r="1.2" fill={isLit ? "#FFC44D" : "#4A4A4A"} />

      {/* Realistic Squirrel-Cage / Hairpin Tungsten Filament Wire */}
      <path
        d="M12.5 15 L11.5 22 Q12.75 25 14 22 Q15.25 25 16.5 22 L15.5 15"
        fill="none"
        stroke={isLit ? "#FFFFFF" : "#524E48"}
        strokeWidth={isLit ? "1.4" : "0.75"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Intense Amber Incandescent Glow when Lit */}
      {isLit && (
        <path
          d="M12.5 15 L11.5 22 Q12.75 25 14 22 Q15.25 25 16.5 22 L15.5 15"
          fill="none"
          stroke="#FF7A00"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      )}

      {/* Specular Curved Highlight on Outer Glass Surface (Gloss Specular) */}
      <path
        d="M8.5 17 C7.5 21 9 27 11.5 29"
        fill="none"
        stroke={isLit ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)"}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * GeneratorTruckTrack Component
 * 
 * Hyper-Realistic 3D Generator Truck & Dynamic Lighting Stage:
 * - 100% UNCLIPPED & FULL HEADROOM: Exhaust silencer barrel, lifting gantry frame, and cab roof are completely visible!
 * - Proportioned cleanly to fit within a single screen view (100vh / ~640px) without vertical bloat!
 * - Authentic 3D Render of Tata 1109 Ochre-Brown Truck + Sarvadnya Energy Orange Generator (#FF5500)
 * - Razor-sharp Devanagari lettering: "सर्वज्ञ जनरेटर" + Cummins Power Generation logo
 * - Overhead Edison bulbs chain-reaction ignite with warm amber glow as the generator truck drives across
 * - Ultra-Premium 3D Commercial Truck Tyres: radial tread shoulder grooves, satin rubber finish, steel lug hubcaps
 * - GPU-accelerated butter-smooth translate3d motion (zero stutter/glitch)
 * - Tires resting squarely on the asphalt road baseline
 */
export function GeneratorTruckTrack({ children }: GeneratorTruckTrackProps) {
  const [cycleKey, setCycleKey] = useState<number>(0);
  const [activeBulbs, setActiveBulbs] = useState<Set<number>>(new Set());

  // Synchronized cycle controller for bulbs and truck drive loop
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Clear active bulbs at cycle start
    setActiveBulbs(new Set());

    // Schedule progressive bulb ignition as truck approaches each bulb
    BULBS.forEach((bulb) => {
      const timer = setTimeout(() => {
        setActiveBulbs((prev) => new Set(prev).add(bulb.id));
      }, bulb.triggerTime * 1000);
      timers.push(timer);
    });

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
      className="relative w-full overflow-hidden select-none border-b border-black/10 flex flex-col"
      style={{
        background: "linear-gradient(180deg, #FAF8F5 0%, #F4EFE6 100%)",
      }}
      aria-label="Interactive Generator Delivery Stage"
    >
      {/* 
        1. VINTAGE EDISON BULB CHAIN LIGHTING (Catenary Wire & Bulbs)
        Warm amber glow drops cleanly down onto the floating content
        100% UNCLIPPED: overflow-visible with proper top clearance so bulbs and wires never cut off!
      */}
      <div className="absolute inset-x-0 top-0 pointer-events-none z-20 overflow-visible pt-1 sm:pt-2">
        {/* Overhead Sagging Electrical Catenary Cable Wire */}
        <svg
          className="w-full h-8 sm:h-10 opacity-70"
          preserveAspectRatio="none"
          viewBox="0 0 1000 40"
        >
          <path
            d="M0 10 Q 250 24 500 14 T 1000 10"
            fill="none"
            stroke="#2A241C"
            strokeWidth="1.2"
          />
        </svg>

        {/* Vintage Edison Bulb Sockets hanging along the catenary line */}
        <div className="absolute inset-x-0 top-1 sm:top-2 flex justify-between px-3 sm:px-6 lg:px-10">
          {BULBS.map((bulb, idx) => {
            const isLit = activeBulbs.has(bulb.id);
            // On mobile, show every 2nd bulb (7 bulbs total) to eliminate overlap and prevent crowding
            const isHiddenOnMobile = idx % 2 === 1;

            return (
              <div
                key={bulb.id}
                className={cn(
                  "relative flex flex-col items-center",
                  isHiddenOnMobile && "hidden sm:flex"
                )}
                style={{
                  transform: `translateY(${bulb.yOffset}px)`,
                }}
              >
                {/* Short drop wire from catenary cord */}
                <span className="w-[1px] h-2 sm:h-3.5 bg-[#2A241C] block" />

                {/* Photorealistic ST64 Edison Bulb with downward light emission */}
                <div className="relative flex flex-col items-center">
                  <EdisonBulbSvg isLit={isLit} />

                  {/* Warm Volumetric Ambient Spotlight Cone originating purely from bulb glass */}
                  {isLit && (
                    <>
                      {/* Filament Core Radiance */}
                      <div
                        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 size-3.5 sm:size-5 rounded-full pointer-events-none -z-10 bg-[#FFB703]/35 blur-[2px] sm:blur-[3px]"
                      />

                      {/* Downward Light Cone (Originates strictly from bulb bottom, NOT from wire/socket above) */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35 }}
                        className="absolute top-[68%] left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[48px] sm:w-[135px] h-[90px] sm:h-[170px]"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 0%, rgba(255, 175, 30, 0.42) 0%, rgba(255, 130, 0, 0.16) 42%, transparent 75%)",
                          clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
                          filter: "blur(4px)",
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        2. FOREGROUND FLOATING ARCHITECTURAL FOOTER CONTENT
        (Text and links layer cleanly on top of the stage)
      */}
      {children && (
        <div className="relative z-30 w-full">
          {children}
        </div>
      )}

      {/* 
        3. ASPHALT ROADWAY & VEHICLE STAGE
        Guaranteed 100% UNCLIPPED & FULL HEADROOM:
        - overflow-x-clip prevents horizontal scrollbars
        - overflow-y-visible guarantees truck cabin roof and exhaust silencer NEVER clip!
        - Roadway sits tightly and directly beneath the content with ZERO dead gap!
        - Truck drives directly ON the asphalt road where the black surface and dashed line are!
      */}
      <div className="relative w-full h-[80px] sm:h-[120px] lg:h-[135px] overflow-x-clip overflow-y-visible shrink-0 mt-0">

        {/* Asphalt Road Surface with Centerline & Shoulder */}
        <div className="absolute inset-x-0 bottom-0 h-8 sm:h-12 lg:h-14 bg-gradient-to-b from-[#181B20] via-[#101216] to-[#0A0B0E] border-t-2 border-[#2E333C] z-10">
          {/* Road Asphalt Reflection & Wet Sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5 pointer-events-none" />

          {/* Dashed Center Road Line running along the driving lane */}
          <div className="absolute inset-x-0 bottom-[6px] sm:bottom-[10px] lg:bottom-[11px] flex justify-between gap-2.5 sm:gap-4 px-2 opacity-40 pointer-events-none">
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} className="inline-block w-4 sm:w-8 lg:w-10 h-0.5 sm:h-1 bg-amber-400 shrink-0 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
            ))}
          </div>
        </div>

        {/* 
          GPU-ACCELERATED BUTTER-SMOOTH TRUCK DRIVE
          Translates from -380px to calc(100vw + 60px) in 20 seconds with pure transform3d.
          Zero layout reflows, zero stuttering, 60fps cinematic motion!
          Tires drive directly ON the asphalt road lane.
        */}
        <motion.div
          key={cycleKey}
          initial={{ transform: "translate3d(-380px, 0px, 0px)" }}
          animate={{ transform: "translate3d(calc(100vw + 60px), 0px, 0px)" }}
          transition={{
            duration: DRIVE_DURATION,
            ease: "linear",
          }}
          className="absolute bottom-[3px] sm:bottom-[6px] lg:bottom-[7px] left-0 z-20 flex items-end will-change-transform pointer-events-none"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* 
            HYPER-REALISTIC 3D TATA 1109 GENERATOR TRUCK WITH 360° SPINNING WHEELS
            - Layer 1: Contact Drop Shadows grounding the tires directly on the asphalt
            - Layer 2: 360° Rotating Rear Wheel (axle: 26.49%, 88.47%, width: 15.28%)
            - Layer 3: 360° Rotating Front Wheel (axle: 80.88%, 86.29%, width: 17.71%)
            - Layer 4: 3D Truck Body with Open Wheel Arches ON TOP (fenders overlap top of tires naturally)
            - ZERO double wheels, ZERO ghosting, completely photorealistic and grounded!
          */}
          <div className="relative group cursor-default select-none">
            {/* Inline keyframe guarantee for butter-smooth 60fps continuous 360-degree rotation */}
            <style>{`
              @keyframes truckWheelSpin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>

            {/* Soft Ambient Contact Shadows Under Tires */}
            <div
              className="absolute pointer-events-none rounded-full bg-black/75 blur-[2.5px] z-10"
              style={{
                left: "26.02%",
                bottom: "1px",
                width: "15.28%",
                height: "5px",
                transform: "translateX(-50%)",
              }}
            />
            <div
              className="absolute pointer-events-none rounded-full bg-black/75 blur-[2.5px] z-10"
              style={{
                left: "79.94%",
                bottom: "1px",
                width: "17.71%",
                height: "5px",
                transform: "translateX(-50%)",
              }}
            />

            {/* 360-DEGREE CONTINUOUS ROTATING REAR WHEEL (GPU Hardware Accelerated) */}
            <div
              className="absolute pointer-events-none select-none z-10"
              style={{
                left: "26.02%",
                top: "89.03%",
                width: "15.28%",
                aspectRatio: "1/1",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full h-full will-change-transform animate-truck-wheel"
                style={{
                  animation: "truckWheelSpin 0.85s linear infinite",
                  transformOrigin: "center center",
                }}
              >
                <img
                  src="/images/generators/truck_wheel_rear_3d.png"
                  alt="Tata 1109 Rotating Rear Wheel"
                  width={226}
                  height={226}
                  className="w-full h-full object-contain pointer-events-none select-none block"
                  draggable={false}
                />
              </div>
            </div>

            {/* 360-DEGREE CONTINUOUS ROTATING FRONT WHEEL (GPU Hardware Accelerated) */}
            <div
              className="absolute pointer-events-none select-none z-10"
              style={{
                left: "79.94%",
                top: "85.89%",
                width: "17.71%",
                aspectRatio: "1/1",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full h-full will-change-transform animate-truck-wheel"
                style={{
                  animation: "truckWheelSpin 0.85s linear infinite",
                  transformOrigin: "center center",
                }}
              >
                <img
                  src="/images/generators/truck_wheel_front_3d.png"
                  alt="Tata 1109 Rotating Front Wheel"
                  width={226}
                  height={226}
                  className="w-full h-full object-contain pointer-events-none select-none block"
                  draggable={false}
                />
              </div>
            </div>

            {/* 3D Truck Body with Open Wheel Arches ON TOP (fenders cover top of wheels) */}
            <img
              src="/images/generators/truck_body_hollow.png"
              alt="Sarvadnya Tata 1109 Mobile Silent DG Delivery Truck"
              width={1276}
              height={642}
              className="relative z-20 w-[200px] sm:w-[285px] lg:w-[325px] h-auto object-contain pointer-events-none select-none block drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
          </div>
        </motion.div>

      </div>

      {/* Shared SVG Defs for Photorealistic Edison Materials */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <linearGradient id="edison-brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A050" />
            <stop offset="40%" stopColor="#8C6A28" />
            <stop offset="70%" stopColor="#E2BE73" />
            <stop offset="100%" stopColor="#6E5018" />
          </linearGradient>
          <linearGradient id="edison-glass-lit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255, 230, 150, 0.55)" />
            <stop offset="50%" stopColor="rgba(255, 170, 40, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 120, 0, 0.35)" />
          </linearGradient>
          <linearGradient id="edison-glass-off" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.35)" />
            <stop offset="50%" stopColor="rgba(200, 200, 190, 0.18)" />
            <stop offset="100%" stopColor="rgba(100, 100, 100, 0.15)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
