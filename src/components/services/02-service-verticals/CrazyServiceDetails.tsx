"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cog, Sparkles, Truck, Wrench, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  actionText?: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "industrial",
    title: "Industrial Rentals",
    description: "High-capacity silent DG sets from 65kVA to 250kVA engineered for continuous manufacturing, infrastructure, and heavy engineering.",
    icon: Cog,
    href: "/generators",
    actionText: "Learn More",
  },
  {
    id: "events",
    title: "Event Silent Power",
    description: "Acoustic-shielded silent generators for luxury weddings, grand concerts, and VIP festivals with certified zero noise disruption.",
    icon: Sparkles,
    href: "/contact",
    actionText: "Learn More",
  },
  {
    id: "emergency",
    title: "Emergency Dispatch",
    description: "Nashik's fastest 60-minute emergency deployment. Mobile DG units mobilized immediately to prevent unexpected power failure.",
    icon: Truck,
    href: "tel:+916262629944",
    actionText: "Learn More",
  },
  {
    id: "maintenance",
    title: "AMC & Maintenance",
    description: "Comprehensive Annual Maintenance Contracts, automated fuel logistics, and 24/7 dedicated certified engineers on site.",
    icon: Wrench,
    href: "/contact",
    actionText: "Learn More",
  },
];

/**
 * CrazyServiceDetails Component
 * 
 * - Desktop (sm+): Exact Bootstrap Brain Service-8 open layout
 * - Mobile (< sm): Premium horizontal snap-swipe carousel with rich kinetic micro-animations
 */
export function CrazyServiceDetails() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16; // 16px gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), SERVICES.length - 1));
  };

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(activeIndex + 1, SERVICES.length - 1));
  };

  return (
    <div className="w-full">
      {/* 
        1. DESKTOP VIEW (sm+):
        Original Bootstrap Brain Service-8 Grid (100% untouched)
      */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {SERVICES.map((service, i) => {
          const IconComponent = service.icon;
          const isPhone = service.href.startsWith("tel:");

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center text-center group"
            >
              {/* Standalone Solid Icon (Matching BootstrapBrain Service-8) */}
              <div className="mb-6 flex items-center justify-center text-[#FF5500] transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <IconComponent className="size-14 sm:size-16 stroke-[1.8]" />
              </div>

              {/* Bold Title */}
              <h3 className="text-2xl sm:text-[26px] font-bold text-[#111315] font-['Poppins',sans-serif] tracking-tight mb-4 group-hover:text-[#FF5500] transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description Text */}
              <p className="text-[#625D55] font-['Outfit',sans-serif] text-base sm:text-lg leading-relaxed mb-6 max-w-xs mx-auto">
                {service.description}
              </p>

              {/* Learn More Action Link */}
              {isPhone ? (
                <a
                  href={service.href}
                  className="inline-flex items-center gap-2 text-[#FF5500] hover:text-[#E04400] font-bold text-base transition-colors group/link mt-auto"
                >
                  <span>{service.actionText}</span>
                  <ArrowRight className="size-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                </a>
              ) : (
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-[#FF5500] hover:text-[#E04400] font-bold text-base transition-colors group/link mt-auto"
                >
                  <span>{service.actionText}</span>
                  <ArrowRight className="size-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 
        2. MOBILE VIEW (< sm):
        Horizontal, Snap-Swipe Glassmorphism Carousel with Rich Kinetic Micro-Animations
        - Peek card layout so user intuitively sees next card (w-[82vw] max-w-[320px])
        - Floating ambient aura and micro-elevation on active cards
        - Monospace index badges (01, 02, 03, 04)
        - Interactive pagination dots, counter and tactile stepper buttons
      */}
      <div className="block sm:hidden w-full">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth touch-pan-x -mx-4 px-4 pb-4 pt-1"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {SERVICES.map((service, i) => {
            const IconComponent = service.icon;
            const isPhone = service.href.startsWith("tel:");
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={`mobile-${service.id}`}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "w-[82vw] max-w-[320px] shrink-0 snap-center group relative rounded-2xl p-6 transition-all duration-300 flex flex-col items-center text-center overflow-hidden border select-none",
                  isActive
                    ? "bg-white/95 border-[#FF5500]/40 shadow-[0_12px_32px_rgba(255,85,0,0.08)] scale-[1.01]"
                    : "bg-white/80 border-[#E8E2D9] shadow-[0_6px_20px_rgba(31,31,30,0.04)]"
                )}
              >
                {/* Ambient Soft Glow in Top Corner */}
                <div
                  className={cn(
                    "absolute -top-10 -right-10 size-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-500",
                    isActive ? "bg-[#FF5500]/15 opacity-100" : "bg-[#FF5500]/5 opacity-40"
                  )}
                />

                {/* Glowing Icon Stage (Clean, No Unnecessary Pill Badges) */}
                <div className="relative mb-5 mt-1">
                  <div className="size-16 rounded-2xl bg-gradient-to-br from-[#FFF5EE] to-[#FAF8F5] border border-[#FF5500]/25 flex items-center justify-center text-[#FF5500] shadow-sm group-active:scale-110 group-active:rotate-3 transition-transform duration-300">
                    <IconComponent className="size-8 stroke-[1.8]" />
                  </div>
                  {/* Subtle pulsing background glow under icon */}
                  {isActive && (
                    <div className="absolute inset-0 size-16 rounded-2xl bg-[#FF5500]/20 blur-md -z-10 animate-pulse" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#111315] font-['Poppins',sans-serif] tracking-tight mb-2.5 group-active:text-[#FF5500] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#625D55] font-['Outfit',sans-serif] text-sm leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* CTA Action Link */}
                {isPhone ? (
                  <a
                    href={service.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-[#FF5500] hover:bg-[#FF5500] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 mt-auto group/btn active:scale-95 shadow-2xs"
                  >
                    <span>{service.actionText}</span>
                    <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </a>
                ) : (
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-[#FF5500] hover:bg-[#FF5500] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 mt-auto group/btn active:scale-95 shadow-2xs"
                  >
                    <span>{service.actionText}</span>
                    <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Pagination & Tactile Stepper Controls */}
        <div className="flex items-center justify-between pt-3 mt-1 px-1">
          {/* Active Progress Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to service ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i
                    ? "w-7 bg-[#FF5500]"
                    : "w-2 bg-[#E8E2D9] hover:bg-[#625D55]"
                )}
              />
            ))}
          </div>

          {/* Stepper Controls & Monospace Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-xs text-[#625D55]">
              <span className="text-[#FF5500]">0{activeIndex + 1}</span> / 0{SERVICES.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous service slide"
                className="size-8 rounded-full border border-[#E8E2D9] bg-white flex items-center justify-center text-[#1F1F1E] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === SERVICES.length - 1}
                aria-label="Next service slide"
                className="size-8 rounded-full border border-[#E8E2D9] bg-white flex items-center justify-center text-[#1F1F1E] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

