"use client";

import React, { useState } from "react";
import { WishlistHero } from "./01-hero";
import { WishlistGrid, WishlistItem } from "./02-grid";
import { WishlistRecommendations } from "./04-recommendations";
import { GENERATOR_IMAGES } from "@/constants";

const DEFAULT_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: "gen-30kva",
    name: "Kirloskar 30 kVA Silent DG",
    kva: "30 kVA",
    dailyRate: "2,500",
    brand: "Kirloskar",
    fuelType: "Diesel",
    image: GENERATOR_IMAGES.midRange_30kva,
    category: "Commercial Power",
  },
  {
    id: "gen-125kva",
    name: "Cummins 125 kVA Silent DG",
    kva: "125 kVA",
    dailyRate: "6,500",
    brand: "Cummins",
    fuelType: "Diesel",
    image: GENERATOR_IMAGES.industrial_125kva,
    category: "Events & Weddings",
  },
  {
    id: "gen-250kva",
    name: "Mahindra 250 kVA Heavy DG",
    kva: "250 kVA",
    dailyRate: "12,000",
    brand: "Mahindra",
    fuelType: "Diesel",
    image: GENERATOR_IMAGES.heavyIndustrial_250kva,
    category: "Heavy Industrial",
  },
];

export function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>(DEFAULT_WISHLIST_ITEMS);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* 1. Hero Section */}
      <WishlistHero itemCount={items.length} />

      {/* 2. Grid & Cards Section */}
      <WishlistGrid
        items={items}
        onRemove={handleRemove}
        onClearAll={handleClearAll}
      />

      {/* 3. Industry Recommendations */}
      <WishlistRecommendations />
    </main>
  );
}
