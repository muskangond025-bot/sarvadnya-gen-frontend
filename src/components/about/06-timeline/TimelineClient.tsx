"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  year: string;
  chapter?: string;
  title: string;
  description: string;
  featured: boolean;
}

interface TimelineClientProps {
  items: TimelineItem[];
}

/**
 * Top-Down Generator Transport Truck Vehicle
 * 
 * High-definition vector generator truck facing in the direction of travel:
 * - 4 side tires with wheel rims
 * - White & chrome cab with curved windshield
 * - Mounted signature Sarvadnya Energy Orange Generator (#FF5500) with cooling louvers
 * - Dual front headlights casting volumetric amber light beams onto the road ahead
 */
function GeneratorTruckVehicle() {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none">
      {/* Volumetric Headlight Light Beams */}
      <div 
        aria-hidden="true"
        className="absolute top-[82%] left-1/2 -translate-x-1/2 w-36 h-28 pointer-events-none opacity-90 z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255, 120, 0, 0.45) 0%, rgba(255, 180, 80, 0.22) 45%, transparent 75%)",
          clipPath: "polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* 3D-styled Top-Down Generator Transport Truck SVG */}
      <svg
        width="46"
        height="76"
        viewBox="0 0 46 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_12px_22px_rgba(17,19,21,0.30)]"
      >
        {/* Ground contact shadow */}
        <rect x="5" y="4" width="36" height="68" rx="8" fill="#111315" fillOpacity="0.25" />

        {/* 4 Wheels */}
        <rect x="1" y="14" width="4" height="12" rx="2" fill="#151719" />
        <rect x="41" y="14" width="4" height="12" rx="2" fill="#151719" />
        <rect x="1" y="52" width="4" height="13" rx="2" fill="#151719" />
        <rect x="41" y="52" width="4" height="13" rx="2" fill="#151719" />

        {/* Wheel Rims */}
        <rect x="2" y="17" width="2" height="6" rx="1" fill="#8C8275" />
        <rect x="42" y="17" width="2" height="6" rx="1" fill="#8C8275" />
        <rect x="2" y="55" width="2" height="7" rx="1" fill="#8C8275" />
        <rect x="42" y="55" width="2" height="7" rx="1" fill="#8C8275" />

        {/* Truck Bed / Chassis */}
        <rect x="4" y="6" width="38" height="64" rx="7" fill="#FFFFFF" stroke="#E8E2D9" strokeWidth="1.5" />

        {/* Rear Bumper & Red Taillights */}
        <rect x="6" y="6" width="34" height="3" rx="1" fill="#242628" />
        <rect x="7" y="6" width="5" height="2" rx="0.5" fill="#E60000" />
        <rect x="34" y="6" width="5" height="2" rx="0.5" fill="#E60000" />

        {/* Generator Cargo Bed (Sarvadnya Signature Orange Generator Unit) */}
        <rect x="8" y="13" width="30" height="28" rx="4" fill="#FF5500" stroke="#E04B00" strokeWidth="1" />
        
        {/* Generator Canopy Cooling Louvers */}
        <line x1="12" y1="18" x2="34" y2="18" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="12" y1="22" x2="34" y2="22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="12" y1="26" x2="34" y2="26" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="12" y1="30" x2="34" y2="30" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        
        {/* Generator Exhaust Port */}
        <circle cx="23" cy="36" r="3" fill="#2B2927" />
        <circle cx="23" cy="36" r="1.5" fill="#C5BFB5" />

        {/* Truck Cabin Base (Front Cab) */}
        <path
          d="M6 46 H40 V62 C40 66.4183 36.4183 70 32 70 H14 C9.58172 70 6 66.4183 6 62 V46 Z"
          fill="#1F2328"
        />

        {/* Front Windshield with Glare */}
        <path
          d="M9 56 C9 53 11 51 14 51 H32 C35 51 37 53 37 56 V60 H9 V56 Z"
          fill="#5C7C99"
          fillOpacity="0.85"
        />
        <path d="M12 53 H20 L18 58 H10 L12 53 Z" fill="#FFFFFF" fillOpacity="0.4" />

        {/* Cab Roof Ribs */}
        <line x1="14" y1="48" x2="14" y2="50" stroke="#40444A" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="23" y1="48" x2="23" y2="50" stroke="#40444A" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="48" x2="32" y2="50" stroke="#40444A" strokeWidth="1.5" strokeLinecap="round" />

        {/* Dual LED Headlights (Warm White / Amber) */}
        <rect x="8" y="68" width="6" height="2.5" rx="1" fill="#FFF385" />
        <rect x="32" y="68" width="6" height="2.5" rx="1" fill="#FFF385" />

        {/* Front Chrome Bumper */}
        <rect x="15" y="69.5" width="16" height="1.5" rx="0.5" fill="#E8E2D9" />
      </svg>
    </div>
  );
}

