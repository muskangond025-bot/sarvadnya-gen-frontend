"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * HeroClient Component
 * 
 * Implements the "Quiet Power Reveal" motion sequence:
 * - Transparent isolated high-resolution generator render (NO black box / NO dark frame)
 * - Cinematic floating physics with realistic ambient floor drop-shadow
 * - Zero badge pills / zero lozenge bubbles
 */
export function HeroClient() {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl aspect-square flex items-center justify-center">
      {/* Subtle warm radial ambient under-glow */}
      <div className="absolute inset-0 bg-[#FF5500]/[0.10] blur-3xl rounded-full scale-95 pointer-events-none" />

      {/* Main Generator Visual with Smooth Cinematic Reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="relative w-full h-[240px] sm:h-[360px] lg:h-[460px] filter drop-shadow-[0_28px_48px_rgba(31,31,30,0.20)]">
          <Image
            src="/images/generators/generator_10.png"
            alt="Sarvadnya Silent Industrial Generator"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 50vw"
            className="object-contain select-none hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>
      </motion.div>
    </div>
  );
}
