"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FutureLogo from "@/components/common/FutureLogo";

// Ghost configuration
const ghostConfig = [
  { offset: 100, scale: 1.5, delay: 0 },
  { offset: 200, scale: 2.0, delay: 0.2 },
  { offset: 300, scale: 2.5, delay: 0.4 },
  { offset: 400, scale: 3.0, delay: 0.6 },
];

interface OrbWithTrailProps {
  src: string;
  alt: string;
  direction: "left" | "right";
}

function OrbWithTrail({ src, alt, direction }: OrbWithTrailProps) {
  const multiplier = direction === "left" ? -1 : 1;

  return (
    <div className="relative flex items-end justify-center">
      {ghostConfig.map((ghost, i) => {
        const fadeOutDelay = (ghostConfig.length - 1 - i) * 0.2;
        const totalDuration = 3;

        return (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{
              zIndex: ghostConfig.length - i,
              transformOrigin: "bottom center",
            }}
            initial={{
              x: ghost.offset * multiplier,
              scale: ghost.scale,
              opacity: 0,
            }}
            animate={{
              x: ghost.offset * multiplier,
              scale: ghost.scale,
              opacity: [0, 0, 0.25 - i * 0.04, 0.25 - i * 0.04, 0, 0],
            }}
            transition={{
              duration: totalDuration,
              times: [
                0,
                ghost.delay / totalDuration,
                (ghost.delay + 0.3) / totalDuration,
                0.5 + fadeOutDelay / totalDuration / 2,
                0.6 + fadeOutDelay / totalDuration,
                1,
              ],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={src}
              alt=""
              width={800}
              height={800}
              className="w-24 sm:w-52 h-auto"
              aria-hidden="true"
            />
          </motion.div>
        );
      })}

      <Image
        src={src}
        alt={alt}
        width={800}
        height={800}
        className="relative z-10 w-24 sm:w-52 h-auto"
      />
    </div>
  );
}

import { FloatingGlow } from "@/components/shared/client";

/**
 * AboutHeroClient Component
 *
 * Hero section with Framer Motion orb trail animations.
 */
export function AboutHeroClient() {
  return (
    <section className="w-full py-24 sm:py-[120px] md:py-[160px] flex flex-col items-center justify-center relative min-h-[80vh] overflow-hidden bg-black">
      {/* Cinematic Background Atmosphere */}
      <FloatingGlow color="#00ff8f" size="xl" className="-top-1/4 -right-1/4 opacity-10" />
      <FloatingGlow color="#00d1ff" size="lg" className="bottom-1/4 -left-1/4 opacity-10" delay={2} />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="w-full flex flex-col items-center text-center gap-10 sm:gap-[60px] z-10 max-w-[1440px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="px-5 py-2 rounded-xl border border-[#00ff8f]/20 bg-[#00ff8f]/5 text-[#00ff8f] text-xs font-bold tracking-[0.3em] uppercase font-['Outfit',sans-serif] mb-6 sm:mb-8 inline-block">
            Our Legacy of Power
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-['Poppins',sans-serif] text-white leading-[1.05] tracking-tighter">
            Powering Nashik <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-[#00ff8f] to-white bg-[length:200%_auto] animate-shimmer">
              Since 2009.
            </span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative w-full h-[32vh] sm:h-[40vh] md:h-[55vh] flex justify-center items-center"
        >
          <OrbWithTrail
            src="/images/about/left.webp"
            alt="Left Orb"
            direction="left"
          />

          <div className="w-auto rounded-[40px] backdrop-blur-xl flex items-center justify-center relative z-20 group">
            <div className="absolute inset-0 bg-[#00ff8f]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <FutureLogo className="w-auto h-20 sm:h-32 md:h-56 relative z-10 transition-transform duration-700 group-hover:scale-105" />
          </div>

          <OrbWithTrail
            src="/images/about/right.webp"
            alt="Right Orb"
            direction="right"
          />
        </motion.div>
      </div>

    </section>
  );
}
