"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, ShieldCheck, Truck, Activity } from "lucide-react";
import { WorkflowStage } from "./ProcessWorkflow";

const ICONS = {
  audit: Cpu,
  allocation: ShieldCheck,
  deployment: Truck,
  assurance: Activity,
};

export function ProcessWorkflowClient({ stages }: { stages: WorkflowStage[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative py-6 sm:py-10">
      
      {/* High-Tech Dynamic Power Path Spine (Desktop Only) */}
      <div className="absolute top-[48px] left-8 right-8 h-0.5 bg-[#E8E2D9] hidden lg:block overflow-hidden">
        <motion.div 
          style={{ scaleX: smoothProgress }}
          className="absolute inset-0 bg-gradient-to-r from-[#FFAA00] via-[#FF5500] to-[#E04400] origin-left"
        />
        <motion.div 
          style={{ left: useTransform(smoothProgress, [0, 1], ["-10%", "110%"]) }}
          className="absolute top-0 w-24 h-full bg-[#FF5500] blur-sm opacity-80"
        />
      </div>

      {/* Responsive 4-Column Architectural Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {stages.map((stage, i) => {
          const Icon = ICONS[stage.iconName];
          const threshold = (i / 3) * 0.8 + 0.1;

          return (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="flex flex-col group"
            >
              {/* Node Connector */}
              <div className="relative mb-6 sm:mb-8 flex items-center justify-start">
                <div className="size-16 sm:size-18 rounded-2xl bg-white border border-[#E8E2D9] flex items-center justify-center relative z-10 shadow-sm group-hover:border-[#FF5500]/50 group-hover:shadow-md transition-all duration-300">
                  <Icon className="size-7 sm:size-8 text-[#FF5500] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* Stage Card */}
              <div className="flex flex-col justify-between flex-grow p-7 sm:p-8 rounded-3xl border border-[#E8E2D9] bg-white group-hover:border-[#FF5500]/40 group-hover:shadow-xl transition-all duration-300 shadow-xs relative overflow-hidden">
                {/* Subtle Amber Top Accent Beam on Hover */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[#FF5500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Stage Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111315] font-['Poppins',sans-serif] tracking-tight mb-3 group-hover:text-[#FF5500] transition-colors duration-300">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#625D55] font-['Outfit',sans-serif] leading-relaxed font-normal">
                    {stage.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
