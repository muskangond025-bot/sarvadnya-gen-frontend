"use client";

import React from "react";
import { motion } from "framer-motion";

export interface MarqueeStat {
  value: string;
  label: string;
}

const LINE_1_ITEMS = [
  "SILENT GENERATOR FLEET",
  "5 TO 250 kVA CAPACITY",
  "24/7 EMERGENCY DISPATCH",
  "CPCB-II ACOUSTIC ENCLOSURES",
  "NASHIK & MAHARASHTRA",
  "100% UNINTERRUPTED POWER",
];

const LINE_2_ITEMS = [
  "WEDDINGS & LUXURY BANQUETS",
  "PRIME CONTINUOUS INDUSTRIAL",
  "GRAND CONCERTS & FESTIVALS",
  "TURNKEY CABLING & OPERATORS",
  "ZERO SOUND DISRUPTION",
  "DUAL DG SYNCHRONIZATION",
];

export function MarqueeClient() {
  // Triple items for seamless, gap-free infinite scrolling
  const line1Duplicated = [...LINE_1_ITEMS, ...LINE_1_ITEMS, ...LINE_1_ITEMS];
  const line2Duplicated = [...LINE_2_ITEMS, ...LINE_2_ITEMS, ...LINE_2_ITEMS];

  return (
    <section className="w-full py-12 lg:py-16 bg-[#FAF8F5] overflow-hidden select-none border-y border-[#E8E2D9]">
      <div className="flex flex-col gap-4 sm:gap-6">
        
        {/* Track 1: Solid Typography (Slow, Calm & Readable, Scrolls Left) */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex items-center gap-6 sm:gap-10 shrink-0"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 48, // Relaxed speed for high readability
                ease: "linear",
              },
            }}
          >
            {line1Duplicated.map((text, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-10">
                <span className="font-sans font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#1F1F1E] tracking-tight uppercase">
                  {text}
                </span>
                <span className="size-2 sm:size-3 rounded-full bg-[#FF5500] shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Track 2: Outline Typography (Slow, Calm & Readable, Scrolls Right) */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex items-center gap-6 sm:gap-10 shrink-0"
            animate={{ x: ["-33.333%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 52, // Relaxed speed for high readability
                ease: "linear",
              },
            }}
          >
            {line2Duplicated.map((text, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-10">
                <span className="font-sans font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-transparent [-webkit-text-stroke:1.5px_#1F1F1E] hover:text-[#FF5500] hover:[-webkit-text-stroke:0px] transition-colors duration-300 tracking-tight uppercase">
                  {text}
                </span>
                <span className="size-2 sm:size-3 rounded-full border border-[#1F1F1E] shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
