"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * FAQAccordionClient Component
 * 
 * Premium accordion for common questions with smooth layout transitions.
 */
export function FAQAccordionClient({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-[24px] transition-all duration-500 overflow-hidden ${
              isOpen ? "bg-[#0a0a0a] border-[#00ff8f]/20" : "bg-transparent border-white/5 hover:border-white/10"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-8 py-7 flex items-center justify-between text-left transition-colors"
            >
              <span className={`text-xl font-bold font-['Poppins',sans-serif] ${isOpen ? "text-[#00ff8f]" : "text-white"}`}>
                {item.question}
              </span>
              <div className={`shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                {isOpen ? <Minus size={24} className="text-[#00ff8f]" /> : <Plus size={24} className="text-white/40" />}
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="px-8 pb-8">
                    <div className="h-[1px] w-full bg-white/5 mb-6" />
                    <p className="text-[#bfbfbf] font-['Outfit',sans-serif] text-lg leading-relaxed font-light">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