/**
 * TimelineClient Component
 *
 * Faithful recreation of user reference image:
 * - Natural continuous scroll flow
 * - Center vertical road track (solid orange for driven path, dashed for road ahead)
 * - Generator transport truck driving along the road track
 * - DYNAMIC DIRECTIONAL 180° TURN: When scrolling up, truck smoothly rotates 180° to face upward
 *   with headlights casting light in the upward direction of motion!
 * - Alternating layout: Year with horizontal connector line on one side directly touching the center node dot,
 *   Chapter and authentic story on the opposite side.
 */
export function TimelineClient({ items }: TimelineClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  // Framer Motion scroll tracking
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 45%", "end 70%"],
  });

  // Real-time scroll direction detection without jitter
  useEffect(() => {
    return scrollY.on("change", (current) => {
      const prev = scrollY.getPrevious() ?? current;
      const diff = current - prev;
      if (diff < -3) {
        setIsScrollingUp(true);
      } else if (diff > 3) {
        setIsScrollingUp(false);
      }
    });
  }, [scrollY]);

  // Smooth vehicular spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate truck vertical travel position along the track
  const vehicleTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const activeLineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      
      {/* Title Block (Zero Pill Badges) */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 relative z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight leading-[1.12]">
          Milestones of <span className="text-[#FF5500]">Excellence</span>
        </h2>
        <p className="text-base sm:text-lg text-[#524E48] font-['Outfit',sans-serif] leading-relaxed mt-4">
          Follow our operational roadmap from a single generator in 2009 to Maharashtra&apos;s leading power infrastructure partner.
        </p>
      </div>

      {/* Main Roadmap Timeline Container */}
      <div ref={containerRef} className="max-w-5xl mx-auto relative min-h-[1100px] sm:min-h-[1350px]">
        
        {/* ======================================================== */}
        {/* DESKTOP ROAD TRACK (Centered at left-1/2) */}
        {/* ======================================================== */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 bottom-8 w-[3px] z-0">
          {/* Dashed Road Ahead */}
          <div 
            className="absolute inset-0 w-full"
            style={{
              backgroundImage: "linear-gradient(to bottom, #A8A29E 60%, transparent 40%)",
              backgroundSize: "3px 14px",
              backgroundRepeat: "repeat-y",
            }}
          />

          {/* Driven Solid Road (#FF5500) */}
          <motion.div
            style={{ height: activeLineHeight }}
            className="absolute top-0 left-0 w-full bg-[#FF5500] origin-top"
          />

          {/* Generator Truck Driving Vertically with Dynamic 180° Turn */}
          <motion.div
            style={{ top: vehicleTop }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <motion.div
              animate={{ rotate: isScrollingUp ? 180 : 0 }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 18,
                mass: 0.8,
              }}
              style={{ transformOrigin: "50% 50%" }}
            >
              <GeneratorTruckVehicle />
            </motion.div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE ROAD TRACK (Left-aligned at left-6) */}
        {/* ======================================================== */}
        <div className="md:hidden absolute left-6 top-6 bottom-8 w-[3px] z-0">
          <div 
            className="absolute inset-0 w-full"
            style={{
              backgroundImage: "linear-gradient(to bottom, #A8A29E 60%, transparent 40%)",
              backgroundSize: "3px 12px",
              backgroundRepeat: "repeat-y",
            }}
          />
          <motion.div
            style={{ height: activeLineHeight }}
            className="absolute top-0 left-0 w-full bg-[#FF5500] origin-top"
          />
          <motion.div
            style={{ top: vehicleTop }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 scale-[0.85]"
          >
            <motion.div
              animate={{ rotate: isScrollingUp ? 180 : 0 }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 18,
                mass: 0.8,
              }}
              style={{ transformOrigin: "50% 50%" }}
            >
              <GeneratorTruckVehicle />
            </motion.div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* TIMELINE MILESTONE NODES (Alternating layout from reference) */}
        {/* ======================================================== */}
        <div className="flex flex-col gap-24 sm:gap-32 lg:gap-36 relative z-10 pt-4 pb-12">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={cn(
                  "relative flex flex-col md:flex-row items-start w-full",
                  "pl-16 md:pl-0"
                )}
              >
                {/* ------------------------------------------ */}
                {/* DESKTOP LAYOUT (md: and above) */}
                {/* ------------------------------------------ */}

                {/* Left Side (50% width) */}
                <div className="hidden md:flex w-1/2 items-start justify-end text-right">
                  {isLeft ? (
                    /* Left is YEAR + Connector Line touching center */
                    <div className="flex items-center justify-end w-full">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight hover:text-[#FF5500] transition-colors leading-none">
                        {item.year}
                      </span>
                      {/* Horizontal Connector Line ending right at the center dot */}
                      <div className="w-16 sm:w-24 lg:w-28 h-[2px] bg-[#A8A29E] ml-4 sm:ml-6" />
                    </div>
                  ) : (
                    /* Left is CHAPTER + Authentic Story */
                    <div className="flex flex-col items-end pr-10 sm:pr-14 max-w-md ml-auto">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FF5500] leading-tight">
                        {item.chapter || `Chapter ${index + 1}`}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111315]/75 mt-1 font-['Poppins',sans-serif]">
                        {item.title}
                      </div>
                      <p className="text-sm sm:text-base text-[#403C36] font-['Outfit',sans-serif] leading-relaxed mt-2.5">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center Node Circle Dot (on the road line) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-2 z-20 items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5500] ring-4 ring-[#FAF8F5] shadow-xs" />
                </div>

                {/* Right Side (50% width) */}
                <div className="hidden md:flex w-1/2 items-start justify-start text-left">
                  {isLeft ? (
                    /* Right is CHAPTER + Authentic Story */
                    <div className="flex flex-col items-start pl-10 sm:pl-14 max-w-md">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FF5500] leading-tight">
                        {item.chapter || `Chapter ${index + 1}`}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111315]/75 mt-1 font-['Poppins',sans-serif]">
                        {item.title}
                      </div>
                      <p className="text-sm sm:text-base text-[#403C36] font-['Outfit',sans-serif] leading-relaxed mt-2.5">
                        {item.description}
                      </p>
                    </div>
                  ) : (
                    /* Right is Connector Line + YEAR */
                    <div className="flex items-center justify-start w-full">
                      {/* Horizontal Connector Line starting right at the center dot */}
                      <div className="w-16 sm:w-24 lg:w-28 h-[2px] bg-[#A8A29E] mr-4 sm:mr-6" />
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight hover:text-[#FF5500] transition-colors leading-none">
                        {item.year}
                      </span>
                    </div>
                  )}
                </div>

                {/* ------------------------------------------ */}
                {/* MOBILE LAYOUT (< md:) */}
                {/* ------------------------------------------ */}
                <div className="md:hidden flex flex-col items-start text-left">
                  {/* Mobile Node Dot */}
                  <div className="absolute left-6 -translate-x-1/2 top-1.5 z-20">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5500] ring-3 ring-[#FAF8F5]" />
                  </div>

                  <span className="text-3xl font-extrabold text-[#FF5500] font-['Poppins',sans-serif] tracking-tight mb-1">
                    {item.year}
                  </span>
                  <div className="text-xl font-serif font-bold text-[#111315] leading-snug">
                    {item.chapter || `Chapter ${index + 1}`} &bull; {item.title}
                  </div>
                  <p className="text-sm text-[#403C36] font-['Outfit',sans-serif] leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
