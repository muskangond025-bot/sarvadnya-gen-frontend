"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export type TestimonialData = FAQItem;

interface TestimonialsClientProps {
  faqs: FAQItem[];
}

export function TestimonialsClient({ faqs }: TestimonialsClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Simple & Quick to Understand Heading */}
        <div className="text-left max-w-2xl">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#1F1F1E] tracking-tight leading-[1.18]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#625D55] mt-2 leading-relaxed">
            Essential guidance regarding generator capacity, soundproofing compliance, and on-site support.
          </p>
        </div>

        {/* Dense, Premium Rounded-Corner Accordion Cards */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={cn(
                  "rounded-2xl sm:rounded-[20px] transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "bg-[#FFFDF9] border-2 border-[#FF5500]/50 shadow-[0_12px_32px_rgba(255,85,0,0.06)]"
                    : "bg-white border border-[#E8E2D9] hover:border-[#1F1F1E] shadow-xs"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-5 sm:px-7 flex items-start sm:items-center justify-between text-left gap-4 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 flex-1">
                    {/* Architectural Monospace Index Pill */}
                    <span
                      className={cn(
                        "text-xs font-mono font-bold px-2.5 py-1 rounded-md shrink-0 transition-colors mt-0.5 sm:mt-0",
                        isOpen
                          ? "bg-[#FF5500] text-white"
                          : "bg-[#F5F2EB] text-[#625D55] group-hover:text-[#1F1F1E]"
                      )}
                    >
                      {indexStr}
                    </span>

                    <div className="flex flex-col gap-0.5">
                      <span
                        className={cn(
                          "font-sans font-bold text-base sm:text-lg transition-colors leading-snug",
                          isOpen
                            ? "text-[#1F1F1E]"
                            : "text-[#1F1F1E] group-hover:text-[#FF5500]"
                        )}
                      >
                        {faq.question}
                      </span>
                    </div>
                  </div>

                  {/* Circular Rotating Toggle Button */}
                  <div
                    className={cn(
                      "size-8 sm:size-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 sm:mt-0",
                      isOpen
                        ? "bg-[#FF5500] text-white shadow-sm"
                        : "bg-[#F5F2EB] text-[#625D55] group-hover:bg-[#1F1F1E] group-hover:text-white"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-6 pt-1 ml-0 sm:ml-12 border-t border-[#E8E2D9]/50">
                        <p className="text-sm sm:text-base text-[#625D55] leading-relaxed pt-3">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
