"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Volume2, Loader2, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductDetailResponse } from "@/lib/api/products";

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

const getLayoutId = (generatorId: string, element: string) =>
  `gallery-${generatorId}-${element}`;

const springTransition = {
  type: "spring" as const,
  stiffness: 800,
  damping: 50,
  mass: 0.4,
};

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

  const handleClose = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 100);
  }, [onClose]);

  React.useEffect(() => {
    if (!isOpen) return;
    setIsExiting(false);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, handleClose]);

  const contentVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.14, delay: 0.06 } },
    exit: { opacity: 0, y: 12, transition: { duration: 0.1 } },
    initial: { opacity: 0, y: 12 },
  };

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <>
          {/* Bright Overlay Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[140] bg-[#111315]/35 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Bright Fullscreen Modal Shell */}
          <motion.div
            key="modal-content"
            layoutId={
              enableLayoutAnimations
                ? getLayoutId(generator.id, "card")
                : undefined
            }
            className="fixed inset-0 z-[150] flex flex-col lg:flex-row bg-[#FAF8F5] text-[#111315] font-sans"
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
              type="button"
              aria-label="Close"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                scale: isExiting ? 0.85 : 1,
              }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ delay: isExiting ? 0 : 0.15, duration: 0.12 }}
              onClick={handleClose}
              className="fixed top-4 right-4 sm:top-5 sm:right-5 z-[160] w-10 h-10 rounded-full bg-white hover:bg-[#FF5500] text-[#111315] hover:text-white flex items-center justify-center transition-colors border border-[#E8E2D9] shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* LEFT SIDE - Bright Architectural Product Showcase */}
            <motion.div
              className="hidden lg:flex lg:w-[44%] h-screen items-center justify-center sticky top-0 bg-[#F3EFEA] border-r border-[#E8E2D9]"
              initial={{ opacity: 0, x: -16 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                x: isExiting ? 24 : 0,
              }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.16 }}
            >
              <div className="w-full h-full flex items-center justify-center p-8 xl:p-12 relative">
                <div className="relative w-full h-full max-h-[72vh] flex items-center justify-center rounded-3xl bg-white/75 border border-[#E8E2D9] shadow-xs p-8">
                  <Image
                    src={generator.image}
                    alt={generator.name}
                    width={560}
                    height={560}
                    className="w-full h-auto max-h-[60vh] object-contain drop-shadow-[0_20px_40px_rgba(17,19,21,0.12)]"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - Compact, Screen-Fitted Bright Details Pane */}
            <div
              className="flex-1 h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden bg-[#FAF8F5]"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="px-6 sm:px-8 lg:px-10 py-7 lg:py-8 max-w-3xl relative">
                {/* Mobile Product Stage */}
                <motion.div
                  className="lg:hidden mb-6 rounded-2xl bg-[#F3EFEA] border border-[#E8E2D9] p-5 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isExiting ? 0 : 1 }}
                  transition={{ duration: 0.12 }}
                >
                  <Image
                    src={generator.image}
                    alt={generator.name}
                    width={360}
                    height={360}
                    className="w-full max-h-56 object-contain"
                  />
                </motion.div>

                {/* Brand / Series */}
                {generator.series && (
                  <motion.span
                    layoutId={
                      enableLayoutAnimations
                        ? getLayoutId(generator.id, "brand")
                        : undefined
                    }
                    className="text-[#FF5500] text-xs font-mono font-bold uppercase tracking-widest mb-1.5 block"
                    transition={springTransition}
                  >
                    {generator.series}
                  </motion.span>
                )}

                {/* Title */}
                <motion.h2
                  layoutId={
                    enableLayoutAnimations
                      ? getLayoutId(generator.id, "name")
                      : undefined
                  }
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111315] mb-2 leading-tight font-sans tracking-tight pr-10"
                  transition={springTransition}
                >
                  {generator.name}
                </motion.h2>

                {/* Daily Rental Price */}
                <div className="flex items-baseline gap-1.5 mb-5">
                  <motion.span
                    layoutId={
                      enableLayoutAnimations
                        ? getLayoutId(generator.id, "price")
                        : undefined
                    }
                    className="text-[#FF5500] font-sans font-bold text-2xl sm:text-3xl"
                    transition={springTransition}
                  >
                    {generator.dailyRate || generator.pricing?.daily}
                  </motion.span>
                  <span className="text-[#524E48] text-sm font-sans font-medium">
                    /day
                  </span>
                </div>

                {/* Description */}
                {generator.description && (
                  <motion.p
                    className="text-[#403C36] text-sm sm:text-[15px] leading-relaxed mb-6 max-w-2xl"
                    variants={contentVariants}
                    initial="initial"
                    animate={isExiting ? "exit" : "visible"}
                  >
                    {generator.description}
                  </motion.p>
                )}

                {/* Technical Specifications */}
                <motion.div
                  className="mb-6"
                  variants={contentVariants}
                  initial="initial"
                  animate={isExiting ? "exit" : "visible"}
                >
                  <h3 className="text-[#111315] text-sm font-bold uppercase tracking-wider mb-3">
                    Technical Specifications
                  </h3>

                  {isLoading ? (
                    <div className="flex items-center gap-2 text-[#524E48] text-sm mb-3">
                      <Loader2 className="w-4 h-4 animate-spin text-[#FF5500]" />
                      <span>Loading specifications...</span>
                    </div>
                  ) : fullDetails ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <SpecCard
                        icon={<Zap className="w-4 h-4" />}
                        label="Power"
                        value={`${fullDetails.power_output_kva} kVA`}
                      />
                      <SpecCard
                        icon={<PhaseIcon className="w-4 h-4" />}
                        label="Phase"
                        value={fullDetails.phase || "N/A"}
                      />
                      <SpecCard
                        icon={<FuelIcon className="w-4 h-4" />}
                        label="Fuel"
                        value={fullDetails.fuel_type || "N/A"}
                      />
                      <SpecCard
                        icon={<Volume2 className="w-4 h-4" />}
                        label="Noise"
                        value={
                          fullDetails.noise_level_db
                            ? `${fullDetails.noise_level_db} dB`
                            : "N/A"
                        }
                      />

                      {fullDetails.specifications?.map(
                        (spec, idx) =>
                          !["power", "phase", "fuel", "noise"].some((k) =>
                            spec.spec_key.toLowerCase().includes(k)
                          ) && (
                            <SpecCard
                              key={idx}
                              icon={<Zap className="w-4 h-4" />}
                              label={spec.spec_key}
                              value={spec.spec_value}
                            />
                          )
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <SpecCard
                        icon={<Zap className="w-4 h-4" />}
                        label="Power"
                        value={generator.kva}
                      />
                      <SpecCard
                        icon={<PhaseIcon className="w-4 h-4" />}
                        label="Phase"
                        value={
                          generator.specs.find((s) =>
                            s.label.toLowerCase().includes("phase")
                          )?.value || "Single"
                        }
                      />
                      <SpecCard
                        icon={<FuelIcon className="w-4 h-4" />}
                        label="Fuel"
                        value={
                          generator.specs.find((s) =>
                            s.label.toLowerCase().includes("fuel")
                          )?.value || "Petrol/Diesel"
                        }
                      />
                      <SpecCard
                        icon={<Volume2 className="w-4 h-4" />}
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

                {/* Key Features */}
                {(isLoading ||
                  (fullDetails && fullDetails.features) ||
                  generator.features.length > 0) && (
                  <motion.div
                    className="mb-6"
                    variants={contentVariants}
                    initial="initial"
                    animate={isExiting ? "exit" : "visible"}
                  >
                    <h3 className="text-[#111315] text-sm font-bold uppercase tracking-wider mb-3">
                      Key Features
                    </h3>
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-[#524E48] text-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-[#FF5500]" />
                        <span>Loading features...</span>
                      </div>
                    ) : fullDetails ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {fullDetails.features?.map((feature, idx) => (
                          <FeatureItem
                            key={idx}
                            title={feature.title}
                            description={feature.description || ""}
                          />
                        ))}
                        {(!fullDetails.features ||
                          fullDetails.features.length === 0) && (
                          <p className="text-[#524E48] text-sm italic">
                            No specific features listed.
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {generator.features.slice(0, 4).map((feature, idx) => (
                          <FeatureItem
                            key={idx}
                            title={feature}
                            description={getFeatureDescription(feature)}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Need More Information */}
                <motion.div
                  className="pt-5 border-t border-[#E8E2D9] mb-6"
                  variants={contentVariants}
                  initial="initial"
                  animate={isExiting ? "exit" : "visible"}
                >
                  <h3 className="text-[#111315] text-base font-bold mb-1">
                    Need More Information?
                  </h3>
                  <p className="text-[#524E48] text-xs sm:text-sm mb-4">
                    Our experts are ready to help you choose the right product
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href="tel:+916262629944"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href="https://wa.me/916262629944"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#F3EFEA] text-[#111315] text-xs sm:text-sm font-medium rounded-xl transition-colors border border-[#E8E2D9]"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span>WhatsApp</span>
                    </a>
                    <Link
                      href={`/book?kVA=${encodeURIComponent(generator.kva)}`}
                      onClick={handleClose}
                      className="inline-flex items-center px-5 py-2.5 bg-white hover:bg-[#111315] hover:text-white text-[#111315] text-xs sm:text-sm font-medium rounded-xl transition-colors border border-[#E8E2D9]"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>

                {/* Suggested Generators */}
                {suggestedGenerators.length > 0 && (
                  <motion.div
                    className="border-t border-[#E8E2D9] pt-5"
                    variants={contentVariants}
                    initial="initial"
                    animate={isExiting ? "exit" : "visible"}
                  >
                    <h3 className="text-[#111315] text-sm font-bold uppercase tracking-wider mb-4">
                      You May Also Like
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
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
    <div className="bg-white border border-[#E8E2D9] rounded-xl p-3.5 flex flex-col items-center text-center shadow-2xs">
      <div className="text-[#FF5500] mb-1.5">{icon}</div>
      <div className="text-[#524E48] text-[10px] font-mono font-semibold tracking-wider uppercase mb-0.5">
        {label}
      </div>
      <div className="text-[#111315] font-bold text-xs sm:text-sm">{value}</div>
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
    <div className="flex items-start gap-2.5">
      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-2 shrink-0" />
      <div>
        <div className="text-[#111315] font-semibold text-sm">{title}</div>
        {description && (
          <div className="text-[#524E48] text-xs">{description}</div>
        )}
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
      className="bg-white border border-[#E8E2D9] hover:border-[#FF5500]/50 rounded-2xl p-3.5 cursor-pointer hover:shadow-sm transition-all group"
    >
      <div className="h-24 mb-2.5 rounded-xl bg-[#FAF8F5] flex items-center justify-center p-2">
        <Image
          src={generator.image}
          alt={generator.name}
          width={110}
          height={90}
          className="h-full w-auto object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="text-[#524E48] text-[11px] font-medium mb-0.5">
        {generator.category}
      </div>
      <div className="text-[#111315] font-semibold text-xs sm:text-sm mb-1.5 line-clamp-2 group-hover:text-[#FF5500] transition-colors">
        {generator.name}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-[#FF5500] font-bold text-sm">
          {generator.dailyRate}
        </span>
        <span className="text-[#524E48] text-[11px]">/day</span>
      </div>
    </div>
  );
}

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
