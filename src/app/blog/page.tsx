import { Metadata } from "next";
import {
  BlogHero,
  BlogCategories,
  BlogGrid,
  BlogNewsletter,
} from "@/components/blog";

export const metadata: Metadata = {
  title: "Power Insights Blog | Sarvadnya Generators Nashik",
  description:
    "Expert advice on generator maintenance, selection guides for weddings, and power solution news for Nashik and Maharashtra.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#111315] pb-20 relative overflow-x-clip">
      {/* 1. Full-Width Featured Blog Hero */}
      <BlogHero />

      {/* 2–4. Categories, High-Contrast Grid & Card-Free Editorial Newsletter */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[60px] pt-10 sm:pt-14">
        <div className="mb-10 sm:mb-12">
          <BlogCategories />
        </div>

        <BlogGrid />

        <div className="mt-16 sm:mt-24">
          <BlogNewsletter />
        </div>
      </div>
    </main>
  );
}
