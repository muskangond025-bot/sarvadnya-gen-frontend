"use client";

import React from "react";
import { Bookmark } from "lucide-react";

interface WishlistHeroProps {
  itemCount: number;
}

export function WishlistHero({ itemCount }: WishlistHeroProps) {
  return (
    <section className="relative pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-6 md:px-10 lg:px-[60px] max-w-[1440px] mx-auto">
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E2D9] pb-6 sm:pb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111315] font-sans tracking-tight">
            Generator <span className="text-[#FF5500]">Cart</span>
          </h1>
          <p className="mt-2.5 text-sm sm:text-base md:text-lg text-[#403C36] font-sans max-w-xl leading-relaxed">
            Compare your shortlisted silent DG sets, review power specifications,
            and quickly request bulk or single deployment quotes.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-5 py-3 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex items-center gap-3.5">
            <Bookmark className="size-5 text-[#FF5500]" />
            <div>
              <p className="text-xs font-medium text-[#524E48] font-sans">
                Shortlisted Units
              </p>
              <p className="text-xl font-bold text-[#111315] font-sans">
                {itemCount} Generators
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
