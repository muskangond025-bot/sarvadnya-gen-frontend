"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Zap, Calculator, MessageSquare, ChevronRight } from "lucide-react";

export function GeneratorHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-28 lg:pt-32 pb-12 overflow-hidden bg-transparent">
      {/* Subtle Warm Amber Core Glow in background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FF5500]/[0.05] blur-[140px] rounded-full translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFAA00]/[0.04] blur-[120px] rounded-full -translate-x-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#111315] leading-tight mb-6 font-['Poppins',sans-serif]">
              Industrial Generator <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] to-[#E04400]">
                Rentals Across Maharashtra
              </span>
            </h1>
            
            <p className="text-xl text-[#625D55] mb-10 max-w-xl font-['Outfit',sans-serif] leading-relaxed">
              Silent DG Sets from <span className="text-[#111315] font-semibold">5kVA to 250kVA</span> for Events, Construction, Hospitals & Emergency Backup. Reliable power when you need it most.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#FF5500] text-white font-bold rounded-xl hover:bg-[#E04400] transition-all transform hover:scale-105 flex items-center gap-2 group shadow-lg shadow-[#FF5500]/20"
              >
                Browse Generators
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-[#111315] font-bold rounded-xl border border-[#E8E2D9] hover:bg-[#FAF8F5] hover:border-[#FF5500]/40 transition-all flex items-center gap-2 shadow-xs"
              >
                Get Instant Quote
              </Link>
              <a 
                href="tel:+916262629944" 
                className="px-8 py-4 bg-red-50 text-red-600 font-bold rounded-xl border border-red-200 hover:bg-red-100 transition-all flex items-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current" />
                Emergency Rental
              </a>
            </div>

            {/* Quick Features / Shortcuts */}
            <div className="flex flex-wrap gap-6 text-[#71695F]">
              <Link href="/services#load-calculator" className="flex items-center gap-2 hover:text-[#FF5500] transition-colors">
                <Calculator className="w-5 h-5" />
                <span className="text-sm font-['Outfit',sans-serif]">Load Calculator</span>
              </Link>
              <a 
                href="https://wa.me/916262629944" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-[#FF5500] transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-['Outfit',sans-serif]">WhatsApp Enquiry</span>
              </a>
              <Link href="/contact" className="flex items-center gap-2 hover:text-[#FF5500] transition-colors">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-['Outfit',sans-serif]">Need Help Choosing?</span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Filter Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white border border-[#E8E2D9] rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-[#111315] mb-6 font-['Poppins',sans-serif]">Find Your Perfect Match</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-[#71695F] uppercase tracking-widest font-bold">Power Requirement</label>
                  <select className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-[#111315] focus:outline-none focus:border-[#FF5500]">
                    <option value="">Select kVA</option>
                    <option value="5-25">5 – 25 kVA</option>
                    <option value="25-65">25 – 65 kVA</option>
                    <option value="65-125">65 – 125 kVA</option>
                    <option value="125-250">125 – 250 kVA</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-[#71695F] uppercase tracking-widest font-bold">Industry Type</label>
                  <select className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-[#111315] focus:outline-none focus:border-[#FF5500]">
                    <option value="">Select Industry</option>
                    <option value="events">Events & Weddings</option>
                    <option value="construction">Construction</option>
                    <option value="hospitals">Hospitals</option>
                    <option value="factories">Factories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-[#71695F] uppercase tracking-widest font-bold">Rental Duration</label>
                  <select className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-[#111315] focus:outline-none focus:border-[#FF5500]">
                    <option value="">Select Duration</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="longterm">Long Term</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-[#71695F] uppercase tracking-widest font-bold">Location</label>
                  <input 
                    type="text" 
                    placeholder="Enter City"
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-[#111315] placeholder:text-[#9A9388] focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>

              <button className="w-full py-4 bg-[#111315] hover:bg-[#FF5500] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-3 shadow-md">
                <Search className="w-5 h-5" />
                Find Available Generators
              </button>

              <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-center gap-2 text-[#71695F] text-sm">
                <Zap className="w-4 h-4 text-[#FF5500]" />
                <span>AI Assistant: &quot;I recommend 125kVA for industrial sites&quot;</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
