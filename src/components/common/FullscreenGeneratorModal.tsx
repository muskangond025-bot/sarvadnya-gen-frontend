"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Clock, X, Volume2 } from "lucide-react";
import Image from "next/image";
import { ProductDetailResponse } from "@/lib/api/products";
import { Loader2 } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface GeneratorSpec {
  label: string;
  value: string;
}

export interface GeneratorModalData {
  id: string;
  badge?: string;
  badgeColor?: string;
  series?: string;
  name: string;
  kva: string;
  rating: number;
  reviews: number;
  description?: string;
  dailyRate?: string;
  monthlyRate?: string;
  yearlyRate?: string;
  pricing?: {
    daily: string;
    monthly?: string;
    yearly?: string;
  };
  specs: GeneratorSpec[];
  features: string[];
  highlights: string[];
  image: string;
  category?: string;
  categoryLabel?: string;
}

export interface SuggestedGenerator {
  id: string;
  name: string;
  kva: string;
  dailyRate: string;
  image: string;
  category: string;
}

interface FullscreenGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  generator: GeneratorModalData;
  fullDetails?: ProductDetailResponse | null;
  isLoading?: boolean;
  suggestedGenerators?: SuggestedGenerator[];
  onSelectGenerator?: (id: string) => void;
  enableLayoutAnimations?: boolean;
}

// ============================================
// HELPER: Generate consistent layoutIds
// ============================================

const getLayoutId = (generatorId: string, element: string) =>
  `gallery-${generatorId}-${element}`;

const getCategoryColor = (category?: string) => {
  const normalized = category?.toLowerCase().trim();
  const colors: Record<string, string> = {
    residential: "#00ff8f",
    commercial: "#60a5fa",
    industrial: "#f97316",
  };
  // Fallback for fuel types if mixed data
  if (normalized?.includes("diesel")) return "#ff4d4d";
  if (normalized?.includes("gas")) return "#4dff4d";

  return colors[normalized || ""] || "#00ff8f";
};

// Spring transition matched with GeneratorGallery (faster)
const springTransition = {
  type: "spring" as const,
  stiffness: 800,
  damping: 50,
  mass: 0.4,
};

// Feature descriptions mapping
const getFeatureDescription = (feature: string): string => {
  const descriptions: Record<string, string> = {
    "Compact & Portable": "Easy to transport and install",
    "Low Noise Operation": "Quiet for residential areas",
    "Fuel Efficient": "Optimized consumption",
    "Easy Maintenance": "Simple servicing",
    "Auto Voltage Regulator": "Stable power output",
    "Electric Start": "Convenient operation",
    "Heavy Duty": "Built for demanding use",
  };
  return descriptions[feature] || "Professional grade quality";
};

// ============================================
// MAIN COMPONENT
// ============================================

