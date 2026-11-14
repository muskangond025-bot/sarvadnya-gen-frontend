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

  const handleAdd = () => {
    onAddToQuote(generator.id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white border border-[#E8E2D9] rounded-2xl overflow-hidden hover:border-[#FF5500]/50 hover:shadow-xl transition-all duration-500 shadow-xs flex flex-col justify-between"
    >
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden bg-[#F5F1EA]">
        <img
          src={generator.primary_image_url || "/placeholder-gen.jpg"}
          alt={generator.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Brand Logo Overlay */}
        {generator.brand_logo && (
          <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-lg p-2 shadow-md border border-[#E8E2D9]">
            <img src={generator.brand_logo} alt={generator.brand} className="w-full h-full object-contain" />
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-[#111315]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            type="button"
            onClick={() => onViewDetails(generator.id)}
            className="p-3 bg-white text-[#111315] rounded-full hover:bg-[#FF5500] hover:text-white transition-colors shadow-lg cursor-pointer"
            title="View Details"
            aria-label="View Details"
          >
            <Info className="w-6 h-6" />
          </button>
          <button 
            type="button"
            onClick={() => onCompare(generator.id)}
            className="p-3 bg-white/90 text-[#111315] border border-white/20 rounded-full hover:bg-[#FF5500] hover:text-white transition-colors shadow-lg cursor-pointer"
            title="Compare"
            aria-label="Compare"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#111315] mb-1 font-['Poppins',sans-serif] group-hover:text-[#FF5500] transition-colors">
              {generator.name}
            </h3>
            <p className="text-[#71695F] text-sm font-['Outfit',sans-serif] line-clamp-1">
              {generator.brand} • {generator.type} Series
            </p>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
            <div className="flex items-center gap-2.5">
              <Droplet className="w-4 h-4 text-[#FF5500] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-tight">Fuel Cons.</span>
                <span className="text-xs font-semibold text-[#111315]">{generator.fuel_consumption_per_hour} L/hr</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-[#FF5500] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-tight">Noise Level</span>
                <span className="text-xs font-semibold text-[#111315]">{generator.noise_level_db} dB</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#FF5500] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-tight">Max Runtime</span>
                <span className="text-xs font-semibold text-[#111315]">{generator.runtime_hours_full_tank} hrs</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Gauge className="w-4 h-4 text-[#FF5500] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-tight">Phase</span>
                <span className="text-xs font-semibold text-[#111315]">{generator.phase}</span>
              </div>
            </div>
          </div>

          {/* Suitable For (Mini tags) */}
          <div className="mb-6 flex flex-wrap gap-2">
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
          <div className="pt-5 border-t border-[#E8E2D9] mb-5 flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C8275] tracking-wider block mb-1">Rental Starts From</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#FF5500] font-['Poppins',sans-serif]">₹{generator.daily_rate}</span>
                <span className="text-[#71695F] text-xs font-['Outfit',sans-serif]">/day</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#8C8275] block">Transport Extra</span>
              <ShieldCheck className="w-4 h-4 text-[#FF5500] ml-auto mt-1" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={handleAdd}
              className={cn(
                "flex-1 py-3 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-[0.98]",
                isAdded
                  ? "bg-[#111315] text-white"
                  : "bg-[#FF5500] hover:bg-[#E04B00] text-white"
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Added to Quote</span>
                </>
              ) : (
                <span>Add to Quote</span>
              )}
            </button>
            <a 
              href="https://wa.me/916262629944" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-3 bg-[#FAF8F5] text-[#111315] border border-[#E8E2D9] rounded-xl hover:bg-[#EFECE6] transition-all flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
