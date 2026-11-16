"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Fuel,
  Volume2,
  Shield,
  X,
  Check,
  Zap,
  ChevronDown,
  Plus,
  RotateCcw,
  ArrowUpRight,
  ArrowLeftRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CompareGenerator {
  id: string;
  name: string;
  brand: string;
  kva: string;
  type: string;
  pricePerDay: string;
  runtime: string;
  fuelType: string;
  noiseLevel: string;
  bestFor: string;
  hasAutoStart: boolean;
  hasRemoteMonitoring: boolean;
}

interface GeneratorCompareClientProps {
  generators: CompareGenerator[];
}

const COMPARISON_FEATURES = [
  { key: "runtime", label: "How Long It Runs", icon: Clock },
  { key: "fuelType", label: "Fuel Type", icon: Fuel },
  { key: "noiseLevel", label: "Noise Level", icon: Volume2 },
  { key: "hasAutoStart", label: "Auto Start", icon: Zap },
  { key: "hasRemoteMonitoring", label: "Remote Monitoring", icon: Shield },
] as const;

/**
 * Inline Unit Picker List rendered inside a column header when swapping or adding a unit.
 */
function UnitPickerList({
  title,
  subtitle,
  items,
  activeId,
  onSelect,
  onClose,
}: {
  title: string;
  subtitle?: string;
  items: CompareGenerator[];
  activeId?: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full bg-white rounded-2xl border border-[#FF5500]/50 shadow-[0_14px_34px_rgba(255,85,0,0.1)] overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-[#E8E2D9] flex items-center justify-between bg-[#FAF8F5]">
        <div>
          <span className="block font-sans font-bold text-xs sm:text-sm text-[#1F1F1E]">
            {title}
          </span>
          {subtitle && (
            <span className="block font-mono text-[10px] text-[#7A756D]">
              {subtitle}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-full flex items-center justify-center text-[#625D55] hover:bg-[#EFEAE1] hover:text-[#1F1F1E] transition-colors cursor-pointer"
          aria-label="Close selector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-[215px] overflow-y-auto no-scrollbar divide-y divide-[#E8E2D9]/60">
        {items.map((item) => {
          const isCurrent = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelect(item.id);
                onClose();
              }}
              className={cn(
                "w-full text-left px-4 py-2.5 flex items-center justify-between gap-2 transition-colors cursor-pointer",
                isCurrent
                  ? "bg-[#FF5500]/10"
                  : "hover:bg-[#FAF8F5]"
              )}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-extrabold text-sm text-[#1F1F1E]">
                    {item.kva}
                  </span>
                  {isCurrent && (
                    <span className="font-mono text-[9px] font-bold uppercase text-[#FF5500] bg-[#FF5500]/15 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
                <span className="block text-xs text-[#625D55] truncate">
                  {item.brand} • {item.type}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#1F1F1E] shrink-0">
                {item.pricePerDay}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/**
 * Architectural Header Tile for a Selected Generator Slot.
 */
function ActiveSlotHeader({
  slotIndex,
  generator,
  availableGenerators,
  canRemove,
  onReplace,
  onRemove,
}: {
  slotIndex: number;
  generator: CompareGenerator;
  availableGenerators: CompareGenerator[];
  canRemove: boolean;
  onReplace: (newId: string) => void;
  onRemove: () => void;
}) {
  const [isChanging, setIsChanging] = useState(false);

  const [kvaNumber, kvaUnit = "kVA"] = generator.kva.split(" ");

  return (
    <div className="h-full min-h-[255px]">
      <AnimatePresence mode="wait">
        {!isChanging ? (
          <motion.div
            key={`card-${generator.id}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="h-full rounded-2xl bg-white border border-[#E8E2D9] border-t-[3px] border-t-[#FF5500] p-4 sm:p-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(31,31,30,0.04)] hover:shadow-[0_16px_40px_rgba(31,31,30,0.08)] transition-all"
          >
            <div>
              {/* Top Slot Tag & Remove Button */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5500]">
                  Unit 0{slotIndex + 1} • {generator.type}
                </span>

                {canRemove && (
                  <button
                    type="button"
                    onClick={onRemove}
                    className="size-6 rounded-full flex items-center justify-center text-[#8C8275] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    aria-label={`Remove ${generator.kva}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Hero kVA Rating */}
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-sans font-black text-3xl sm:text-4xl text-[#1F1F1E] tracking-tight leading-none tabular-nums">
                  {kvaNumber}
                </span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-[#FF5500]">
                  {kvaUnit}
                </span>
              </div>

              {/* Brand & Highlight Line */}
              <p className="font-sans font-bold text-sm text-[#1F1F1E] mb-1">
                {generator.brand}
              </p>
              <p className="font-sans text-xs text-[#625D55] line-clamp-1 mb-3">
                {generator.bestFor}
              </p>
            </div>

            <div>
              {/* Daily Tariff */}
              <div className="flex items-baseline gap-1 pb-3 mb-3 border-b border-[#E8E2D9]/80">
                <span className="font-sans font-extrabold text-xl text-[#FF5500] tabular-nums">
                  {generator.pricePerDay}
                </span>
                <span className="font-mono text-[11px] text-[#7A756D]">
                  / day
                </span>
              </div>

              {/* Actions: Swap & Direct Enquire */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsChanging(true)}
                  className="flex-1 h-9 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#EFEAE1] border border-[#E8E2D9] text-[#1F1F1E] font-sans font-semibold text-xs flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Change</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#625D55]" />
                </button>

                <Link
                  href={`/book?kVA=${encodeURIComponent(generator.kva)}`}
                  className="h-9 px-3 rounded-xl bg-[#1F1F1E] hover:bg-[#FF5500] text-white font-sans font-bold text-xs inline-flex items-center gap-1 transition-colors shrink-0"
                  title={`Book ${generator.kva}`}
                >
                  <span>Book</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <UnitPickerList
            key={`picker-${generator.id}`}
            title="Select Replacement"
            subtitle={`Replacing ${generator.kva}`}
            items={availableGenerators}
            activeId={generator.id}
            onSelect={(newId) => {
              if (newId !== generator.id) onReplace(newId);
            }}
            onClose={() => setIsChanging(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Empty Dashed Slot allowing inline selection of another generator.
 */
function EmptySlotHeader({
  slotIndex,
  availableToAdd,
  onSelect,
}: {
  slotIndex: number;
  availableToAdd: CompareGenerator[];
  onSelect: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="h-full min-h-[255px]">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="collapsed-slot"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="w-full h-full rounded-2xl border-2 border-dashed border-[#D6CFC4] hover:border-[#FF5500] bg-white/40 hover:bg-white p-5 flex flex-col items-center justify-center gap-3 text-center transition-all group cursor-pointer"
          >
            <div className="size-11 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] group-hover:border-[#FF5500]/40 group-hover:bg-[#FF5500]/10 flex items-center justify-center text-[#7A756D] group-hover:text-[#FF5500] transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-sans font-bold text-sm text-[#1F1F1E]">
                Add Generator
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7A756D] mt-0.5">
                Compare Slot 0{slotIndex + 1}
              </span>
            </div>
          </motion.button>
        ) : (
          <UnitPickerList
            key="expanded-slot"
            title="Add to Comparison"
            subtitle={`Slot 0${slotIndex + 1}`}
            items={availableToAdd}
            onSelect={onSelect}
            onClose={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Spec value renderer for mobile cards & head-to-head cells
 */
function renderSpecValueMobile(
  value: string | boolean | null | undefined,
  isDifferent: boolean
) {
  if (value === undefined || value === null) {
    return <span className="font-mono text-xs text-[#B5AFA5]">—</span>;
  }
  if (typeof value === "boolean") {
    return value ? (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0",
          isDifferent
            ? "bg-[#FF5500] text-white"
            : "bg-[#FF5500]/10 text-[#FF5500]"
        )}
      >
        <Check className="w-3 h-3 shrink-0" />
        <span>Included</span>
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFEAE1] text-[#7A756D] text-[11px] font-medium shrink-0">
        <X className="w-3 h-3 shrink-0" />
        <span>Standard</span>
      </span>
    );
  }
  return (
    <span
      className={cn(
        "font-sans text-xs tracking-tight",
        isDifferent
          ? "font-extrabold text-[#FF5500]"
          : "font-semibold text-[#1F1F1E]"
      )}
    >
      {String(value)}
    </span>
  );
}

interface MobileCompareViewProps {
  generators: CompareGenerator[];
  selectedGenerators: CompareGenerator[];
  selectedIds: string[];
  highlightDifferences: boolean;
  setHighlightDifferences: React.Dispatch<React.SetStateAction<boolean>>;
  onReplace: (oldId: string, newId: string) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onReset: () => void;
}

/**
 * MobileCompareView Component
 *
 * Exclusively rendered on mobile viewports (< 640px).
 * Swipe Card Carousel design:
 * - Touch-snap horizontal carousel with full vertical spec cards.
 * - Tactile "Highlight Diff" toggle switch with animated sliding knob.
 * - Inline "+ Add Generator" slot card and slide-up selection sheet.
 */
function MobileCompareView({
  generators,
  selectedGenerators,
  selectedIds,
  highlightDifferences,
  setHighlightDifferences,
  onReplace,
  onAdd,
  onRemove,
  onReset,
}: MobileCompareViewProps) {
  const [pickerTarget, setPickerTarget] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pickerTarget !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [pickerTarget]);

  const targetGen =
    pickerTarget && pickerTarget !== "add"
      ? generators.find((g) => g.id === pickerTarget)
      : null;

  const handleSelectGenerator = (newId: string) => {
    if (pickerTarget === "add") {
      onAdd(newId);
    } else if (pickerTarget) {
      onReplace(pickerTarget, newId);
    }
    setPickerTarget(null);
  };

  // Helper to check if a feature differs across selected units
  const featureHasDifference = (key: keyof CompareGenerator) => {
    if (selectedGenerators.length <= 1) return false;
    const firstVal = selectedGenerators[0][key];
    return selectedGenerators.some((g) => g[key] !== firstVal);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Mobile Top Interactive Controls Bar */}
      <div className="flex items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-[#E8E2D9]">
        {/* Fleet title & active count badge */}
        <div className="flex items-center gap-2">
          <span className="font-sans font-extrabold text-sm text-[#1F1F1E]">
            Compare Fleet
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF5500] bg-[#FF5500]/10 px-2 py-0.5 rounded-full">
            {selectedGenerators.length} Unit{selectedGenerators.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Right side: Real Tactile Toggle Switch for Highlight Diff + Add/Reset buttons */}
        <div className="flex items-center gap-2">
          {/* Highlight Differences Tactile Toggle Switch */}
          <label className="inline-flex items-center gap-2 cursor-pointer select-none px-2.5 py-1 rounded-full bg-white border border-[#E8E2D9] hover:border-[#FF5500]/40 transition-colors shadow-2xs">
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
              className="sr-only"
            />
            <div
              className={cn(
                "w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 flex items-center",
                highlightDifferences ? "bg-[#FF5500]" : "bg-[#DDD6CA]"
              )}
            >
              <motion.div
                animate={{ x: highlightDifferences ? 14 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="size-3.5 rounded-full bg-white shadow-xs"
              />
            </div>
            <span className="font-sans font-bold text-xs text-[#1F1F1E]">
              Highlight Diff
            </span>
          </label>

          {/* Quick Add / Restore */}
          {selectedGenerators.length < Math.min(3, generators.length) && (
            <button
              type="button"
              onClick={() => setPickerTarget("add")}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E8E2D9] text-xs font-bold text-[#FF5500] hover:bg-[#FAF8F5] transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}

          {selectedGenerators.length < 3 && (
            <button
              type="button"
              onClick={onReset}
              className="p-1.5 rounded-full bg-white border border-[#E8E2D9] text-[#7A756D] hover:text-[#1F1F1E] hover:bg-[#FAF8F5] transition-colors cursor-pointer shadow-2xs"
              title="Restore 3 Units"
              aria-label="Restore 3 Units"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* SWIPE CARD CAROUSEL (Horizontal Touch Snap for All Selected Units) */}
      <div className="w-full flex flex-col">
        <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 pt-1 px-0.5">
          {selectedGenerators.map((gen, idx) => {
            const [num, unit = "kVA"] = gen.kva.split(" ");
            return (
              <div
                key={`mobile-carousel-card-${gen.id}`}
                className="w-[84vw] max-w-[325px] shrink-0 snap-center rounded-2xl bg-white border border-[#E8E2D9] border-t-[3px] border-t-[#FF5500] p-4 flex flex-col justify-between shadow-[0_6px_20px_rgba(31,31,30,0.04)]"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF5500]">
                      Unit 0{idx + 1} • {gen.type}
                    </span>
                    {selectedGenerators.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemove(gen.id)}
                        className="size-6 rounded-full flex items-center justify-center text-[#8C8275] hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        aria-label={`Remove ${gen.kva}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Hero kVA */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-sans font-black text-3xl text-[#1F1F1E] tracking-tight">
                      {num}
                    </span>
                    <span className="font-mono text-sm font-extrabold text-[#FF5500]">
                      {unit}
                    </span>
                  </div>

                  <p className="font-sans font-bold text-sm text-[#1F1F1E]">
                    {gen.brand}
                  </p>
                  <p className="font-sans text-xs text-[#625D55] line-clamp-1 mb-2.5">
                    {gen.bestFor}
                  </p>

                  {/* Price Bar */}
                  <div className="flex items-baseline gap-1 pb-3 mb-3 border-b border-[#E8E2D9]/80">
                    <span className="font-sans font-extrabold text-xl text-[#FF5500]">
                      {gen.pricePerDay}
                    </span>
                    <span className="font-mono text-xs text-[#7A756D]">
                      / day
                    </span>
                  </div>

                  {/* Full Spec List */}
                  <div className="space-y-2 mb-4">
                    {COMPARISON_FEATURES.map((feature) => {
                      const Icon = feature.icon;
                      const val = gen[feature.key as keyof CompareGenerator];
                      const hasDiff = featureHasDifference(
                        feature.key as keyof CompareGenerator
                      );
                      const isHighlighted = highlightDifferences && hasDiff;

                      return (
                        <div
                          key={`carousel-spec-${feature.key}`}
                          className={cn(
                            "flex items-center justify-between py-2 px-2.5 rounded-xl border text-xs transition-colors",
                            isHighlighted
                              ? "bg-[#FFF4ED] border-[#FF5500]/40"
                              : "bg-[#FAF8F5] border-[#E8E2D9]/80"
                          )}
                        >
                          <div className="flex items-center gap-2 text-[#625D55]">
                            <Icon className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                            <span className="font-sans font-medium">
                              {feature.label}
                            </span>
                          </div>
                          <div>{renderSpecValueMobile(val, isHighlighted)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-2.5 border-t border-[#E8E2D9]/80">
                  <button
                    type="button"
                    onClick={() => setPickerTarget(gen.id)}
                    className="flex-1 h-9 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#EFEAE1] border border-[#E8E2D9] text-[#1F1F1E] font-sans font-semibold text-xs flex items-center justify-between cursor-pointer"
                  >
                    <span>Change</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#625D55]" />
                  </button>

                  <Link
                    href={`/book?kVA=${encodeURIComponent(gen.kva)}`}
                    className="h-9 px-4 rounded-xl bg-[#1F1F1E] hover:bg-[#FF5500] text-white font-sans font-bold text-xs inline-flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <span>Book</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Empty Add Card if fewer than 3 */}
          {selectedGenerators.length < Math.min(3, generators.length) && (
            <button
              type="button"
              onClick={() => setPickerTarget("add")}
              className="w-[84vw] max-w-[325px] shrink-0 snap-center min-h-[380px] rounded-2xl border-2 border-dashed border-[#D6CFC4] hover:border-[#FF5500] bg-white/50 p-5 flex flex-col items-center justify-center gap-3 text-center transition-colors cursor-pointer"
            >
              <div className="size-12 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500]">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-sans font-bold text-sm text-[#1F1F1E]">
                  Add Generator
                </span>
                <span className="block font-mono text-[10px] uppercase text-[#7A756D] mt-0.5">
                  Compare up to 3 units
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Swipe Hint */}
        <p className="text-center font-mono text-[11px] text-[#7A756D] mt-2">
          ← Swipe cards to compare specifications →
        </p>
      </div>

      {/* Mobile Generator Picker Bottom Sheet Modal (Portalled to document.body to prevent any stacking context or footer overlap) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {pickerTarget !== null && (
            <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPickerTarget(null)}
                className="fixed inset-0 bg-black/65 backdrop-blur-xs z-10"
              />

              {/* Sheet Content */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="relative z-20 w-full sm:max-w-md bg-white rounded-t-3xl max-h-[82vh] flex flex-col shadow-2xl border-t border-[#E8E2D9] overflow-hidden"
              >
                {/* Grab Handle */}
                <div className="pt-2 pb-1 flex justify-center">
                  <div className="w-10 h-1 rounded-full bg-[#D6CFC4]" />
                </div>

                {/* Header */}
                <div className="px-5 py-3 border-b border-[#E8E2D9] flex items-center justify-between">
                  <div>
                    <h4 className="font-sans font-extrabold text-base text-[#1F1F1E]">
                      {targetGen
                        ? `Replace ${targetGen.kva}`
                        : "Add Generator to Compare"}
                    </h4>
                    <p className="font-mono text-[11px] text-[#7A756D]">
                      Choose from our verified silent fleet
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPickerTarget(null)}
                    className="size-8 rounded-full flex items-center justify-center text-[#625D55] hover:bg-[#FAF8F5] cursor-pointer"
                    aria-label="Close picker"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Generator List */}
                <div className="overflow-y-auto p-3 pb-8 space-y-2 divide-y divide-[#E8E2D9]/40 no-scrollbar">
                  {generators.map((gen) => {
                    const isCurrentlySelected = selectedIds.includes(gen.id);
                    const isTargetUnit = targetGen?.id === gen.id;

                    return (
                      <button
                        key={`picker-item-${gen.id}`}
                        type="button"
                        onClick={() => handleSelectGenerator(gen.id)}
                        className={cn(
                          "w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer",
                          isTargetUnit
                            ? "bg-[#FF5500]/10 border border-[#FF5500]/40"
                            : isCurrentlySelected
                              ? "bg-[#FAF8F5] border border-[#E8E2D9]"
                              : "hover:bg-[#FAF8F5] border border-transparent"
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="font-sans font-black text-base text-[#1F1F1E]">
                              {gen.kva}
                            </span>
                            <span className="text-xs text-[#625D55] font-medium">
                              • {gen.brand}
                            </span>
                            {isTargetUnit && (
                              <span className="font-mono text-[9px] font-bold uppercase text-[#FF5500] bg-[#FF5500]/15 px-1.5 py-0.5 rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#7A756D] line-clamp-1">
                            {gen.type} • {gen.runtime} • {gen.noiseLevel}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block font-sans font-extrabold text-sm text-[#FF5500]">
                            {gen.pricePerDay}
                          </span>
                          <span className="font-mono text-[10px] text-[#7A756D]">
                            per day
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

/**
 * GeneratorCompareClient Component
 *
 * Unique Architectural Spec Matrix:
 * - Unified 4-column CSS Grid guarantees flawless row alignment at any height
 * - Mobile sticky left specification column + smooth touch scroll with zero visible scrollbars
 * - Spotlight Difference Highlighter illuminates mismatched specs directly in warm amber wash
 */
export function GeneratorCompareClient({
  generators,
}: GeneratorCompareClientProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    generators.slice(0, 3).map((g) => g.id)
  );
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const selectedGenerators = useMemo(
    () =>
      selectedIds
        .map((id) => generators.find((g) => g.id === id))
        .filter(Boolean) as CompareGenerator[],
    [selectedIds, generators]
  );

  const availableToAdd = useMemo(
    () => generators.filter((g) => !selectedIds.includes(g.id)),
    [generators, selectedIds]
  );

  const addGenerator = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeGenerator = (id: string) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((gid) => gid !== id));
    }
  };

  const replaceGenerator = (oldId: string, newId: string) => {
    if (selectedIds.includes(newId) && newId !== oldId) return;
    setSelectedIds(selectedIds.map((id) => (id === oldId ? newId : id)));
  };

  const clearAll = () => {
    if (generators[0]) setSelectedIds([generators[0].id]);
  };

  const resetAll = () => {
    setSelectedIds(generators.slice(0, 3).map((g) => g.id));
  };

  const slots = [0, 1, 2];

  return (
    <div className="w-full flex flex-col">
      {/* Mobile Dedicated Responsive View (< 640px) */}
      <div className="block sm:hidden w-full">
        <MobileCompareView
          generators={generators}
          selectedGenerators={selectedGenerators}
          selectedIds={selectedIds}
          highlightDifferences={highlightDifferences}
          setHighlightDifferences={setHighlightDifferences}
          onReplace={replaceGenerator}
          onAdd={addGenerator}
          onRemove={removeGenerator}
          onReset={resetAll}
        />
      </div>

      {/* Desktop Spec Matrix (sm: and above) - 100% UNCHANGED */}
      <div className="hidden sm:flex flex-col w-full">
        {/* Top Interactive Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E8E2D9]">
          {/* Highlight Differences Tactile Switch */}
          <label className="inline-flex items-center gap-3 cursor-pointer select-none px-4 py-2 rounded-full bg-white border border-[#E8E2D9] hover:border-[#FF5500]/40 transition-colors shadow-2xs">
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
              className="sr-only"
            />
            <div
              className={cn(
                "w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 flex items-center",
                highlightDifferences ? "bg-[#FF5500]" : "bg-[#DDD6CA]"
              )}
            >
              <motion.div
                animate={{ x: highlightDifferences ? 18 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="size-4.5 rounded-full bg-white shadow-xs"
              />
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm text-[#1F1F1E]">
              Highlight Differences
            </span>
          </label>

          {/* Slot Controls */}
          <div className="flex items-center gap-4">
            {selectedGenerators.length < Math.min(3, generators.length) && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#625D55] hover:text-[#FF5500] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore 3 Units</span>
              </button>
            )}

            {selectedGenerators.length > 1 && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FF5500] hover:text-[#1F1F1E] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-between text-[11px] font-mono text-[#7A756D] mb-3 px-1">
          <span>Side-by-Side Specs</span>
          <span className="text-[#FF5500] font-semibold">Swipe units →</span>
        </div>

        {/* Unified Architectural Comparison Grid */}
        <div className="w-full overflow-x-auto no-scrollbar pb-2">
          <div className="min-w-[760px] lg:min-w-full grid grid-cols-[150px_repeat(3,minmax(200px,1fr))] sm:grid-cols-[190px_repeat(3,minmax(210px,1fr))] lg:grid-cols-[240px_repeat(3,1fr)] gap-x-3 sm:gap-x-5 items-stretch">
            {/* Row 0: Features Column Label + 3 Slot Headers */}
            <div className="sticky left-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-xs flex flex-col justify-end pb-5 pr-3 pl-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5500] mb-1">
                Technical Matrix
              </span>
              <h4 className="font-sans font-extrabold text-xl text-[#1F1F1E] tracking-tight">
                Specifications
              </h4>
              <p className="font-sans text-xs text-[#7A756D] mt-1">
                Comparing {selectedGenerators.length} selected unit{selectedGenerators.length > 1 ? "s" : ""}
              </p>
            </div>

            {slots.map((slotIdx) => {
              const gen = selectedGenerators[slotIdx];
              return (
                <div key={`header-slot-${slotIdx}`} className="pb-4">
                  {gen ? (
                    <ActiveSlotHeader
                      slotIndex={slotIdx}
                      generator={gen}
                      availableGenerators={generators.filter(
                        (g) => g.id === gen.id || !selectedIds.includes(g.id)
                      )}
                      canRemove={selectedGenerators.length > 1}
                      onReplace={(newId) => replaceGenerator(gen.id, newId)}
                      onRemove={() => removeGenerator(gen.id)}
                    />
                  ) : (
                    <EmptySlotHeader
                      slotIndex={slotIdx}
                      availableToAdd={availableToAdd}
                      onSelect={addGenerator}
                    />
                  )}
                </div>
              );
            })}

            {/* Spec Comparison Rows (Unified Grid Alignment — Zero Height Mismatch) */}
            {COMPARISON_FEATURES.map((feature) => {
              const values = selectedGenerators.map(
                (g) => g[feature.key as keyof CompareGenerator]
              );
              const hasDifference =
                values.length > 1 && values.some((v) => v !== values[0]);
              const highlightRow = highlightDifferences && hasDifference;
              const FeatureIcon = feature.icon;

              return (
                <React.Fragment key={feature.key}>
                  {/* Sticky Feature Label Cell */}
                  <div
                    className={cn(
                      "sticky left-0 z-20 backdrop-blur-xs py-4 sm:py-5 pr-3 pl-1 sm:pl-2 border-b border-[#E8E2D9] flex items-center gap-2.5 sm:gap-3 transition-colors",
                      highlightRow ? "bg-[#FFF4ED]/95" : "bg-[#FAF8F5]/95"
                    )}
                  >
                    <div
                      className={cn(
                        "size-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors",
                        highlightRow
                          ? "bg-[#FF5500] border-[#FF5500] text-white"
                          : "bg-white border-[#E8E2D9] text-[#FF5500]"
                      )}
                    >
                      <FeatureIcon className="w-4 h-4" />
                    </div>
                    <span className="font-sans font-bold text-xs sm:text-sm text-[#1F1F1E]">
                      {feature.label}
                    </span>
                  </div>

                  {/* Spec Values across Slots 0..2 */}
                  {slots.map((slotIdx) => {
                    const gen = selectedGenerators[slotIdx];
                    if (!gen) {
                      return (
                        <div
                          key={`cell-empty-${feature.key}-${slotIdx}`}
                          className="py-4 sm:py-5 px-4 sm:px-5 border-b border-[#E8E2D9] flex items-center text-[#B5AFA5] font-mono text-sm"
                        >
                          —
                        </div>
                      );
                    }

                    const value = gen[feature.key as keyof CompareGenerator];
                    const isDifferent =
                      highlightDifferences &&
                      hasDifference &&
                      value !== values[0];

                    return (
                      <div
                        key={`cell-${gen.id}-${feature.key}`}
                        className={cn(
                          "py-4 sm:py-5 px-4 sm:px-5 border-b border-[#E8E2D9] flex items-center transition-colors",
                          highlightRow && "bg-[#FF5500]/[0.04]",
                          isDifferent && "bg-[#FF5500]/[0.09]"
                        )}
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                                isDifferent
                                  ? "bg-[#FF5500] text-white"
                                  : "bg-[#FF5500]/10 text-[#FF5500]"
                              )}
                            >
                              <Check className="w-3.5 h-3.5 shrink-0" />
                              <span>Included</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFEAE1] text-[#7A756D] text-xs font-semibold">
                              <X className="w-3.5 h-3.5 shrink-0" />
                              <span>Standard</span>
                            </span>
                          )
                        ) : (
                          <span
                            className={cn(
                              "font-sans text-sm sm:text-base tracking-tight transition-colors",
                              isDifferent
                                ? "font-extrabold text-[#FF5500]"
                                : "font-semibold text-[#1F1F1E]"
                            )}
                          >
                            {String(value)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
