"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { resolveGeneratorImage } from "@/lib/generatorImages";
import { SectionHeading } from "@/components/common";
import Image from "next/image";
import { useFullscreen } from "@/lib/FullscreenContext";
import { FullscreenGeneratorModal } from "@/components/common/FullscreenGeneratorModal";
import { cn } from "@/lib/utils";
import { Filter, Star, Loader2, AlertCircle, X, MapPin, Clock, Zap } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { GeneratorCard } from "./GeneratorCard";
import { Generator as GeneratorType } from "@/types/generator";
import {
  GENERATOR_HERO_FILTER_EVENT,
  GeneratorHeroFilterDetail,
} from "../01-hero/GeneratorHero";
import {
  PublicProduct,
  getPublicProductBySlug,
  ProductDetailResponse,
} from "@/lib/api/products";

// ============================================
// TYPES AND CONSTANTS
// ============================================

type CategoryLevel = "all" | "residential" | "commercial" | "industrial";
type FilterGroup = "power" | "usage" | "type";

interface ProcessedGenerator {
  id: string;
  slug?: string;
  name: string;
  kva: string;
  brand: string;
  type: string;
  category: CategoryLevel;
  categoryLabel: string;
  dailyRate: string;
  monthlyRate: string;
  yearlyRate: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  fuelType: string;
  phase: string;
  runtime: string;
  noiseLevel: string;
  features: string[];
  highlights: string[];
  suitable_for: string[];
  recommended_industries: string[];
  included_services: string[];
  specs: { label: string; value: string }[];
  // Fields consumed by GeneratorCard
  status: "available";
  primary_image_url: string;
  power_output_kva: string;
  daily_rate: string;
  fuel_consumption_per_hour: string;
  noise_level_db: string;
  runtime_hours_full_tank: string;
}

// Map category slug to visual category
const getCategoryFromSlug = (
  categorySlug: string | null | undefined
): { level: CategoryLevel; label: string } => {
  if (!categorySlug) return { level: "commercial", label: "Commercial" };

  switch (categorySlug.toLowerCase()) {
    case "residential":
      return { level: "residential", label: "Residential" };
    case "commercial":
      return { level: "commercial", label: "Commercial" };
    case "industrial":
    case "construction":
    case "events":
      return { level: "industrial", label: "Industrial" };
    default:
      return { level: "commercial", label: "Commercial" };
  }
};

// Get image based on kVA rating
const getGeneratorImage = resolveGeneratorImage;

