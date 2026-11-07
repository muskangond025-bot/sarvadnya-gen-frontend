"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export interface BlogPost {
  key?: string;
  category: string;
  title: string;
  description: string;
  imageSrc?: string;
  slug?: string;
}

interface BlogClientProps {
  posts: BlogPost[];
}

const CYCLE_DURATION = 4800;

export function BlogClient({ posts }: BlogClientProps) {
  const [priorityIndex, setPriorityIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  // Physical continuous loop rotation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setPriorityIndex((prev) => (prev + 1) % posts.length);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, posts.length]);

  const featuredPost = posts[priorityIndex];
  const nextIndex1 = (priorityIndex + 1) % posts.length;
  const nextIndex2 = (priorityIndex + 2) % posts.length;
  const rightPost1 = posts[nextIndex1];
  const rightPost2 = posts[nextIndex2];

  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Left-Aligned Clean Section Header */}
        <div className="max-w-3xl text-left">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#1F1F1E] tracking-tight leading-[1.18]">
            {t("blog.title")}
          </h2>
          <p className="text-sm sm:text-base text-[#625D55] mt-2 leading-relaxed">
            {t("blog.desc")}
          </p>
        </div>

        {/* Dense Spatial Loop Grid: Left Priority Stage & Right Queue */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch"
        >
          {/* LEFT SIDE: PRIORITY STAGE (Spatial Conveyor Loop with Slow Image Reveal) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative bg-white border border-[#E8E2D9] rounded-2xl sm:rounded-[24px] overflow-hidden shadow-[0_16px_45px_rgba(31,31,30,0.06)] hover:border-[#1F1F1E] transition-all flex flex-col h-full group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredPost.slug || featuredPost.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  {/* Slow Cinematic Aperture Image Reveal */}
                  <div className="relative h-60 sm:h-68 lg:h-72 w-full bg-[#1F1F1E] overflow-hidden">
                    <motion.div
                      initial={{ clipPath: "inset(14% 10% 14% 10%)", scale: 1.08 }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1.0 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={featuredPost.imageSrc || "/images/blog/blog-main.png"}
                        alt={featuredPost.title}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none"
                      />
                    </motion.div>
                  </div>

                  {/* Dense Text Content */}
                  <div className="p-6 sm:p-7 lg:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-sans font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#1F1F1E] group-hover:text-[#FF5500] transition-colors leading-[1.22] mb-3">
                        {featuredPost.title}
                      </h3>

                      <p className="text-sm text-[#625D55] leading-relaxed font-normal mb-5 line-clamp-3">
                        {featuredPost.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                      <Link
                        href={`/blog/${featuredPost.slug || "guide"}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F1F1E] hover:bg-[#FF5500] text-white text-xs sm:text-sm font-semibold transition-colors duration-200 group/btn"
                      >
                        <span>{t("blog.readGuide")}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      <div className="flex items-center gap-1.5 text-xs text-[#625D55] font-mono">
                        <Compass className="w-3.5 h-3.5 text-[#FF5500]" />
                        <span>Nashik DG Fleet Desk</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE: TWO DENSE LOOP QUEUE CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            {/* Queue Card 1 */}
            <div
              onClick={() => setPriorityIndex(nextIndex1)}
              className={cn(
                "bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#FF5500] hover:shadow-md transition-all duration-300 cursor-pointer group shadow-xs flex-1",
                "relative overflow-hidden"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF5500]">
                    {rightPost1.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#625D55]">
                    0{((nextIndex1 + 1) % 3) + 1}
                  </span>
                </div>

                <h4 className="font-sans font-bold text-base sm:text-lg text-[#1F1F1E] group-hover:text-[#FF5500] transition-colors leading-snug mb-2">
                  {rightPost1.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#625D55] leading-relaxed line-clamp-2">
                  {rightPost1.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E8E2D9]/60 flex items-center justify-between text-xs font-semibold text-[#FF5500] group-hover:text-[#E04B00] transition-colors">
                <span className="inline-flex items-center gap-1.5">
                  <span>Cycle to Priority</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-mono text-[#625D55] group-hover:text-[#1F1F1E]">
                  Click to View
                </span>
              </div>
            </div>

            {/* Queue Card 2 */}
            <div
              onClick={() => setPriorityIndex(nextIndex2)}
              className={cn(
                "bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#FF5500] hover:shadow-md transition-all duration-300 cursor-pointer group shadow-xs flex-1",
                "relative overflow-hidden"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF5500]">
                    {rightPost2.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#625D55]">
                    0{((nextIndex2 + 1) % 3) + 1}
                  </span>
                </div>

                <h4 className="font-sans font-bold text-base sm:text-lg text-[#1F1F1E] group-hover:text-[#FF5500] transition-colors leading-snug mb-2">
                  {rightPost2.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#625D55] leading-relaxed line-clamp-2">
                  {rightPost2.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E8E2D9]/60 flex items-center justify-between text-xs font-semibold text-[#FF5500] group-hover:text-[#E04B00] transition-colors">
                <span className="inline-flex items-center gap-1.5">
                  <span>Cycle to Priority</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-mono text-[#625D55] group-hover:text-[#1F1F1E]">
                  Click to View
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
