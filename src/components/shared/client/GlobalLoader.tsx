"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * GlobalLoader Component
 *
 * Clean White Architectural Entrance Loader:
 * - Pure white luxury theme (zero background grid lines)
 * - Rapid digital progress count (0% -> 100% at high speed)
 * - 3D Orange Electric Symbol springs into view upon reaching 100%
 * - Prominent, large, high-contrast "SARVADNYA" brand typography
 * - Smooth cinematic fade out into the homepage
 */
export function GlobalLoader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const COUNT_DURATION = 750; // Fast speed (0.75s to count from 0 to 100)
    const HOLD_AFTER_COMPLETE = 600; // Hold for 0.6s so user sees the symbol & brand
    const TOTAL_DURATION = COUNT_DURATION + HOLD_AFTER_COMPLETE; // ~1.35s total

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / COUNT_DURATION);

      // Fast, smooth accelerating-then-settling count curve
      const currentCount = Math.min(100, Math.round(progress * 100));
      setCount(currentCount);

      if (progress >= 1) {
        setIsComplete(true);
      }

      if (elapsed < TOTAL_DURATION) {
        frameId = requestAnimationFrame(tick);
      } else {
        setLoading(false);
      }
    };

    frameId = requestAnimationFrame(tick);

    // Keyboard shortcut / click to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setLoading(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer"
          aria-label="Sarvadnya Power Initializing"
        >
          {/* Subtle warm ambient orange glow in center */}
          <div className="absolute size-[380px] sm:size-[520px] bg-[#FF5500]/[0.07] blur-[110px] rounded-full pointer-events-none" />

          {/* Core Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            
            {/* Center Dynamic Area: Counter 0->100% -> Transforms to 3D Electric Symbol */}
            <div className="relative h-28 sm:h-36 flex items-center justify-center mb-5 sm:mb-7">
              {!isComplete ? (
                <motion.div
                  key="counter-display"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="font-mono text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#111315] tracking-tight tabular-nums flex items-baseline gap-1">
                    <span>{count}</span>
                    <span className="text-[#FF5500] text-3xl sm:text-4xl font-bold">%</span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-28 sm:w-36 h-1 bg-[#F0ECE1] rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFAA00] to-[#FF5500] rounded-full transition-all duration-75"
                      style={{ width: `${count}%` }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="symbol-display"
                  initial={{ scale: 0.2, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="relative flex items-center justify-center"
                >
                  <div className="relative size-24 sm:size-28 md:size-32 flex items-center justify-center">
                    <img
                      src="/images/cta/electric_symbol_3d_orange.png"
                      alt="Sarvadnya Electric Symbol"
                      className="w-full h-full object-contain drop-shadow-[0_12px_28px_rgba(255,85,0,0.32)]"
                    />

                    {/* Luminous Ripple Pulse on Entrance */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border-2 border-[#FF5500] pointer-events-none"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Brand Typography: Prominent, Big, Highly Visible */}
            <div className="flex flex-col items-center">
              <span className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.2em] sm:tracking-[0.25em] text-[#111315] uppercase select-none drop-shadow-xs">
                SARVADNYA
              </span>

              <div className="flex items-center gap-2.5 mt-2.5 sm:mt-3">
                <div className="h-px w-6 sm:w-10 bg-[#FF5500]/40" />
                <span className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-[0.32em] text-[#FF5500] uppercase">
                  SILENT GENERATOR FLEET • NASHIK
                </span>
                <div className="h-px w-6 sm:w-10 bg-[#FF5500]/40" />
              </div>

              {/* Status on completion */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="mt-3 font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#111315]/50 uppercase"
                >
                  100% • READY
                </motion.div>
              )}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
