"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Factory, 
  Construction, 
  Building2, 
  Hospital, 
  Warehouse, 
  Palmtree, 
  Utensils, 
  ShoppingBag, 
  Users, 
  Film, 
  Music, 
  Trophy, 
  Zap, 
  Gem,
  School,
  Truck,
  Waves,
  Hammer
} from "lucide-react";

const INDUSTRIAL_ROW = [
  { name: "Factories", icon: Factory },
  { name: "Manufacturing", icon: Settings2 },
  { name: "Construction", icon: Construction },
  { name: "Warehousing", icon: Warehouse },
  { name: "Cold Storage", icon: Snowflake },
  { name: "Road Projects", icon: Truck },
  { name: "Water Projects", icon: Waves },
  { name: "Govt Infrastructure", icon: Building2 },
];

const COMMERCIAL_ROW = [
  { name: "Corporate Offices", icon: Building2 },
  { name: "Hotels & Resorts", icon: Palmtree },
  { name: "Restaurants", icon: Utensils },
  { name: "Malls & Retail", icon: ShoppingBag },
  { name: "Schools & Colleges", icon: School },
  { name: "Agriculture", icon: Leaf },
  { name: "Data Centers", icon: Cpu },
  { name: "Banking", icon: Landmark },
];

const EVENTS_ROW = [
  { name: "Wedding Events", icon: Gem },
  { name: "Grand Exhibitions", icon: Sparkles },
  { name: "Political Gatherings", icon: Megaphone },
  { name: "Film Shooting", icon: Film },
  { name: "Media Production", icon: Camera },
  { name: "Outdoor Concerts", icon: Music },
  { name: "Sports Events", icon: Trophy },
  { name: "Emergency Backup", icon: Zap },
];

// Fallback Icons
import { 
  Settings2, 
  Snowflake, 
  Leaf, 
  Cpu, 
  Landmark, 
  Sparkles, 
  Megaphone, 
  Camera 
} from "lucide-react";

import { useScroll, useTransform } from "framer-motion";

/**
 * CrazyIndustrialMarquee
 * 
 * A high-fidelity, triple-layered scrolling marquee showcasing all industries served.
 * Features different speeds and directions for a dynamic industrial look.
 * Enhanced with scroll-linked parallax effects.
 */
export function CrazyIndustrialMarquee() {
  const { scrollYProgress } = useScroll();
  
  // Create unique parallax offsets for each row
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="w-full bg-[#050505] py-20 relative overflow-hidden flex flex-col gap-8 md:gap-12">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black to-transparent" />
      </div>

      <MarqueeRow items={INDUSTRIAL_ROW} speed={40} direction="left" label="Industrial & Infra" parallaxX={x1} />
      <MarqueeRow items={COMMERCIAL_ROW} speed={50} direction="right" label="Commercial & Retail" parallaxX={x2} />
      <MarqueeRow items={EVENTS_ROW} speed={35} direction="left" label="Events & Hospitality" parallaxX={x3} />
      
      {/* Decorative Overlay for Industrial Polish */}
      <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-linear-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-linear-to-l from-black to-transparent z-20 pointer-events-none" />
    </div>
  );
}

function MarqueeRow({ items, speed, direction, label, parallaxX }: { 
  items: any[], 
  speed: number, 
  direction: "left" | "right",
  label: string,
  parallaxX: any
}) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const isLeft = direction === "left";

  return (
    <motion.div style={{ x: parallaxX }} className="flex flex-col gap-4">
      {/* Optional Section Label */}
      <div className="px-6 md:px-10 lg:px-[60px] max-w-[1440px] mx-auto w-full">
        <span className="text-sm md:text-xl font-bold text-[#00ff8f] uppercase tracking-[0.2em] opacity-80">{label}</span>
      </div>

      <div className="flex overflow-hidden relative py-2">
        <motion.div
          className="flex gap-4 md:gap-8 items-center"
          animate={{
            x: isLeft ? [0, -100 * items.length * 4] : [-100 * items.length * 4, 0]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-4 px-6 py-4 md:px-8 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl hover:bg-[#00ff8f]/10 hover:border-[#00ff8f]/30 transition-all group cursor-pointer"
            >
              <div className="size-10 md:size-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#00ff8f] group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-white font-['Poppins',sans-serif] text-base md:text-xl font-bold whitespace-nowrap group-hover:text-[#00ff8f] transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
