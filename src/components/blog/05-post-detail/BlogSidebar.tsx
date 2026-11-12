import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogSidebar() {
  const categories = [
    { name: "Guides", count: 12 },
    { name: "Maintenance", count: 8 },
    { name: "Industrial", count: 15 },
    { name: "Events", count: 24 },
    { name: "Nashik Business", count: 6 },
  ];

  const tags = [
    "Silent DG",
    "Rental Tips",
    "Nashik Power",
    "Wedding Setup",
    "Industrial Safety",
    "Fuel Efficiency",
  ];

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-28">
      {/* Categories */}
      <div className="p-6 sm:p-7 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs">
        <h4 className="text-[#111315] font-bold text-lg mb-5">Categories</h4>
        <div className="flex flex-col gap-3.5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/blog"
              className="flex items-center justify-between group"
            >
              <span className="text-sm font-medium text-[#403C36] group-hover:text-[#FF5500] transition-colors">
                {cat.name}
              </span>
              <span className="text-[#524E48] text-xs font-mono font-bold bg-[#FAF8F5] border border-[#E8E2D9] px-2.5 py-0.5 rounded-md group-hover:bg-[#FFF3EC] group-hover:border-[#FF5500]/30 group-hover:text-[#FF5500] transition-colors">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="p-6 sm:p-7 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs">
        <h4 className="text-[#111315] font-bold text-lg mb-5">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href="/blog"
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-[#403C36] text-xs font-semibold hover:bg-[#18181B] hover:text-white hover:border-[#18181B] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Consultation / Book Card */}
      <div className="p-6 sm:p-7 bg-[#18181B] border border-[#18181B] rounded-3xl text-white">
        <div className="h-[2px] w-12 bg-[#FF5500] mb-4" />
        <h4 className="font-bold text-lg mb-2">Need Fleet Sizing Help?</h4>
        <p className="text-white/75 text-sm mb-5 leading-relaxed">
          Talk directly with our Nashik dispatch engineers to select the exact
          silent DG capacity for your venue or site.
        </p>
        <Link
          href="/contact"
          className="w-full py-3 px-4 bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
        >
          <span>Request Consultation</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
