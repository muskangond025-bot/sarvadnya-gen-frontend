"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  SectionHeading,
  ProductDetails,
  ProductDetailsData,
  ICON_MAP,
  type IconName,
} from "@/components/common";
import { motion, LayoutGroup } from "framer-motion";
import { useFullscreen } from "@/lib/FullscreenContext";
import { ChevronLeft, ChevronRight, CircleDot } from "lucide-react";
import Image from "next/image";

const AUTO_SCROLL_INTERVAL = 5000;
const LAYOUT_ID_PREFIX = "generator";

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 1,
};

export interface GeneratorItem extends ProductDetailsData {
  icon: IconName;
}

interface GeneratorRangeClientProps {
  generators: GeneratorItem[];
}

export function GeneratorRangeClient({
  generators,
}: GeneratorRangeClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const { setIsFullscreen } = useFullscreen();

  const currentGen = generators[currentIndex];
  const Icon = ICON_MAP[currentGen.icon] || CircleDot;

  const handlePrev = useCallback(() => {
    if (isExpanded) return;
    setCurrentIndex((prev) => (prev === 0 ? generators.length - 1 : prev - 1));
  }, [isExpanded, generators.length]);

  const handleNext = useCallback(() => {
    if (isExpanded) return;
    setCurrentIndex((prev) => (prev === generators.length - 1 ? 0 : prev + 1));
  }, [isExpanded, generators.length]);

  useEffect(() => {
    if (isPaused || isExpanded) return;
    const interval = setInterval(() => handleNext(), AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, isExpanded, handleNext]);

  useEffect(() => {
    setIsFullscreen(isExpanded);
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded, setIsFullscreen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isExpanded) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isExpanded) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isExpanded) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
  };

  const handleExpand = () => setIsExpanded(true);
  const handleClose = () => setIsExpanded(false);

  return (
    <LayoutGroup>
      <div className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9] flex flex-col items-center gap-10 relative">
        <SectionHeading
          title="Generator Rentals from 5 kVA to 250 kVA"
          description="Sized for your venue starting currents and continuous operation. Explore verified capacities suited to wedding banquets, live events, and heavy industrial shifts."
          align="center"
        />

        {/* Carousel Container */}
        <div
          className="w-full max-w-5xl flex items-center gap-4 md:gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => !isExpanded && setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={isExpanded}
            aria-label="Previous Generator"
            className={`hidden md:flex size-12 items-center justify-center bg-white border border-[#E8E2D9] rounded-lg hover:border-[#1F1F1E] hover:bg-[#FAF8F5] transition-colors shrink-0 shadow-xs ${
              isExpanded ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-[#1F1F1E]" />
          </button>

          {/* Main Generator Card */}
          <div
            className="flex-1 min-h-[380px] md:min-h-[420px] cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              layoutId={`${LAYOUT_ID_PREFIX}-card`}
              onClick={handleExpand}
              className="h-full bg-white border border-[#E8E2D9] rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row items-center overflow-hidden p-6 sm:p-8 gap-8"
              transition={springTransition}
            >
              {/* Image Area */}
              <div className="relative w-full md:w-1/2 aspect-4/3 flex items-center justify-center bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] p-4">
                {/* Clean Capacity Tag (Restrained, Not a Pill) */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#FF5500] text-[#1F1F1E] rounded-md text-xs font-bold font-sans">
                  {currentGen.badge}
                </div>

                <div className="w-full h-full relative flex items-center justify-center">
                  <Image
                    src={currentGen.image}
                    alt={currentGen.title}
                    height={400}
                    width={400}
                    className="object-contain max-h-[220px] w-auto drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col justify-between h-full gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5500]">
                    <Icon className="w-4 h-4" />
                    <span>{currentGen.series}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1F1F1E] font-sans">
                    {currentGen.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#625D55] leading-relaxed">
                    {currentGen.description}
                  </p>
                </div>

                {/* Specs Snippet */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#E8E2D9] text-xs text-[#625D55]">
                  <div>
                    <span className="font-medium text-[#1F1F1E]">Rating:</span> {currentGen.specs?.[0]?.value || "Silent Diesel"}
                  </div>
                  <div>
                    <span className="font-medium text-[#1F1F1E]">Output:</span> {currentGen.specs?.[1]?.value || "415V 3-Phase"}
                  </div>
                </div>

                {/* Trigger Button */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF5500] hover:text-[#E04B00] transition-colors">
                    View Specifications & Enquiry Options
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={isExpanded}
            aria-label="Next Generator"
            className={`hidden md:flex size-12 items-center justify-center bg-white border border-[#E8E2D9] rounded-lg hover:border-[#1F1F1E] hover:bg-[#FAF8F5] transition-colors shrink-0 shadow-xs ${
              isExpanded ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <ChevronRight className="w-5 h-5 text-[#1F1F1E]" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div
          className={`flex items-center gap-2 transition-opacity ${
            isExpanded ? "opacity-0" : ""
          }`}
        >
          {generators.map((gen, idx) => (
            <button
              key={gen.id}
              onClick={() => !isExpanded && setCurrentIndex(idx)}
              aria-label={`Jump to ${gen.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-[#FF5500]"
                  : "w-2 bg-[#E8E2D9] hover:bg-[#625D55]"
              }`}
            />
          ))}
        </div>

        {/* Details Modal */}
        <ProductDetails
          isOpen={isExpanded}
          onClose={handleClose}
          data={currentGen}
          layoutIdPrefix={LAYOUT_ID_PREFIX}
        />
      </div>
    </LayoutGroup>
  );
}
