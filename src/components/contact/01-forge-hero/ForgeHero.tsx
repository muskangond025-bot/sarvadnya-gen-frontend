"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * ForgeHero Component
 * 
 * Exact Forge Automotive contact hero architecture:
 * - Full-viewport dark cinematic atmosphere
 * - Huge editorial serif title: "Every deployment starts with a conversation"
 * - High-end minimalist pill action scrolling directly to #form
 */
export function ForgeHero() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement = document.getElementById("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-end bg-[#0A0B0E] text-[#F2F1ED] overflow-hidden select-none pb-16 sm:pb-24 px-6 sm:px-10 lg:px-20 pt-36">
      
      {/* Cinematic Full-Bleed Machinery Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-25 scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: "url('/images/services/generator_engine_bg.jpg')",
        }}
      />

      {/* Luxury Obsidian Radial & Bottom Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/75 to-black/50 pointer-events-none" />
      <div className="absolute top-0 right-1/4 size-[600px] bg-[#FF5500]/[0.05] blur-[150px] rounded-full pointer-events-none" />

      {/* Main Foreground Editorial Content */}
      <div className="relative z-10 max-w-6xl w-full">
        
        {/* Subtle Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <span className="size-2 rounded-full bg-[#FF5500] animate-pulse" />
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FF5500] font-semibold">
            Direct Fleet Dispatch Desk • Nashik
          </span>
        </motion.div>

        {/* Display Title with Masked Entrance */}
        <div className="overflow-hidden mb-10 sm:mb-12">
          <motion.h1
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal tracking-tight text-[#F2F1ED] leading-[1.08] text-balance"
          >
            Every deployment starts with a conversation
          </motion.h1>
        </div>

        {/* Minimalist Forge Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#form"
            onClick={scrollToForm}
            className="group inline-flex items-center gap-3.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/5 hover:bg-[#FF5500] hover:border-[#FF5500] text-[#F2F1ED] hover:text-white transition-all duration-300 shadow-lg active:scale-95"
          >
            <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">
              Start the conversation
            </span>
            <ArrowDown className="size-4 text-[#FF5500] group-hover:text-white group-hover:translate-y-0.5 transition-all duration-300" />
          </a>
        </motion.div>

      </div>

    </section>
  );
}

