"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const INDUSTRIES = [
  { name: "Wedding Events", image: "/images/industries/residential.png" },
  { name: "Factories", image: "/images/industries/commercial.png" },
  { name: "Construction", image: "/images/industries/construction.png" },
  { name: "Hospitals", image: "/images/industries/healthcare.png" },
  { name: "Corporate Offices", image: "/images/industries/commercial.png" },
  { name: "Film Shooting", image: "/images/industries/residential.png" },
  { name: "Agriculture", image: "/images/industries/residential.png" },
  { name: "Hotels & Resorts", image: "/images/industries/commercial.png" },
];

// Duplicate for infinite loop
const DUPLICATED_INDUSTRIES = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES];

/**
 * IndustriesCarousel Component (Infinite Loop)
 * 
 * Uses Framer Motion for a seamless, horizontal scrolling experience.
 */
export function IndustriesCarousel() {
  return (
    <div className="relative w-full overflow-hidden py-10 group">
      {/* Side Fades for Premium Look */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black to-transparent z-20 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <motion.div
        className="flex gap-12 md:gap-20 items-center w-max"
        animate={{
          x: [0, -100 * INDUSTRIES.length * 2.5], // Dynamic width based on item count
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35, // Adjust speed here
            ease: "linear",
          },
        }}
        whileHover={{ animationPlayState: "paused" }} // Support for pausing on hover
      >
        {DUPLICATED_INDUSTRIES.map((industry, index) => (
          <div 
            key={index}
            className="flex flex-col items-center gap-8 shrink-0 cursor-pointer group/item"
          >
            {/* Circular Image Container */}
            <div className="relative size-44 md:size-56 lg:size-64 rounded-full overflow-hidden border border-white/5 group-hover/item:border-[#00ff8f]/50 transition-all duration-700 shadow-2xl">
              <Image 
                src={industry.image}
                alt={industry.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover/item:scale-110"
              />
              {/* Overlay Glass Effect */}
              <div className="absolute inset-0 bg-[#00ff8f]/[0.05] opacity-0 group-hover/item:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Title with Animated Line */}
            <div className="relative flex flex-col items-center">
              <h4 className="text-white font-['Poppins',sans-serif] text-xl md:text-2xl font-bold group-hover/item:text-[#00ff8f] transition-all duration-500 tracking-tight">
                {industry.name}
              </h4>
              <div className="w-0 h-0.5 bg-[#00ff8f] mt-1 group-hover/item:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Progress Line Indicator (Decorative) */}
      <div className="mt-16 max-w-[800px] mx-auto h-0.5 bg-white/5 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#00ff8f] shadow-[0_0_10px_#00ff8f]"
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
}
