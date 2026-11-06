"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Gauge, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepVisualProps {
  stepIndex: number;
  isActive: boolean;
}

const STEP_EQUIPMENT_DATA = [
  {
    imageSrc: "/images/generators/generator_38.png",
    alt: "Rapid Requirements Intake Generator Unit",
    tag: "24/7 INTAKE DESK",
    icon: Sparkles,
    badge: "Site & Load Assessment",
  },
  {
    imageSrc: "/images/generators/generator_10.png",
    alt: "Heavy Prime Load Calibration Generator",
    tag: "LOAD SIZING 5–250 kVA",
    icon: Gauge,
    badge: "Inrush Current Sizing",
  },
  {
    imageSrc: "/images/generators/generator_14.png",
    alt: "CPCB-II Acoustic Dispatch Verified Unit",
    tag: "DISPATCH READY",
    icon: ShieldCheck,
    badge: "Clearance Confirmed",
  },
];

/**
 * Photorealistic 3D Isolated Equipment Render Component
 * Replaces vector SVG drawings with genuine high-resolution equipment renders,
 * volumetric floor glow, optical floating physics, and telemetry badges.
 */
export function StepEquipmentVisual({ stepIndex, isActive }: StepVisualProps) {
  const data = STEP_EQUIPMENT_DATA[stepIndex] || STEP_EQUIPMENT_DATA[0];

  return (
    <div className="relative w-full h-32 sm:h-36 my-3 flex items-center justify-center overflow-visible">
      {/* Volumetric Under-Glow Radial Lighting Pool */}
      <motion.div
        animate={{
          opacity: isActive ? 0.85 : 0.12,
          scale: isActive ? 1.25 : 0.85,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute w-44 h-22 bg-[#FF5500]/30 blur-2xl rounded-full pointer-events-none"
      />

      {/* Floating 3D Equipment Unit Assembly */}
      <motion.div
        animate={{
          y: isActive ? -8 : 0,
          scale: isActive ? 1.05 : 0.97,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
      >
        {/* High-Resolution Equipment Photograph with Realistic Ambient Drop Shadow */}
        <div className="relative w-4/5 h-28 sm:h-32 filter drop-shadow-[0_20px_24px_rgba(31,31,30,0.22)] transition-transform duration-500">
          <Image
            src={data.imageSrc}
            alt={data.alt}
            fill
            sizes="(max-width: 768px) 60vw, 25vw"
            className="object-contain"
            priority={stepIndex === 0}
          />
        </div>
      </motion.div>
    </div>
  );
}
