import React from "react";
import { BookingHero } from "./01-hero";
import { BookingClient } from "./02-flow";
import { generatorsData } from "@/constants/data";

interface BookingProps {
  initialKvaRaw?: string | null;
}

export function Booking({ initialKvaRaw = null }: BookingProps) {
  const availableGenerators = generatorsData
    .filter((g) => g.status !== "retired" && !g.is_deleted)
    .map((g) => ({
      id: g.id,
      name: g.name,
      power_output_kva: g.power_output_kva,
      daily_rate: g.daily_rate,
      type: g.type,
      status: g.status,
      features: g.features,
      brand: g.brand,
      fuel_type: g.fuel_type,
    }));

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#111315] overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[480px] h-[480px] rounded-full bg-[#FF5500]/[0.05] blur-[140px]"
      />
      <BookingHero />
      <BookingClient
        key={initialKvaRaw ?? "default"}
        generators={availableGenerators}
        initialKvaRaw={initialKvaRaw}
      />
    </div>
  );
}
