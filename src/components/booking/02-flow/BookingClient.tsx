"use client";

import React, { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button, RentalCalendar } from "@/components/common";

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
}

// Power Slider Component
function PowerSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const marks = [5, 10, 25, 50, 100, 150, 250, 500];

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6">
        <span className="text-white/30 text-lg">2 kVA</span>
        <div className="text-center">
          <span className="text-6xl md:text-7xl font-bold text-[#00ff8f] font-['Poppins',sans-serif]">
            {value}
          </span>
          <span className="text-2xl text-white/50 ml-2">kVA</span>
        </div>
        <span className="text-white/30 text-lg">500 kVA</span>
      </div>

      <input
        type="range"
        min={2}
        max={500}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-6
          [&::-webkit-slider-thumb]:h-6
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#00ff8f]
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-6
          [&::-moz-range-thumb]:h-6
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[#00ff8f]
          [&::-moz-range-thumb]:border-none
          [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00894d ${
            ((value - 2) / 498) * 100
          }%, rgba(255,255,255,0.1) ${((value - 2) / 498) * 100}%)`,
        }}
      />

      <div className="flex justify-between mt-4">
        {marks.map((mark) => (
          <button
            key={mark}
            onClick={() => onChange(mark)}
            className={cn(
              "text-sm transition-colors",
              value >= mark
                ? "text-[#00ff8f]"
                : "text-white/20 hover:text-white/50"
            )}
          >
            {mark}
          </button>
        ))}
      </div>
    </div>
  );
}

// Generator Card Component with Motion
function GeneratorCard({
  generator,
  isSelected,
  onSelect,
}: {
  generator: Generator;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onSelect}
      className="w-full text-left py-6 transition-colors duration-150 group first:pt-0 last:pb-0"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white font-['Poppins',sans-serif]">
            {generator.name}
          </h4>
          <p className="text-white/40 text-sm mt-1">
            {generator.brand} • {generator.fuel_type.toUpperCase()}
          </p>
        </div>
        {/* Selection indicator - small component that changes on hover/select */}
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150",
            isSelected
              ? "bg-[#00ff8f]"
              : "bg-transparent group-hover:bg-brand-green-dark"
          )}
        >
          {isSelected ? (
            <svg
              className="w-5 h-5 text-black"
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
            <svg
              className="w-4 h-4 text-white/0 group-hover:text-white transition-colors"
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
          )}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <div
            className={cn(
              "px-3 py-1 rounded-lg transition-all duration-150",
              isSelected
                ? "bg-brand-green"
                : "bg-brand-green-dark group-hover:bg-brand-green"
            )}
          >
            <span
              className={cn(
                "text-4xl font-bold transition-colors",
                isSelected ? "text-black" : "text-white group-hover:text-black"
              )}
            >
              {generator.power_output_kva}
            </span>
            <span
              className={cn(
                "text-sm ml-1 transition-colors",
                isSelected
                  ? "text-black/60"
                  : "text-white/60 group-hover:text-black/60"
              )}
            >
              kVA
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-white">
            ₹{parseInt(generator.daily_rate).toLocaleString("en-IN")}
          </span>
          <span className="text-white/40 text-sm block">per day</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {generator.features.slice(0, 3).map((feature, idx) => (
          <span
            key={idx}
            className="text-xs text-white/50 px-3 py-1 rounded-full bg-white/5"
          >
            {feature}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

// Main Booking Client Component
export function BookingClient({ generators }: BookingClientProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [powerRequirement, setPowerRequirement] = useState<number>(25);
  const [selectedGenerator, setSelectedGenerator] = useState<Generator | null>(
    null
  );

  // Filter generators based on power requirement
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

  // Calculate total days
  const totalDays = useMemo(() => {
    return selectedDates.length;
  }, [selectedDates]);

  // Calculate total price with insurance and delivery
  const INSURANCE_PER_DAY = 200; // ₹200 per day
  const DELIVERY_COST = 1500; // ₹1500 flat rate

  const totalPrice = useMemo(() => {
    if (!selectedGenerator || totalDays === 0) return 0;
    const rentalCost = totalDays * parseFloat(selectedGenerator.daily_rate);
    const insuranceCost = totalDays * INSURANCE_PER_DAY;
    return rentalCost + insuranceCost + DELIVERY_COST;
  }, [totalDays, selectedGenerator]);

  // Get start and end dates from individual dates
  const getStartDate = useCallback(() => {
    if (selectedDates.length === 0) return "Not selected";
    const sortedDates = [...selectedDates].sort(
      (a, b) => a.getTime() - b.getTime()
    );
    return sortedDates[0].toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [selectedDates]);

  const getEndDate = useCallback(() => {
    if (selectedDates.length === 0) return "Not selected";
    const sortedDates = [...selectedDates].sort(
      (a, b) => a.getTime() - b.getTime()
    );
    return sortedDates[sortedDates.length - 1].toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [selectedDates]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column - Calendar & Power */}
        <div className="lg:col-span-2 space-y-16">
          {/* Calendar Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif] mb-8">
              Pick Your Dates
            </h2>
            <div className="p-4 md:p-8">
              <RentalCalendar
                selectionMode="individual"
                selectedDates={selectedDates}
                onDatesChange={setSelectedDates}
              />
            </div>
          </section>

          {/* Power Requirement Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif] mb-8">
              How Much Power?
            </h2>
            <div className="p-4 md:p-8">
              <PowerSlider
                value={powerRequirement}
                onChange={setPowerRequirement}
              />
            </div>
          </section>

          {/* Generator List Section */}
          <section>
            <div className="flex items-end justify-between mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif]">
                Available Generators
              </h2>
              <span className="text-white/40 text-lg">
                {filteredGenerators.length} found
              </span>
            </div>
            <div className="space-y-0 divide-y divide-brand-green-dark/20">
              <AnimatePresence mode="popLayout">
                {filteredGenerators.length > 0 ? (
                  filteredGenerators.map((generator) => (
                    <GeneratorCard
                      key={generator.id}
                      generator={generator}
                      isSelected={selectedGenerator?.id === generator.id}
                      onSelect={() => setSelectedGenerator(generator)}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <p className="text-white/40 text-xl">
                      No generators available for {powerRequirement} kVA
                    </p>
                    <p className="text-white/20 mt-2">
                      Try lowering your power requirement
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1 min-h-screen">
          <div className="sticky top-32 space-y-6">
            {/* Rental Summary */}
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white font-['Poppins',sans-serif] mb-6">
                Rental Summary
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-white/40">Start Date</span>
                  <span className="text-white text-right">
                    {getStartDate()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">End Date</span>
                  <span className="text-white text-right">{getEndDate()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Rental Days</span>
                  <span className="text-white font-bold text-xl">
                    {totalDays || "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Power Needed</span>
                  <span className="text-white font-bold">
                    {powerRequirement} kVA
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Generator Type</span>
                  <span className="text-white text-right max-w-[180px]">
                    {selectedGenerator?.name || "Not selected"}
                  </span>
                </div>

                <div className="h-px bg-white/10 my-4" />

                <div className="flex justify-between">
                  <span className="text-white/40">Price/Day</span>
                  <span className="text-white">
                    {selectedGenerator
                      ? `₹${parseInt(
                          selectedGenerator.daily_rate
                        ).toLocaleString("en-IN")}`
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">
                    Insurance (₹{INSURANCE_PER_DAY}/day)
                  </span>
                  <span className="text-white">
                    {totalDays > 0
                      ? `₹${(totalDays * INSURANCE_PER_DAY).toLocaleString(
                          "en-IN"
                        )}`
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Delivery Cost</span>
                  <span className="text-white">
                    ₹{DELIVERY_COST.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="h-px bg-white/10 my-4" />

                <div className="flex justify-between items-end">
                  <span className="text-white/40">Total</span>
                  <span className="text-4xl font-bold text-[#00ff8f]">
                    {totalPrice > 0
                      ? `₹${totalPrice.toLocaleString("en-IN")}`
                      : "—"}
                  </span>
                </div>
              </div>

              <Button
                disabled={!selectedGenerator || totalDays === 0}
                variant="primary"
                size="lg"
                fullWidth
                className="mt-8"
              >
                Proceed to Checkout
              </Button>
            </div>

            {/* Bulk Order Button */}
            <Link
              href="/bulk-order"
              className="block p-6 rounded-2xl bg-brand-green-dark group hover:bg-brand-green transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white group-hover:text-black font-['Poppins',sans-serif] transition-colors">
                  Take Bulk Order
                </span>
                <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white group-hover:text-black transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
