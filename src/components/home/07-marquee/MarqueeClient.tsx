"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export interface MarqueeStat {
  value: string;
  label: string;
}

export function MarqueeClient() {
  const { t } = useLanguage();

  const line1Items = [
    t("marquee.line1.0"),
    t("marquee.line1.1"),
    t("marquee.line1.2"),
    t("marquee.line1.3"),
    t("marquee.line1.4"),
    t("marquee.line1.5"),
  ];

  const line2Items = [
    t("marquee.line2.0"),
    t("marquee.line2.1"),
    t("marquee.line2.2"),
    t("marquee.line2.3"),
    t("marquee.line2.4"),
    t("marquee.line2.5"),
  ];

  // Triple items for seamless, gap-free infinite scrolling
  const line1Duplicated = [...line1Items, ...line1Items, ...line1Items];
  const line2Duplicated = [...line2Items, ...line2Items, ...line2Items];

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

        {/* Track 2: Outline Architectural Typography (Scrolls Right) */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex items-center gap-6 sm:gap-10 shrink-0"
            animate={{ x: ["-33.333%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 52, // Staggered speed creates visual rhythm
                ease: "linear",
              },
            }}
          >
            {line2Duplicated.map((text, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-10">
                <span
                  className="font-sans font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight uppercase"
                  style={{
                    WebkitTextStroke: "1.5px #A8A29E",
                    color: "transparent",
                  }}
                >
                  {text}
                </span>
                <span className="size-2 sm:size-3 rounded-full border-2 border-[#FF5500] shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
