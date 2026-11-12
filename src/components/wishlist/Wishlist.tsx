"use client";

import React, { useState } from "react";
import { WishlistHero } from "./01-hero";
import { WishlistGrid, WishlistItem } from "./02-grid";
import { WishlistRecommendations } from "./04-recommendations";

export function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#111315] font-sans selection:bg-[#FF5500]/15 selection:text-[#FF5500]">
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
