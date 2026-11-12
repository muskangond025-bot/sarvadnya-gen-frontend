import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RELATED = [
  {
    slug: "fuel-management-strategies",
    title: "Optimizing Fuel Management for Long-Term Rentals",
    category: "Efficiency",
    image: "/images/services/generator_engine_bg.jpg",
  },
  {
    slug: "nashik-industrial-growth",
    title: "How We Are Powering Nashik's Industrial Expansion",
    category: "Case Studies",
    image: "/images/industries/construction.png",
  },
  {
    slug: "event-power-planning",
    title: "Planning Power for Outdoor Concerts",
    category: "Events",
    image: "/images/blog/blog-image-1.png",
  },
];

export function RelatedPosts() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
          Related Articles
        </h3>
        <Link
          href="/blog"
          className="flex items-center gap-2 text-[#FF5500] hover:text-[#111315] font-bold text-sm transition-colors"
        >
          View All <ArrowRight size={17} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
        {RELATED.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white border border-[#E8E2D9] hover:border-[#FF5500]/55 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden bg-[#F3EFE8]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <span className="text-[#FF5500] font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                {post.category}
              </span>
              <h4 className="text-[#111315] font-bold text-lg leading-snug group-hover:text-[#FF5500] transition-colors">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
