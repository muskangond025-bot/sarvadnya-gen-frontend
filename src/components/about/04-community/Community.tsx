"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Volume2, Users, Truck, ArrowRight } from "lucide-react";

/**
 * Community Component
 *
 * Ultra-Premium "The Sarvadnya Promise" Section with Framer Motion animation:
 * - Fluid staggered reveals and hover physics
 * - 4-Pillar client guarantees with active animated beacons
 * - Pure bright luxury theme (#FAF8F5, #FF5500, #E8E2D9)
 */
export function Community() {
  const promises = [
    {
      num: "01",
      icon: ShieldCheck,
      title: "Guaranteed Zero Downtime",
      desc: "Synchronized multi-generator setups and automatic load-transfer units ensure zero-second interruptions for mission-critical operations.",
      metric: "100% Seamless Power Handover",
    },
    {
      num: "02",
      icon: Volume2,
      title: "Acoustic Silence (<75 dBA)",
      desc: "Engineered soundproof acoustic canopies with heavy-duty silencers designed specifically for luxury weddings, banquets, and urban healthcare sites.",
      metric: "CPCB-IV+ Certified Quiet",
    },
    {
      num: "03",
      icon: Users,
      title: "Stationed Field Engineers",
      desc: "Certified mechanical and electrical engineers remain on-site throughout your deployment to manage fuel, live monitoring, and real-time load balancing.",
      metric: "24/7 On-Site Active Command",
    },
    {
      num: "04",
      icon: Truck,
      title: "Rapid Transit Fleet",
      desc: "In-house dedicated transportation trailers and mobile quick-response units ready for immediate deployment across 5 districts in Maharashtra.",
      metric: "Average 60-Min Hub Mobilization",
    },
  ];

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#E8E2D9] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Animated Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight leading-[1.12]">
            The Sarvadnya <span className="text-[#FF5500]">Promise</span>
          </h2>
          <p className="text-base sm:text-lg text-[#524E48] font-['Outfit',sans-serif] leading-relaxed mt-4">
            We deliver uninterrupted power with rapid dispatch, meticulously maintained generator sets, and dedicated 24/7 technical engineers on site.
          </p>
        </motion.div>

        {/* 4-Pillar Animated Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-12 sm:mt-16">
          {promises.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                className="bg-[#FAF8F5] rounded-3xl p-7 sm:p-8 border border-[#E8E2D9] shadow-xs hover:border-[#FF5500]/60 hover:bg-white hover:shadow-xl hover:shadow-[#FF5500]/10 transition-all duration-300 flex flex-col justify-between group cursor-default relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-extrabold text-[#FF5500] font-mono tracking-wider">
                      {item.num}
                    </span>
                    <div className="size-11 rounded-2xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[#FF5500] group-hover:bg-[#FF5500] group-hover:text-white group-hover:border-[#FF5500] transition-all duration-300 shadow-2xs group-hover:scale-105">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#111315] font-['Poppins',sans-serif] leading-snug group-hover:text-[#FF5500] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#403C36] font-['Outfit',sans-serif] leading-relaxed mt-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E2D9] flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5500]" />
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#71695F] font-['Outfit',sans-serif]">
                    {item.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Bottom Consultation Plinth */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs hover:border-[#FF5500]/40 transition-colors"
        >
          <div className="flex flex-col sm:text-left text-center">
            <span className="text-base sm:text-lg font-bold text-[#111315] font-['Poppins',sans-serif]">
              Need a tailored power assessment for your upcoming project?
            </span>
            <span className="text-xs sm:text-sm text-[#71695F] font-['Outfit',sans-serif] mt-0.5">
              Fleet dispatch engineers available 24/7 for sizing calculations and site audits.
            </span>
          </div>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold text-sm shadow-md shadow-[#FF5500]/25 transition-all hover:scale-[1.03] active:scale-[0.98] shrink-0 font-['Outfit',sans-serif]"
          >
            <span>Connect Fleet Experts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
