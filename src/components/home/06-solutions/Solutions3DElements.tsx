"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface StepVisualProps {
  stepIndex: number;
  stepNumber: string;
}

const STEP_EQUIPMENT_DATA = [
  {
    imageSrc: "/images/generators/generator_38.png",
    alt: "Rapid Requirements Intake Portable Generator Unit",
  },
  {
    imageSrc: "/images/generators/generator_10.png",
    alt: "Heavy Prime Acoustic Silent Diesel Generator",
  },
  {
    imageSrc: "/images/generators/generator_14.png",
    alt: "Dispatch Ready Soundproof Inverter Power Unit",
  },
];

/**
 * Open Architectural Floating Equipment Stage
 * Zero card boxes or borders — isolated photorealistic unit floating over warm ambient aura.
 */
export function StepEquipmentVisual({ stepIndex, stepNumber }: StepVisualProps) {
  const data = STEP_EQUIPMENT_DATA[stepIndex] || STEP_EQUIPMENT_DATA[0];

  return (
    <div className="relative w-full h-[230px] sm:h-[310px] lg:h-[360px] flex items-center justify-center overflow-visible select-none">
      {/* Soft Warm Studio Aura */}
      <div
        aria-hidden="true"
        className="absolute w-[240px] sm:w-[360px] h-[180px] sm:h-[260px] bg-[#FF5500]/[0.09] blur-[70px] sm:blur-[95px] rounded-full pointer-events-none"
      />

      {/* Subtle Large Watermark Step Numeral */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`num-${stepNumber}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.14, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.4 }}
            className="font-sans font-black text-[110px] sm:text-[150px] lg:text-[180px] text-[#1F1F1E] tracking-tighter leading-none"
          >
            {stepNumber}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Levitating Transparent Equipment Unit */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="relative z-10 w-[84%] sm:w-[78%] h-[190px] sm:h-[260px] lg:h-[300px] flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={data.imageSrc}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full filter drop-shadow-[0_26px_34px_rgba(31,31,30,0.2)]"
          >
            <Image
              src={data.imageSrc}
              alt={data.alt}
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-contain"
              priority={stepIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Natural Ground Contact Shadow */}
      <motion.div
        animate={{
          scaleX: [1, 0.88, 1],
          opacity: [0.32, 0.18, 0.32],
        }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute bottom-3 sm:bottom-5 w-1/2 h-6 bg-black/35 blur-xl rounded-full pointer-events-none"
      />
    </div>
  );
}
