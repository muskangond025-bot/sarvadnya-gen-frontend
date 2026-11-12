import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * BlogHero Component
 *
 * Full-bleed panoramic featured story stage with integrated high-contrast typography.
 */
export function BlogHero() {
  const featuredPost = {
    slug: "choosing-right-generator-wedding",
    title:
      "The Ultimate Guide to Choosing the Right Generator for Your Wedding",
    excerpt:
      "Don't let power outages dim your big day. Learn how to calculate your kVA needs, manage acoustic levels, and ensure seamless entertainment.",
    image: "/images/blog/blog-main.png",
  };

  return (
    <section className="relative w-full min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex items-end overflow-hidden group pt-24 sm:pt-28 bg-[#18181B]">
      {/* Full-Bleed Background Visual */}
      <Image
        src={featuredPost.image}
        alt={featuredPost.title}
        fill
        priority
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
      />

      {/* Directional Contrast Scrim for Crisp Legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#111315]/95 via-[#111315]/55 to-[#111315]/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#111315]/80 via-[#111315]/30 to-transparent"
      />

      {/* Overlaid Editorial Copy */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[60px] pb-10 sm:pb-14 lg:pb-16">
        <div className="max-w-3xl space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight">
            {featuredPost.title}
          </h1>

          <p className="text-white/95 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            {featuredPost.excerpt}
          </p>

          <div className="pt-2">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-[#111315] hover:bg-[#FF5500] hover:text-white font-bold text-sm sm:text-base rounded-xl transition-colors shadow-lg group/btn"
            >
              <span>Read Full Guide</span>
              <ArrowRight
                size={18}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
