"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All Articles",
  "Guides",
  "Maintenance",
  "Industrial",
  "Events",
  "Case Studies",
  "News"
];

export function BlogCategories() {
  const [activeTab, setActiveTab] = useState("All Articles");

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-white/10 pb-8">
      {/* Scrollable Categories */}
      <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
              activeTab === category
                ? "bg-[#00ff8f] text-black border-[#00ff8f]"
                : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full lg:w-80">
        <input 
          type="text" 
          placeholder="Search articles..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white text-sm focus:outline-none focus:border-[#00ff8f]/50 transition-all placeholder:text-white/20"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
      </div>
    </div>
  );
}
