"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const POSTS = [
  {
    slug: "industrial-generator-maintenance",
    title: "Essential Maintenance Tips for Industrial Silent DG Sets",
    category: "Maintenance",
    date: "May 10, 2026",
    image: "/images/blog/blog-main.png"
  },
  {
    slug: "hospital-power-backup",
    title: "Critical Power Backup for Hospitals: Why Every Second Counts",
    category: "Industrial",
    date: "May 08, 2026",
    image: "/images/blog/blog-main.png"
  },
  {
    slug: "fuel-management-strategies",
    title: "Optimizing Fuel Management: Strategies for Long-Term Rentals",
    category: "Efficiency",
    date: "May 05, 2026",
    image: "/images/blog/blog-main.png"
  },
  {
    slug: "nashik-industrial-growth",
    title: "How Sarvadnya Generators is Powering Nashik's Industrial Expansion",
    category: "Case Study",
    date: "May 01, 2026",
    image: "/images/blog/blog-main.png"
  },
  {
    slug: "acoustic-enclosures-explained",
    title: "The Science of Silence: How Our Acoustic Enclosures Work",
    category: "Technology",
    date: "April 28, 2026",
    image: "/images/blog/blog-main.png"
  },
  {
    slug: "event-power-planning",
    title: "Pro Tips for Planning Power Infrastructure for Outdoor Concerts",
    category: "Events",
    date: "April 25, 2026",
    image: "/images/blog/blog-main.png"
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function BlogGrid() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
    >
      {POSTS.map((post) => (
        <motion.div 
          variants={item} 
          key={post.slug}
          whileHover={{ 
            scale: 1.02, 
            rotateY: 2, 
            rotateX: -2,
            transition: { duration: 0.3 }
          }}
          style={{ perspective: 1000 }}
        >
          <Link 
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-6 h-full"
          >
          {/* Card Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 group-hover:border-[#00ff8f]/30 transition-all">
            <Image 
              src={post.image}
              alt={post.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[#00ff8f] text-[10px] font-bold uppercase tracking-widest border border-white/10">
                {post.category}
              </span>
            </div>
            {/* Hover Icon */}
            <div className="absolute top-4 right-4 size-10 rounded-full bg-[#00ff8f] flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
              <ArrowUpRight size={20} />
            </div>
          </div>

          {/* Card Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
              <Calendar size={12} className="text-[#00ff8f]" />
              <span>{post.date}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-['Poppins',sans-serif] group-hover:text-[#00ff8f] transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-[#bfbfbf] text-sm font-['Outfit',sans-serif] line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity">
              In-depth analysis and expert recommendations for achieving maximum operational efficiency in your sector.
            </p>
          </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
