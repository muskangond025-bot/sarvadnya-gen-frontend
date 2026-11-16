"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const BLOG_FILTER_EVENT = "blog-filter-change";

export interface BlogFilterDetail {
  category: string;
  query: string;
}

const CATEGORIES = [
  "All Articles",
  "Guides",
  "Maintenance",
  "Industrial",
  "Events",
  "Efficiency",
  "Case Studies",
  "Technology",
];

export function BlogCategories() {
  const [activeTab, setActiveTab] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const emitFilter = (category: string, query: string) => {
    if (typeof window !== "undefined") {
      const detail: BlogFilterDetail = { category, query };
      window.dispatchEvent(new CustomEvent(BLOG_FILTER_EVENT, { detail }));
    }
  };

  useEffect(() => {
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent<BlogFilterDetail>).detail;
      if (!detail) return;
      setActiveTab(detail.category);
      setSearchQuery(detail.query);
    };
    window.addEventListener("blog-filter-reset", handleSync);
    return () => window.removeEventListener("blog-filter-reset", handleSync);
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveTab(category);
    emitFilter(category, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    emitFilter(activeTab, value);
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-6 border-b border-[#E8E2D9] pb-7">
      {/* Scrollable Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar touch-pan-x scroll-smooth">
        {CATEGORIES.map((category) => {
          const isActive = activeTab === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border cursor-pointer",
                isActive
                  ? "bg-[#18181B] text-white border-[#18181B] shadow-sm"
                  : "bg-white text-[#524E48] border-[#E8E2D9] hover:border-[#FF5500] hover:text-[#111315]"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Live Search Input */}
      <div className="relative w-full lg:w-80 shrink-0">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E685F] pointer-events-none"
          size={17}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search articles..."
          aria-label="Search blog articles"
          className="w-full bg-white border border-[#DED8CE] rounded-xl pl-11 pr-10 py-3 text-[#111315] text-sm focus:outline-none focus:border-[#FF5500] transition-colors placeholder:text-[#8C847A] shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => handleSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-[#FAF8F5] text-[#524E48] flex items-center justify-center"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
