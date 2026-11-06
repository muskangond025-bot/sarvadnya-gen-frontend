"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Droplet, 
  Volume2, 
  Clock, 
  Gauge, 
  MapPin, 
  CheckCircle2, 
  Info,
  MessageSquare,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Generator } from "@/types/generator";

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
  const isAvailable = generator.status === "available";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-green/30 transition-all duration-500 shadow-xl"
    >
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={generator.primary_image_url || "/placeholder-gen.jpg"}
          alt={generator.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[12px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-brand-green" />
            {generator.power_output_kva} kVA
          </div>
          {isAvailable && (
            <div className="px-3 py-1 bg-brand-green/20 backdrop-blur-md border border-brand-green/30 rounded-full text-[12px] font-bold text-brand-green uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3" />
              Available Now
            </div>
          )}
        </div>

        {/* Brand Logo Overlay */}
        {generator.brand_logo && (
          <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
            <img src={generator.brand_logo} alt={generator.brand} className="w-full h-full object-contain" />
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={() => onViewDetails(generator.id)}
            className="p-3 bg-white text-black rounded-full hover:bg-brand-green hover:text-black transition-colors"
            title="View Details"
          >
            <Info className="w-6 h-6" />
          </button>
          <button 
            onClick={() => onCompare(generator.id)}
            className="p-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/20 transition-colors"
            title="Compare"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1 font-['Poppins',sans-serif] group-hover:text-brand-green transition-colors">
            {generator.name}
          </h3>
          <p className="text-white/40 text-sm font-['Outfit',sans-serif] line-clamp-1">
            {generator.brand} • {generator.type} Series
          </p>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
          <div className="flex items-center gap-2.5 text-white/60">
            <Droplet className="w-4 h-4 text-brand-green" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/30 tracking-tight">Fuel Cons.</span>
              <span className="text-xs font-medium">{generator.fuel_consumption_per_hour} L/hr</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-white/60">
            <Volume2 className="w-4 h-4 text-brand-green" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/30 tracking-tight">Noise Level</span>
              <span className="text-xs font-medium">{generator.noise_level_db} dB</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-white/60">
            <Clock className="w-4 h-4 text-brand-green" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/30 tracking-tight">Max Runtime</span>
              <span className="text-xs font-medium">{generator.runtime_hours_full_tank} hrs</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-white/60">
            <Gauge className="w-4 h-4 text-brand-green" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/30 tracking-tight">Phase</span>
              <span className="text-xs font-medium">{generator.phase}</span>
            </div>
          </div>
        </div>

        {/* Suitable For (Mini tags) */}
        <div className="mb-6 flex flex-wrap gap-2">
          {generator.suitable_for?.slice(0, 2).map((item, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
              {item}
            </span>
          ))}
          {(generator.suitable_for?.length ?? 0) > 2 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50">
              +{(generator.suitable_for?.length ?? 0) - 2} more
            </span>
          )}
        </div>

        {/* Pricing Area */}
        <div className="pt-6 border-t border-white/5 mb-6 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-white/30 tracking-wider block mb-1">Rental Starts From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-brand-green font-['Poppins',sans-serif]">₹{generator.daily_rate}</span>
              <span className="text-white/40 text-xs font-['Outfit',sans-serif]">/day</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-white/40 block">Transport Extra</span>
            <ShieldCheck className="w-4 h-4 text-brand-green ml-auto mt-1" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onAddToQuote(generator.id)}
            className="flex-1 py-3 bg-brand-green text-black text-xs font-bold rounded-xl hover:bg-brand-green/90 transition-all flex items-center justify-center gap-2"
          >
            Add to Quote
          </button>
          <button 
            className="px-4 py-3 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
