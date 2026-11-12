"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Plus, ArrowRight, Receipt } from "lucide-react";
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
                className="font-sans text-[11px] font-semibold text-[#403C36] px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9]"
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

  const totalPrice = useMemo(() => {
    if (!selectedGenerator || totalDays === 0) return 0;
    const rentalCost = totalDays * parseFloat(selectedGenerator.daily_rate);
    const insuranceCost = totalDays * INSURANCE_PER_DAY;
    return rentalCost + insuranceCost + DELIVERY_COST;
  }, [totalDays, selectedGenerator]);

  const canCheckout = Boolean(selectedGenerator && totalDays > 0);

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

            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D9] font-mono text-xs font-bold text-[#111315]">
              {filteredGenerators.length} found
            </span>
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

      {/* SECTION 04: RENTAL SUMMARY RECEIPT SLIP + BULK ORDER */}
      <section className="py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <div>
              <span className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF5500] mb-2 block">
                04
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
                    Rental Days
                  </span>
                  <span className="font-mono text-[#111315] font-extrabold">
                    {totalDays || "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Power Needed
                  </span>
                  <span className="font-mono text-[#FF5500] font-extrabold">
                    {powerRequirement} kVA
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold shrink-0">
                    Generator Type
                  </span>
                  <span className="text-[#111315] font-bold text-right">
                    {selectedGenerator?.name || "Not selected"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Price/Day
                  </span>
                  <span className="font-mono text-[#111315] font-bold">
                    {selectedGenerator
                      ? `₹${parseInt(
                          selectedGenerator.daily_rate,
                          10
                        ).toLocaleString("en-IN")}`
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-2.5 border-b border-dotted border-[#D6CFC4]">
                  <span className="text-[#403C36] font-semibold">
                    Insurance (₹{INSURANCE_PER_DAY}/day)
                  </span>
                  <span className="font-mono text-[#111315] font-bold">
                    {totalDays > 0
                      ? `₹${(totalDays * INSURANCE_PER_DAY).toLocaleString(
                          "en-IN"
                        )}`
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#403C36] font-semibold">
                    Delivery Cost
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
                    Total
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
                  onClick={() => router.push("/payments")}
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
