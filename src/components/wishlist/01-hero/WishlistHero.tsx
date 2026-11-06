"use client";

import React from "react";
import { Bookmark, Sparkles } from "lucide-react";
import { FloatingGlow } from "@/components/shared/client";

interface WishlistHeroProps {
  itemCount: number;
}

export function WishlistHero({ itemCount }: WishlistHeroProps) {
  return (
    <section className="relative pt-32 pb-16 px-6 md:px-10 lg:px-[60px] max-w-[1440px] mx-auto overflow-hidden">
      <FloatingGlow color="#00ff8f" size="xl" className="-top-1/4 -right-1/4 opacity-10" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff8f]/10 border border-[#00ff8f]/20 text-[#00ff8f] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="size-3.5" />
            <span>Saved Equipment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-['Poppins',sans-serif] tracking-tight">
            Generator <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-[#00ff8f] to-white bg-[length:200%_auto] animate-shimmer">Wishlist</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#bfbfbf] font-['Outfit',sans-serif] max-w-xl">
            Compare your shortlisted silent DG sets, review power specifications, and quickly request bulk or single deployment quotes.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
            <Bookmark className="size-5 text-[#00ff8f]" />
            <div>
              <p className="text-xs text-white/50 font-['Outfit',sans-serif]">Shortlisted Units</p>
              <p className="text-xl font-bold text-white font-['Poppins',sans-serif]">{itemCount} Generators</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
