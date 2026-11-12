"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Zap, Calculator, MessageSquare, ChevronRight } from "lucide-react";

export const GENERATOR_HERO_FILTER_EVENT = "generator-hero-filter";

export interface GeneratorHeroFilterDetail {
  kvaRange: string;
  industry: string;
  duration: string;
  city: string;
  reset?: boolean;
}

export function GeneratorHero() {
  const router = useRouter();
  const [kvaRange, setKvaRange] = useState("");
  const [industry, setIndustry] = useState("");
  const [duration, setDuration] = useState("");
  const [city, setCity] = useState("");

  const scrollToGallery = () => {
    const galleryEl = document.getElementById("gallery");
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push("/generators#gallery");
  };

  const handleBrowseAll = () => {
    setKvaRange("");
    setIndustry("");
    setDuration("");
    setCity("");
    if (typeof window !== "undefined") {
      const detail: GeneratorHeroFilterDetail = {
        kvaRange: "",
        industry: "",
        duration: "",
        city: "",
        reset: true,
      };
      window.dispatchEvent(new CustomEvent(GENERATOR_HERO_FILTER_EVENT, { detail }));
    }
    scrollToGallery();
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const detail: GeneratorHeroFilterDetail = {
        kvaRange,
        industry,
        duration,
        city: city.trim(),
      };
      window.dispatchEvent(new CustomEvent(GENERATOR_HERO_FILTER_EVENT, { detail }));
    }
    scrollToGallery();
  };

  return (
    <section className="relative w-full flex items-center pt-24 sm:pt-28 lg:pt-28 pb-10 lg:pb-14 overflow-x-clip bg-transparent">
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[420px] h-[420px] bg-[#FF5500]/[0.05] blur-[130px] rounded-full translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-[#FFAA00]/[0.04] blur-[110px] rounded-full -translate-x-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Primary Fleet Headline, Description & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold text-[#111315] tracking-tight leading-[1.08] mb-5">
              Industrial Generator{" "}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] to-[#E04400]">
                Rentals Across Maharashtra
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base lg:text-[17px] text-[#625D55] mb-6 sm:mb-7 max-w-xl leading-relaxed">
              Silent DG Sets from{" "}
              <span className="text-[#111315] font-semibold">5kVA to 250kVA</span>{" "}
              for Events, Construction, Hospitals &amp; Emergency Backup. Reliable power when you need it most.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mb-7 w-full">
              <button
                type="button"
                onClick={handleBrowseAll}
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#FF5500] text-white font-bold text-sm rounded-xl hover:bg-[#E04400] transition-all flex items-center justify-center gap-2 group shadow-md shadow-[#FF5500]/20 cursor-pointer w-full sm:w-auto whitespace-nowrap active:scale-[0.98]"
              >
                <span>Browse Generators</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <Link
                href="/contact"
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white text-[#111315] font-bold text-sm rounded-xl border border-[#E8E2D9] hover:bg-[#FAF8F5] hover:border-[#FF5500]/50 transition-all flex items-center justify-center shadow-xs w-full sm:w-auto whitespace-nowrap"
              >
                Get Instant Quote
              </Link>

              <a
                href="tel:+916262629944"
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-red-50 text-red-600 font-bold text-sm rounded-xl border border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
              >
                <Zap className="w-4 h-4 fill-current shrink-0" />
                <span>Emergency Rental</span>
              </a>
            </div>

            {/* Hairline Divider & Quick Utility Links */}
            <div className="w-full max-w-xl pt-5 border-t border-[#E8E2D9] flex flex-wrap items-center gap-x-6 gap-y-3 text-[#625D55]">
              <Link
                href="/services#load-calculator"
                className="flex items-center gap-2 hover:text-[#FF5500] transition-colors text-xs sm:text-sm font-medium"
              >
                <Calculator className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Load Calculator</span>
              </Link>

              <a
                href="https://wa.me/916262629944"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#FF5500] transition-colors text-xs sm:text-sm font-medium"
              >
                <MessageSquare className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>WhatsApp Enquiry</span>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-2 hover:text-[#FF5500] transition-colors text-xs sm:text-sm font-medium"
              >
                <Zap className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Need Help Choosing?</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Precision Match Configurator Panel (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
          >
            <form
              onSubmit={handleFilterSubmit}
              className="relative bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(31,31,30,0.06)] overflow-hidden"
            >
              {/* Crisp Top Accent Hairline */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#FF5500] via-[#FF8800] to-[#FF5500]" />

              <h3 className="font-sans text-lg sm:text-xl font-extrabold text-[#111315] tracking-tight mb-5">
                Find Your Perfect Match
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="hero-kva"
                      className="block font-mono text-[11px] text-[#625D55] uppercase tracking-wider font-bold"
                    >
                      Power Requirement
                    </label>
                    <select
                      id="hero-kva"
                      value={kvaRange}
                      onChange={(e) => setKvaRange(e.target.value)}
                      className="w-full h-11 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 text-sm text-[#111315] font-medium focus:outline-none focus:border-[#FF5500] transition-colors"
                    >
                      <option value="">Select kVA</option>
                      <option value="5-25">5 – 25 kVA</option>
                      <option value="25-65">25 – 65 kVA</option>
                      <option value="65-125">65 – 125 kVA</option>
                      <option value="125-250">125 – 250 kVA</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="hero-industry"
                      className="block font-mono text-[11px] text-[#625D55] uppercase tracking-wider font-bold"
                    >
                      Industry Type
                    </label>
                    <select
                      id="hero-industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full h-11 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 text-sm text-[#111315] font-medium focus:outline-none focus:border-[#FF5500] transition-colors"
                    >
                      <option value="">Select Industry</option>
                      <option value="events">Events &amp; Weddings</option>
                      <option value="construction">Construction</option>
                      <option value="hospitals">Hospitals</option>
                      <option value="factories">Factories</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="hero-duration"
                      className="block font-mono text-[11px] text-[#625D55] uppercase tracking-wider font-bold"
                    >
                      Rental Duration
                    </label>
                    <select
                      id="hero-duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-11 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 text-sm text-[#111315] font-medium focus:outline-none focus:border-[#FF5500] transition-colors"
                    >
                      <option value="">Select Duration</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="longterm">Long Term</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="hero-city"
                      className="block font-mono text-[11px] text-[#625D55] uppercase tracking-wider font-bold"
                    >
                      Location
                    </label>
                    <input
                      id="hero-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter City"
                      className="w-full h-11 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 text-sm text-[#111315] font-medium placeholder:text-[#9A9388] focus:outline-none focus:border-[#FF5500] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 mt-1 bg-[#111315] hover:bg-[#FF5500] text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2.5 shadow-md cursor-pointer active:scale-[0.99]"
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>Find Available Generators</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
