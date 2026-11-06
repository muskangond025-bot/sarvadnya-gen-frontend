import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

/**
 * BlogHero Component
 * 
 * Showcases the featured blog post with a cinematic, large-scale layout.
 */
export function BlogHero() {
  const featuredPost = {
    slug: "choosing-right-generator-wedding",
    title: "The Ultimate Guide to Choosing the Right Generator for Your Wedding",
    excerpt: "Don't let power outages dim your big day. Learn how to calculate your kVA needs, manage acoustic levels, and ensure seamless entertainment.",
    category: "Guides",
    date: "May 15, 2026",
    readTime: "8 min read",
    image: "/images/blog/blog-main.png"
  };

  return (
    <section className="relative w-full aspect-[21/9] min-h-[400px] rounded-[32px] overflow-hidden group">
      {/* Background Image with Overlay */}
      <Image 
        src={featuredPost.image}
        alt={featuredPost.title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-20">
        <div className="max-w-3xl flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1 rounded-full bg-[#00ff8f] text-black font-bold text-xs uppercase tracking-widest">
              {featuredPost.category}
            </span>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Calendar size={14} />
              <span>{featuredPost.date}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Clock size={14} />
              <span>{featuredPost.readTime}</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-['Poppins',sans-serif] leading-tight">
            {featuredPost.title}
          </h2>

          <p className="text-[#bfbfbf] text-lg md:text-xl font-['Outfit',sans-serif] line-clamp-2">
            {featuredPost.excerpt}
          </p>

          <Link 
            href={`/blog/${featuredPost.slug}`}
            className="w-fit flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-[#00ff8f] transition-all group/btn"
          >
            Read Article
            <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
