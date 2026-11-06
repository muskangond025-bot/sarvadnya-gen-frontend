"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Step {
  number: string;
  title: string;
  desc: string;
}

/**
 * ProcessWorkflowClient Component
 * 
 * High-fidelity vertical-to-horizontal workflow with interactive "Power Path" 
 * and immersive reveal animations.
 */
export function ProcessWorkflowClient({ steps }: { steps: Step[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative py-12 md:py-20">
      {/* Dynamic Power Path (Desktop Only) */}
      <div className="absolute top-[52px] left-0 w-full h-px bg-white/5 hidden lg:block overflow-hidden">
        <motion.div 
          style={{ scaleX: smoothProgress }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-[#00ff8f]/50 to-transparent origin-left"
        />
        <motion.div 
          style={{ left: useTransform(smoothProgress, [0, 1], ["-10%", "110%"]) }}
          className="absolute top-0 w-[100px] h-full bg-[#00ff8f] blur-[10px] opacity-40"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {steps.map((step, i) => (
          <ProcessStep key={step.number} step={step} index={i} progress={smoothProgress} />
        ))}
      </div>
    </div>
  );
}

function ProcessStep({ step, index, progress }: { step: Step; index: number; progress: any }) {
  // Thresholds for lighting up based on progress
  const threshold = (index / 3) * 0.8 + 0.1;
  const isLit = useTransform(progress, (p: number) => p >= threshold);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col group"
    >
      {/* Large Background Number */}
      <div className="absolute -top-10 -left-4 text-9xl font-black text-white/[0.02] group-hover:text-[#00ff8f]/[0.05] transition-colors duration-700 pointer-events-none select-none italic font-['Poppins']">
        {step.number}
      </div>

      {/* Step Connector Node */}
      <div className="relative mb-12">
        {/* Outer Glow */}
        <motion.div 
          style={{ opacity: useTransform(progress, (p: number) => Math.max(0, (p - threshold + 0.1) * 5)) }}
          className="absolute -inset-4 bg-[#00ff8f]/20 blur-[20px] rounded-full -z-10"
        />
        
        {/* Node Circle */}
        <div className="size-24 lg:size-28 rounded-[32px] bg-[#080808] border border-white/10 flex items-center justify-center relative z-10 transition-all duration-700 group-hover:border-[#00ff8f]/40 group-hover:-rotate-6 group-hover:scale-105 shadow-2xl">
          <span className="text-white font-black font-['Poppins',sans-serif] text-3xl group-hover:text-[#00ff8f] transition-colors duration-500 italic">
            {step.number}
          </span>
          
          {/* Internal Pulse (only visible when progress reaches here) */}
          <div className="absolute inset-2 rounded-[24px] border border-[#00ff8f]/0 group-hover:border-[#00ff8f]/20 group-hover:scale-110 transition-all duration-700" />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex flex-col gap-5 p-8 rounded-[32px] border border-white/5 bg-linear-to-b from-white/[0.03] to-transparent group-hover:bg-white/[0.05] transition-all duration-700 relative overflow-hidden">
        {/* Highlight Beam */}
        <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-[#00ff8f]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

        <h4 className="text-white font-['Poppins',sans-serif] text-2xl font-bold tracking-tight group-hover:text-[#00ff8f] transition-colors duration-300">
          {step.title}
        </h4>
        <p className="text-[#888] font-['Outfit',sans-serif] text-lg leading-relaxed font-light group-hover:text-[#bfbfbf] transition-colors duration-300">
          {step.desc}
        </p>

        {/* Floating Detail */}
        <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="size-1.5 rounded-full bg-[#00ff8f] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#00ff8f]/60">Phase Complete</span>
        </div>
      </div>

      {/* Vertical Mobile Line */}
      <div className="absolute top-28 bottom-[-48px] left-[48px] md:left-[56px] w-px bg-linear-to-b from-white/10 to-transparent lg:hidden last:hidden" />
    </motion.div>
  );
}
