"use client";

import React from "react";
import { motion } from "framer-motion";
import { FloatingGlow } from "@/components/shared/client";

/**
 * ServicesHeroClient Component
 * 
 * High-fidelity hero section with premium motion effects.
 */
export function ServicesHeroClient() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-10 lg:px-[60px] overflow-hidden bg-black">
      {/* Cinematic Background Atmosphere */}
      <FloatingGlow color="#00ff8f" size="xl" className="-top-1/4 -left-1/4 opacity-10" />
      <FloatingGlow color="#00d1ff" size="lg" className="top-1/4 -right-1/4 opacity-10" delay={2} />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="max-w-[1440px] w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="px-5 py-2 rounded-xl border border-[#00ff8f]/20 bg-[#00ff8f]/5 text-[#00ff8f] text-xs font-bold tracking-[0.3em] uppercase font-['Outfit',sans-serif]">
              Elite Power Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-['Poppins',sans-serif] leading-[1] tracking-tight mb-8"
          >
            Engineered <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-[#00ff8f] to-white bg-[length:200%_auto] animate-shimmer">
              Reliability
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-xl text-[#bfbfbf] font-['Outfit',sans-serif] text-xl md:text-2xl leading-relaxed font-light mb-10"
          >
            From critical industrial infrastructure to grand-scale wedding events, we provide 24/7 power services designed for zero downtime and maximum performance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex gap-4"
          >
            <button className="px-8 py-4 bg-[#00ff8f] text-black font-bold rounded-xl hover:bg-[#00e67a] transition-all active:scale-95 shadow-[0_0_20px_rgba(0,255,143,0.3)]">
              Consult an Expert
            </button>
            <button className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all">
              View Fleet
            </button>
          </motion.div>
        </div>

        {/* Right: Floating Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 w-full h-[500px] flex items-center justify-center">
            {/* Main Image */}
            <motion.img 
              src="/images/login_generator_illustration.png" 
              alt="Industrial Generator"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full object-contain brightness-110 contrast-110 drop-shadow-[0_0_30px_rgba(0,255,143,0.3)]"
            />
            {/* Orbital Rings */}
            <div className="absolute inset-0 border border-[#00ff8f]/20 rounded-full animate-[spin_20s_linear_infinite] scale-150" />
            <div className="absolute inset-0 border border-[#00ff8f]/10 rounded-full animate-[spin_30s_linear_infinite_reverse] scale-125" />
          </div>
          
          {/* Floating Data Points */}
          <DataPoint x="10%" y="20%" label="CPCB II Certified" delay={1} />
          <DataPoint x="85%" y="15%" label="24/7 Monitoring" delay={1.5} />
          <DataPoint x="80%" y="75%" label="Fuel Efficient" delay={2} />
        </motion.div>
      </div>

    </section>
  );
}

function DataPoint({ x, y, label, delay }: { x: string, y: string, label: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={{ top: y, left: x }}
      className="absolute z-20 flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full"
    >
      <div className="size-2 rounded-full bg-[#00ff8f] animate-pulse shadow-[0_0_10px_#00ff8f]" />
      <span className="text-[10px] text-white font-bold uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}