// Transform API product to display format
const transformProduct = (product: PublicProduct): ProcessedGenerator => {
  const { level, label } = getCategoryFromSlug(product.category?.slug);

  // Use real rating from API or generate based on rental count
  const rating =
    product.average_rating || (product.rental_count > 10 ? 4.7 : 4.3);
  const reviews =
    product.rental_count > 0
      ? product.rental_count * 3
      : ((product.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % 50) + 20;

  // Parse daily rate
  const dailyRateNum = product.daily_rate ? parseFloat(product.daily_rate) : 0;
  const monthlyRate = dailyRateNum * 25;
  const yearlyRate = monthlyRate * 10;
  const resolvedImage = getGeneratorImage(
    product.power_output_kva,
    product.primary_image_url
  );
  const kvaNum = product.power_output_kva;
  const estimatedFuelCons = (Math.max(1.2, kvaNum * 0.21)).toFixed(1);
  const estimatedNoiseDb = kvaNum <= 15 ? "62" : kvaNum <= 65 ? "68" : "73";
  const defaultSuitableFor =
    kvaNum <= 25
      ? ["Events & Weddings", "Retail & Homes"]
      : kvaNum <= 65
      ? ["Events & Banquets", "Commercial Sites", "Hospitals"]
      : ["Construction", "Factories", "Hospitals"];
  const rawSuitable = (product as unknown as { suitable_for?: string[] }).suitable_for;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    kva: `${product.power_output_kva} kVA`,
    brand: product.category?.name || "Premium Generator",
    type: product.fuel_type,
    category: level,
    categoryLabel: label,
    dailyRate: dailyRateNum
      ? `₹${dailyRateNum.toLocaleString("en-IN")}`
      : "Contact Us",
    monthlyRate: monthlyRate
      ? `₹${monthlyRate.toLocaleString("en-IN")}`
      : "Contact Us",
    yearlyRate: yearlyRate
      ? `₹${yearlyRate.toLocaleString("en-IN")}`
      : "Contact Us",
    rating,
    reviews,
    image: resolvedImage,
    description: `${product.name} - ${product.power_output_kva} kVA ${product.fuel_type} generator`,
    fuelType: product.fuel_type
      ? product.fuel_type.charAt(0).toUpperCase() + product.fuel_type.slice(1)
      : "Diesel",
    phase: product.phase ? product.phase.replace("_", " ") : "Three Phase",
    runtime: "12–16 hrs",
    noiseLevel: `${estimatedNoiseDb} dB`,
    features: (product as unknown as { features?: string[] }).features || [],
    highlights: (product as unknown as { highlights?: string[] }).highlights || [],
    suitable_for:
      rawSuitable && rawSuitable.length > 0 ? rawSuitable : defaultSuitableFor,
    recommended_industries:
      (product as unknown as { recommended_industries?: string[] })
        .recommended_industries || [],
    included_services:
      (product as unknown as { included_services?: string[] })
        .included_services || [],
    status: "available",
    primary_image_url: resolvedImage,
    power_output_kva: String(product.power_output_kva),
    daily_rate: dailyRateNum ? dailyRateNum.toLocaleString("en-IN") : "On Request",
    fuel_consumption_per_hour: estimatedFuelCons,
    noise_level_db: estimatedNoiseDb,
    runtime_hours_full_tank: "12–16",
    specs: [
      {
        label: "POWER",
        value: `${product.power_output_kva} kVA / ${product.power_output_kw} kW`,
      },
      {
        label: "FUEL TYPE",
        value: (product.fuel_type || "diesel")
          .split("_")
          .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
          .join(" "),
      },
      {
        label: "PHASE",
        value: product.phase ? product.phase.replace("_", " ") : "Three Phase",
      },
    ],
  };
};

const POWER_FILTERS = [
  { id: "all", label: "All Capacities", range: [0, 250] },
  { id: "5-10", label: "5 – 10 kVA", range: [5, 10] },
  { id: "10-25", label: "10 – 25 kVA", range: [10, 25] },
  { id: "5-25", label: "5 – 25 kVA", range: [5, 25] },
  { id: "25-65", label: "25 – 65 kVA", range: [25, 65] },
  { id: "65-125", label: "65 – 125 kVA", range: [65, 125] },
  { id: "125-250", label: "125 – 250 kVA", range: [125, 250] },
];

const USAGE_FILTERS = [
  { id: "all", label: "All Usage" },
  { id: "weddings", label: "Weddings & Banquet Halls" },
  { id: "events", label: "Exhibitions & Concerts" },
  { id: "industrial", label: "Factories & Manufacturing" },
  { id: "construction", label: "Construction & Road Projects" },
  { id: "healthcare", label: "Hospitals & Cold Storage" },
  { id: "commercial", label: "Malls & Retail Shops" },
  { id: "hospitality", label: "Hotels & Resorts" },
  { id: "film", label: "Film & Media Production" },
  { id: "government", label: "Government & Water Projects" },
  { id: "agriculture", label: "Agriculture" },
  { id: "emergency", label: "Emergency Backup" },
];

const TYPE_FILTERS = [
  { id: "all", label: "All Types" },
  { id: "silent", label: "Silent Generators" },
  { id: "diesel", label: "Diesel Generators" },
  { id: "mobile", label: "Mobile DG Vans" },
  { id: "trailer", label: "Trailer Mounted" },
];

const FILTER_GROUPS = [
  { id: "power", label: "By Power Capacity" },
  { id: "usage", label: "By Usage / Industry" },
  { id: "type", label: "By Generator Type" },
];

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "residential": return "#00ff8f";
    case "commercial": return "#60a5fa";
    case "industrial": return "#f97316";
    default: return "#00ff8f";
  }
};

// Spring transition
const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 40,
  mass: 0.8,
};

// Layout ID prefix - each generator gets unique prefix
const getLayoutId = (genId: string, element: string) =>
  `gallery-${genId}-${element}`;

