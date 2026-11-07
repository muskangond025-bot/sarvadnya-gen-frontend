"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Quote, TrendingUp, Users, Star } from "lucide-react";
import Image from "next/image";

/**
 * Animated Counter Component
 * Counts up smoothly when scrolled into view.
 */
function CounterNumber({
  value,
  decimals = 0,
  duration = 1.6,
}: {
  value: number;
  decimals?: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      setDisplayValue(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, decimals, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? displayValue.toFixed(decimals) : displayValue}
    </span>
  );
}

export function SuccessStoriesClient() {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      {/* Top Content: Testimonial in Free Space (ZERO CARDS, NO TEXT ANIMATION) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left: Testimonial in Open Space */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="size-14 rounded-2xl bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] mb-6">
              <Quote size={28} />
            </div>

            <p className="text-[#111315] font-['Outfit',sans-serif] text-xl sm:text-2xl md:text-3xl leading-relaxed mb-8 italic font-normal">
              &quot;Working with Sarvadnya transformed our business operations. Within 6 months, we saw a 60% reduction in downtime and our facility&apos;s operational efficiency reached an all-time high. Their team&apos;s technical expertise is unmatched.&quot;
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-[#E8E2D9]">
            <div className="size-14 rounded-full overflow-hidden border-2 border-[#E8E2D9] shrink-0">
              <Image 
                src="/images/success-avatar.png" 
                alt="James Mitchell" 
                width={56} 
                height={56} 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#111315] font-bold font-['Poppins',sans-serif] text-lg">
                James Mitchell
              </span>
              <span className="text-[#71695F] text-sm font-['Outfit',sans-serif]">
                Owner, Alpine Peak Resort
              </span>
            </div>
          </div>
        </div>

        {/* Right: Clean Photography */}
        <div className="lg:col-span-5 relative h-[280px] sm:h-[380px] rounded-3xl overflow-hidden shadow-lg border border-[#E8E2D9]">
          <Image 
            src="/images/success-team.png" 
            alt="Success Team" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Bottom Metrics: Architectural Columns in Free Space with Live Animated Count-Up */}
      <div className="pt-12 border-t border-[#E8E2D9]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Stat 1: 60% Downtime Reduction */}
          <div className="flex items-start gap-5 pr-4 md:border-r md:border-[#E8E2D9]">
            <div className="text-[#FF5500] shrink-0 mt-1">
              <TrendingUp className="size-12 sm:size-14 stroke-[1.8]" />
            </div>
            <div className="flex flex-col">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#111315] font-mono tracking-tight flex items-baseline">
                <CounterNumber value={60} duration={1.6} />
                <span className="text-[#FF5500]">%</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-[#111315] font-['Poppins',sans-serif] mt-1">
                Downtime Reduction
              </div>
              <div className="text-sm text-[#71695F] font-['Outfit',sans-serif] mt-0.5 leading-normal">
                Average improvement in first 6 months
              </div>
            </div>
          </div>

          {/* Stat 2: 2.5k+ Units Served */}
          <div className="flex items-start gap-5 pr-4 md:border-r md:border-[#E8E2D9]">
            <div className="text-[#FF5500] shrink-0 mt-1">
              <Users className="size-12 sm:size-14 stroke-[1.8]" />
            </div>
            <div className="flex flex-col">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#111315] font-mono tracking-tight flex items-baseline">
                <CounterNumber value={2.5} decimals={1} duration={1.8} />
                <span className="text-[#FF5500]">k+</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-[#111315] font-['Poppins',sans-serif] mt-1">
                Industrial Units Served
              </div>
              <div className="text-sm text-[#71695F] font-['Outfit',sans-serif] mt-0.5 leading-normal">
                Powering businesses across Maharashtra
              </div>
            </div>
          </div>

          {/* Stat 3: 4.9/5 Rating */}
          <div className="flex items-start gap-5">
            <div className="text-[#FF5500] shrink-0 mt-1">
              <Star className="size-12 sm:size-14 stroke-[1.8]" />
            </div>
            <div className="flex flex-col">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#111315] font-mono tracking-tight flex items-baseline">
                <CounterNumber value={4.9} decimals={1} duration={1.5} />
                <span className="text-[#FF5500]">/5</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-[#111315] font-['Poppins',sans-serif] mt-1">
                Client Rating
              </div>
              <div className="text-sm text-[#71695F] font-['Outfit',sans-serif] mt-0.5 leading-normal">
                Based on 500+ verified customer reviews
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
