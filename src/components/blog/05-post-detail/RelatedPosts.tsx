import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RELATED = [
  {
    slug: "fuel-management-strategies",
    title: "Optimizing Fuel Management for Long-Term Rentals",
    category: "Efficiency",
    image: "/images/blog/blog-main.png"
  },
  {
    slug: "nashik-industrial-growth",
    title: "How We Are Powering Nashik's Industrial Expansion",
    category: "Case Study",
    image: "/images/blog/blog-main.png"
  },
  {
    slug: "event-power-planning",
    title: "Planning Power for Outdoor Concerts",
    category: "Events",
    image: "/images/blog/blog-main.png"
  },
];

export function RelatedPosts() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <h3 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">Related Articles</h3>
        <Link href="/blog" className="flex items-center gap-2 text-[#00ff8f] font-bold text-sm hover:translate-x-1 transition-transform">
          View All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {RELATED.map((post) => (
          <Link 
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#00ff8f]/30 transition-all">
              <Image 
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#00ff8f] text-[10px] font-bold uppercase tracking-[0.2em]">{post.category}</span>
              <h4 className="text-white font-bold text-xl leading-tight group-hover:text-[#00ff8f] transition-colors">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
