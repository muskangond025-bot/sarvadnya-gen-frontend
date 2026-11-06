import React from "react";
import { BookingHero } from "./01-hero";
import { BookingClient } from "./02-flow";
import { generatorsData } from "@/constants/data";

export function Booking() {
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
    <div className="min-h-screen bg-black">
      <BookingHero />
      <BookingClient generators={availableGenerators} />
    </div>
  );
}
