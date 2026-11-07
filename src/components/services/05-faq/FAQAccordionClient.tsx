"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * FAQAccordionClient Component
 * 
 * Re-architected to match Homepage FAQ:
 * - Left column: Full-body Indian technical consultant standing behind 3D porcelain question mark glyph (static, zero rotation)
 * - Right column: Free-space FAQ accordion (zero cards) with hairline dividers and smooth expand animation
 */
export function FAQAccordionClient({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* 
        LEFT COLUMN: 3D WHITE QUESTION MARK WITH TECHNICAL CONSULTANT
        Exact same asset and presentation as Homepage
      */}
      <div className="lg:col-span-5 flex items-center justify-center">
        <div className="relative w-full max-w-[440px] lg:max-w-[480px] flex items-center justify-center">
          <img
            src="/images/faq/tech_consultant_question_mark.png"
            alt="Professional Technical Consultant with 3D Question Mark"
            width={783}
            height={782}
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_24px_48px_rgba(31,31,30,0.09)]"
            draggable={false}
          />
        </div>
      </div>

      {/* 
        RIGHT COLUMN: FAQ TEXT IN FREE SPACE (NO CARDS)
      */}
      <div className="lg:col-span-7 flex flex-col text-left">
        
        {/* Section Heading & Subtitle */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#1F1F1E] tracking-tight leading-[1.18]">
            Frequently Asked <span className="text-[#FF5500]">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-[#625D55] mt-2.5 leading-relaxed max-w-xl font-['Outfit',sans-serif]">
            Everything you need to know about our silent generator fleet, mobilization timelines, and turnkey power services.
          </p>
        </div>

        {/* Free Space FAQ Accordion List (Zero Card Containers) */}
        <div className="border-t border-[#E8E2D9]">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <div
                key={faq.question}
                className="border-b border-[#E8E2D9] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left group gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Minimalist Index Number */}
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#FF5500] shrink-0">
                      {indexStr}
                    </span>

                    {/* Question Heading */}
                    <span
                      className={cn(
                        "font-sans font-bold text-base sm:text-lg tracking-tight transition-colors duration-200",
                        isOpen
                          ? "text-[#FF5500]"
                          : "text-[#1F1F1E] group-hover:text-[#FF5500]"
                      )}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Clean Minimalist Toggle Icon */}
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                      isOpen
                        ? "bg-[#FF5500] text-white rotate-45"
                        : "bg-transparent text-[#625D55] group-hover:text-[#FF5500] group-hover:bg-[#FF5500]/10"
                    )}
                  >
                    <Plus className="size-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Animated Accordion Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-8 sm:pl-10 pr-2">
                        <p className="text-sm sm:text-base text-[#625D55] leading-relaxed font-normal font-['Outfit',sans-serif]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
