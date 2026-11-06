"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Zap, Calculator, MessageSquare, ChevronRight } from "lucide-react";

export function GeneratorHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-12 overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-semibold tracking-wider uppercase mb-6"
            >
              24/7 Premium Rental Support
            </motion.span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 font-['Poppins',sans-serif]">
              Industrial Generator <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">
                Rentals Across Maharashtra
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-10 max-w-xl font-['Outfit',sans-serif] leading-relaxed">
              Silent DG Sets from <span className="text-white font-semibold">5kVA to 250kVA</span> for Events, Construction, Hospitals & Emergency Backup. Reliable power when you need it most.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-brand-green text-black font-bold rounded-xl hover:bg-brand-green/90 transition-all transform hover:scale-105 flex items-center gap-2 group"
              >
                Browse Generators
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/contact" className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
                Get Instant Quote
              </Link>
              <a href="tel:+919876543210" className="px-8 py-4 bg-red-500/10 text-red-500 font-bold rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-2">
                <Zap className="w-5 h-5 fill-current" />
                Emergency Rental
              </a>
            </div>

            {/* Quick Features / Shortcuts */}
            <div className="flex flex-wrap gap-6 text-white/50">
              <Link href="/services#load-calculator" className="flex items-center gap-2 hover:text-brand-green transition-colors">
                <Calculator className="w-5 h-5" />
                <span className="text-sm font-['Outfit',sans-serif]">Load Calculator</span>
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-green transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-['Outfit',sans-serif]">WhatsApp Enquiry</span>
              </a>
              <Link href="/contact" className="flex items-center gap-2 hover:text-brand-green transition-colors">
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
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Find Your Perfect Match</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Power Requirement</label>
                  <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green/50">
                    <option value="">Select kVA</option>
                    <option value="5-25">5 – 25 kVA</option>
                    <option value="25-65">25 – 65 kVA</option>
                    <option value="65-125">65 – 125 kVA</option>
                    <option value="125-250">125 – 250 kVA</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Industry Type</label>
                  <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green/50">
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
                  <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Rental Duration</label>
                  <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green/50">
                    <option value="">Select Duration</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="longterm">Long Term</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Location</label>
                  <input 
                    type="text" 
                    placeholder="Enter City"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-green/50"
                  />
                </div>
              </div>

              <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-3">
                <Search className="w-5 h-5" />
                Find Available Generators
              </button>

              <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-white/40 text-sm">
                <Zap className="w-4 h-4 text-brand-green" />
                <span>AI Assistant: "I recommend 125kVA for industrial sites"</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