// ============================================
// MAIN COMPONENT
// ============================================

const matchesUsageFilter = (
  kvaValue: number,
  gen: ProcessedGenerator,
  usageKey: string
): boolean => {
  switch (usageKey) {
    case "weddings":
    case "events":
      return kvaValue >= 5 && kvaValue <= 125;
    case "industrial":
    case "factories":
      return kvaValue >= 60 || gen.category === "industrial";
    case "construction":
      return kvaValue >= 25 || gen.category === "industrial";
    case "healthcare":
    case "hospitals":
      return kvaValue >= 15;
    case "commercial":
    case "hospitality":
      return kvaValue >= 15 && kvaValue <= 125;
    case "film":
      return kvaValue <= 65;
    case "government":
      return kvaValue >= 30;
    case "agriculture":
      return kvaValue >= 10 && kvaValue <= 65;
    case "residential":
      return kvaValue <= 25;
    case "emergency":
      return true;
    default:
      return gen.name.toLowerCase().includes(usageKey.toLowerCase());
  }
};

export default function GeneratorGallery() {
  const router = useRouter();
  const [activeGroup, setActiveGroup] = useState<FilterGroup>("power");
  const [activeSubFilter, setActiveSubFilter] = useState("all");
  const [heroFilter, setHeroFilter] = useState<GeneratorHeroFilterDetail | null>(
    null
  );
  const [selectedGenerator, setSelectedGenerator] =
    useState<ProcessedGenerator | null>(null);
  const [fullProductDetails, setFullProductDetails] =
    useState<ProductDetailResponse | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const { setIsFullscreen } = useFullscreen();

  // Fetch products from backend
  const { products, isLoading, error, refetch } = useProducts({ limit: 50 });

  // Listen to Find Available Generators / Browse Generators actions from GeneratorHero
  useEffect(() => {
    const handleHeroFilter = (event: Event) => {
      const detail = (event as CustomEvent<GeneratorHeroFilterDetail>).detail;
      if (!detail || detail.reset) {
        setHeroFilter(null);
        setActiveGroup("power");
        setActiveSubFilter("all");
        return;
      }

      const hasCriteria = Boolean(
        detail.kvaRange || detail.industry || detail.duration || detail.city
      );
      if (!hasCriteria) {
        setHeroFilter(null);
        setActiveGroup("power");
        setActiveSubFilter("all");
        return;
      }

      setHeroFilter(detail);

      if (detail.kvaRange) {
        setActiveGroup("power");
        setActiveSubFilter(detail.kvaRange);
      } else if (detail.industry) {
        const usageMap: Record<string, string> = {
          events: "events",
          construction: "construction",
          hospitals: "healthcare",
          factories: "industrial",
        };
        setActiveGroup("usage");
        setActiveSubFilter(usageMap[detail.industry] || "all");
      } else {
        setActiveGroup("power");
        setActiveSubFilter("all");
      }
    };

    window.addEventListener(GENERATOR_HERO_FILTER_EVENT, handleHeroFilter);
    return () =>
      window.removeEventListener(GENERATOR_HERO_FILTER_EVENT, handleHeroFilter);
  }, []);

  // Transform API products to display format
  const processedGenerators = useMemo(() => {
    return products.map(transformProduct);
  }, [products]);

  // Filter products based on hero match criteria or active gallery tabs
  const filteredGenerators = useMemo(() => {
    return processedGenerators.filter((gen) => {
      const kvaValue = parseFloat(gen.kva);

      if (heroFilter) {
        if (heroFilter.kvaRange) {
          const filter = POWER_FILTERS.find((f) => f.id === heroFilter.kvaRange);
          if (filter) {
            if (kvaValue < filter.range[0] || kvaValue > filter.range[1]) {
              return false;
            }
          }
        }
        if (heroFilter.industry) {
          if (!matchesUsageFilter(kvaValue, gen, heroFilter.industry)) {
            return false;
          }
        }
        return true;
      }

      if (activeSubFilter === "all") return true;

      if (activeGroup === "power") {
        const filter = POWER_FILTERS.find((f) => f.id === activeSubFilter);
        if (!filter) return true;
        return kvaValue >= filter.range[0] && kvaValue <= filter.range[1];
      }

      if (activeGroup === "usage") {
        return matchesUsageFilter(kvaValue, gen, activeSubFilter);
      }

      if (activeGroup === "type") {
        if (activeSubFilter === "silent")
          return gen.name.toLowerCase().includes("silent") || kvaValue <= 125;
        if (activeSubFilter === "diesel")
          return gen.fuelType.toLowerCase() === "diesel";
        return gen.name.toLowerCase().includes(activeSubFilter);
      }

      return true;
    });
  }, [processedGenerators, heroFilter, activeGroup, activeSubFilter]);

  // Sync fullscreen state with context
  useEffect(() => {
    const isOpen = selectedGenerator !== null;
    setIsFullscreen(isOpen);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedGenerator, setIsFullscreen]);

  // Fetch full details when a generator is selected
  useEffect(() => {
    async function fetchDetails() {
      if (!selectedGenerator?.slug) return;

      setIsLoadingDetails(true);
      try {
        const response = await getPublicProductBySlug(selectedGenerator.slug);
        if (response.success) {
          setFullProductDetails(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch full details:", err);
      } finally {
        setIsLoadingDetails(false);
      }
    }

    if (selectedGenerator) {
      // Clear previous details first
      setFullProductDetails(null);
      fetchDetails();
    }
  }, [selectedGenerator]);

  const handleCardClick = (gen: ProcessedGenerator) => {
    router.push(`/generators/${encodeURIComponent(gen.slug || gen.id)}`);
  };

  const handleClose = () => {
    setSelectedGenerator(null);
    setFullProductDetails(null);
  };

  const clearAllFilters = () => {
    setHeroFilter(null);
    setActiveGroup("power");
    setActiveSubFilter("all");
  };

  return (
    <LayoutGroup>
      <section
        id="gallery"
        className="w-full py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-[60px] scroll-mt-24"
      >
        <div className="max-w-[1440px] mx-auto">
          <SectionHeading
            title={
              <>
                Browse All
                <br />
                <span className="text-[#FF5500]">Generators</span>
              </>
            }
            align="left"
          />

          <p className="font-['Outfit',sans-serif] text-[#625D55] text-base sm:text-[18px] leading-[1.6] max-w-[540px] mt-4 sm:mt-6 mb-8 sm:mb-12">
            Explore our complete range of generators. Click on any generator to
            view detailed specifications and pricing.
          </p>

          {/* Intelligent Multi-Tab Filters */}
          <div className="flex flex-col gap-6 sm:gap-8 mb-10 sm:mb-12">
            {/* Top Level Groups */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-[#EFECE6] rounded-2xl w-full sm:w-fit border border-[#E8E2D9]">
              {FILTER_GROUPS.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    setHeroFilter(null);
                    setActiveGroup(group.id as FilterGroup);
                    setActiveSubFilter("all");
                  }}
                  className={cn(
                    "flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-['Poppins',sans-serif] text-xs sm:text-sm font-bold transition-all text-center",
                    activeGroup === group.id 
                      ? "bg-[#FF5500] text-white shadow-[0_4px_14px_rgba(255,85,0,0.25)]" 
                      : "text-[#625D55] hover:text-[#111315] hover:bg-white/60"
                  )}
                >
                  {group.label}
                </button>
              ))}
            </div>

            {/* Sub-Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5500] shrink-0" />
              <div className="flex flex-wrap gap-2">
                {(activeGroup === "power" ? POWER_FILTERS : 
                  activeGroup === "usage" ? USAGE_FILTERS : 
                  TYPE_FILTERS).map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => {
                      setHeroFilter(null);
                      setActiveSubFilter(filter.id);
                    }}
                    className={cn(
                      "px-5 py-2.5 rounded-full font-['Outfit',sans-serif] text-sm font-medium transition-all border",
                      activeSubFilter === filter.id
                        ? "bg-[#FF5500]/10 border-[#FF5500] text-[#FF5500] font-semibold"
                        : "bg-white border-[#E8E2D9] text-[#625D55] hover:border-[#FF5500]/40 hover:text-[#111315]"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Hero Filter Summary Banner */}
            {heroFilter && (
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#FF5500]/30 shadow-xs">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="font-bold text-[#111315]">
                    Showing {filteredGenerators.length} available match
                    {filteredGenerators.length === 1 ? "" : "es"}
                  </span>
                  {heroFilter.kvaRange && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF3EC] border border-[#FF5500]/25 text-[#FF5500] font-semibold">
                      <Zap className="w-3.5 h-3.5" />
                      {heroFilter.kvaRange} kVA
                    </span>
                  )}
                  {heroFilter.industry && (
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#111315] font-medium capitalize">
                      {heroFilter.industry}
                    </span>
                  )}
                  {heroFilter.duration && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#111315] font-medium capitalize">
                      <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
                      {heroFilter.duration}
                    </span>
                  )}
                  {heroFilter.city && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#111315] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                      {heroFilter.city}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#625D55] hover:text-[#111315] hover:bg-[#FAF8F5] border border-[#E8E2D9] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-[#FF5500] animate-spin" />
              <p className="text-[#71695F] text-[18px] font-['Outfit',sans-serif]">
                Loading generators...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
              <p className="text-red-500 text-[18px] font-['Outfit',sans-serif]">
                {error}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-6 py-3 bg-[#FF5500] text-white font-['Outfit',sans-serif] font-semibold rounded-xl hover:bg-[#E04400] transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Generator Grid */}
          {!isLoading && !error && (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredGenerators.map((gen) => (
                  <GeneratorCard
                    key={gen.id}
                    generator={gen as unknown as GeneratorType}
                    onViewDetails={() => handleCardClick(gen)}
                    onAddToQuote={() =>
                      router.push(`/book?kVA=${encodeURIComponent(gen.kva)}`)
                    }
                    onCompare={() =>
                      document
                        .getElementById("compare")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!isLoading && !error && filteredGenerators.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <p className="text-[#71695F] text-[18px] font-['Outfit',sans-serif]">
                No generators matched those exact criteria.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-6 py-3 bg-[#FF5500] text-white font-bold text-sm rounded-xl hover:bg-[#E04400] transition-colors"
              >
                Show All Generators
              </button>
            </div>
          )}
        </div>

        {/* Fullscreen Details Modal */}
        <FullscreenGeneratorModal
          isOpen={selectedGenerator !== null}
          onClose={handleClose}
          isLoading={isLoadingDetails}
          fullDetails={fullProductDetails}
          generator={
            selectedGenerator
              ? {
                  id: selectedGenerator.id,
                  badge: selectedGenerator.categoryLabel,
                  series: selectedGenerator.brand,
                  name: selectedGenerator.name,
                  kva: selectedGenerator.kva,
                  rating: selectedGenerator.rating,
                  reviews: selectedGenerator.reviews,
                  description:
                    fullProductDetails?.description ||
                    selectedGenerator.description,
                  pricing: {
                    daily: selectedGenerator.dailyRate,
                    monthly: selectedGenerator.monthlyRate,
                    yearly: selectedGenerator.yearlyRate,
                  },
                  specs: fullProductDetails ? [] : selectedGenerator.specs, // We will handle specs inside Modal if fullDetails exists
                  features: fullProductDetails
                    ? []
                    : selectedGenerator.features, // Handle inside Modal
                  highlights: fullProductDetails
                    ? []
                    : selectedGenerator.highlights,
                  image: selectedGenerator.image,
                }
              : {
                  id: "",
                  name: "",
                  kva: "",
                  rating: 0,
                  reviews: 0,
                  pricing: { daily: "" },
                  specs: [],
                  features: [],
                  highlights: [],
                  image: "",
                }
          }
          suggestedGenerators={
            selectedGenerator
              ? processedGenerators
                  .filter((g) => g.id !== selectedGenerator.id)
                  .slice(0, 3)
                  .map((g) => ({
                    id: g.id,
                    name: g.name,
                    kva: g.kva,
                    dailyRate: g.dailyRate,
                    image: g.image,
                    category: g.categoryLabel,
                  }))
              : []
          }
          onSelectGenerator={(id) => {
            const gen = processedGenerators.find((g) => g.id === id);
            if (gen) setSelectedGenerator(gen);
          }}
        />
      </section>
    </LayoutGroup>
  );
}


