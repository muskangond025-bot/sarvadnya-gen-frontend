"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Sparkles } from "lucide-react";

/**
 * HeroClient Component
 * 
 * Implements the "Quiet Power Reveal" motion sequence as specified in docs/animation.md:
 * - Subtle, premium image scale settling (1.04 -> 1.0)
 * - Zero clipping guarantee: all elements stay within bounded viewports
 * - Absolute visibility: high contrast, graceful fallback
 * - No badge pills: metadata styled as clean typographic cards
 */
export function HeroClient() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
      
      {/* Subtle warm glow behind generator unit */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl rounded-full scale-90 pointer-events-none" />

      {/* Main Generator Visual with Smooth Cinematic Reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1], // power3.out equivalent
        }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <img
          src="/images/login_generator_illustration.png"
          alt="Sarvadnya Silent Industrial Generator"
          className="w-full h-auto max-h-[460px] object-contain drop-shadow-[0_24px_48px_rgba(31,31,30,0.12)] select-none"
        />

        {/* Clean Typographic Spec Card (Restrained, No Pill Bubble) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="absolute -bottom-4 right-0 sm:right-4 bg-white/95 backdrop-blur-md border border-[#E8E2D9] rounded-xl p-3.5 shadow-sm max-w-[210px]"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F1F1E]">
              CPCB-II Silent Canopy
            </span>
          </div>
          <p className="text-[11px] text-[#625D55] leading-snug">
            Low acoustic footprint ideal for weddings & urban work sites.
          </p>
        </motion.div>
      </motion.div>

    </div>
  );
}
