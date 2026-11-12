"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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

const CYCLE_INTERVAL = 3000; // Exact 3 seconds auto-advance

/**
 * SolutionsClient Component
 *
 * Open Editorial Process Stage (ZERO CARDS):
 * - Left: Floating high-resolution equipment image synced to the active step
 * - Right: Only the single active step's typography & verification row
 * - Bottom: Interactive horizontal dotted line advancing automatically every 3 seconds
 */
export function SolutionsClient({ steps }: SolutionsClientProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStep = steps[activeStep] || steps[0];

  // Auto-advance every 3 seconds unless paused on hover
  useEffect(() => {
    if (isPaused || steps.length <= 1) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, steps.length]);

  const progressPercent =
    steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full flex flex-col gap-10 sm:gap-12 select-none"
    >
      {/* 1. OPEN IMAGE + SINGLE ACTIVE TEXT STAGE (ZERO CARDS / ZERO BOXES) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left: Floating Equipment Visual */}
        <div className="lg:col-span-6 w-full">
          <StepEquipmentVisual
            stepIndex={activeStep}
            stepNumber={currentStep.step}
          />
        </div>

        {/* Right: Single Active Step Typography */}
        <div className="lg:col-span-6 min-h-[220px] sm:min-h-[250px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col text-left"
            >
              {/* Minimal Architectural Counter + Metric */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="font-mono text-sm font-extrabold text-[#FF5500] tracking-wider">
                  {currentStep.step} / 0{steps.length}
                </span>
                <span className="text-[#D4CEC3]">•</span>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#625D55]">
                  {currentStep.metric || currentStep.actionLabel}
                </span>
              </div>

              {/* Active Step Title */}
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-[36px] text-[#1F1F1E] tracking-tight leading-[1.18] mb-3.5">
                {currentStep.title}
              </h3>

              {/* Single Active Description */}
              <p className="text-base sm:text-lg text-[#403C36] leading-relaxed mb-6 font-normal max-w-xl">
                {currentStep.description}
              </p>

              {/* Hairline Protocol Action Row */}
              <div className="pt-4 border-t border-[#E8E2D9] flex items-center gap-2.5 text-sm font-semibold text-[#1F1F1E] max-w-xl">
                <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>{currentStep.actionLabel}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. BOTTOM DOTTED STEP LINE (Auto-changes every 3 seconds) */}
      <div className="relative w-full pt-2">
        {/* Dotted Connecting Line between Node 01 -> Node 02 -> Node 03 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[16.666%] right-[16.666%] top-[26px] sm:top-[28px] -translate-y-1/2 z-0"
        >
          {/* Base Grey Dotted Track */}
          <div className="w-full border-t-2 border-dotted border-[#CFC8BC]" />

          {/* Active Orange Progress Overlay */}
          <motion.div
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 border-t-2 border-dotted border-[#FF5500]"
          />
        </div>

        {/* Interactive Dotted Step Nodes */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 relative z-10">
          {steps.map((item, idx) => {
            const isActive = activeStep === idx;
            const isPassed = idx < activeStep;

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
                aria-label={`Step ${item.step}: ${item.title}`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Step Dot Circle sitting directly on dotted line */}
                <div
                  className={cn(
                    "size-9 sm:size-10 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-extrabold transition-all duration-300",
                    isActive
                      ? "bg-[#FF5500] text-white border-2 border-[#FF5500] shadow-[0_0_0_5px_rgba(255,85,0,0.16)] scale-110"
                      : isPassed
                      ? "bg-[#1F1F1E] text-white border-2 border-[#1F1F1E]"
                      : "bg-[#FAF8F5] text-[#625D55] border-2 border-[#CFC8BC] group-hover:border-[#1F1F1E] group-hover:text-[#1F1F1E]"
                  )}
                >
                  {item.step}
                </div>

                {/* Concise Step Label */}
                <span
                  className={cn(
                    "mt-3 font-sans text-xs sm:text-sm font-bold leading-snug transition-colors line-clamp-2 px-1 max-w-[200px]",
                    isActive
                      ? "text-[#1F1F1E]"
                      : "text-[#7A756D] group-hover:text-[#1F1F1E]"
                  )}
                >
                  {item.title}
                </span>

                {/* 3-Second Active Timer Bar */}
                <div className="w-14 sm:w-20 h-[2px] bg-[#E8E2D9] rounded-full overflow-hidden mt-2">
                  {isActive && !isPaused ? (
                    <motion.div
                      key={`step-timer-${activeStep}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: CYCLE_INTERVAL / 1000,
                        ease: "linear",
                      }}
                      className="h-full bg-[#FF5500]"
                    />
                  ) : (
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        isPassed || isActive ? "w-full bg-[#FF5500]" : "w-0"
                      )}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
