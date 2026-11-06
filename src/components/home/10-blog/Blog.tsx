import React from "react";
import { BlogClient, BlogPost } from "./BlogClient";

/**
 * Blog Component (Server Component)
 * 
 * Verified generator rental guides interchanging on a single featured card.
 */
const BLOG_POSTS: BlogPost[] = [
  {
    category: "Event Power Sizing",
    title: "How to Calculate kVA Requirements for Outdoor Weddings & Banquets",
    description:
      "A practical engineering guide to summing continuous lighting loads, audio amplifiers, and catering equipment to prevent voltage dips during your ceremony.",
    imageSrc: "/images/blog/blog-main.png",
    slug: "calculating-kva-outdoor-weddings",
  },
  {
    category: "Acoustic Standards",
    title: "Why CPCB-II Soundproof Canopies are Mandatory for Urban Venues",
    description:
      "Understanding ambient decibel limits, residential event restrictions, and how silent generator attenuation keeps functions disturbance-free.",
    imageSrc: "/images/blog/blog-image-1.png",
    slug: "cpcb-acoustic-enclosures-urban-events",
  },
  {
    category: "Industrial Power",
    title: "Prime Continuous vs. Standby DG Sets: Selecting Industrial Capacity",
    description:
      "Key electrical considerations for factory shutdowns, temporary maintenance overhauls, and construction sites across Maharashtra.",
    imageSrc: "/images/about/story-main.png",
    slug: "prime-continuous-vs-standby-dg-sets",
  },
];

export function Blog() {
  return <BlogClient posts={BLOG_POSTS} />;
}
