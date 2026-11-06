import React from "react";
import Link from "next/link";
import { ArrowRight, Twitter, Facebook, Linkedin, Mail } from "lucide-react";

export function BlogSidebar() {
  const categories = [
    { name: "Guides", count: 12 },
    { name: "Maintenance", count: 8 },
    { name: "Industrial", count: 15 },
    { name: "Events", count: 24 },
    { name: "Nashik Business", count: 6 },
  ];

  const tags = ["Silent DG", "Rental Tips", "Nashik Power", "Wedding Setup", "Industrial Safety", "Fuel Efficiency"];

  return (
    <div className="flex flex-col gap-12 sticky top-32">
      {/* Search Sidebar */}
      <div className="p-8 bg-[#111] border border-white/10 rounded-3xl">
        <h4 className="text-white font-bold text-lg mb-6 font-['Poppins',sans-serif]">Search Blog</h4>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type and enter..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ff8f]/50 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-8 bg-[#111] border border-white/10 rounded-3xl">
        <h4 className="text-white font-bold text-lg mb-6 font-['Poppins',sans-serif]">Categories</h4>
        <div className="flex flex-col gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.name}
              href="#"
              className="flex items-center justify-between group"
            >
              <span className="text-[#bfbfbf] group-hover:text-[#00ff8f] transition-colors">{cat.name}</span>
              <span className="text-white/20 text-xs font-bold bg-white/5 px-2 py-1 rounded-md group-hover:bg-[#00ff8f]/10 group-hover:text-[#00ff8f] transition-all">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="p-8 bg-[#111] border border-white/10 rounded-3xl">
        <h4 className="text-white font-bold text-lg mb-6 font-['Poppins',sans-serif]">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link 
              key={tag}
              href="#"
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#bfbfbf] text-xs font-bold hover:bg-[#00ff8f] hover:text-black hover:border-[#00ff8f] transition-all"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Mini */}
      <div className="p-8 bg-linear-to-br from-[#00ff8f]/10 to-transparent border border-[#00ff8f]/20 rounded-3xl">
        <h4 className="text-white font-bold text-lg mb-2">Subscribe</h4>
        <p className="text-white/60 text-xs mb-6">Get the latest power insights directly in your inbox.</p>
        <button className="w-full py-3 bg-[#00ff8f] text-black font-bold rounded-xl flex items-center justify-center gap-2 text-sm hover:scale-[1.02] transition-transform">
          Join Now <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
