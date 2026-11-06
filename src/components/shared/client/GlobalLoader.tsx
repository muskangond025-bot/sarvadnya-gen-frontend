"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

/**
 * GlobalLoader Component
 * 
 * A high-fidelity, industrial-themed entry loader.
 * Features:
 * - Emerald glow animation
 * - Progress percentage
 * - Smooth exit transition
 */
export function GlobalLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-48 h-32 flex items-center justify-center">
              <img 
                src="/images/sarvadnya_logo.png" 
                alt="Sarvadnya Generators" 
                className="w-full h-full object-contain animate-pulse"
              />
            </div>
            {/* Pulsing Aura */}
            <div className="absolute inset-0 bg-[#00ff8f]/20 blur-3xl rounded-full animate-pulse scale-110" />
          </motion.div>

          {/* Progress Info */}
          <div className="flex flex-col items-center gap-4 w-64">
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div 
                className="h-full bg-[#00ff8f]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] font-bold text-[#00ff8f] uppercase tracking-[0.3em]">Initializing Power</span>
              <span className="text-white font-mono text-sm">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Brand Text */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-12 text-center"
          >
            <h2 className="text-white/40 font-['Poppins',sans-serif] text-xs font-bold uppercase tracking-[0.5em]">
              Sarvadnya <span className="text-white/20">Generators</span>
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
