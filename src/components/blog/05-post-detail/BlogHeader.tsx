"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, Share2, Check } from "lucide-react";
import { BLOG_POSTS } from "../03-grid/BlogGrid";

export function BlogHeader({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const matchedPost = BLOG_POSTS.find((p) => p.slug === slug);

  const fallbackTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = matchedPost?.title || fallbackTitle;
  const date = matchedPost?.date || "May 15, 2026";
  const readTime = matchedPost?.readTime || "8 min read";
  const category = matchedPost?.category || "Power Insights";
  const image = matchedPost?.image || "/images/blog/blog-main.png";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore user-cancelled share dialog
    }
  };

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[#524E48] text-xs font-mono font-bold uppercase tracking-widest">
        <Link href="/" className="hover:text-[#FF5500] transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/blog" className="hover:text-[#FF5500] transition-colors">
          Blog
        </Link>
        <ChevronRight size={14} />
        <span className="text-[#FF5500] truncate max-w-[200px] sm:max-w-none">
          {category}
        </span>
      </nav>

      <div className="max-w-4xl flex flex-col gap-6">
        <span className="w-fit px-3.5 py-1 rounded-full bg-[#18181B] text-white font-mono text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
          {category}
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111315] leading-[1.1] tracking-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 md:gap-10 py-5 border-y border-[#E8E2D9]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#FFF3EC] border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500] text-xs font-bold">
              TA
            </div>
            <div className="flex flex-col">
              <span className="text-[#6E685F] text-[10px] font-mono font-bold uppercase tracking-widest">
                Written By
              </span>
              <span className="text-[#111315] text-sm font-bold">
                Tanmay Avhad
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-[#FF5500]" />
            <div className="flex flex-col">
              <span className="text-[#6E685F] text-[10px] font-mono font-bold uppercase tracking-widest">
                Published On
              </span>
              <span className="text-[#111315] text-sm font-bold">{date}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={18} className="text-[#FF5500]" />
            <div className="flex flex-col">
              <span className="text-[#6E685F] text-[10px] font-mono font-bold uppercase tracking-widest">
                Read Time
              </span>
              <span className="text-[#111315] text-sm font-bold">
                {readTime}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="sm:ml-auto px-4 py-2.5 rounded-xl bg-white border border-[#DED8CE] text-[#111315] hover:border-[#FF5500] hover:text-[#FF5500] transition-colors flex items-center gap-2 text-xs font-bold shadow-xs cursor-pointer"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            <span>{copied ? "Link Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Frame */}
      <div className="relative aspect-[21/9] min-h-[240px] w-full rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-[0_20px_50px_-20px_rgba(17,19,21,0.12)] bg-[#F3EFE8]">
        <Image src={image} alt={title} fill priority className="object-cover" />
      </div>
    </div>
  );
}
