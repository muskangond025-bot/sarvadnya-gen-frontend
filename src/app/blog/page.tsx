import { Metadata } from "next";
import {
  BlogHero,
  BlogCategories,
  BlogGrid,
  BlogNewsletter,
} from "@/components/blog";
import { FloatingGlow } from "@/components/shared/client";

export const metadata: Metadata = {
  title: "Power Insights Blog | Sarvadnya Generators Nashik",
  description: "Expert advice on generator maintenance, selection guides for weddings, and power solution news for Nashik and Maharashtra.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20 relative overflow-hidden">
      {/* Floating Gradients */}
      <FloatingGlow color="#00ff8f" size="xl" className="-top-1/4 -right-1/4 opacity-10" />
      <FloatingGlow color="#00d1ff" size="lg" className="top-1/2 -left-1/4 opacity-10" delay={2} />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[60px] relative z-10">
        {/* 1. Blog Hero - Featured Post */}
        <BlogHero />

        {/* 2. Categories and Search */}
        <div className="my-16">
          <BlogCategories />
        </div>

        {/* 3. Blog Grid */}
        <BlogGrid />

        {/* 4. Newsletter Section */}
        <div className="mt-32">
          <BlogNewsletter />
        </div>
      </div>
    </main>
  );
}
