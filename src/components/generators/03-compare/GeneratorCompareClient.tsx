"use client";

import React, { useState, useMemo } from "react";
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
  );
}
