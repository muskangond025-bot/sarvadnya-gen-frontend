"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RentalCalendar, DateTimePicker } from "@/components/common";
import type { DateRange } from "@/components/common/RentalCalendar";
import { generatorsData } from "@/constants/data";
import { Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
interface GeneratorConfig {
  id: string;
  dateRangeId: string;
  generatorId: string;
  generatorType: string;
  quantity: number;
  siteLocation: string;
  googleAddress: string;
  numberOfShifts: number;
  shiftStartTime: string;
  options: {
    standbyGenerator: boolean;
    extraShiftReady: boolean;
    includeTransport: boolean;
    includeFuel: boolean;
  };
}

// Animation variants - Subtle and professional
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

// Default transition for subtle animations
const defaultTransition = { duration: 0.2, ease: "easeOut" };

// Extract unique generator types and generators for dropdown
const availableGenerators = generatorsData
  .filter((g) => g.status === "available" && !g.is_deleted)
  .map((g) => ({
    id: g.id,
    name: g.name,
    type: g.type,
    kva: g.power_output_kva,
    brand: g.brand,
    dailyRate: g.daily_rate,
  }));

// Step Indicator Component - Subtle animations
function StepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const steps = [
    { number: 1, label: "Select Dates" },
    { number: 2, label: "Configure Generators" },
    { number: 3, label: "Review Order" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-4 md:gap-8 mb-12"
    >
      {steps.map((step, idx) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                backgroundColor:
                  currentStep >= step.number ? "#00ff8f" : "transparent",
                borderColor:
                  currentStep >= step.number
                    ? "#00ff8f"
                    : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.2 }}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold border-2 ${
                currentStep >= step.number ? "text-black" : "text-white/40"
              }`}
            >
              {currentStep > step.number ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step.number
              )}
            </motion.div>
            <span
              className={`hidden md:block text-lg font-medium transition-colors duration-200 ${
                currentStep >= step.number ? "text-white" : "text-white/40"
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`w-12 md:w-24 h-0.5 transition-colors duration-200 ${
                currentStep > step.number ? "bg-[#00ff8f]" : "bg-white/10"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
}

// Searchable Dropdown Component
function SearchableDropdown({
  value,
  onChange,
  placeholder = "Search generators...",
}: {
  value: string;
  onChange: (id: string, type: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedGenerator = availableGenerators.find((g) => g.id === value);

  const filteredGenerators = useMemo(() => {
    if (!search) return availableGenerators;
    const query = search.toLowerCase();
    return availableGenerators.filter(
      (g) =>
        g.name.toLowerCase().includes(query) ||
        g.brand.toLowerCase().includes(query) ||
        g.type.toLowerCase().includes(query) ||
        g.kva.includes(query)
    );
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-black text-left rounded-xl border border-white/10 flex items-center justify-between hover:border-[#00ff8f]/50 transition-colors"
      >
        <span className={selectedGenerator ? "text-white" : "text-white/40"}>
          {selectedGenerator ? `${selectedGenerator.name}` : placeholder}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black border border-white/10 rounded-xl overflow-hidden z-50"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-white/10">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, brand, or kVA..."
                className="w-full p-3 bg-white/5 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00ff8f] placeholder:text-white/30"
                autoFocus
              />
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredGenerators.length === 0 ? (
                <div className="p-4 text-center text-white/40">
                  No generators found
                </div>
              ) : (
                filteredGenerators.map((gen, idx) => (
                  <motion.button
                    key={gen.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => {
                      onChange(gen.id, gen.type);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full p-4 text-left hover:bg-[#00ff8f]/10 transition-colors border-b border-white/5 last:border-b-0 ${
                      value === gen.id ? "bg-[#00ff8f]/10" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-medium">
                          {gen.name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#00ff8f] text-sm">
                            {gen.brand}
                          </span>
                          <span className="text-white/30 text-sm">•</span>
                          <span className="text-white/60 text-sm capitalize">
                            {gen.type}
                          </span>
                        </div>
                      </div>
                      <span className="text-[#00ff8f] font-bold">
                        ₹{gen.dailyRate}/day
                      </span>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Minimap/Bookmark Navigation Component
function Minimap({
  selectedRanges,
  generatorConfigs,
  currentStep,
  activeRangeId,
  activeConfigId,
  onRangeClick,
  onConfigClick,
}: {
  selectedRanges: DateRange[];
  generatorConfigs: GeneratorConfig[];
  currentStep: 1 | 2 | 3;
  activeRangeId: string | null;
  activeConfigId: string | null;
  onRangeClick: (rangeId: string) => void;
  onConfigClick: (configId: string) => void;
}) {
  const getConfigsForRange = (rangeId: string) =>
    generatorConfigs.filter((c) => c.dateRangeId === rangeId);

  if (currentStep === 1 && selectedRanges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 w-64 hidden xl:block"
    >
      <div className="p-5 bg-black border border-white/10 rounded-2xl">
        <h4 className="text-[#00ff8f] text-sm font-bold uppercase tracking-wider mb-4">
          Overview
        </h4>

        {/* Date Ranges - Scrollable when many dates */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {selectedRanges.map((range, idx) => {
            const configs = getConfigsForRange(range.id);
            const isActiveRange = activeRangeId === range.id;
            return (
              <motion.div
                key={range.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onRangeClick(range.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  isActiveRange
                    ? "border-2 border-[#00ff8f] bg-[#00ff8f]/5"
                    : "border border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isActiveRange ? "bg-[#00ff8f]" : "bg-white/40"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      isActiveRange ? "text-[#00ff8f]" : "text-white"
                    }`}
                  >
                    {range.start.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                    {" - "}
                    {range.end.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                {configs.length > 0 && (
                  <div className="mt-2 pl-6 space-y-1.5">
                    {configs.map((config) => {
                      const gen = availableGenerators.find(
                        (g) => g.id === config.generatorId
                      );
                      const isActiveConfig = activeConfigId === config.id;
                      return (
                        <div
                          key={config.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onConfigClick(config.id);
                          }}
                          className={`text-sm py-1 px-2 rounded cursor-pointer transition-all ${
                            isActiveConfig
                              ? "text-[#00ff8f] bg-[#00ff8f]/10 border border-[#00ff8f]/50"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {gen ? (
                            `${gen.kva} kVA × ${config.quantity}`
                          ) : (
                            <span className="flex items-center gap-1">
                              <Hourglass className="w-3 h-3 animate-[spin_300ms_ease-out_1]" />
                              Pending
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                {configs.length === 0 && currentStep >= 2 && (
                  <div className="mt-2 pl-6">
                    <span className="text-white/30 text-sm italic">
                      No generators added
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        {selectedRanges.length > 0 && (
          <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Date Ranges</span>
              <span className="text-[#00ff8f] font-bold text-lg">
                {selectedRanges.length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Generators</span>
              <span className="text-[#00ff8f] font-bold text-lg">
                {generatorConfigs.length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Total Units</span>
              <span className="text-[#00ff8f] font-bold text-lg">
                {generatorConfigs.reduce((acc, c) => acc + c.quantity, 0)}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Date Selection Step Component
function DateSelectionStep({
  selectedRanges,
  onRangesChange,
  onContinue,
}: {
  selectedRanges: DateRange[];
  onRangesChange: (ranges: DateRange[]) => void;
  onContinue: () => void;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      {/* Instructions */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="p-6 border border-white/10 rounded-2xl">
          <h3 className="text-[#00ff8f] text-xl font-bold mb-4 font-['Poppins',sans-serif]">
            ✓ How to Select
          </h3>
          <ul className="space-y-2 text-white/70">
            <li>• Click a start date, then click an end date</li>
            <li>• Add multiple ranges by repeating</li>
            <li>• Click × on a tag to remove a range</li>
          </ul>
        </div>
        <div className="p-6 border border-white/10 rounded-2xl">
          <h3 className="text-white/40 text-xl font-bold mb-4 font-['Poppins',sans-serif]">
            ✗ Avoid
          </h3>
          <ul className="space-y-2 text-white/40">
            <li>• Overlapping date ranges</li>
            <li>• Proceeding without all required dates</li>
            <li>• Selecting past dates</li>
          </ul>
        </div>
      </motion.div>

      {/* Calendar */}
      <motion.div variants={fadeInUp} className="p-4 md:p-8">
        <RentalCalendar
          selectionMode="range"
          selectedRanges={selectedRanges}
          onRangesChange={onRangesChange}
        />
      </motion.div>

      {/* Continue Button */}
      <motion.div variants={fadeInUp} className="flex justify-end">
        <motion.button
          whileHover={{ scale: selectedRanges.length > 0 ? 1.02 : 1 }}
          whileTap={{ scale: selectedRanges.length > 0 ? 0.98 : 1 }}
          onClick={onContinue}
          disabled={selectedRanges.length === 0}
          className={`px-8 py-4 rounded-xl text-lg font-bold transition-all ${
            selectedRanges.length > 0
              ? "bg-[#00ff8f] text-black"
              : "border border-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          Continue →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Date Confirmation Modal
function DateConfirmation({
  selectedRanges,
  onEdit,
  onConfirm,
}: {
  selectedRanges: DateRange[];
  onEdit: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-black border border-white/10 w-full max-w-lg p-8 rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif] mb-6">
          Confirm Your Dates
        </h2>
        <p className="text-white/60 mb-6">
          Are all your rental dates selected correctly?
        </p>

        {/* Selected Ranges List */}
        <div className="space-y-3 mb-8 max-h-60 overflow-y-auto">
          {selectedRanges.map((range, idx) => (
            <motion.div
              key={range.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-4 p-4 border border-white/10 rounded-xl"
            >
              <span className="w-8 h-8 rounded-full bg-[#00ff8f] text-black flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </span>
              <span className="text-white text-lg">
                {range.start.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {" → "}
                {range.end.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            className="flex-1 px-6 py-4 border border-white/10 text-white rounded-xl font-bold hover:border-white/20 transition-colors"
          >
            Edit Dates
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 px-6 py-4 bg-[#00ff8f] text-black rounded-xl font-bold"
          >
            Confirm & Continue
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Toggle Switch Component - Subtle animations
function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div
      className="flex items-center justify-between p-4 border border-white/10 rounded-xl cursor-pointer hover:border-white/20 transition-colors"
      onClick={() => onChange(!checked)}
    >
      <div>
        <span className="text-white font-medium">{label}</span>
        <p className="text-white/40 text-sm">{description}</p>
      </div>
      <div
        className={`w-12 h-7 rounded-full relative border-2 transition-colors duration-200 ${
          checked
            ? "bg-[#00ff8f] border-[#00ff8f]"
            : "bg-transparent border-white/20"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200 ${
            checked ? "bg-black left-[20px]" : "bg-white left-[2px]"
          }`}
        />
      </div>
    </div>
  );
}

// Generator Form Component
function GeneratorForm({
  config,
  onUpdate,
  onRemove,
  index,
}: {
  config: GeneratorConfig;
  onUpdate: (updated: GeneratorConfig) => void;
  onRemove: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className="p-6 border border-white/10 rounded-2xl space-y-6"
    >
      {/* Header with Remove */}
      <div className="flex items-center justify-between">
        <h4 className="text-white text-lg font-bold">Generator #{index + 1}</h4>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRemove}
          className="text-white/40 hover:text-[#00ff8f] transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Generator Selection (Searchable Dropdown) */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-white/60 text-sm">Select Generator</label>
          <SearchableDropdown
            value={config.generatorId}
            onChange={(id, type) =>
              onUpdate({ ...config, generatorId: id, generatorType: type })
            }
            placeholder="Search generators..."
          />
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm">Quantity</label>
          <input
            type="number"
            min={1}
            value={config.quantity}
            onChange={(e) =>
              onUpdate({ ...config, quantity: parseInt(e.target.value) || 1 })
            }
            className="w-full p-4 bg-black text-white rounded-xl border border-white/10 focus:outline-none focus:border-[#00ff8f] transition-colors"
          />
        </div>

        {/* Number of Shifts */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm">Number of Shifts</label>
          <input
            type="number"
            min={1}
            value={config.numberOfShifts}
            onChange={(e) =>
              onUpdate({
                ...config,
                numberOfShifts: parseInt(e.target.value) || 1,
              })
            }
            className="w-full p-4 bg-black text-white rounded-xl border border-white/10 focus:outline-none focus:border-[#00ff8f] transition-colors"
          />
        </div>

        {/* Site Location */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-white/60 text-sm">Site Location</label>
          <input
            type="text"
            value={config.siteLocation}
            onChange={(e) =>
              onUpdate({ ...config, siteLocation: e.target.value })
            }
            placeholder="Enter address or use map picker below"
            className="w-full p-4 bg-black text-white rounded-xl border border-white/10 focus:outline-none focus:border-[#00ff8f] transition-colors placeholder:text-white/30"
          />
        </div>

        {/* Google Address Picker */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-white/60 text-sm">Google Maps Address</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={config.googleAddress}
              onChange={(e) =>
                onUpdate({ ...config, googleAddress: e.target.value })
              }
              placeholder="Search for address..."
              className="flex-1 p-4 bg-black text-white rounded-xl border border-white/10 focus:outline-none focus:border-[#00ff8f] transition-colors placeholder:text-white/30"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 border border-white/10 rounded-xl hover:border-[#00ff8f] transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Shift Start Time */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm">Shift Start Time</label>
          <DateTimePicker
            mode="time"
            value={{ time: config.shiftStartTime }}
            onChange={(val) =>
              onUpdate({ ...config, shiftStartTime: val.time || "08:00" })
            }
            placeholder="Select time..."
          />
        </div>
      </div>

      {/* Shift Notice */}
      <div className="p-4 border border-[#00ff8f]/30 rounded-xl">
        <p className="text-[#00ff8f] text-sm flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Each shift is auto-calculated at 6 hours duration
        </p>
      </div>

      {/* Additional Options - 2x2 Grid */}
      <div className="space-y-3">
        <h5 className="text-white/60 text-sm font-medium">
          Additional Options
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ToggleSwitch
            label="Standby Generator"
            description="Backup unit on-site"
            checked={config.options.standbyGenerator}
            onChange={(checked) =>
              onUpdate({
                ...config,
                options: { ...config.options, standbyGenerator: checked },
              })
            }
          />
          <ToggleSwitch
            label="Extra Shift Ready"
            description="Prebook extension"
            checked={config.options.extraShiftReady}
            onChange={(checked) =>
              onUpdate({
                ...config,
                options: { ...config.options, extraShiftReady: checked },
              })
            }
          />
          <ToggleSwitch
            label="Include Transport"
            description="Delivery & pickup"
            checked={config.options.includeTransport}
            onChange={(checked) =>
              onUpdate({
                ...config,
                options: { ...config.options, includeTransport: checked },
              })
            }
          />
          <ToggleSwitch
            label="Include Fuel"
            description="Full tank service"
            checked={config.options.includeFuel}
            onChange={(checked) =>
              onUpdate({
                ...config,
                options: { ...config.options, includeFuel: checked },
              })
            }
          />
        </div>
      </div>
    </motion.div>
  );
}

// Generator Assignment Step Component
function GeneratorAssignmentStep({
  selectedRanges,
  generatorConfigs,
  onConfigsChange,
  onBack,
  onContinue,
  activeRangeId,
  activeConfigId,
}: {
  selectedRanges: DateRange[];
  generatorConfigs: GeneratorConfig[];
  onConfigsChange: (configs: GeneratorConfig[]) => void;
  onBack: () => void;
  onContinue: () => void;
  activeRangeId: string | null;
  activeConfigId: string | null;
}) {
  const createNewConfig = (dateRangeId: string): GeneratorConfig => ({
    id: `config-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    dateRangeId,
    generatorId: "",
    generatorType: "",
    quantity: 1,
    siteLocation: "",
    googleAddress: "",
    numberOfShifts: 1,
    shiftStartTime: "08:00",
    options: {
      standbyGenerator: false,
      extraShiftReady: false,
      includeTransport: true,
      includeFuel: false,
    },
  });

  const addGenerator = (dateRangeId: string) => {
    onConfigsChange([...generatorConfigs, createNewConfig(dateRangeId)]);
  };

  const updateConfig = (updated: GeneratorConfig) => {
    onConfigsChange(
      generatorConfigs.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const removeConfig = (id: string) => {
    onConfigsChange(generatorConfigs.filter((c) => c.id !== id));
  };

  const getConfigsForRange = (rangeId: string) =>
    generatorConfigs.filter((c) => c.dateRangeId === rangeId);

  const hasValidConfigs = selectedRanges.every(
    (range) => getConfigsForRange(range.id).length > 0
  );

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-3xl font-bold text-white font-['Poppins',sans-serif]"
      >
        Configure Generators for Each Date
      </motion.h2>

      {/* Date Range Cards */}
      <div className="space-y-8">
        {selectedRanges.map((range, rangeIdx) => {
          const configs = getConfigsForRange(range.id);
          const isActiveRange = activeRangeId === range.id;
          return (
            <motion.div
              key={range.id}
              id={`range-${range.id}`}
              variants={fadeInUp}
              className={`space-y-4 p-4 -m-4 rounded-2xl transition-all ${
                isActiveRange ? "border-2 border-[#00ff8f] bg-[#00ff8f]/5" : ""
              }`}
            >
              {/* Range Header */}
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: rangeIdx * 0.1, type: "spring" }}
                  className="w-3 h-3 rounded-full bg-[#00ff8f]"
                />
                <h3 className="text-xl font-bold text-white font-['Poppins',sans-serif]">
                  {range.start.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                  {" → "}
                  {range.end.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </h3>
              </div>

              {/* Generator Forms */}
              <div className="space-y-4 pl-7">
                <AnimatePresence mode="popLayout">
                  {configs.map((config, idx) => (
                    <div
                      key={config.id}
                      id={`config-${config.id}`}
                      className={`rounded-2xl transition-all ${
                        activeConfigId === config.id
                          ? "ring-2 ring-[#00ff8f] ring-offset-2 ring-offset-black"
                          : ""
                      }`}
                    >
                      <GeneratorForm
                        config={config}
                        onUpdate={updateConfig}
                        onRemove={() => removeConfig(config.id)}
                        index={idx}
                      />
                    </div>
                  ))}
                </AnimatePresence>

                {/* Add Generator Button */}
                <motion.button
                  whileHover={{ scale: 1.01, borderColor: "#00ff8f" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => addGenerator(range.id)}
                  className="w-full p-4 border border-white/10 rounded-xl text-white/60 hover:text-[#00ff8f] transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Generator
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <motion.div variants={fadeInUp} className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="px-8 py-4 border border-white/10 text-white rounded-xl font-bold hover:border-white/20 transition-colors"
        >
          ← Back
        </motion.button>
        <motion.button
          whileHover={{ scale: hasValidConfigs ? 1.02 : 1 }}
          whileTap={{ scale: hasValidConfigs ? 0.98 : 1 }}
          onClick={onContinue}
          disabled={!hasValidConfigs}
          className={`px-8 py-4 rounded-xl text-lg font-bold transition-all ${
            hasValidConfigs
              ? "bg-[#00ff8f] text-black"
              : "border border-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          Review Order →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Order Summary Step Component
function OrderSummaryStep({
  selectedRanges,
  generatorConfigs,
  onBack,
  onSubmit,
}: {
  selectedRanges: DateRange[];
  generatorConfigs: GeneratorConfig[];
  onBack: () => void;
  onSubmit: () => void;
}) {
  const getGeneratorInfo = (id: string) =>
    availableGenerators.find((g) => g.id === id);

  const getConfigsForRange = (rangeId: string) =>
    generatorConfigs.filter((c) => c.dateRangeId === rangeId);

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-3xl font-bold text-white font-['Poppins',sans-serif]"
      >
        Review Your Order
      </motion.h2>

      {/* Order Summary */}
      <div className="space-y-6">
        {selectedRanges.map((range, rangeIdx) => {
          const configs = getConfigsForRange(range.id);
          return (
            <motion.div
              key={range.id}
              variants={fadeInUp}
              className="p-6 border border-white/10 rounded-2xl space-y-4"
            >
              <h3 className="text-xl font-bold text-[#00ff8f] font-['Poppins',sans-serif]">
                {range.start.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
                {" → "}
                {range.end.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h3>

              {configs.map((config, idx) => {
                const gen = getGeneratorInfo(config.generatorId);
                return (
                  <motion.div
                    key={config.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: (rangeIdx * configs.length + idx) * 0.05,
                    }}
                    className="pl-4 space-y-2 border-l-2 border-[#00ff8f]/30"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-white/40">{idx + 1}.</span>
                      <span className="font-medium">
                        {gen?.name || "Generator"}
                      </span>
                      <span className="text-white/40">× {config.quantity}</span>
                    </div>
                    <div className="text-white/60 text-sm">
                      <p>
                        {config.siteLocation ||
                          config.googleAddress ||
                          "No location specified"}
                      </p>
                      <p>
                        {config.numberOfShifts} shift(s) starting at{" "}
                        {config.shiftStartTime}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.options.standbyGenerator && (
                          <span className="px-2 py-1 border border-[#00ff8f]/30 text-[#00ff8f] text-xs rounded">
                            Standby
                          </span>
                        )}
                        {config.options.extraShiftReady && (
                          <span className="px-2 py-1 border border-[#00ff8f]/30 text-[#00ff8f] text-xs rounded">
                            Extra Shift Ready
                          </span>
                        )}
                        {config.options.includeTransport && (
                          <span className="px-2 py-1 border border-[#00ff8f]/30 text-[#00ff8f] text-xs rounded">
                            Transport
                          </span>
                        )}
                        {config.options.includeFuel && (
                          <span className="px-2 py-1 border border-[#00ff8f]/30 text-[#00ff8f] text-xs rounded">
                            Fuel Included
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <motion.div variants={fadeInUp} className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="px-8 py-4 border border-white/10 text-white rounded-xl font-bold hover:border-white/20 transition-colors"
        >
          ← Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          className="px-8 py-4 bg-[#00ff8f] text-black rounded-xl text-lg font-bold"
        >
          Submit Order
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Main Bulk Order Client Component
export function BulkOrderClient() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedRanges, setSelectedRanges] = useState<DateRange[]>([]);
  const [generatorConfigs, setGeneratorConfigs] = useState<GeneratorConfig[]>(
    []
  );
  const [showDateConfirmation, setShowDateConfirmation] = useState(false);
  const [activeRangeId, setActiveRangeId] = useState<string | null>(null);
  const [activeConfigId, setActiveConfigId] = useState<string | null>(null);

  const handleDatesContinue = () => {
    setShowDateConfirmation(true);
  };

  const handleDatesConfirmed = () => {
    setShowDateConfirmation(false);
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const router = useRouter();

  const handleSubmit = () => {
    // Save to local storage for payments page
    if (typeof window !== "undefined") {
      const checkoutData = {
        selectedRanges,
        generatorConfigs,
        source: "bulk-order",
      };
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

      // Navigate to payments
      router.push("/payments");
    }
  };

  // Scroll to element and highlight
  const scrollToRange = (rangeId: string) => {
    setActiveRangeId(rangeId);
    setActiveConfigId(null);
    const element = document.getElementById(`range-${rangeId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Auto-clear highlight after 2 seconds
    setTimeout(() => setActiveRangeId(null), 2000);
  };

  const scrollToConfig = (configId: string) => {
    setActiveConfigId(configId);
    setActiveRangeId(null);
    const element = document.getElementById(`config-${configId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Auto-clear highlight after 2 seconds
    setTimeout(() => setActiveConfigId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white font-['Poppins',sans-serif] mb-4">
            Bulk
            <br />
            <span className="text-[#00ff8f]">Order</span>
          </h1>
          <p className="text-white/60 text-xl md:text-2xl mb-12 max-w-2xl">
            Configure multiple generators across different dates for large-scale
            projects.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div key="step1" {...scaleIn}>
              <DateSelectionStep
                selectedRanges={selectedRanges}
                onRangesChange={setSelectedRanges}
                onContinue={handleDatesContinue}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" {...scaleIn}>
              <GeneratorAssignmentStep
                selectedRanges={selectedRanges}
                generatorConfigs={generatorConfigs}
                onConfigsChange={setGeneratorConfigs}
                onBack={handleBack}
                onContinue={() => setCurrentStep(3)}
                activeRangeId={activeRangeId}
                activeConfigId={activeConfigId}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div key="step3" {...scaleIn}>
              <OrderSummaryStep
                selectedRanges={selectedRanges}
                generatorConfigs={generatorConfigs}
                onBack={handleBack}
                onSubmit={handleSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date Confirmation Modal */}
        <AnimatePresence>
          {showDateConfirmation && (
            <DateConfirmation
              selectedRanges={selectedRanges}
              onEdit={() => setShowDateConfirmation(false)}
              onConfirm={handleDatesConfirmed}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Minimap */}
      <Minimap
        selectedRanges={selectedRanges}
        generatorConfigs={generatorConfigs}
        currentStep={currentStep}
        activeRangeId={activeRangeId}
        activeConfigId={activeConfigId}
        onRangeClick={scrollToRange}
        onConfigClick={scrollToConfig}
      />
    </div>
  );
}
