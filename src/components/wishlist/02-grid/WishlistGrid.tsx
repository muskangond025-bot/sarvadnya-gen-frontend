"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { WishlistCard, WishlistItem } from "./WishlistCard";
import { WishlistEmpty } from "../03-empty-state";

interface WishlistGridProps {
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function WishlistGrid({ items, onRemove, onClearAll }: WishlistGridProps) {
  if (items.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <section className="px-6 md:px-10 lg:px-[60px] max-w-[1440px] mx-auto pb-24">
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm text-white/60 font-['Outfit',sans-serif]">
          Showing <span className="text-white font-semibold">{items.length}</span> shortlisted generator models
        </p>
        <button
          onClick={onClearAll}
          className="text-xs text-white/50 hover:text-red-400 transition-colors uppercase tracking-wider font-semibold"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {items.map((item) => (
            <WishlistCard key={item.id} item={item} onRemove={onRemove} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
