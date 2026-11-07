"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { RollingText } from "../common/RollingText";

/**
 * ForgeHero Component (Bright Luxury Theme)
 * 
 * Exact Forge Automotive contact hero architecture:
 * - Architectural bright luxury canvas (#FAF8F5)
 * - Large editorial display serif title with word-by-word masked reveal
 * - Signature Forge Staggered Character Rolling action button
 * - Smooth scroll anchor down to #form
 */
export function ForgeHero() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement = document.getElementById("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headlineWords = ["Every", "deployment", "starts", "with", "a", "conversation"];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-end bg-[#FAF8F5] text-[#111315] overflow-hidden select-none pb-16 sm:pb-24 px-6 sm:px-10 lg:px-20 pt-36 border-b border-[#E8E2D9]">
      
      {/* High-Resolution Engineering Background Image with Bright Architectural Wash */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/images/services/generator_engine_bg.jpg')",
        }}
      />

      {/* Bright Luxury Ambient Wash & Lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-white/60 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 size-[550px] bg-[#FF5500]/[0.06] blur-[140px] rounded-full pointer-events-none" />

      {/* Main Foreground Editorial Content */}
      <div className="relative z-10 max-w-6xl w-full">
        {/* Display Title with Word-by-Word Masked Reveal Animation */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal tracking-tight text-[#111315] leading-[1.08] mb-10 sm:mb-12 flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-1 sm:gap-y-2">
          {headlineWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden py-1">
              <motion.span
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.1 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block ${
                  word === "conversation"
                    ? "text-[#FF5500] italic font-serif"
                    : "text-[#111315]"
                }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Minimalist Forge Action Button with Rolling Text & Hover Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#form"
            onClick={scrollToForm}
            className="group inline-flex items-center gap-4 px-8 sm:px-9 py-4 rounded-full border border-[#111315]/20 bg-white hover:bg-[#111315] hover:border-[#111315] text-[#111315] hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl active:scale-95"
          >
            <RollingText
              text="Start the conversation"
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] font-bold"
              charClassName="group-hover:text-white"
            />
            <ArrowDown className="size-4 text-[#FF5500] group-hover:text-[#FF5500] group-hover:translate-y-1 transition-transform duration-300" />
          </a>
        </motion.div>

      </div>

    </section>
  );
}
