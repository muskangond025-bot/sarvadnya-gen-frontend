"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  PhoneCall, 
  ArrowRight 
} from "lucide-react";
import { FloatingGlow } from "@/components/shared/client";

/**
 * ServicesHeroClient Component
 * 
 * Luxury architectural services hero:
 * - High-contrast typography & mission-critical messaging
 * - Bespoke 3D generator equipment showcase with grounded precision technical pedestal
 * - Zero unnecessary pill badges, zero AI-slop floating boxes
 * - Pure bright architectural luxury theme
 */
export function ServicesHeroClient() {
  return (
    <section className="relative min-h-[85vh] flex items-center px-6 md:px-10 lg:px-[60px] overflow-hidden bg-transparent pt-28 lg:pt-32 pb-16 lg:pb-24">
      {/* Subtle Warm Amber-Orange Ambient Lighting */}
      <FloatingGlow color="#FF5500" size="xl" className="-top-1/4 -left-1/4 opacity-[0.05]" />
      <FloatingGlow color="#FFAA00" size="lg" className="top-1/3 -right-1/4 opacity-[0.05]" delay={2} />

      <div className="max-w-[1440px] w-full mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mission-Critical Power Statement (Col 7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Main Luxury Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#111315] tracking-tight leading-[1.08] mb-6 font-['Poppins',sans-serif]"
            >
              Uninterrupted Power, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FFAA00] to-[#E04400]">
                Engineered for Zero Downtime
              </span>
            </motion.h1>

            {/* Authoritative Subtitle Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-lg sm:text-xl text-[#625D55] leading-relaxed max-w-2xl font-['Outfit',sans-serif] mb-10"
            >
              From continuous industrial manufacturing and critical healthcare facilities to grand weddings and high-profile festivals, Sarvadnya delivers 24/7 turnkey silent generator rentals, fuel logistics, and rapid 60-minute emergency dispatch across Nashik and Maharashtra.
            </motion.p>

            {/* Primary Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <a
                href="tel:+916262629944"
                className="px-8 py-4 bg-[#FF5500] text-white font-bold rounded-xl hover:bg-[#E04400] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3 shadow-lg shadow-[#FF5500]/25 group text-base"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Direct Dispatch: +91 62626 29944</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/generators"
                className="px-8 py-4 bg-white text-[#111315] font-bold rounded-xl border border-[#E8E2D9] hover:bg-[#FAF8F5] hover:border-[#FF5500]/50 transition-all flex items-center gap-2 shadow-xs text-base"
              >
                Explore Fleet (5–250 kVA)
              </Link>
            </motion.div>

            {/* High-Value Architectural Stat Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-[#E8E2D9] w-full max-w-xl"
            >
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#111315]">
                  &lt; 60<span className="text-[#FF5500] text-lg font-bold">m</span>
                </div>
                <div className="text-xs text-[#71695F] font-medium font-['Outfit',sans-serif] mt-0.5">
                  Emergency Response
                </div>
              </div>

              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#111315]">
                  250<span className="text-[#FF5500] text-lg font-bold">kVA</span>
                </div>
                <div className="text-xs text-[#71695F] font-medium font-['Outfit',sans-serif] mt-0.5">
                  Max Silent Fleet Unit
                </div>
              </div>

              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#111315]">
                  99.98<span className="text-[#FF5500] text-lg font-bold">%</span>
                </div>
                <div className="text-xs text-[#71695F] font-medium font-['Outfit',sans-serif] mt-0.5">
                  Uptime Guarantee
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Equipment Visual Stage (Col 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            {/* Equipment Display Stage */}
            <div className="relative w-full aspect-4/3 max-w-[540px] flex items-center justify-center">
              
              {/* Soft Ambient Radial Floor Glow */}
              <div className="absolute inset-0 bg-radial from-[#FF5500]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

              {/* Central 3D Industrial Silent Generator Asset */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <img
                  src="/images/generators/generator_39.png"
                  alt="Sarvadnya Industrial Heavy-Duty Silent Generator"
                  className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(17,19,21,0.18)]"
                />
              </motion.div>

              {/* Ground Shadow underneath the Generator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-[#111315]/15 blur-xl rounded-full pointer-events-none" />
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
