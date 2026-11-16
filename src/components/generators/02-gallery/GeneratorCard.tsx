"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Droplet, 
  Volume2, 
  Clock, 
  Gauge, 
  Info,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { Generator } from "@/types/generator";
import { cn } from "@/lib/utils";

interface GeneratorCardProps {
  generator: Generator;
  onViewDetails: (id: string) => void;
  onAddToQuote: (id: string) => void;
  onCompare: (id: string) => void;
}

export function GeneratorCard({ 
  generator, 
  onViewDetails, 
  onAddToQuote,
  onCompare 
}: GeneratorCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToQuote(generator.id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-white border border-[#E8E2D9] rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#FF5500]/50 hover:shadow-lg transition-all duration-300 shadow-2xs sm:shadow-xs flex flex-col justify-between"
    >
      {/* Image Area with Click to View Specs */}
      <div 
        onClick={() => onViewDetails(generator.id)}
        className="relative h-32 sm:h-64 overflow-hidden bg-[#F5F1EA] cursor-pointer"
      >
        <img
          src={generator.primary_image_url || "/placeholder-gen.jpg"}
          alt={generator.name}
          className="w-full h-full object-contain sm:object-cover p-2 sm:p-0 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating kVA Badge on Mobile & Desktop */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 rounded-md bg-[#111315]/85 text-white font-mono font-bold text-[10px] sm:text-xs backdrop-blur-xs shadow-xs">
          {generator.power_output_kva} kVA
        </div>

        {/* Brand Logo Overlay */}
        {generator.brand_logo && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 size-6 sm:size-11 bg-white rounded-md sm:rounded-lg p-1 sm:p-2 shadow-xs border border-[#E8E2D9]">
            <img src={generator.brand_logo} alt={generator.brand} className="w-full h-full object-contain" />
          </div>
        )}

        {/* Action Overlay (Desktop Hover) */}
        <div className="absolute inset-0 bg-[#111315]/40 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-3">
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onViewDetails(generator.id); }}
            className="p-3 bg-white text-[#111315] rounded-full hover:bg-[#FF5500] hover:text-white transition-colors shadow-lg cursor-pointer"
            title="View Details"
            aria-label="View Details"
          >
            <Info className="w-5 h-5" />
          </button>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onCompare(generator.id); }}
            className="p-3 bg-white/90 text-[#111315] border border-white/20 rounded-full hover:bg-[#FF5500] hover:text-white transition-colors shadow-lg cursor-pointer"
            title="Compare"
            aria-label="Compare"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="mb-2 sm:mb-4">
            <h3 
              onClick={() => onViewDetails(generator.id)}
              className="text-xs sm:text-xl font-bold text-[#111315] mb-0.5 sm:mb-1 font-['Poppins',sans-serif] group-hover:text-[#FF5500] transition-colors line-clamp-1 cursor-pointer"
            >
              {generator.name}
            </h3>
            <p className="text-[#71695F] text-[10px] sm:text-sm font-['Outfit',sans-serif] line-clamp-1">
              {generator.brand} • {generator.type}
            </p>
          </div>

          {/* Core Specs Grid: 2 Clean Rows on Mobile, 4 Rows on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-y-4 sm:gap-x-2 mb-2 sm:mb-6">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <Droplet className="size-3 sm:size-4 text-[#FF5500] shrink-0" />
              <div className="flex items-baseline gap-1 sm:flex-col sm:gap-0">
                <span className="text-[9px] uppercase font-bold text-[#8C8275] tracking-tight hidden sm:inline">Fuel Cons.</span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#111315] truncate">{generator.fuel_consumption_per_hour} L/hr</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <Volume2 className="size-3 sm:size-4 text-[#FF5500] shrink-0" />
              <div className="flex items-baseline gap-1 sm:flex-col sm:gap-0">
                <span className="text-[9px] uppercase font-bold text-[#8C8275] tracking-tight hidden sm:inline">Noise Level</span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#111315] truncate">{generator.noise_level_db} dB</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#FF5500] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-tight">Max Runtime</span>
                <span className="text-xs font-semibold text-[#111315]">{generator.runtime_hours_full_tank} hrs</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2.5">
              <Gauge className="w-4 h-4 text-[#FF5500] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-tight">Phase</span>
                <span className="text-xs font-semibold text-[#111315]">{generator.phase}</span>
              </div>
            </div>
          </div>

          {/* Suitable For (Mini tags on desktop only to avoid mobile crowding) */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-6">
            {generator.suitable_for?.slice(0, 2).map((item, i) => (
              <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#FAF8F5] text-[#625D55] border border-[#E8E2D9] font-medium">
                {item}
              </span>
            ))}
            {(generator.suitable_for?.length ?? 0) > 2 && (
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#8C8275] border border-[#E8E2D9]">
                +{(generator.suitable_for?.length ?? 0) - 2} more
              </span>
            )}
          </div>
        </div>

        <div>
          {/* Pricing Area */}
          <div className="pt-2 sm:pt-5 border-t border-[#E8E2D9] mb-2 sm:mb-5 flex items-baseline justify-between">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#8C8275] tracking-wider block mb-0.5">
                From
              </span>
              <div className="flex items-baseline gap-0.5 sm:gap-1">
                <span className="text-sm sm:text-2xl font-bold text-[#FF5500] font-['Poppins',sans-serif]">
                  ₹{generator.daily_rate}
                </span>
                <span className="text-[#71695F] text-[9px] sm:text-xs font-['Outfit',sans-serif]">
                  /day
                </span>
              </div>
            </div>
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500] shrink-0" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 sm:gap-2">
            <button 
              type="button"
              onClick={handleAdd}
              className={cn(
                "flex-1 py-1.5 sm:py-3 text-[11px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 shadow-2xs cursor-pointer active:scale-[0.98]",
                isAdded
                  ? "bg-[#111315] text-white"
                  : "bg-[#FF5500] hover:bg-[#E04B00] text-white"
              )}
            >
              {isAdded ? (
                <>
                  <Check className="size-3 sm:size-3.5 text-[#FF5500]" />
                  <span className="sm:hidden truncate">Added</span>
                  <span className="hidden sm:inline">Added to Quote</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden truncate">+ Quote</span>
                  <span className="hidden sm:inline">Add to Quote</span>
                </>
              )}
            </button>
            <a
              href="https://wa.me/916262629944"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="size-8 sm:size-auto sm:px-4 sm:py-3 bg-[#FAF8F5] text-[#111315] hover:text-[#FF5500] border border-[#E8E2D9] rounded-lg sm:rounded-xl hover:bg-[#EFECE6] transition-all flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111315] hover:text-[#FF5500] transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

