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
 * and immersive reveal animations in bright theme.
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
    <div ref={containerRef} className="relative py-8 md:py-16">
      {/* Dynamic Power Path (Desktop Only) */}
      <div className="absolute top-[52px] left-0 w-full h-px bg-[#E8E2D9] hidden lg:block overflow-hidden">
        <motion.div 
          style={{ scaleX: smoothProgress }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5500]/60 to-transparent origin-left"
        />
        <motion.div 
          style={{ left: useTransform(smoothProgress, [0, 1], ["-10%", "110%"]) }}
          className="absolute top-0 w-[100px] h-full bg-[#FF5500] blur-[10px] opacity-40"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {steps.map((step, i) => (
          <ProcessStep key={step.number} step={step} index={i} progress={smoothProgress} />
        ))}
      </div>
    </div>
  );
}

function ProcessStep({ step, index, progress }: { step: Step; index: number; progress: any }) {
  const threshold = (index / 3) * 0.8 + 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col group"
    >
      {/* Large Background Number */}
      <div className="absolute -top-10 -left-4 text-9xl font-black text-[#111315]/[0.03] group-hover:text-[#FF5500]/[0.06] transition-colors duration-700 pointer-events-none select-none italic font-['Poppins']">
        {step.number}
      </div>

      {/* Step Connector Node */}
      <div className="relative mb-8 sm:mb-10">
        {/* Outer Glow */}
        <motion.div 
          style={{ opacity: useTransform(progress, (p: number) => Math.max(0, (p - threshold + 0.1) * 5)) }}
          className="absolute -inset-4 bg-[#FF5500]/15 blur-[20px] rounded-full -z-10"
        />
        
        {/* Node Circle */}
        <div className="size-24 lg:size-26 rounded-[28px] bg-white border border-[#E8E2D9] flex items-center justify-center relative z-10 transition-all duration-700 group-hover:border-[#FF5500]/50 group-hover:-rotate-3 group-hover:scale-105 shadow-md">
          <span className="text-[#111315] font-black font-['Poppins',sans-serif] text-3xl group-hover:text-[#FF5500] transition-colors duration-500 italic">
            {step.number}
          </span>
          
          {/* Internal Pulse */}
          <div className="absolute inset-2 rounded-[22px] border border-transparent group-hover:border-[#FF5500]/20 group-hover:scale-105 transition-all duration-700" />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex flex-col gap-4 p-8 rounded-[28px] border border-[#E8E2D9] bg-white group-hover:border-[#FF5500]/40 group-hover:shadow-lg transition-all duration-500 relative overflow-hidden shadow-xs flex-grow">
        {/* Highlight Beam */}
        <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

        <h4 className="text-[#111315] font-['Poppins',sans-serif] text-2xl font-bold tracking-tight group-hover:text-[#FF5500] transition-colors duration-300">
          {step.title}
        </h4>
        <p className="text-[#625D55] font-['Outfit',sans-serif] text-base leading-relaxed font-normal">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}
