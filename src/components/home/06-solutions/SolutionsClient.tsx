"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepEquipmentVisual } from "./Solutions3DElements";

export interface StepItem {
  step: string;
  title: string;
  description: string;
  actionLabel: string;
  metric?: string;
}

interface SolutionsClientProps {
  steps: StepItem[];
}

/**
 * 3D Tilt Card with Framer Motion Spring Parallax & Photorealistic Isolated Equipment Stage
 */
function TiltCard({
  item,
  index,
  isActive,
  onActivate,
}: {
  item: StepItem;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 240, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onActivate}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-2xl sm:rounded-[24px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer group will-change-transform",
        isActive
          ? "bg-white border-2 border-[#FF5500] shadow-[0_20px_45px_rgba(255,85,0,0.12)] scale-[1.01]"
          : "bg-white/90 border border-[#E8E2D9] hover:border-[#1F1F1E] shadow-[0_10px_30px_rgba(31,31,30,0.04)]"
      )}
    >
      {/* 3D Depth Parallax Content Layer */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Top Header: Step Numeral */}
          <div className="mb-3">
            <span
              className={cn(
                "font-sans font-extrabold text-2xl transition-colors",
                isActive ? "text-[#FF5500]" : "text-[#1F1F1E]"
              )}
            >
              {item.step}.
            </span>
          </div>

          {/* Step Title */}
          <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#1F1F1E] group-hover:text-[#FF5500] transition-colors mb-1 leading-snug">
            {item.title}
          </h3>

          {/* Centered Isolated 3D Equipment Render with Radial Ambient Glow */}
          <div style={{ transform: "translateZ(30px)" }}>
            <StepEquipmentVisual stepIndex={index} isActive={isActive} />
          </div>

          {/* High-Signal Description */}
          <p className="text-sm sm:text-base text-[#1F1F1E] leading-relaxed mb-6 font-medium relative z-20">
            {item.description}
          </p>
        </div>

        {/* Card Footer: Verified Architectural Check */}
        <div
          style={{ transform: "translateZ(15px)" }}
          className="pt-4 border-t border-[#E8E2D9]/70 flex items-center justify-between text-xs font-semibold text-[#1F1F1E]"
        >
          <span className="flex items-center gap-1.5 text-[#625D55]">
            <CheckCircle2
              className={cn(
                "w-4 h-4 transition-colors",
                isActive ? "text-[#FF5500]" : "text-[#625D55]"
              )}
            />
            <span>{item.metric || "Verified Protocol"}</span>
          </span>

          <span
            className={cn(
              "text-[11px] uppercase tracking-wider font-mono transition-opacity",
              isActive ? "text-[#FF5500] opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            Active Step
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function SolutionsClient({ steps }: SolutionsClientProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Rhythmic Active Step Cycling (Auto-progress every 3.2s unless hovered)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, steps.length]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full"
    >
      {/* Principle 1: SVG Animated Electric Conduit Flow connecting the steps */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-14 left-[16%] right-[16%] h-1 pointer-events-none z-0"
      >
        <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
          {/* Base Guide Track */}
          <line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#E8E2D9"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Animated Flowing Laser Conduit Beam */}
          <motion.line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#FF5500"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 120, strokeDasharray: "30 90" }}
            animate={{ strokeDashoffset: -120 }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "linear",
            }}
          />
        </svg>

        {/* Pulsing Energy Sparks at Node Intersection Points */}
        <div className="absolute left-[33%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-[#FF5500] fill-[#FF5500]/30 animate-pulse" />
        </div>
        <div className="absolute left-[67%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-[#FF5500] fill-[#FF5500]/30 animate-pulse" />
        </div>
      </div>

      {/* Grid of 3D Perspective Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10 [perspective:1200px]">
        {steps.map((item, index) => (
          <TiltCard
            key={item.step}
            item={item}
            index={index}
            isActive={activeStep === index}
            onActivate={() => setActiveStep(index)}
          />
        ))}
      </div>
    </div>
  );
}
