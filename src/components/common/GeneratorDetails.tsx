"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, Clock, CheckCircle2 } from "lucide-react";
import { GENERATOR_IMAGES } from "@/constants";
import { useFullscreen } from "@/lib/FullscreenContext";
import { FullscreenGeneratorModal } from "@/components/common/FullscreenGeneratorModal";

// ============================================
// TYPES
// ============================================

interface GeneratorSpec {
  label: string;
  value: string;
}

interface GeneratorData {
  id: string;
  badge: string;
  badgeColor?: string;
  series: string;
  title: string;
  kva: string;
  rating: number;
  reviews: number;
  pricing: {
    daily: string;
    monthly: string;
    yearly: string;
  };
  specs: GeneratorSpec[];
  features: string[];
  idealFor: string[];
  image: string;
}

// ============================================
// DATA
// ============================================

const GENERATORS_DATA: GeneratorData[] = [
  {
    id: "entry",
    badge: "Best Seller",
    series: "Entry Series",
    title: "PowerGen DG-5000",
    kva: "5 kVA",
    rating: 4.5,
    reviews: 156,
    pricing: { daily: "₹800", monthly: "₹18,000", yearly: "₹1,80,000" },
    specs: [
      { label: "POWER", value: "5 kVA / 4 kW" },
      { label: "ENGINE", value: "1-Cylinder Diesel" },
      { label: "FUEL TYPE", value: "Diesel" },
      { label: "FUEL CAPACITY", value: "15 Liters" },
      { label: "RUNTIME", value: "8-10 hours @ 50% load" },
      { label: "NOISE LEVEL", value: "65 dB @ 7m" },
      { label: "WEIGHT", value: "135 kg" },
      { label: "DIMENSIONS", value: "800 × 550 × 650 mm" },
    ],
    features: [
      "Compact & Portable Design",
      "Low Fuel Consumption",
      "Overload Protection",
      "Digital Control Panel",
      "Auto Voltage Regulator",
      "Low Oil Shutdown",
    ],
    idealFor: ["Small Homes", "Retail Shops", "Clinics", "Small Offices"],
    image: GENERATOR_IMAGES.entry_5kva,
  },
  {
    id: "mid-range",
    badge: "Most Popular",
    series: "Mid-Range Series",
    title: "PowerGen DG-30000",
    kva: "30 kVA",
    rating: 4.8,
    reviews: 243,
    pricing: { daily: "₹2,500", monthly: "₹60,000", yearly: "₹6,00,000" },
    specs: [
      { label: "POWER", value: "30 kVA / 24 kW" },
      { label: "ENGINE", value: "4-Cylinder Diesel" },
      { label: "FUEL TYPE", value: "Diesel / Natural Gas" },
      { label: "FUEL CAPACITY", value: "80 Liters" },
      { label: "RUNTIME", value: "12-15 hours @ 50% load" },
      { label: "NOISE LEVEL", value: "70 dB @ 7m" },
      { label: "WEIGHT", value: "520 kg" },
      { label: "DIMENSIONS", value: "1600 × 800 × 1200 mm" },
    ],
    features: [
      "Automatic Transfer Switch",
      "Remote Monitoring System",
      "Advanced Load Management",
      "Weatherproof Canopy",
      "Multi-Voltage Output",
      "Smart Fuel Optimization",
      "Self-Diagnostic System",
      "Mobile App Control",
    ],
    idealFor: [
      "Large Homes",
      "Restaurants",
      "Retail Stores",
      "Medical Clinics",
      "IT Offices",
    ],
    image: GENERATOR_IMAGES.midRange_30kva,
  },
  {
    id: "industrial",
    badge: "Premium Choice",
    series: "Industrial Series",
    title: "PowerGen DG-125000",
    kva: "125 kVA",
    rating: 4.9,
    reviews: 187,
    pricing: { daily: "₹8,500", monthly: "₹2,10,000", yearly: "₹21,00,000" },
    specs: [
      { label: "POWER", value: "125 kVA / 100 kW" },
      { label: "ENGINE", value: "6-Cylinder Turbocharged Diesel" },
      { label: "FUEL TYPE", value: "Diesel / Bi-Fuel (Diesel+Gas)" },
      { label: "FUEL CAPACITY", value: "300 Liters" },
      { label: "RUNTIME", value: "24+ hours @ 75% load" },
      { label: "NOISE LEVEL", value: "75 dB @ 7m" },
      { label: "WEIGHT", value: "1850 kg" },
      { label: "DIMENSIONS", value: "3000 × 1200 × 1800 mm" },
    ],
    features: [
      "Industrial Grade Construction",
      "Real-Time Cloud Monitoring",
      "Predictive Maintenance AI",
      "Soundproof Acoustic Enclosure",
      "Parallel Operation Ready",
      "Advanced Protection Systems",
      "Load Bank Testing Certified",
      "Emergency Power Takeover <10s",
      "Fuel Level Monitoring",
      "Remote Start/Stop Control",
    ],
    idealFor: [
      "Manufacturing Units",
      "Hospitals",
      "Hotels",
      "Data Centers",
      "Large Offices",
    ],
    image: GENERATOR_IMAGES.industrial_125kva,
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function GeneratorDetails() {
  const [activeTab, setActiveTab] = useState<string>("entry");
  const [isExpanded, setIsExpanded] = useState(false);
  const { setIsFullscreen } = useFullscreen();

  const activeGenerator =
    GENERATORS_DATA.find((g) => g.id === activeTab) || GENERATORS_DATA[0];

  // Sync fullscreen state with context + disable scroll
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

  return (
    <div className="w-full">
      {/* Series Tabs */}
      <div className="flex justify-center gap-8 mb-12 relative">
        {GENERATORS_DATA.map((gen) => (
          <button
            key={gen.id}
            onClick={() => setActiveTab(gen.id)}
            className="relative px-4 py-3 font-['Outfit',sans-serif] font-medium text-sm transition-colors"
          >
            <span
              className={`block transition-colors ${
                activeTab === gen.id
                  ? "text-white"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              {gen.series}
            </span>
            <span
              className={`text-xs transition-colors ${
                activeTab === gen.id ? "text-[#00ff8f]" : "text-white/30"
              }`}
            >
              {gen.kva}
            </span>
            {/* Sliding Underline */}
            {activeTab === gen.id && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff8f]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Generator Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
        >
          {/* Left Column - Product Image */}
          <div className="flex-1 w-full lg:max-w-[50%]">
            <div className="relative rounded-3xl overflow-hidden group">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute top-6 left-6 z-10 bg-[#00ff8f] text-black px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#00ff8f]/20"
              >
                <AwardBadge />
                {activeGenerator.badge}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="absolute bottom-6 right-6 z-10 text-white px-4 py-2 rounded-lg font-bold text-lg font-['Outfit',sans-serif]"
              >
                {activeGenerator.kva}
              </motion.div>

              {/* Image Container - uses layout="position" to prevent distortion */}
              <motion.div
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="aspect-4/3 w-full relative flex items-center justify-center p-8"
              >
                <img
                  src={activeGenerator.image}
                  alt={activeGenerator.title}
                  className="w-full h-full object-contain relative z-0"
                />
              </motion.div>
            </div>

            {/* Pricing Card */}
            <div className="mt-8 p-6 lg:p-8">
              <h3 className="text-white text-xl font-bold font-['Poppins',sans-serif] mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#00ff8f]" />
                Rental Plans
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <PricingOption
                  label="DAILY"
                  price={activeGenerator.pricing.daily}
                />
                <PricingOption
                  label="MONTHLY"
                  price={activeGenerator.pricing.monthly}
                  active
                />
                <PricingOption
                  label="YEARLY"
                  price={activeGenerator.pricing.yearly}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="flex-1 w-full">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div>
                <div className="text-[#00ff8f] font-medium mb-2 tracking-wide text-sm font-['Outfit',sans-serif]">
                  {activeGenerator.series}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white font-['Poppins',sans-serif] mb-3">
                  {activeGenerator.title}
                </h1>

                <div className="flex items-center gap-2 text-[#00ff8f]">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i <= Math.floor(activeGenerator.rating)
                            ? "fill-[#00ff8f] text-[#00ff8f]"
                            : "fill-[#00ff8f]/30 text-[#00ff8f]/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm ml-1">
                    {activeGenerator.rating} ({activeGenerator.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Technical Specs Grid */}
              <div className="p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 font-['Poppins',sans-serif]">
                  <Clock className="w-5 h-5 text-[#00ff8f]" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  {activeGenerator.specs.map((spec, idx) => (
                    <SpecItem key={idx} label={spec.label} value={spec.value} />
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 font-['Poppins',sans-serif]">
                  <CheckCircle2 className="w-5 h-5 text-[#00ff8f]" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeGenerator.features.map((feature, idx) => (
                    <FeatureItem key={idx} text={feature} />
                  ))}
                </div>
              </div>

              {/* Ideal For */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-[#00ff8f]">
                  <AwardBadge className="w-5 h-5" />
                  <span className="font-semibold">Ideal For</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeGenerator.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-white/80 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button className="flex-1 bg-[#00ff8f] hover:bg-[#00dd7a] text-black font-semibold py-4 rounded-xl transition-colors font-['Outfit',sans-serif]">
                  Request Quote
                </button>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex-1 bg-transparent border border-[#333] hover:border-[#666] text-white font-medium py-4 rounded-xl transition-colors font-['Outfit',sans-serif]"
                >
                  View Full Specs
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Fullscreen Specs Modal */}
      <FullscreenGeneratorModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        generator={{
          id: activeGenerator.id,
          badge: activeGenerator.badge,
          series: activeGenerator.series,
          name: activeGenerator.title,
          kva: activeGenerator.kva,
          rating: activeGenerator.rating,
          reviews: activeGenerator.reviews,
          pricing: activeGenerator.pricing,
          specs: activeGenerator.specs,
          features: activeGenerator.features,
          highlights: activeGenerator.idealFor,
          image: activeGenerator.image,
        }}
      />
    </div>
  );
}

// ============================================
// SUBCOMPONENTS
// ============================================

function PricingOption({
  label,
  price,
  active = false,
}: {
  label: string;
  price: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
        active ? "text-[#00ff8f]" : ""
      }`}
    >
      <span className="text-[10px] sm:text-xs font-bold tracking-wider text-white/40 mb-1">
        {label}
      </span>
      <span
        className={`text-lg sm:text-xl font-bold ${
          active ? "text-[#00ff8f]" : "text-white"
        }`}
      >
        {price}
      </span>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[#00ff8f] text-xs font-bold tracking-wider mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff8f]" />
        {label}
      </div>
      <div className="text-white font-medium pl-3.5 text-sm sm:text-base border-l border-[#333]">
        {value}
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-[#00ff8f]/50" />
      <span className="text-white/70 text-sm">{text}</span>
    </div>
  );
}

// ============================================
// ICONS
// ============================================

const AwardBadge = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
