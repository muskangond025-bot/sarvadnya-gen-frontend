"use client";

import React, { useMemo } from "react";
import { WishlistHero } from "./01-hero";
import { WishlistGrid, WishlistItem } from "./02-grid";
import { WishlistRecommendations } from "./04-recommendations";
import { useQuote } from "@/lib/QuoteContext";

export function Wishlist() {
  const { items: quoteItems, removeItem, clearQuote, totalItems } = useQuote();

  const formattedItems: WishlistItem[] = useMemo(() => {
    return quoteItems.map((item) => ({
      id: item.id,
      name: item.name,
      kva: item.kva,
      dailyRate: (item.dailyRate * item.days * item.quantity).toLocaleString("en-IN"),
      brand: item.brand,
      fuelType: item.phase ? `${item.phase} • Silent Diesel` : "Silent Diesel",
      image: item.image || "/placeholder-gen.jpg",
      category: `${item.quantity > 1 ? `${item.quantity} Units • ` : ""}${item.days} Day${item.days > 1 ? "s" : ""}`,
    }));
  }, [quoteItems]);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#111315] font-sans selection:bg-[#FF5500]/15 selection:text-[#FF5500]">
      {/* 1. Hero Section */}
      <WishlistHero itemCount={totalItems} />

      {/* 2. Grid & Cards Section */}
      <WishlistGrid
        items={formattedItems}
        onRemove={removeItem}
        onClearAll={clearQuote}
      />

      {/* 3. Industry Recommendations */}
      <WishlistRecommendations />
    </main>
  );
}
