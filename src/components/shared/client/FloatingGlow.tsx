"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingGlowProps {
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  delay?: number;
  duration?: number;
  patternIndex?: number;
}

const MOTION_PATTERNS = [
  {
    x: ["0%", "20%", "-15%", "15%", "0%"],
    y: ["0%", "-20%", "15%", "-15%", "0%"],
  },
  {
    x: ["0%", "-20%", "20%", "-10%", "0%"],
    y: ["0%", "15%", "-20%", "20%", "0%"],
  },
  {
    x: ["0%", "15%", "-25%", "20%", "0%"],
    y: ["0%", "-15%", "20%", "-25%", "0%"],
  },
  {
    x: ["0%", "-15%", "15%", "-20%", "0%"],
    y: ["0%", "20%", "-15%", "15%", "0%"],
  },
  {
    x: ["0%", "25%", "-20%", "-10%", "0%"],
    y: ["0%", "-10%", "25%", "-20%", "0%"],
  },
  {
    x: ["0%", "-25%", "10%", "20%", "0%"],
    y: ["0%", "25%", "-10%", "-15%", "0%"],
  },
];

function getDeterministicIndex(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % MOTION_PATTERNS.length;
}

/**
 * FloatingGlow Component
 * 
 * A high-fidelity, interactive gradient blob that floats in the background.
 * Features:
 * - Fluid, organic motion using Framer Motion
 * - Glassmorphic blur effects
 * - Dynamic sizing and coloring
 * - SSR and hydration safe with deterministic motion paths
 */
export function FloatingGlow({ 
  color = "#00ff8f", 
  size = "md", 
  className,
  delay = 0,
  duration = 20,
  patternIndex
}: FloatingGlowProps) {
  const sizeMap = {
    sm: "size-[200px] blur-[60px]",
    md: "size-[400px] blur-[100px]",
    lg: "size-[600px] blur-[140px]",
    xl: "size-[800px] blur-[180px]"
  };

  const selectedIndex =
    patternIndex !== undefined
      ? Math.abs(patternIndex) % MOTION_PATTERNS.length
      : getDeterministicIndex(`${color}-${size}-${className ?? ""}-${delay}-${duration}`);

  const pattern = MOTION_PATTERNS[selectedIndex];

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        scale: 0.8
      }}
      animate={{
        x: pattern.x,
        y: pattern.y,
        opacity: [0.05, 0.15, 0.1, 0.05],
        scale: [1, 1.2, 0.9, 1]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay
      }}
      className={cn(
        "absolute pointer-events-none rounded-full mix-blend-screen",
        sizeMap[size],
        className
      )}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 0%, transparent 70%)`
      }}
    />
  );
}
