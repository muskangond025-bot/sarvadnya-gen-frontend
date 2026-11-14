"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Plus, Minus, ArrowRight, Receipt, Clock, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { RentalCalendar } from "@/components/common";

interface Generator {
  id: string;
  name: string;
  power_output_kva: string;
  daily_rate: string;
  type: string;
  status: string;
  features: string[];
  brand: string;
  fuel_type: string;
}

interface BookingClientProps {
  generators: Generator[];
  initialKvaRaw?: string | null;
}

const SHIFT_OPTIONS = [
  {
    hours: 4,
    label: "4 Hours",
    sublabel: "Short Event / Standby",
    multiplier: 0.75,
    tag: "0.75x Base",
  },
  {
    hours: 8,
    label: "8 Hours",
    sublabel: "Standard Single Shift",
    multiplier: 1.0,
    tag: "1.0x Base",
  },
  {
    hours: 12,
    label: "12 Hours",
    sublabel: "Extended Industrial",
    multiplier: 1.35,
    tag: "1.35x Extended",
  },
  {
    hours: 24,
    label: "24 Hours",
    sublabel: "Continuous 24/7 Run",
    multiplier: 1.8,
    tag: "1.80x Continuous",
  },
] as const;

function parseKvaParam(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed)) return null;
  return Math.max(2, Math.min(500, parsed));
}

function PowerSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const marks = [5, 10, 25, 50, 100, 150, 250, 500];
  const progress = ((value - 2) / 498) * 100;

  return (
    <div className="w-full">
      {/* Top Scale Header */}
      <div className="flex justify-between items-end mb-6">
        <span className="font-mono text-xs sm:text-sm text-[#111315] font-bold px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9]">
          2 kVA
        </span>

        <div className="text-center flex items-baseline justify-center">
          <span className="font-sans text-5xl sm:text-6xl font-black text-[#FF5500] tracking-tight tabular-nums leading-none">
            {value}
          </span>
          <span className="font-mono text-lg sm:text-xl font-extrabold text-[#111315] ml-2">
            kVA
          </span>
        </div>

        <span className="font-mono text-xs sm:text-sm text-[#111315] font-bold px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9]">
          500 kVA
        </span>
      </div>

      {/* Calibrated Gauge Slider */}
      <div className="relative py-2">
        <input
          type="range"
          min={2}
          max={500}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Power requirement in kVA"
          className="w-full h-3 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-7
            [&::-webkit-slider-thumb]:h-7
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[#FF5500]
            [&::-webkit-slider-thumb]:border-3
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-[0_4px_14px_rgba(255,85,0,0.45)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-7
            [&::-moz-range-thumb]:h-7
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[#FF5500]
            [&::-moz-range-thumb]:border-3
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:shadow-[0_4px_14px_rgba(255,85,0,0.45)]
            [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #FF5500 ${progress}%, #E2DBD0 ${progress}%)`,
          }}
        />

        {/* Ruler Graduation Ticks */}
        <div
          aria-hidden="true"
          className="flex justify-between px-1 mt-2 pointer-events-none"
        >
          {Array.from({ length: 21 }).map((_, idx) => (
            <span
              key={`tick-${idx}`}
              className={
                idx % 5 === 0
                  ? "w-px h-2.5 bg-[#7A756D]"
                  : "w-px h-1.5 bg-[#CFC8BC]"
              }
            />
          ))}
        </div>
      </div>

      {/* Clickable kVA Preset Marks */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-5">
        {marks.map((mark) => {
          const isExact = value === mark;
          const isReached = value >= mark;
          return (
            <button
              key={mark}
              type="button"
              onClick={() => onChange(mark)}
              className={cn(
                "py-2 px-2 rounded-xl font-mono text-xs font-extrabold transition-all cursor-pointer text-center border",
                isExact
                  ? "bg-[#FF5500] border-[#FF5500] text-white shadow-sm shadow-[#FF5500]/25"
                  : isReached
                  ? "bg-[#FFF5EE] border-[#FF5500]/40 text-[#C74000] hover:bg-[#FF5500] hover:text-white"
                  : "bg-[#FAF8F5] border-[#E8E2D9] text-[#111315] hover:border-[#111315]"
              )}
            >
              {mark}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GeneratorOptionCard({
  generator,
  isSelected,
  onSelect,
}: {
  generator: Generator;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const kvaNumeric = parseFloat(generator.power_output_kva);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-200 group cursor-pointer flex flex-col justify-between",
        isSelected
          ? "bg-white border-2 border-[#FF5500] shadow-[0_16px_38px_rgba(255,85,0,0.12)]"
          : "bg-white border border-[#E8E2D9] hover:border-[#111315]/40 shadow-2xs"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#FF5500]">
            {generator.brand} • {generator.fuel_type}
          </span>

          <div
            className={cn(
              "size-7 rounded-full flex items-center justify-center shrink-0 transition-colors border",
              isSelected
                ? "bg-[#FF5500] border-[#FF5500] text-white"
                : "bg-[#FAF8F5] border-[#D6CFC4] text-[#403C36] group-hover:border-[#FF5500] group-hover:text-[#FF5500]"
            )}
          >
            {isSelected ? (
              <Check className="w-4 h-4 stroke-[2.75]" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </div>
        </div>

        <h3 className="font-sans text-lg font-extrabold text-[#111315] group-hover:text-[#FF5500] transition-colors leading-snug">
          {generator.name}
        </h3>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-3 py-3.5 my-3.5 border-y border-[#E8E2D9]">
          <div className="inline-flex items-baseline gap-1">
            <span className="font-sans text-2xl sm:text-3xl font-black text-[#111315] tabular-nums leading-none">
              {kvaNumeric}
            </span>
            <span className="font-mono text-xs font-extrabold text-[#FF5500] uppercase">
              kVA
            </span>
          </div>

          <div className="text-right">
            <span className="font-sans text-xl sm:text-2xl font-extrabold text-[#111315] tabular-nums">
              ₹{parseInt(generator.daily_rate, 10).toLocaleString("en-IN")}
            </span>
            <span className="font-mono text-[11px] text-[#524E48] font-semibold ml-1">
              / day
            </span>
          </div>
        </div>

        {generator.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {generator.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="font-sans text-[11px] font-semibold text-[#403C36] px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E8E2D9]"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

export function BookingClient({
  generators,
  initialKvaRaw = null,
}: BookingClientProps) {
  const router = useRouter();
  const initialKva = parseKvaParam(initialKvaRaw);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [powerRequirement, setPowerRequirement] = useState<number>(
    initialKva ?? 25
  );
  const [selectedGeneratorId, setSelectedGeneratorId] = useState<string | null>(
    null
  );
  const [operatingHours, setOperatingHours] = useState<number>(8);
  const [quantity, setQuantity] = useState<number>(1);

  const filteredGenerators = useMemo(() => {
    return generators
      .filter(
        (g) =>
          g.status === "available" &&
          parseFloat(g.power_output_kva) >= powerRequirement
      )
      .sort(
        (a, b) =>
          parseFloat(a.power_output_kva) - parseFloat(b.power_output_kva)
      );
  }, [generators, powerRequirement]);

  const selectedGenerator = useMemo(() => {
    if (selectedGeneratorId) {
      const explicit = filteredGenerators.find(
        (g) => g.id === selectedGeneratorId
      );
      if (explicit) return explicit;
    }
    return initialKva !== null ? filteredGenerators[0] ?? null : null;
  }, [selectedGeneratorId, filteredGenerators, initialKva]);

  const sortedDates = useMemo(() => {
    return [...selectedDates].sort((a, b) => a.getTime() - b.getTime());
  }, [selectedDates]);

  const startDateLabel =
    sortedDates.length > 0
      ? sortedDates[0].toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Not selected";

  const endDateLabel =
    sortedDates.length > 0
      ? sortedDates[sortedDates.length - 1].toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Not selected";

  const totalDays = selectedDates.length;
  const INSURANCE_PER_DAY = 200;
  const DELIVERY_COST = 1500;

  const selectedShift = useMemo(() => {
    return (
      SHIFT_OPTIONS.find((s) => s.hours === operatingHours) ?? SHIFT_OPTIONS[1]
    );
  }, [operatingHours]);

  const baseDailyRate = useMemo(() => {
    if (!selectedGenerator) return 0;
    return parseFloat(selectedGenerator.daily_rate) || 0;
  }, [selectedGenerator]);

  const adjustedDailyRate = useMemo(() => {
    return Math.round(baseDailyRate * selectedShift.multiplier);
  }, [baseDailyRate, selectedShift]);

  const rentalSubtotal = useMemo(() => {
    return totalDays * adjustedDailyRate * quantity;
  }, [totalDays, adjustedDailyRate, quantity]);

  const insuranceSubtotal = useMemo(() => {
    return totalDays * INSURANCE_PER_DAY * quantity;
  }, [totalDays, quantity]);

  const totalPrice = useMemo(() => {
    if (!selectedGenerator || totalDays === 0) return 0;
    return rentalSubtotal + insuranceSubtotal + DELIVERY_COST;
  }, [totalDays, selectedGenerator, rentalSubtotal, insuranceSubtotal]);

  const canCheckout = Boolean(selectedGenerator && totalDays > 0);

  const handleProceedToCheckout = () => {
    if (!canCheckout || !selectedGenerator || sortedDates.length === 0) return;

    if (typeof window !== "undefined") {
      const rangeId = `range-${Date.now()}`;
      const checkoutPayload = {
        selectedRanges: [
          {
            id: rangeId,
            start: sortedDates[0].toISOString(),
            end: sortedDates[sortedDates.length - 1].toISOString(),
          },
        ],
        generatorConfigs: [
          {
            dateRangeId: rangeId,
            quantity: quantity,
            numberOfShifts:
              operatingHours <= 8 ? 1 : operatingHours <= 16 ? 2 : 3,
            operatingHours: operatingHours,
            generatorId: selectedGenerator.id,
            generatorName: selectedGenerator.name,
            powerOutputKva: selectedGenerator.power_output_kva,
            dailyRate: adjustedDailyRate,
            totalPrice: totalPrice,
            siteLocation: "Direct Delivery",
          },
        ],
      };
      localStorage.setItem("checkoutData", JSON.stringify(checkoutPayload));
    }

    router.push("/payments");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION 01: PICK YOUR DATES (Tactile Printed Calendar Design) */}
      <section className="py-12 sm:py-16 border-b border-[#E8E2D9]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-4 flex flex-col items-start">
            <span className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF5500] mb-2">
              01
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111315] tracking-tight mb-4">
              Pick Your Dates
            </h2>

            <div className="w-full pt-4 border-t border-[#E8E2D9] space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#403C36] font-semibold">Start Date</span>
                <span className="text-[#111315] font-bold">
                  {startDateLabel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#403C36] font-semibold">End Date</span>
                <span className="text-[#111315] font-bold">{endDateLabel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#403C36] font-semibold">
                  Rental Days
                </span>
                <span className="font-mono text-[#FF5500] font-extrabold">
                  {totalDays || "—"}
                </span>
              </div>
            </div>

            {selectedDates.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedDates([])}
                className="mt-5 font-mono text-xs font-bold text-[#FF5500] hover:text-[#111315] transition-colors cursor-pointer"
              >
                Clear ({selectedDates.length})
              </button>
            )}
          </div>

          <div className="lg:col-span-8">
            <RentalCalendar
              theme="light"
              selectionMode="individual"
              selectedDates={selectedDates}
              onDatesChange={setSelectedDates}
            />
          </div>
        </div>
      </section>

      {/* SECTION 02: HOW MUCH POWER? (Calibrated Gauge Panel) */}
      <section className="py-12 sm:py-16 border-b border-[#E8E2D9]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-4 flex flex-col items-start">
            <span className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF5500] mb-2">
              02
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111315] tracking-tight mb-4">
              How Much Power?
            </h2>

            <div className="w-full pt-4 border-t border-[#E8E2D9] flex justify-between items-baseline text-sm">
              <span className="text-[#403C36] font-semibold">Power Needed</span>
              <span className="font-mono text-lg font-extrabold text-[#FF5500]">
                {powerRequirement} kVA
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-[#E8E2D9] rounded-2xl p-6 sm:p-8 shadow-xs">
            <PowerSlider
              value={powerRequirement}
              onChange={setPowerRequirement}
            />
          </div>
        </div>
      </section>

      {/* SECTION 03: AVAILABLE GENERATORS (2-Column Architectural Cards) */}
      <section className="py-12 sm:py-16 border-b border-[#E8E2D9]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-4 flex flex-col items-start">
            <span className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF5500] mb-2">
              03
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111315] tracking-tight mb-4">
              Available Generators
            </h2>

            <div className="w-full pt-4 border-t border-[#E8E2D9] flex justify-between items-baseline text-sm">
              <span className="text-[#403C36] font-semibold">
                Available Fleet
              </span>
              <span className="font-mono text-base font-bold text-[#111315] tabular-nums">
                {filteredGenerators.length} {filteredGenerators.length === 1 ? "Unit" : "Units"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8">
            {filteredGenerators.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {filteredGenerators.map((generator) => (
                  <GeneratorOptionCard
                    key={generator.id}
                    generator={generator}
                    isSelected={selectedGenerator?.id === generator.id}
                    onSelect={() => setSelectedGeneratorId(generator.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-14 px-6 bg-white border border-dashed border-[#D6CFC4] rounded-2xl">
                <p className="font-sans font-bold text-lg text-[#111315]">
                  No generators available for {powerRequirement} kVA
                </p>
                <p className="font-sans text-sm text-[#524E48] mt-1">
                  Try lowering your power requirement
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 04: OPERATING HOURS & QUANTITY (Clean Architectural Selector) */}
      <section className="py-12 sm:py-16 border-b border-[#E8E2D9]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-4 flex flex-col items-start">
            <span className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF5500] mb-2">
              04
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111315] tracking-tight mb-4">
              Shift &amp; Quantity
            </h2>

            <div className="w-full pt-4 border-t border-[#E8E2D9] space-y-2.5 text-sm">
              <div className="flex justify-between items-baseline">
                <span className="text-[#403C36] font-semibold">Daily Run Time</span>
                <span className="font-mono text-[#111315] font-bold">
                  {operatingHours} Hours / day
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#403C36] font-semibold">Shift Profile</span>
                <span className="font-mono text-[#FF5500] font-bold">
                  {selectedShift.label}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#403C36] font-semibold">Fleet Count</span>
                <span className="font-mono text-[#111315] font-extrabold">
                  {quantity} {quantity === 1 ? "Unit" : "Units"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            {/* 1. Operating Hours Selection */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#E8E2D9]">
                <Clock className="w-4 h-4 text-[#FF5500]" />
                <h3 className="font-sans text-base sm:text-lg font-extrabold text-[#111315] tracking-tight">
                  Daily Operating Hours
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {SHIFT_OPTIONS.map((option) => {
                  const isSelected = operatingHours === option.hours;
                  return (
                    <button
                      key={option.hours}
                      type="button"
                      onClick={() => setOperatingHours(option.hours)}
                      className={cn(
                        "p-4 sm:p-5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between h-full",
                        isSelected
                          ? "bg-[#FFF9F5] border-2 border-[#FF5500] shadow-[0_8px_24px_rgba(255,85,0,0.12)]"
                          : "bg-white border-[#E8E2D9] hover:border-[#111315]/40 hover:bg-[#FAF8F5]"
                      )}
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-1 mb-1.5">
                          <span
                            className={cn(
                              "font-sans text-2xl font-black tracking-tight tabular-nums",
                              isSelected ? "text-[#FF5500]" : "text-[#111315]"
                            )}
                          >
                            {option.hours}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#524E48] uppercase">
                            Hours
                          </span>
                        </div>
                        <p className="font-sans text-xs font-semibold text-[#111315] mb-1">
                          {option.sublabel}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E8E2D9]/70 mt-3 flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-[#FF5500]">
                          {option.tag}
                        </span>
                        {isSelected && (
                          <div className="size-4 rounded-md bg-[#FF5500] text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Fleet Quantity Selection */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#E8E2D9]">
                <Layers className="w-4 h-4 text-[#FF5500]" />
                <h3 className="font-sans text-base sm:text-lg font-extrabold text-[#111315] tracking-tight">
                  Fleet Quantity Required
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                {/* Stepper Control */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className={cn(
                      "size-12 rounded-xl flex items-center justify-center border transition-all duration-150 cursor-pointer",
                      quantity <= 1
                        ? "bg-[#FAF8F5] border-[#E8E2D9] text-[#A19D95] cursor-not-allowed opacity-50"
                        : "bg-white border-[#E8E2D9] text-[#111315] hover:border-[#111315] hover:bg-[#FAF8F5] active:scale-95"
                    )}
                  >
                    <Minus className="w-5 h-5 stroke-[2.25]" />
                  </button>

                  <div className="min-w-28 text-center px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
                    <span className="font-sans text-3xl font-black text-[#111315] tabular-nums leading-none">
                      {quantity}
                    </span>
                    <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#524E48] mt-0.5">
                      {quantity === 1 ? "Unit" : "Units"}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={quantity >= 20}
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className={cn(
                      "size-12 rounded-xl flex items-center justify-center border transition-all duration-150 cursor-pointer",
                      quantity >= 20
                        ? "bg-[#FAF8F5] border-[#E8E2D9] text-[#A19D95] cursor-not-allowed opacity-50"
                        : "bg-[#FF5500] border-[#FF5500] text-white hover:bg-[#E04B00] shadow-sm shadow-[#FF5500]/25 active:scale-95"
                    )}
                  >
                    <Plus className="w-5 h-5 stroke-[2.25]" />
                  </button>
                </div>

                {/* Preset Quick Selectors */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#524E48] uppercase tracking-wider mr-1 hidden sm:inline">
                    Presets:
                  </span>
                  {[1, 2, 3, 5].map((preset) => {
                    const isCurrent = quantity === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuantity(preset)}
                        className={cn(
                          "px-3.5 py-2 rounded-xl font-mono text-xs font-extrabold transition-all cursor-pointer border text-center",
                          isCurrent
                            ? "bg-[#111315] border-[#111315] text-white shadow-xs"
                            : "bg-[#FAF8F5] border-[#E8E2D9] text-[#111315] hover:border-[#111315]/50 hover:bg-white"
                        )}
                      >
                        {preset} {preset === 1 ? "Unit" : "Units"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: RENTAL SUMMARY RECEIPT SLIP + BULK ORDER */}
      <section className="py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <div>
              <span className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF5500] mb-2 block">
                05
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111315] tracking-tight">
                Rental Summary
              </h2>
            </div>

            <Link
              href="/bulk-order"
              className="w-full flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#18181B] hover:bg-[#FF5500] text-white transition-all duration-200 group shadow-md"
            >
              <span className="font-sans text-base sm:text-lg font-extrabold tracking-tight">
                Take Bulk Order
              </span>
              <div className="size-9 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 text-[#FF5500] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          </div>

          {/* Booking Receipt Slip Card */}
          <div className="lg:col-span-7 w-full">
            <div className="rounded-2xl shadow-[0_24px_60px_rgba(31,31,30,0.08)] overflow-visible">
              {/* Slip Header */}
              <div className="bg-[#18181B] text-white px-6 sm:px-8 py-4 rounded-t-2xl border-b-2 border-[#FF5500] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Receipt className="w-4 h-4 text-[#FF5500]" />
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                    Rental Summary
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">
                  SARVADNYA
                </span>
              </div>

              {/* Slip Itemized Body */}
              <div className="bg-white border-x border-[#E8E2D9] px-6 sm:px-8 pt-6 pb-4 space-y-3.5 text-sm sm:text-base">
                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Start Date
                  </span>
                  <span className="text-[#111315] font-bold text-right">
                    {startDateLabel}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">End Date</span>
                  <span className="text-[#111315] font-bold text-right">
                    {endDateLabel}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Rental Duration
                  </span>
                  <span className="font-mono text-[#111315] font-extrabold">
                    {totalDays ? `${totalDays} ${totalDays === 1 ? "Day" : "Days"}` : "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Power Requirement
                  </span>
                  <span className="font-mono text-[#FF5500] font-extrabold">
                    {powerRequirement} kVA
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold shrink-0">
                    Generator Model
                  </span>
                  <span className="text-[#111315] font-bold text-right">
                    {selectedGenerator?.name || "Not selected"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Daily Operating Shift
                  </span>
                  <span className="font-mono text-[#111315] font-bold">
                    {operatingHours} Hours / day ({selectedShift.label})
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Fleet Quantity
                  </span>
                  <span className="font-mono text-[#111315] font-extrabold">
                    {quantity} {quantity === 1 ? "Unit" : "Units"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Rate per Unit/Day
                  </span>
                  <span className="font-mono text-[#111315] font-bold">
                    {selectedGenerator
                      ? `₹${adjustedDailyRate.toLocaleString("en-IN")}`
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Rental Subtotal ({quantity} {quantity === 1 ? "unit" : "units"} × {totalDays || 0}d)
                  </span>
                  <span className="font-mono text-[#111315] font-bold">
                    {selectedGenerator && totalDays > 0
                      ? `₹${rentalSubtotal.toLocaleString("en-IN")}`
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Insurance (₹{INSURANCE_PER_DAY}/unit/day)
                  </span>
                  <span className="font-mono text-[#111315] font-bold">
                    {totalDays > 0
                      ? `₹${insuranceSubtotal.toLocaleString("en-IN")}`
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#403C36] font-semibold">
                    Logistics &amp; Delivery
                  </span>
                  <span className="font-mono text-[#111315] font-bold">
                    ₹{DELIVERY_COST.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Perforated Tear Divider */}
              <div className="relative bg-white border-x border-[#E8E2D9] py-3 flex items-center">
                <div className="size-6 rounded-full bg-[#FAF8F5] border-r border-[#E8E2D9] -ml-3 shrink-0" />
                <div className="w-full border-t-2 border-dashed border-[#D6CFC4] mx-2" />
                <div className="size-6 rounded-full bg-[#FAF8F5] border-l border-[#E8E2D9] -mr-3 shrink-0" />
              </div>

              {/* Total & Checkout Footer */}
              <div className="bg-white border border-t-0 border-[#E8E2D9] rounded-b-2xl px-6 sm:px-8 pt-2 pb-6 sm:pb-8">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-sans text-lg font-extrabold text-[#111315]">
                    Total Amount
                  </span>
                  <span className="font-sans text-3xl sm:text-4xl font-black text-[#FF5500] tabular-nums tracking-tight">
                    {totalPrice > 0
                      ? `₹${totalPrice.toLocaleString("en-IN")}`
                      : "—"}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!canCheckout}
                  onClick={handleProceedToCheckout}
                  className={cn(
                    "w-full py-4 px-6 rounded-xl font-sans font-bold text-base transition-all duration-200 flex items-center justify-center gap-2",
                    canCheckout
                      ? "bg-[#FF5500] hover:bg-[#E04B00] text-white shadow-lg shadow-[#FF5500]/25 cursor-pointer active:scale-[0.99]"
                      : "bg-[#EFEAE1] text-[#111315] border border-[#D6CFC4] cursor-not-allowed"
                  )}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
