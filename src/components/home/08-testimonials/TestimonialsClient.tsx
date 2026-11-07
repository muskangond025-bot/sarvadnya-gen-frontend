"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { QuestionMark3D } from "./QuestionMark3D";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export type TestimonialData = FAQItem;

interface TestimonialsClientProps {
  faqs: FAQItem[];
}

/**
 * TestimonialsClient (FAQ Section)
 * 
 * Re-architected as an Open Architectural Layout (ZERO CARDS):
 * - Left Side: Hyper-realistic 3D Extruded Question Mark Model in Clean Luxury White (Static 3D pose, no rotation loop).
 * - Right Side: Clean Typography floating freely in open space with minimal hairline dividers.
 * - Preserves all questions, answers, categories, and multi-language translations (EN, HI, MR).
 */
export function TestimonialsClient({ faqs }: TestimonialsClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9] overflow-hidden">
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-[#FF5500]/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* 
            LEFT COLUMN: 3D MAN FULL-BODY STANDING BEHIND 3D WHITE QUESTION MARK
            - Full-body standing with entire legs and shoes grounded on floor
            - Positioned on the right/behind side of the giant 3D white porcelain question mark
            - Confident pose with arms folded across chest
            - Pure transparent background with soft ambient floor glow
          */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative select-none"
          >
            {/* Ambient Warm Floor Glow */}
            <div className="absolute inset-0 max-w-[460px] h-[460px] bg-[#FF5500]/[0.05] blur-3xl rounded-full pointer-events-none" />

            {/* 3D Man Full-Body Standing Behind White Question Mark */}
            <div className="relative w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[480px] flex items-center justify-center">
              <img
                src="/images/faq/tech_consultant_question_mark.png"
                alt="Professional Indian Technical Consultant Full-Body with 3D White Question Mark"
                width={783}
                height={782}
                className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_24px_48px_rgba(31,31,30,0.09)]"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* 
            RIGHT COLUMN: FAQ TEXT IN FREE SPACE (NO CARDS)
          */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Header: Title & Description in Free Space */}
            <div className="mb-8 sm:mb-10 text-left">
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#1F1F1E] tracking-tight leading-[1.18]">
                {t("faq.title")}
              </h2>
              <p className="text-sm sm:text-base text-[#625D55] mt-2.5 leading-relaxed max-w-xl">
                {t("faq.desc")}
              </p>
            </div>

            {/* Free Space FAQ Accordion List (Zero Card Containers) */}
            <div className="border-t border-[#E8E2D9]">
              {faqs.map((faq, index) => {
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
                      className="w-full py-5 sm:py-6 flex items-start justify-between text-left gap-4 cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4 sm:gap-5 flex-1 pr-2">
                        {/* Monospace Architectural Index */}
                        <span
                          className={cn(
                            "text-xs font-mono font-bold transition-colors mt-1 shrink-0",
                            isOpen
                              ? "text-[#FF5500]"
                              : "text-[#9E988E] group-hover:text-[#1F1F1E]"
                          )}
                        >
                          {indexStr}
                        </span>

                        {/* Question Title */}
                        <span
                          className={cn(
                            "font-sans font-bold text-base sm:text-lg transition-colors leading-snug",
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
                          "size-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5",
                          isOpen
                            ? "bg-[#FF5500] text-white shadow-xs"
                            : "bg-[#F3EFE8] text-[#625D55] group-hover:bg-[#1F1F1E] group-hover:text-white"
                        )}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {/* Collapsible Answer floating freely in space */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-8 sm:pl-10 pr-2">
                            <p className="text-sm sm:text-base text-[#625D55] leading-relaxed font-normal">
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}
