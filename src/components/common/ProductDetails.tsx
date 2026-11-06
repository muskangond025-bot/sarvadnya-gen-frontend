"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  Mail,
  MessageSquare,
  Zap,
  Settings,
  Building2,
  Factory,
  Power,
  Cpu,
  CircleDot,
  Fuel,
  Volume2,
} from "lucide-react";
import Image from "next/image";

// ============================================
// ICON MAPPING
// ============================================

export const ICON_MAP = {
  Zap,
  Settings,
  Building2,
  Factory,
  Power,
  Cpu,
  CircleDot,
  Fuel,
  Volume2,
  X,
  Phone,
  Mail,
  MessageSquare,
};

export type IconName = keyof typeof ICON_MAP;

// ============================================
// TYPES
// ============================================

export interface TechSpec {
  label: string;
  value: string;
  icon: IconName;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface ProductDetailsData {
  id: string;
  badge: string;
  series: string;
  title: string;
  description: string;
  image: string;
  specs: TechSpec[];
  features: KeyFeature[];
}

interface ProductDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProductDetailsData;
  layoutIdPrefix?: string;
}

// ============================================
// SPRING TRANSITION
// ============================================

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 40,
  mass: 0.8,
};

// Faster exit transition to prevent ghosting
const exitTransition = {
  type: "tween" as const,
  duration: 0.15,
  ease: "easeOut" as const,
};

// ============================================
// PRODUCT DETAILS COMPONENT
// ============================================

export function ProductDetails({
  isOpen,
  onClose,
  data,
  layoutIdPrefix = "product",
}: ProductDetailsProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="product-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black z-50"
            onClick={onClose}
          />

          {/* Fullscreen Card */}
          <motion.div
            key="product-fullscreen"
            layoutId={`${layoutIdPrefix}-card`}
            className="fixed inset-0 z-50 bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={exitTransition}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Two-column layout: Image left, Details right */}
            <div className="h-full flex flex-col md:flex-row">
              {/* Left side - Large Image (NO layoutId - just fade) */}
              <motion.div
                className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center p-8 md:p-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={data.image}
                  alt={data.title}
                  height={800}
                  width={800}
                  style={{
                    objectFit: "contain",
                    maxWidth: "90%",
                    maxHeight: "90%",
                  }}
                />
              </motion.div>

              {/* Right side - Details */}
              <div
                className="w-full md:w-1/2 h-[60vh] md:h-full flex flex-col p-6 md:p-12 overflow-y-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Header info */}
                <div className="mb-6 md:mb-8">
                  <motion.div
                    layoutId={`${layoutIdPrefix}-badge`}
                    className="inline-block px-4 py-2 bg-[#12C070] mb-4"
                    style={{ borderRadius: 8 }}
                  >
                    <span className="text-black font-['Outfit',sans-serif] font-bold text-lg">
                      {data.badge}
                    </span>
                  </motion.div>

                  <motion.span
                    layoutId={`${layoutIdPrefix}-series`}
                    className="text-[#00ff8f] font-['Outfit',sans-serif] text-sm md:text-base block mb-2"
                  >
                    {data.series}
                  </motion.span>

                  <motion.h2
                    layoutId={`${layoutIdPrefix}-title`}
                    className="text-white font-['Poppins',sans-serif] font-extrabold text-3xl md:text-5xl lg:text-6xl mb-4"
                  >
                    {data.title}
                  </motion.h2>

                  <motion.p
                    layoutId={`${layoutIdPrefix}-desc`}
                    className="text-white/60 font-['Outfit',sans-serif] text-base md:text-lg"
                  >
                    {data.description}
                  </motion.p>
                </div>

                {/* Technical Specifications */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="mb-6 md:mb-8"
                >
                  <h4 className="text-white font-['Poppins',sans-serif] font-bold text-lg md:text-xl mb-4">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {data.specs.map((spec, idx) => {
                      const SpecIcon = ICON_MAP[spec.icon] || CircleDot;
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5"
                        >
                          <SpecIcon className="w-5 h-5 md:w-6 md:h-6 text-[#00ff8f]" />
                          <span className="text-white/50 font-['Outfit',sans-serif] text-xs">
                            {spec.label}
                          </span>
                          <span className="text-white font-['Outfit',sans-serif] font-bold text-sm text-center">
                            {spec.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mb-6 md:mb-8"
                >
                  <h4 className="text-white font-['Poppins',sans-serif] font-bold text-lg md:text-xl mb-4">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {data.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 rounded-full bg-[#00ff8f] shrink-0" />
                        <div>
                          <span className="text-white font-['Outfit',sans-serif] font-semibold">
                            {feature.title}
                          </span>
                          <p className="text-white/50 font-['Outfit',sans-serif] text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="pt-6 border-t border-white/10 mt-auto"
                >
                  <h4 className="text-white font-['Poppins',sans-serif] font-bold text-lg mb-2">
                    Need More Information?
                  </h4>
                  <p className="text-white/50 font-['Outfit',sans-serif] text-sm mb-4">
                    Our experts are ready to help you choose the right product
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#00ff8f] text-black font-['Outfit',sans-serif] font-semibold text-sm hover:bg-[#00dd7a] transition-colors">
                      <Phone className="w-4 h-4" />
                      Call Us
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent text-[#00ff8f] font-['Outfit',sans-serif] font-medium text-sm border border-[#00ff8f] hover:bg-[#00ff8f]/10 transition-colors">
                      <Mail className="w-4 h-4" />
                      Email Us
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent text-[#00ff8f] font-['Outfit',sans-serif] font-medium text-sm border border-[#00ff8f] hover:bg-[#00ff8f]/10 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Live Chat
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProductDetails;
