"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RentalCalendar, DateTimePicker } from "@/components/common";
import type { DateRange } from "@/components/common/RentalCalendar";
import { generatorsData } from "@/constants/data";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarRange,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Hourglass,
  MapPin,
  Minus,
  Plus,
  Search,
  Trash2,
  X,
  Zap,
} from "lucide-react";
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

// Animation variants
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
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

// Available generators catalog
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

function createDefaultConfig(dateRangeId: string): GeneratorConfig {
  return {
    id: `config-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    dateRangeId,
    generatorId: "",
    generatorType: "",
    quantity: 1,
    siteLocation: "",
    googleAddress: "",
    numberOfShifts: 1,
    shiftStartTime: "08:00 AM",
    options: {
      standbyGenerator: false,
      extraShiftReady: false,
      includeTransport: true,
      includeFuel: false,
    },
  };
}

function getRangeDayCount(range: DateRange): number {
  const start = new Date(range.start);
  const end = new Date(range.end);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
}

function formatRangeShort(range: DateRange): string {
  const startStr = range.start.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const endStr = range.end.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${startStr} → ${endStr}`;
}

function toLocalDateInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseLocalDateInput(value: string): Date | null {
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [y, m, d] = parts;
  return new Date(y, m - 1, d);
}

// Architectural Bright Step Indicator
function StepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const steps = [
    { number: 1, label: "Select Dates" },
    { number: 2, label: "Configure Generators" },
    { number: 3, label: "Review Order" },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white border border-[#E8E2D9] rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_-14px_rgba(17,19,21,0.06)] mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-3">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold border transition-colors shrink-0 ${
                    isActive
                      ? "bg-[#FF5500] border-[#FF5500] text-white shadow-sm shadow-[#FF5500]/25"
                      : isCompleted
                      ? "bg-[#18181B] border-[#18181B] text-white"
                      : "bg-[#FAF8F5] border-[#DED8CE] text-[#6E685F]"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-[#FF5500]" strokeWidth={2.5} />
                  ) : (
                    <span>0{step.number}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm sm:text-[15px] font-semibold truncate ${
                      isActive || isCompleted
                        ? "text-[#111315]"
                        : "text-[#6E685F]"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden sm:block flex-1 h-0.5 bg-[#ECE6DC] rounded-full overflow-hidden mx-2">
                  <motion.div
                    initial={false}
                    animate={{
                      width: currentStep > step.number ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-[#FF5500]"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
}

// Searchable Dropdown (Bright Theme)
function SearchableDropdown({
  value,
  onChange,
  placeholder = "Select generator capacity...",
}: {
  value: string;
  onChange: (generatorId: string, type: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedGenerator = availableGenerators.find((g) => g.id === value);

  const filteredGenerators = useMemo(() => {
    if (!search.trim()) return availableGenerators;
    const query = search.toLowerCase();
    return availableGenerators.filter(
      (g) =>
        g.name.toLowerCase().includes(query) ||
        g.type.toLowerCase().includes(query) ||
        g.brand.toLowerCase().includes(query) ||
        g.kva.toString().includes(query)
    );
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors ${
          isOpen
            ? "bg-white border-[#FF5500] ring-2 ring-[#FF5500]/15"
            : "bg-[#FAF8F5] border-[#DED8CE] hover:border-[#FF5500]"
        }`}
      >
        <div className="min-w-0 flex items-center gap-2.5">
          <Zap
            className={`w-4 h-4 shrink-0 ${
              selectedGenerator ? "text-[#FF5500]" : "text-[#6E685F]"
            }`}
          />
          {selectedGenerator ? (
            <span className="font-medium text-[#111315] truncate">
              {selectedGenerator.name}{" "}
              <span className="font-mono text-xs text-[#FF5500] ml-1">
                ({selectedGenerator.kva} kVA)
              </span>
            </span>
          ) : (
            <span className="text-[#6E685F] truncate">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#524E48] shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-[#FF5500]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 right-0 mt-2 bg-white border border-[#E8E2D9] rounded-2xl shadow-xl z-40 overflow-hidden"
          >
            {/* Search Field */}
            <div className="p-3 border-b border-[#E8E2D9] bg-[#FAF8F5]">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#6E685F] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search kVA, model or brand..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#DED8CE] rounded-lg text-[#111315] placeholder:text-[#6E685F] focus:outline-none focus:border-[#FF5500]"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#F0EBE3]">
              {filteredGenerators.length === 0 ? (
                <div className="p-4 text-center text-sm text-[#6E685F]">
                  No matching generators found
                </div>
              ) : (
                filteredGenerators.map((gen) => {
                  const isSelected = gen.id === value;
                  return (
                    <button
                      key={gen.id}
                      type="button"
                      onClick={() => {
                        onChange(gen.id, gen.type);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between gap-3 transition-colors ${
                        isSelected
                          ? "bg-[#FFF3EC]"
                          : "hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#111315] truncate">
                          {gen.name}
                        </p>
                        <p className="text-xs text-[#524E48] truncate">
                          {gen.brand} · {gen.type}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-md font-mono text-xs font-bold ${
                          isSelected
                            ? "bg-[#FF5500] text-white"
                            : "bg-[#FAF8F5] border border-[#E8E2D9] text-[#111315]"
                        }`}
                      >
                        {gen.kva} kVA
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Toggle Switch Option Card
function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-xl border text-left transition-colors ${
        checked
          ? "bg-[#FFF8F4] border-[#FF5500]/45"
          : "bg-[#FAF8F5] border-[#E8E2D9] hover:border-[#D6CFC4]"
      }`}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#111315]">{label}</p>
        {description && (
          <p className="text-xs text-[#524E48] mt-0.5">{description}</p>
        )}
      </div>

      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-[#FF5500]" : "bg-[#D6CFC4]"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}

// Sticky Right-Hand Fleet Overview Rail
function FleetOverviewRail({
  selectedRanges,
  generatorConfigs,
  activeRangeId,
  activeConfigId,
  onRangeClick,
  onConfigClick,
}: {
  selectedRanges: DateRange[];
  generatorConfigs: GeneratorConfig[];
  activeRangeId: string | null;
  activeConfigId: string | null;
  onRangeClick: (rangeId: string) => void;
  onConfigClick: (configId: string) => void;
}) {
  const totalGenerators = generatorConfigs.length;
  const totalUnits = generatorConfigs.reduce((sum, c) => sum + c.quantity, 0);
  const totalShifts = generatorConfigs.reduce(
    (sum, c) => sum + c.numberOfShifts * c.quantity,
    0
  );

  return (
    <div className="bg-white border border-[#E8E2D9] rounded-3xl overflow-hidden shadow-[0_14px_40px_-14px_rgba(17,19,21,0.07)]">
      {/* Dark Architectural Header Strip */}
      <div className="bg-[#18181B] px-5 py-4 border-b-2 border-[#FF5500]">
        <h3 className="text-base font-bold text-white">
          Fleet Dispatch Overview
        </h3>
      </div>

      <div className="p-5 space-y-5">
        {/* Compact Key Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-center">
            <p className="font-mono text-lg font-bold text-[#111315]">
              {selectedRanges.length}
            </p>
            <p className="text-[11px] font-medium text-[#524E48]">Ranges</p>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-center">
            <p className="font-mono text-lg font-bold text-[#111315]">
              {totalGenerators}
            </p>
            <p className="text-[11px] font-medium text-[#524E48]">Configs</p>
          </div>
          <div className="p-3 rounded-xl bg-[#FFF8F4] border border-[#FF5500]/25 text-center">
            <p className="font-mono text-lg font-bold text-[#FF5500]">
              {totalUnits}
            </p>
            <p className="text-[11px] font-medium text-[#524E48]">Total Units</p>
          </div>
        </div>

        {/* Date Ranges & Attached Units */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-medium text-[#524E48]">
            <span>Selected Windows</span>
            {totalShifts > 0 && (
              <span className="font-mono text-[#111315]">
                {totalShifts} shift-units
              </span>
            )}
          </div>

          {selectedRanges.length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-[#DED8CE] bg-[#FAF8F5] text-center">
              <CalendarRange className="w-5 h-5 text-[#8C847A] mx-auto mb-1.5" />
              <p className="text-xs text-[#524E48]">
                Select one or more date ranges on the calendar to begin building
                your bulk fleet manifest.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-0.5">
              {selectedRanges.map((range, idx) => {
                const configs = generatorConfigs.filter(
                  (c) => c.dateRangeId === range.id
                );
                const isRangeActive = activeRangeId === range.id;

                return (
                  <div
                    key={range.id}
                    className={`rounded-xl border transition-colors p-3 ${
                      isRangeActive
                        ? "border-[#FF5500] bg-[#FFF8F4]"
                        : "border-[#E8E2D9] bg-[#FAF8F5]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onRangeClick(range.id)}
                      className="w-full flex items-center justify-between gap-2 text-left"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-[#18181B] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-[#111315] truncate">
                          {formatRangeShort(range)}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#524E48] shrink-0">
                        {getRangeDayCount(range)}d
                      </span>
                    </button>

                    {configs.length > 0 && (
                      <div className="mt-2 pl-7 space-y-1">
                        {configs.map((cfg) => {
                          const gen = availableGenerators.find(
                            (g) => g.id === cfg.generatorId
                          );
                          const isCfgActive = activeConfigId === cfg.id;

                          return (
                            <button
                              key={cfg.id}
                              type="button"
                              onClick={() => onConfigClick(cfg.id)}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between gap-2 transition-colors ${
                                isCfgActive
                                  ? "bg-[#FF5500] text-white font-semibold"
                                  : "bg-white border border-[#E8E2D9] text-[#403C36] hover:border-[#FF5500]"
                              }`}
                            >
                              <span className="truncate">
                                {gen ? gen.name : "Select model"}
                              </span>
                              <span className="font-mono shrink-0">
                                ×{cfg.quantity}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Perforation Divider Note */}
        <div className="pt-3 border-t border-dashed border-[#DED8CE] flex items-center justify-between text-xs text-[#524E48]">
          <span>Standard Shift</span>
          <span className="font-mono font-semibold text-[#111315]">
            6 Hours / Shift
          </span>
        </div>
      </div>
    </div>
  );
}

// Step 1: Date Selection Component
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
      className="space-y-6"
    >
      {/* Guidance Strip */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFF3EC] border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500]">
              <CalendarRange className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#111315] uppercase tracking-wider">
              How to Select
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-[#403C36]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-2 shrink-0" />
              <span>Click and drag across calendar dates for a range</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-2 shrink-0" />
              <span>Or click start date, then click your end date</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-2 shrink-0" />
              <span>Add multiple non-contiguous ranges as needed</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#DC2626]">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#111315] uppercase tracking-wider">
              Scheduling Notes
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-[#403C36]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 shrink-0" />
              <span>Avoid overlapping date ranges for clean dispatch</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 shrink-0" />
              <span>Past dates cannot be selected for new rentals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 shrink-0" />
              <span>Each range can carry its own set of generators</span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Bright Architectural Calendar Sheet */}
      <motion.div id="bulk-order-calendar" variants={fadeInUp}>
        <RentalCalendar
          selectionMode="range"
          selectedRanges={selectedRanges}
          onRangesChange={onRangesChange}
          minDate={new Date()}
          theme="light"
        />
      </motion.div>

      {/* Action Footer */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2"
      >
        <p className="text-sm font-medium text-[#524E48]">
          {selectedRanges.length === 0 ? (
            "Select at least one rental date range to continue."
          ) : (
            <span>
              <strong className="text-[#111315] font-mono">
                {selectedRanges.length}
              </strong>{" "}
              date range{selectedRanges.length > 1 ? "s" : ""} ready for fleet
              assignment.
            </span>
          )}
        </p>

        <motion.button
          type="button"
          whileHover={{ scale: selectedRanges.length > 0 ? 1.01 : 1 }}
          whileTap={{ scale: selectedRanges.length > 0 ? 0.99 : 1 }}
          onClick={onContinue}
          disabled={selectedRanges.length === 0}
          className={`inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold transition-colors ${
            selectedRanges.length > 0
              ? "bg-[#18181B] hover:bg-[#FF5500] text-white shadow-sm"
              : "bg-[#ECE6DC] border border-[#DED8CE] text-[#8C847A] cursor-not-allowed"
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Date Confirmation Modal (Bright Theme)
function DateConfirmation({
  selectedRanges,
  onRangesChange,
  onClose,
  onConfirm,
}: {
  selectedRanges: DateRange[];
  onRangesChange: (ranges: DateRange[]) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayInput = toLocalDateInput(today);

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const updateRangeDate = (
    rangeId: string,
    field: "start" | "end",
    rawValue: string
  ) => {
    const parsed = parseLocalDateInput(rawValue);
    if (!parsed) return;
    const clamped = parsed < today ? new Date(today) : parsed;

    onRangesChange(
      selectedRanges.map((range) => {
        if (range.id !== rangeId) return range;
        if (field === "start") {
          const nextEnd = clamped > range.end ? clamped : range.end;
          return {
            id: `${clamped.getTime()}-${nextEnd.getTime()}`,
            start: clamped,
            end: nextEnd,
          };
        }
        const nextStart = clamped < range.start ? clamped : range.start;
        return {
          id: `${nextStart.getTime()}-${clamped.getTime()}`,
          start: nextStart,
          end: clamped,
        };
      })
    );
  };

  const removeRange = (rangeId: string) => {
    onRangesChange(selectedRanges.filter((r) => r.id !== rangeId));
  };

  return (
    <motion.div
      key="date-confirmation-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-[#111315]/55 z-[120] flex items-center justify-center p-4 touch-none overscroll-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white border border-[#E8E2D9] rounded-3xl overflow-hidden shadow-2xl touch-auto"
      >
        <div className="bg-[#18181B] px-6 py-5 border-b-2 border-[#FF5500] flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white">
            {isEditing
              ? "Edit Selected Date Ranges"
              : "Confirm Selected Date Ranges"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close date confirmation modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF5500] text-white/80 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {selectedRanges.length === 0 ? (
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-dashed border-[#DED8CE] text-center space-y-3">
              <p className="text-sm font-medium text-[#524E48]">
                No date ranges selected. Select dates on the calendar to
                continue.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#FF5500] text-white text-xs font-bold transition-colors"
              >
                <CalendarRange className="w-4 h-4" />
                <span>Open Calendar</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto overscroll-contain pr-1">
              {selectedRanges.map((range, idx) =>
                isEditing ? (
                  <div
                    key={range.id}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#FF5500]/35 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-[#FF5500] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#524E48]">
                          {getRangeDayCount(range)} day
                          {getRangeDayCount(range) > 1 ? "s" : ""}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRange(range.id)}
                        aria-label={`Remove range ${idx + 1}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <label className="block">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#524E48] mb-1">
                          Start Date
                        </span>
                        <input
                          type="date"
                          min={todayInput}
                          value={toLocalDateInput(range.start)}
                          onChange={(e) =>
                            updateRangeDate(range.id, "start", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-[#DED8CE] rounded-xl text-sm font-medium text-[#111315] focus:outline-none focus:border-[#FF5500]"
                        />
                      </label>
                      <label className="block">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#524E48] mb-1">
                          End Date
                        </span>
                        <input
                          type="date"
                          min={todayInput}
                          value={toLocalDateInput(range.end)}
                          onChange={(e) =>
                            updateRangeDate(range.id, "end", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-[#DED8CE] rounded-xl text-sm font-medium text-[#111315] focus:outline-none focus:border-[#FF5500]"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div
                    key={range.id}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-[#FF5500] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-[#111315] truncate">
                        {formatRangeShort(range)}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#524E48] shrink-0">
                      {getRangeDayCount(range)} day
                      {getRangeDayCount(range) > 1 ? "s" : ""}
                    </span>
                  </div>
                )
              )}
            </div>
          )}

          {isEditing && selectedRanges.length > 0 && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-3 border border-dashed border-[#D6CFC4] hover:border-[#FF5500] rounded-xl text-xs font-semibold text-[#403C36] hover:text-[#FF5500] flex items-center justify-center gap-1.5 transition-colors"
            >
              <CalendarRange className="w-3.5 h-3.5" />
              <span>Pick Additional Dates on Calendar</span>
            </button>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={
                selectedRanges.length === 0
                  ? onClose
                  : () => setIsEditing((prev) => !prev)
              }
              className="flex-1 py-3.5 px-4 border border-[#DED8CE] text-[#111315] rounded-xl font-semibold hover:bg-[#FAF8F5] transition-colors"
            >
              {selectedRanges.length === 0
                ? "Back to Calendar"
                : isEditing
                ? "Done Editing"
                : "Edit Dates"}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={selectedRanges.length === 0}
              className={`flex-1 py-3.5 px-4 rounded-xl font-bold transition-colors ${
                selectedRanges.length > 0
                  ? "bg-[#18181B] hover:bg-[#FF5500] text-white"
                  : "bg-[#ECE6DC] text-[#8C847A] cursor-not-allowed"
              }`}
            >
              Confirm & Continue →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Single Generator Configuration Form (Bright Theme)
function GeneratorForm({
  config,
  onUpdate,
  onRemove,
  index,
  canRemove,
}: {
  config: GeneratorConfig;
  onUpdate: (config: GeneratorConfig) => void;
  onRemove: () => void;
  index: number;
  canRemove: boolean;
}) {
  const openMapLookup = () => {
    const query = (config.googleAddress || config.siteLocation || "Nashik").trim();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 space-y-5"
    >
      {/* Unit Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-[#18181B] text-white font-mono text-xs font-bold flex items-center justify-center">
            #{index + 1}
          </span>
          <h4 className="font-semibold text-[#111315]">
            Generator Configuration
          </h4>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove generator configuration ${index + 1}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        )}
      </div>

      {/* Model Select */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#524E48] mb-2">
          Select Generator Model & Rating
        </label>
        <SearchableDropdown
          value={config.generatorId}
          onChange={(generatorId, generatorType) =>
            onUpdate({ ...config, generatorId, generatorType })
          }
        />
      </div>

      {/* Quantity & Number of Shifts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-[#E8E2D9] rounded-xl p-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#524E48] mb-2.5">
            Quantity (Units)
          </label>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  ...config,
                  quantity: Math.max(1, config.quantity - 1),
                })
              }
              aria-label="Decrease quantity"
              className="w-10 h-10 rounded-lg border border-[#DED8CE] bg-[#FAF8F5] hover:border-[#FF5500] text-[#111315] flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-xl font-bold text-[#111315]">
              {config.quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  ...config,
                  quantity: config.quantity + 1,
                })
              }
              aria-label="Increase quantity"
              className="w-10 h-10 rounded-lg border border-[#DED8CE] bg-[#FAF8F5] hover:border-[#FF5500] text-[#111315] flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#E8E2D9] rounded-xl p-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#524E48] mb-2.5">
            Number of Shifts
          </label>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  ...config,
                  numberOfShifts: Math.max(1, config.numberOfShifts - 1),
                })
              }
              aria-label="Decrease shifts"
              className="w-10 h-10 rounded-lg border border-[#DED8CE] bg-[#FAF8F5] hover:border-[#FF5500] text-[#111315] flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-xl font-bold text-[#111315]">
              {config.numberOfShifts}
            </span>
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  ...config,
                  numberOfShifts: config.numberOfShifts + 1,
                })
              }
              aria-label="Increase shifts"
              className="w-10 h-10 rounded-lg border border-[#DED8CE] bg-[#FAF8F5] hover:border-[#FF5500] text-[#111315] flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Site Location & Maps Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#524E48] mb-2">
            Site Location / Project Name
          </label>
          <div className="relative flex items-center">
            <Building2 className="w-4 h-4 text-[#6E685F] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={config.siteLocation}
              onChange={(e) =>
                onUpdate({ ...config, siteLocation: e.target.value })
              }
              placeholder="e.g., Ambad MIDC Plot 42"
              className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#DED8CE] rounded-xl text-sm text-[#111315] placeholder:text-[#8C847A] focus:outline-none focus:border-[#FF5500]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#524E48] mb-2">
            Google Maps Address
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={config.googleAddress}
              onChange={(e) =>
                onUpdate({ ...config, googleAddress: e.target.value })
              }
              placeholder="Landmark or pin location"
              className="w-full px-4 py-3.5 bg-white border border-[#DED8CE] rounded-xl text-sm text-[#111315] placeholder:text-[#8C847A] focus:outline-none focus:border-[#FF5500]"
            />
            <button
              type="button"
              onClick={openMapLookup}
              title="Open address in Google Maps"
              className="px-3.5 rounded-xl bg-white border border-[#DED8CE] hover:border-[#FF5500] text-[#FF5500] flex items-center justify-center transition-colors shrink-0"
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Shift Start Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#524E48] mb-2">
            Shift Start Time
          </label>
          <DateTimePicker
            mode="time"
            theme="light"
            value={{ time: config.shiftStartTime }}
            onChange={(val) =>
              onUpdate({
                ...config,
                shiftStartTime: val.time || config.shiftStartTime,
              })
            }
            placeholder="Select start time"
            className="bg-white rounded-xl"
          />
        </div>

        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412]">
          <Hourglass className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            Each rental shift covers <strong>6 operating hours</strong> from
            the scheduled start time.
          </p>
        </div>
      </div>

      {/* Additional Service Toggles */}
      <div className="pt-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#524E48] mb-2.5">
          Service & Logistics Options
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            description="Extended runtime support"
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
            description="Delivery & crane handling"
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
            description="Full tank diesel service"
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

// Step 2: Generator Assignment Component
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
  const addGenerator = (dateRangeId: string) => {
    onConfigsChange([...generatorConfigs, createDefaultConfig(dateRangeId)]);
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
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#111315]">
          Configure Generators for Each Date Window
        </h2>
        <p className="text-sm sm:text-base text-[#524E48] mt-1">
          Assign capacity, unit count, shift schedule, and delivery location per
          date range.
        </p>
      </motion.div>

      <div className="space-y-6">
        {selectedRanges.map((range, rangeIdx) => {
          const configs = getConfigsForRange(range.id);
          const isActiveRange = activeRangeId === range.id;

          return (
            <motion.div
              key={range.id}
              id={`range-${range.id}`}
              variants={fadeInUp}
              className={`bg-white border rounded-3xl overflow-hidden shadow-sm transition-all ${
                isActiveRange
                  ? "border-[#FF5500] ring-2 ring-[#FF5500]/25"
                  : "border-[#E8E2D9]"
              }`}
            >
              {/* Range Header Bar */}
              <div className="bg-[#18181B] px-5 sm:px-6 py-4 border-b-2 border-[#FF5500] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#FF5500] text-white font-mono text-xs font-bold flex items-center justify-center">
                    0{rangeIdx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {formatRangeShort(range)}
                  </h3>
                </div>
                <span className="font-mono text-xs text-white/70">
                  {getRangeDayCount(range)} day
                  {getRangeDayCount(range) > 1 ? "s" : ""} · {configs.length}{" "}
                  config{configs.length === 1 ? "" : "s"}
                </span>
              </div>

              {/* Generator Forms Container */}
              <div className="p-4 sm:p-6 space-y-4">
                <AnimatePresence mode="popLayout">
                  {configs.map((config, idx) => (
                    <div
                      key={config.id}
                      id={`config-${config.id}`}
                      className={`rounded-2xl transition-all ${
                        activeConfigId === config.id
                          ? "ring-2 ring-[#FF5500] ring-offset-2"
                          : ""
                      }`}
                    >
                      <GeneratorForm
                        config={config}
                        onUpdate={updateConfig}
                        onRemove={() => removeConfig(config.id)}
                        index={idx}
                        canRemove={configs.length > 1}
                      />
                    </div>
                  ))}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => addGenerator(range.id)}
                  className="w-full py-4 px-4 border-2 border-dashed border-[#D6CFC4] hover:border-[#FF5500] bg-[#FAF8F5] hover:bg-[#FFF8F4] rounded-2xl text-sm font-bold text-[#403C36] hover:text-[#FF5500] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Generator to This Range</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row justify-between gap-3 pt-2"
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-[#DED8CE] bg-white text-[#111315] rounded-xl font-bold hover:border-[#18181B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dates</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!hasValidConfigs}
          className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-colors ${
            hasValidConfigs
              ? "bg-[#18181B] hover:bg-[#FF5500] text-white shadow-sm"
              : "bg-[#ECE6DC] border border-[#DED8CE] text-[#8C847A] cursor-not-allowed"
          }`}
        >
          <span>Review Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// Step 3: Order Summary Component
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
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#111315]">
          Review Your Bulk Order
        </h2>
        <p className="text-sm sm:text-base text-[#524E48] mt-1">
          Verify your date windows, fleet quantities, and site locations before
          proceeding to payment.
        </p>
      </motion.div>

      <div className="space-y-5">
        {selectedRanges.map((range, rangeIdx) => {
          const configs = getConfigsForRange(range.id);
          const rangeUnits = configs.reduce((sum, c) => sum + c.quantity, 0);

          return (
            <motion.div
              key={range.id}
              variants={fadeInUp}
              className="bg-white border border-[#E8E2D9] rounded-3xl overflow-hidden shadow-sm"
            >
              <div className="bg-[#18181B] px-5 sm:px-6 py-4 border-b-2 border-[#FF5500] flex items-center justify-between gap-3">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Window {rangeIdx + 1}: {formatRangeShort(range)}
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-white/10 font-mono text-xs text-white">
                  {rangeUnits} unit{rangeUnits > 1 ? "s" : ""}
                </span>
              </div>

              <div className="p-5 sm:p-6 divide-y divide-[#EFECE6]">
                {configs.map((config, idx) => {
                  const gen = getGeneratorInfo(config.generatorId);
                  return (
                    <div
                      key={config.id}
                      className="py-4 first:pt-0 last:pb-0 space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-[#FFF3EC] text-[#FF5500] font-mono text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-[#111315]">
                            {gen?.name || "Generator Unit"}
                          </span>
                          {gen && (
                            <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8E2D9] font-mono text-xs text-[#524E48]">
                              {gen.kva} kVA
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-sm font-bold text-[#111315]">
                          Qty × {config.quantity}
                        </span>
                      </div>

                      <div className="pl-8 space-y-1.5 text-sm text-[#403C36]">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                          <span>
                            {config.siteLocation ||
                              config.googleAddress ||
                              "Site location to be confirmed"}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                          <span>
                            {config.numberOfShifts} shift(s) starting at{" "}
                            <strong className="text-[#111315]">
                              {config.shiftStartTime}
                            </strong>
                          </span>
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1.5">
                          {config.options.standbyGenerator && (
                            <span className="px-2.5 py-1 bg-[#FFF3EC] border border-[#FF5500]/25 text-[#C2410C] text-xs font-medium rounded-lg">
                              Standby Ready
                            </span>
                          )}
                          {config.options.extraShiftReady && (
                            <span className="px-2.5 py-1 bg-[#FFF3EC] border border-[#FF5500]/25 text-[#C2410C] text-xs font-medium rounded-lg">
                              Extra Shift Ready
                            </span>
                          )}
                          {config.options.includeTransport && (
                            <span className="px-2.5 py-1 bg-[#FFF3EC] border border-[#FF5500]/25 text-[#C2410C] text-xs font-medium rounded-lg">
                              Transport Included
                            </span>
                          )}
                          {config.options.includeFuel && (
                            <span className="px-2.5 py-1 bg-[#FFF3EC] border border-[#FF5500]/25 text-[#C2410C] text-xs font-medium rounded-lg">
                              Fuel Included
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row justify-between gap-3 pt-2"
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-[#DED8CE] bg-white text-[#111315] rounded-xl font-bold hover:border-[#18181B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Configure</span>
        </button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onSubmit}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E04B00] text-white rounded-xl text-base font-bold shadow-md shadow-[#FF5500]/20 transition-colors"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Submit Order & Proceed to Payment</span>
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

  const router = useRouter();

  const handleDatesContinue = () => {
    setShowDateConfirmation(true);
  };

  const handleDatesConfirmed = () => {
    setShowDateConfirmation(false);
    // Keep existing configs for still-selected ranges and seed 1 starter card for newly added ranges
    const validRangeIds = new Set(selectedRanges.map((r) => r.id));
    const filtered = generatorConfigs.filter((c) =>
      validRangeIds.has(c.dateRangeId)
    );
    const missingRanges = selectedRanges.filter(
      (r) => !filtered.some((c) => c.dateRangeId === r.id)
    );
    const seeded = [
      ...filtered,
      ...missingRanges.map((r) => createDefaultConfig(r.id)),
    ];
    setGeneratorConfigs(seeded);
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      const checkoutData = {
        selectedRanges,
        generatorConfigs,
        source: "bulk-order",
      };
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      router.push("/payments");
    }
  };

  const scrollToRange = (rangeId: string) => {
    setActiveRangeId(rangeId);
    setActiveConfigId(null);
    const element = document.getElementById(`range-${rangeId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => setActiveRangeId(null), 1800);
  };

  const scrollToConfig = (configId: string) => {
    setActiveConfigId(configId);
    setActiveRangeId(null);
    const element = document.getElementById(`config-${configId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => setActiveConfigId(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111315] relative overflow-x-clip pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8">
      {/* Subtle Bright Atmospheric Wash & Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 15%, rgba(255,85,0,0.08), transparent 48%), linear-gradient(to right, rgba(24,24,27,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111315] mb-3">
            Bulk <span className="text-[#FF5500]">Order</span>
          </h1>
          <p className="text-[#403C36] text-base sm:text-xl max-w-2xl leading-relaxed">
            Configure multiple generators across different dates for large-scale
            projects.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Responsive 12-Column Workspace + Sticky Manifest Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 min-w-0">
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
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <FleetOverviewRail
              selectedRanges={selectedRanges}
              generatorConfigs={generatorConfigs}
              activeRangeId={activeRangeId}
              activeConfigId={activeConfigId}
              onRangeClick={scrollToRange}
              onConfigClick={scrollToConfig}
            />
          </aside>
        </div>

      </div>

      {/* Date Confirmation Modal rendered outside relative z-10 stacking context */}
      <AnimatePresence>
        {showDateConfirmation && (
          <DateConfirmation
            selectedRanges={selectedRanges}
            onRangesChange={setSelectedRanges}
            onClose={() => {
              setShowDateConfirmation(false);
              const cal = document.getElementById("bulk-order-calendar");
              if (cal) {
                cal.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            onConfirm={handleDatesConfirmed}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
