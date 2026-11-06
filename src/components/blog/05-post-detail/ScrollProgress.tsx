"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress Indicator Component
 * 
 * A high-fidelity progress bar that tracks reading progress.
 * Features a smooth spring animation and an emerald-to-white gradient.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#00ff8f] via-[#00ff8f] to-white z-[9999] origin-left"
      style={{ 
        scaleX,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease"
      }}
    />
  );
}