export function FullscreenGeneratorModal({
  isOpen,
  onClose,
  generator,
  fullDetails,
  isLoading = false,
  suggestedGenerators = [],
  onSelectGenerator,
  enableLayoutAnimations = true,
}: FullscreenGeneratorModalProps) {
  const [isExiting, setIsExiting] = React.useState(false);

  // Handle manual exit coordination
  const handleClose = () => {
    setIsExiting(true);
    // Delay actual unmount to allow non-shared content to fade out first
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 100);
  };

  React.useEffect(() => {
    if (isOpen) {
      setIsExiting(false);
    }
  }, [isOpen]);

  // Variants for non-shared content that should fade out before the layout morph
  const contentVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.1, delay: 0.1 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.1 } },
    initial: { opacity: 0, y: 20 },
  };

  const sharedElementVariants = {
    visible: { opacity: 1 },
    exit: { opacity: 1 }, // Keep visible for layout transition
  };

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            key="modal-content"
            layoutId={
              enableLayoutAnimations
                ? getLayoutId(generator.id, "card")
                : undefined
            }
            className="fixed inset-0 z-50 flex bg-black"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
              borderRadius: 0,
            }}
            initial={!enableLayoutAnimations ? { opacity: 0 } : undefined}
            animate={!enableLayoutAnimations ? { opacity: 1 } : undefined}
            exit={
              !enableLayoutAnimations
                ? { opacity: 0 }
                : { opacity: 1, transition: { duration: 0.1 } }
            }
            transition={{
              layout: springTransition,
              opacity: { duration: 0.1 },
            }}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                scale: isExiting ? 0.8 : 1,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: isExiting ? 0 : 0.2, duration: 0.1 }}
              onClick={handleClose}
              className="fixed top-5 right-5 z-50 w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors border border-white/10"
            >
              <X className="w-5 h-5 text-white/70" />
            </motion.button>

            {/* BADGES - Exact match with card */}
            <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-start gap-4 z-40 pointer-events-none">
              <motion.div
                layoutId={
                  enableLayoutAnimations
                    ? getLayoutId(generator.id, "category")
                    : undefined
                }
                className="px-3 py-1 text-xs font-bold font-['Outfit',sans-serif]"
                style={{
                  backgroundColor: getCategoryColor(generator.category),
                  color: "#000",
                  borderRadius: 9999,
                }}
                transition={springTransition}
              >
                {generator.categoryLabel ||
                  (generator.category
                    ? generator.category.charAt(0).toUpperCase() +
                      generator.category.slice(1)
                    : (() => {
                        const kva = parseFloat(generator.kva);
                        if (kva <= 10) return "Residential";
                        if (kva <= 50) return "Commercial";
                        return "Industrial";
                      })())}
              </motion.div>

              <motion.div
                layoutId={
                  enableLayoutAnimations
                    ? getLayoutId(generator.id, "kva")
                    : undefined
                }
                className="px-3 py-1 bg-[#00ff8f] text-black text-sm font-bold font-['Outfit',sans-serif]"
                style={{ borderRadius: 9999 }}
                transition={springTransition}
              >
                {generator.kva}
              </motion.div>
            </div>

            {/* LEFT SIDE - Fixed Image with proper exit fadeout */}
            <motion.div
              className="hidden lg:flex w-[45%] h-screen items-center justify-center sticky top-0"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                x: isExiting ? 100 : 0, // Slide right when exiting
              }}
              exit={{ opacity: 0, x: 100 }}
              transition={{
                duration: 0.1, // Increased by 0.25s
                delay: 0,
              }}
            >
              <div className="w-full h-full flex items-center justify-center p-8">
                <Image
                  src={generator.image}
                  alt={generator.name}
                  width={600}
                  height={600}
                  className="w-full h-auto max-h-[85vh] object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* RIGHT SIDE - Scrollable Content */}
            <div
              className="flex-1 h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="px-8 lg:px-12 py-10 lg:py-14 relative">
                {/* Hidden Elements Removed (Price, Old Badges) as per refactor */}

                {/* Mobile Image */}
                <motion.div
                  className="lg:hidden mb-8"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{
                    opacity: isExiting ? 0 : 1,
                    // x: isExiting ? 100 : 0, // Slide right when exiting
                  }}
                  transition={{
                    duration: 0.1, // Increased by 0.25s
                    delay: 0,
                  }}
                >
                  <Image
                    src={generator.image}
                    alt={generator.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </motion.div>

                {/* Series */}
                {generator.series && (
                  <motion.span
                    layoutId={
                      enableLayoutAnimations
                        ? getLayoutId(generator.id, "brand")
                        : undefined
                    }
                    className="text-[#00ff8f] text-sm font-medium mb-2 block font-['Outfit',sans-serif]"
                    transition={springTransition}
                  >
                    {generator.series}
                  </motion.span>
                )}

                {/* Title */}
                <motion.div
                  layoutId={
                    enableLayoutAnimations
                      ? getLayoutId(generator.id, "name")
                      : undefined
                  }
                  className="text-6xl lg:text-7xl font-bold text-white mb-3 leading-tight font-['Poppins',sans-serif]"
                  transition={springTransition}
                >
                  {generator.name}
                </motion.div>

                {/* Price - Matches Card LayoutId (Option B) */}
                <div className="flex items-baseline gap-1 mb-8">
                  <motion.span
                    layoutId={
                      enableLayoutAnimations
                        ? getLayoutId(generator.id, "price")
                        : undefined
                    }
                    className="text-[#00ff8f] font-['Poppins',sans-serif] font-bold text-3xl"
                    transition={springTransition}
                  >
                    {generator.dailyRate || generator.pricing?.daily}
                  </motion.span>
                  <span className="text-white/40 text-[16px] font-['Outfit',sans-serif]">
                    /day
                  </span>
                </div>

                {/* Description - Fades out on exit */}
                {generator.description && (
                  <motion.p
                    className="text-[#888] text-[15px] leading-relaxed mb-10 max-w-lg"
                    variants={contentVariants}
                    initial="initial"
                    animate={isExiting ? "exit" : "visible"}
                  >
                    {generator.description}
                  </motion.p>
                )}

                {/* Technical Specifications - Fades out on exit */}
                <motion.div
                  className="mb-10"
                  variants={contentVariants}
                  initial="initial"
                  animate={isExiting ? "exit" : "visible"}
                  transition={{ delay: isExiting ? 0 : 0.3 }}
                >
                  <h3 className="text-white text-lg font-bold mb-5">
                    Technical Specifications
                  </h3>

                  {isLoading ? (
                    <div className="flex items-center gap-2 text-white/50 mb-4">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading specifications...
                    </div>
                  ) : fullDetails ? (
                    <div className="grid grid-cols-2 gap-3">
                      {/* Power */}
                      <SpecCard
                        icon={<Zap className="w-5 h-5" />}
                        label="Power"
                        value={`${fullDetails.power_output_kva} kVA`}
                      />
                      {/* Phase */}
                      <SpecCard
                        icon={<PhaseIcon className="w-5 h-5" />}
                        label="Phase"
                        value={fullDetails.phase || "N/A"}
                      />
                      {/* Fuel */}
                      <SpecCard
                        icon={<FuelIcon className="w-5 h-5" />}
                        label="Fuel"
                        value={fullDetails.fuel_type || "N/A"}
                      />
                      {/* Noise */}
                      <SpecCard
                        icon={<Volume2 className="w-5 h-5" />}
                        label="Noise"
                        value={
                          fullDetails.noise_level_db
                            ? `${fullDetails.noise_level_db} dB`
                            : "N/A"
                        }
                      />

                      {/* Dynamic Specifications from backend */}
                      {fullDetails.specifications?.map(
                        (spec, idx) =>
                          // Avoid duplicates if we already showed basic ones, or just append extra
                          !["power", "phase", "fuel", "noise"].some((k) =>
                            spec.spec_key.toLowerCase().includes(k)
                          ) && (
                            <SpecCard
                              key={idx}
                              icon={<Zap className="w-5 h-5 text-white/20" />} // Generic icon
                              label={spec.spec_key}
                              value={spec.spec_value}
                            />
                          )
                      )}
                    </div>
                  ) : (
                    /* Fallback to generator.specs if no full details (legacy) */
                    <div className="grid grid-cols-2 gap-3">
                      <SpecCard
                        icon={<Zap className="w-5 h-5" />}
                        label="Power"
                        value={generator.kva}
                      />
                      <SpecCard
                        icon={<PhaseIcon className="w-5 h-5" />}
                        label="Phase"
                        value={
                          generator.specs.find((s) =>
                            s.label.toLowerCase().includes("phase")
                          )?.value || "Single"
                        }
                      />
                      <SpecCard
                        icon={<FuelIcon className="w-5 h-5" />}
                        label="Fuel"
                        value={
                          generator.specs.find((s) =>
                            s.label.toLowerCase().includes("fuel")
                          )?.value || "Petrol/Diesel"
                        }
                      />
                      <SpecCard
                        icon={<Volume2 className="w-5 h-5" />}
                        label="Noise"
                        value={
                          generator.specs.find((s) =>
                            s.label.toLowerCase().includes("noise")
                          )?.value || "Low"
                        }
                      />
                    </div>
                  )}
                </motion.div>

                {/* Key Features - Fades out on exit */}
                <motion.div
                  className="mb-10"
                  variants={contentVariants}
                  initial="initial"
                  animate={isExiting ? "exit" : "visible"}
                  transition={{ delay: isExiting ? 0 : 0.4 }}
                >
                  <h3 className="text-white text-lg font-bold mb-5">
                    Key Features
                  </h3>
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-white/50">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading features...
                    </div>
                  ) : fullDetails ? (
                    <div className="space-y-4">
                      {fullDetails.features?.map((feature, idx) => (
                        <FeatureItem
                          key={idx}
                          title={feature.title}
                          description={feature.description || ""}
                        />
                      ))}
                      {(!fullDetails.features ||
                        fullDetails.features.length === 0) && (
                        <p className="text-white/30 italic">
                          No specific features listed.
                        </p>
                      )}
                    </div>
                  ) : (
                    /* FLllback */
                    generator.features.length > 0 && (
                      <div className="space-y-4">
                        {generator.features.slice(0, 4).map((feature, idx) => (
                          <FeatureItem
                            key={idx}
                            title={feature}
                            description={getFeatureDescription(feature)}
                          />
                        ))}
                      </div>
                    )
                  )}
                </motion.div>

                {/* Need More Information? - Fades out on exit */}
                <motion.div
                  className="mb-12"
                  variants={contentVariants}
                  initial="initial"
                  animate={isExiting ? "exit" : "visible"}
                  transition={{ delay: isExiting ? 0 : 0.5 }}
                >
                  <h3 className="text-white text-lg font-bold mb-2">
                    Need More Information?
                  </h3>
                  <p className="text-[#666] text-sm mb-5">
                    Our experts are ready to help you choose the right product
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-5 py-2.5 bg-[#00ff8f] hover:bg-[#00dd7a] text-black text-sm font-semibold rounded-lg transition-colors">
                      Call Now
                    </button>
                    <button className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white text-sm font-medium rounded-lg transition-colors border border-white/10">
                      WhatsApp
                    </button>
                    <button className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white text-sm font-medium rounded-lg transition-colors border border-white/10">
                      View Details
                    </button>
                  </div>
                </motion.div>

                {/* Suggested Generators - Fades out on exit */}
                {suggestedGenerators.length > 0 && (
                  <motion.div
                    className="border-t border-white/10 pt-10"
                    variants={contentVariants}
                    initial="initial"
                    animate={isExiting ? "exit" : "visible"}
                    transition={{ delay: isExiting ? 0 : 0.6 }}
                  >
                    <h3 className="text-white text-lg font-bold mb-6">
                      You May Also Like
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {suggestedGenerators.slice(0, 3).map((gen) => (
                        <SuggestionCard
                          key={gen.id}
                          generator={gen}
                          onClick={() => onSelectGenerator?.(gen.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// SUBCOMPONENTS
// ============================================

function SpecCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#111] rounded-xl p-5 flex flex-col items-center text-center">
      <div className="text-[#00ff8f] mb-3">{icon}</div>
      <div className="text-[#666] text-[11px] font-medium tracking-wider uppercase mb-1">
        {label}
      </div>
      <div className="text-white font-semibold text-sm">{value}</div>
    </div>
  );
}

function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-[#00ff8f] mt-2 shrink-0" />
      <div>
        <div className="text-white font-semibold text-sm">{title}</div>
        <div className="text-[#666] text-sm">{description}</div>
      </div>
    </div>
  );
}

function SuggestionCard({
  generator,
  onClick,
}: {
  generator: SuggestedGenerator;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-[#111] rounded-xl p-4 cursor-pointer hover:bg-[#1a1a1a] transition-colors group"
    >
      <div className="aspect-square mb-3 flex items-center justify-center">
        <Image
          src={generator.image}
          alt={generator.name}
          width={120}
          height={120}
          className="object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="text-[#666] text-xs mb-1">{generator.category}</div>
      <div className="text-white font-medium text-sm mb-2 line-clamp-2">
        {generator.name}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-[#00ff8f] font-bold">{generator.dailyRate}</span>
        <span className="text-[#666] text-xs">/day</span>
      </div>
    </div>
  );
}

// ============================================
// ICONS
// ============================================

const PhaseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
  </svg>
);

const FuelIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    <path d="M15 22V10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
    <path d="M3 22h12" />
    <rect x="5" y="8" width="6" height="4" />
  </svg>
);

export default FullscreenGeneratorModal;
