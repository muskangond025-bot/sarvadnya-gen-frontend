"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Quote, TrendingUp, Users, Star } from "lucide-react";
import Image from "next/image";

interface SuccessStoriesClientProps {
  // Pass children or props if needed
}

export function SuccessStoriesClient() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col gap-12"
    >
      {/* Top Content: Testimonial + Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Testimonial Card */}
        <motion.div 
          variants={item}
          className="bg-[#004d2e] rounded-[32px] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,255,143,0.1)] transition-shadow duration-700"
        >
          {/* Decorative Quote Icon */}
          <Quote className="text-white/10 absolute -right-4 -top-4 size-48 rotate-12 group-hover:rotate-6 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <div className="size-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
              <Quote size={32} />
            </div>
            <p className="text-white font-['Outfit',sans-serif] text-xl md:text-2xl leading-relaxed mb-12 italic">
              "Working with Sarvadnya transformed our business operations. Within 6 months, we saw a 60% reduction in downtime and our facility's operational efficiency reached an all-time high. Their team's technical expertise is unmatched."
            </p>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="size-14 rounded-full overflow-hidden border-2 border-white/20">
              <Image 
                src="/images/success-avatar.png" 
                alt="James Mitchell" 
                width={56} 
                height={56} 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold font-['Poppins',sans-serif]">James Mitchell</span>
              <span className="text-white/70 text-sm font-['Outfit',sans-serif]">Owner, Alpine Peak Resort</span>
            </div>
          </div>
        </motion.div>

        {/* Image Card */}
        <motion.div 
          variants={item}
          className="relative h-[250px] sm:h-[400px] lg:h-auto rounded-[32px] overflow-hidden group border border-white/10"
        >
          <Image 
            src="/images/success-team.png" 
            alt="Success Team" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      </div>

      {/* Bottom Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={TrendingUp} 
          value="60%" 
          label="Downtime Reduction" 
          sub="Average improvement in first 6 months" 
        />
        <StatCard 
          icon={Users} 
          value="2.5k+" 
          label="Industrial Units Served" 
          sub="Powering businesses across Maharashtra" 
        />
        <StatCard 
          icon={Star} 
          value="4.9/5" 
          label="Client Rating" 
          sub="Based on 500+ verified reviews" 
        />
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, value, label, sub }: { icon: any, value: string, label: string, sub: string }) {
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      variants={item}
      className="p-8 rounded-[24px] border border-white/5 bg-[#0a0a0a] flex flex-col gap-4 group hover:border-[#00ff8f]/30 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="size-12 rounded-xl bg-[#00ff8f]/5 flex items-center justify-center text-[#00ff8f] group-hover:bg-[#00ff8f]/10 transition-colors group-hover:rotate-12">
        <Icon size={24} />
      </div>
      <div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-white font-['Poppins',sans-serif] font-medium mb-2">{label}</div>
        <div className="text-[#bfbfbf] text-sm font-['Outfit',sans-serif]">{sub}</div>
      </div>
    </motion.div>
  );
}
