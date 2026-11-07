"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RollingText } from "../common/RollingText";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  tag: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "We’ll Review Your Enquiry",
    description:
      "Our senior electrical engineering team reviews your site parameters, harmonic loads, peak kVA demand, and acoustics within 60 minutes.",
    tag: "TECHNICAL AUDIT",
  },
  {
    number: "02",
    title: "Discovery Call Or Site Visit",
    description:
      "We’ll arrange an immediate technical consultation or rapid on-site survey in Nashik to inspect distribution boards, cable length, and safety clearances.",
    tag: "SITE TELEMETRY",
  },
  {
    number: "03",
    title: "Tailored Proposal Delivered",
    description:
      "You’ll receive a transparent, all-inclusive proposal detailing the exact CPCB-IV+ DG set capacity, heavy hydraulic mobilization, and turnkey fuel logistics.",
    tag: "TURNKEY DISPATCH",
  },
];

/**
 * ForgeProcessCards Component (Bright Luxury Theme)
 * 
 * Exact Forge Automotive Section 3 ("A considered process built around you"):
 * - Bright luxury architectural backdrop (#FAF8F5)
 * - 3 Crisp white architectural cards with subtle hover beam & border transitions
 * - Monospace numerals + Editorial serif typography with Staggered Character Rolling animation
 * - Clean micro-hover states & diagonal arrow glider
 * - STRICT STOP POINT: No sections rendered after this!
 */
export function ForgeProcessCards() {
  return (
    <section className="relative w-full bg-[#FAF8F5] text-[#111315] py-28 sm:py-36 px-6 sm:px-10 lg:px-20 overflow-hidden select-none z-20">
      
      {/* Background Architectural Texture with Soft Ambient Wash */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: "url('/images/services/service_engineer_bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/90 to-[#FAF8F5]/95 pointer-events-none" />

      {/* Ambient Warm Golden-Amber Core Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 size-[500px] bg-[#FF5500]/[0.05] blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 size-[500px] bg-amber-500/[0.04] blur-[160px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF5500] font-semibold block mb-4"
          >
            Our Approach
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#111315] font-normal leading-[1.1] tracking-tight"
          >
            A considered process built around you
          </motion.h2>
        </div>

        {/* 3 Process Cards Grid (Exact Forge 3-Card Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white hover:bg-white border border-[#E8E2D9] hover:border-[#FF5500]/50 transition-all duration-500 shadow-sm hover:shadow-2xl min-h-[380px] sm:min-h-[420px] overflow-hidden"
            >
              {/* Top Accent Orange Beam on Hover */}
              <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-[#FF5500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top: Numeral & Tag */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl sm:text-2xl text-[#FF5500] italic font-bold tracking-tight">
                  {step.number}
                </span>

                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8275] group-hover:text-[#111315] transition-colors font-semibold">
                  {step.tag}
                </span>
              </div>

              {/* Bottom: Title & Narrative */}
              <div className="pt-12">
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#111315] font-normal tracking-tight leading-snug mb-4 transition-colors duration-300 flex items-start justify-between gap-3">
                  <RollingText text={step.title} />
                  <ArrowUpRight className="size-4 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1" />
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#625D55] leading-relaxed transition-colors duration-300">
                  {step.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
