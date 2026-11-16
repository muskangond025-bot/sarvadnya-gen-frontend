"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BLOG_FILTER_EVENT,
  BlogFilterDetail,
} from "../02-categories/BlogCategories";

export const BLOG_POSTS = [
  {
    slug: "industrial-generator-maintenance",
    title: "Essential Maintenance Tips for Industrial Silent DG Sets",
    excerpt:
      "Preventive oil, coolant, and load-bank inspection checklists to maximize uptime across continuous industrial operations.",
    category: "Maintenance",
    date: "May 10, 2026",
    readTime: "6 min read",
    image: "/images/services/service_engineer_bg.jpg",
  },
  {
    slug: "hospital-power-backup",
    title: "Critical Power Backup for Hospitals: Why Every Second Counts",
    excerpt:
      "How sub-10-second AMF failover panels and synchronized redundant DG units protect life-critical medical loads.",
    category: "Industrial",
    date: "May 08, 2026",
    readTime: "7 min read",
    image: "/images/industries/healthcare.png",
  },
  {
    slug: "fuel-management-strategies",
    title: "Optimizing Fuel Management: Strategies for Long-Term Rentals",
    excerpt:
      "Right-sizing generator kVA load curves and tracking diesel burn rates for multi-week site deployments.",
    category: "Efficiency",
    date: "May 05, 2026",
    readTime: "5 min read",
    image: "/images/services/generator_engine_bg.jpg",
  },
  {
    slug: "nashik-industrial-growth",
    title:
      "How Sarvadnya Generators is Powering Nashik's Industrial Expansion",
    excerpt:
      "Supporting Ambad, Satpur, and Sinnar MIDC manufacturing facilities with rapid multi-generator fleet deployment.",
    category: "Case Studies",
    date: "May 01, 2026",
    readTime: "6 min read",
    image: "/images/industries/construction.png",
  },
  {
    slug: "acoustic-enclosures-explained",
    title: "The Science of Silence: How Our Acoustic Enclosures Work",
    excerpt:
      "Inside CPCB-II certified soundproof canopies, baffled airflow channels, and multi-stage exhaust attenuation.",
    category: "Technology",
    date: "April 28, 2026",
    readTime: "5 min read",
    image: "/images/generators/generator_38.png",
  },
  {
    slug: "event-power-planning",
    title: "Pro Tips for Planning Power Infrastructure for Outdoor Concerts",
    excerpt:
      "Balancing stage audio, LED walls, and site lighting across phase-isolated silent generators for live venues.",
    category: "Events",
    date: "April 25, 2026",
    readTime: "7 min read",
    image: "/images/blog/blog-image-1.png",
  },
  {
    slug: "choosing-right-generator-wedding",
    title:
      "The Ultimate Guide to Choosing the Right Generator for Your Wedding",
    excerpt:
      "Learn how to calculate your kVA needs, manage acoustic levels, and ensure uninterrupted celebration power.",
    category: "Guides",
    date: "May 15, 2026",
    readTime: "8 min read",
    image: "/images/blog/blog-main.png",
  },
];

export function BlogGrid() {
  const [filter, setFilter] = useState<BlogFilterDetail>({
    category: "All Articles",
    query: "",
  });

  useEffect(() => {
    const handleFilter = (event: Event) => {
      const detail = (event as CustomEvent<BlogFilterDetail>).detail;
      if (detail) {
        setFilter(detail);
      }
    };
    window.addEventListener(BLOG_FILTER_EVENT, handleFilter);
    return () => window.removeEventListener(BLOG_FILTER_EVENT, handleFilter);
  }, []);

  const visiblePosts = useMemo(() => {
    const q = filter.query.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      if (filter.category === "All Articles" && !q) {
        return post.slug !== "choosing-right-generator-wedding";
      }

      const matchesCategory =
        filter.category === "All Articles" ||
        post.category.toLowerCase() === filter.category.toLowerCase();

      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [filter]);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), visiblePosts.length - 1));
  };

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  useEffect(() => {
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [filter]);

  const resetFilters = () => {
    const next = { category: "All Articles", query: "" };
    setFilter(next);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("blog-filter-reset", { detail: next })
      );
    }
  };

  if (visiblePosts.length === 0) {
    return (
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-12 text-center space-y-4">
        <p className="text-lg font-bold text-[#111315]">
          No articles match your current filter.
        </p>
        <p className="text-sm text-[#2D2A26]">
          Try clearing your search or switching back to all articles.
        </p>
        <button
          type="button"
          onClick={resetFilters}
          className="px-6 py-3 bg-[#18181B] hover:bg-[#FF5500] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
        >
          Show All Articles
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Horizontal Snap-Swipe Rail (< md) */}
      <div className="block md:hidden w-full">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x -mx-4 px-4 pb-4 pt-1 scroll-smooth"
        >
          {visiblePosts.map((post) => (
            <article
              key={`mobile-${post.slug}`}
              className="w-[84vw] max-w-[340px] shrink-0 snap-center flex flex-col h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group bg-white border border-[#E8E2D9] active:border-[#FF5500] rounded-3xl overflow-hidden shadow-[0_12px_36px_-14px_rgba(17,19,21,0.06)] flex flex-col h-full"
              >
                {/* Card Media */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFEAE1] border-b border-[#E8E2D9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18181B] text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-white/15 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3.5 right-3.5 size-8 rounded-full bg-white text-[#111315] flex items-center justify-center shadow-md">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-white">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] font-mono font-semibold text-[#2D2A26]">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} className="text-[#FF5500]" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} className="text-[#FF5500]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#111315] leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#524E48] leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#ECE6DC] flex items-center justify-between text-xs font-bold text-[#FF5500]">
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Mobile Carousel Indicators & Pagination Controls */}
        <div className="flex items-center justify-between pt-3 px-1">
          <div className="flex items-center gap-1.5">
            {visiblePosts.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to article ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  activeIndex === i
                    ? "w-6 bg-[#FF5500]"
                    : "w-1.5 bg-[#DDD6CA] hover:bg-[#B8B0A2]"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="p-1.5 rounded-full border border-[#E8E2D9] bg-white text-[#111315] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              aria-label="Previous article"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(visiblePosts.length - 1, activeIndex + 1))}
              disabled={activeIndex === visiblePosts.length - 1}
              className="p-1.5 rounded-full border border-[#E8E2D9] bg-white text-[#111315] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              aria-label="Next article"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Multi-Column Grid (md and above) - 100% UNCHANGED */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
        {visiblePosts.map((post) => (
          <article key={post.slug} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group bg-white border border-[#E8E2D9] hover:border-[#FF5500] rounded-3xl overflow-hidden shadow-[0_12px_36px_-14px_rgba(17,19,21,0.06)] hover:shadow-[0_22px_50px_-14px_rgba(255,85,0,0.14)] transition-all duration-300 flex flex-col h-full"
            >
              {/* Card Media */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFEAE1] border-b border-[#E8E2D9]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] text-white text-[11px] font-mono font-bold uppercase tracking-wider border border-white/15 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 size-9 rounded-full bg-white text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white flex items-center justify-center shadow-md transition-colors">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Card Content — Immediate Full Visibility */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5 bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs font-mono font-semibold text-[#2D2A26]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#FF5500]" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} className="text-[#FF5500]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#111315] group-hover:text-[#FF5500] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#2D2A26] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ECE6DC] flex items-center justify-between text-sm font-bold text-[#111315] group-hover:text-[#FF5500] transition-colors">
                  <span>Read Article</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
