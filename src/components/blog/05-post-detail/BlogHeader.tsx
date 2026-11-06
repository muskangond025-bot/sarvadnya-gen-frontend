import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, User, Clock, Share2 } from "lucide-react";

export function BlogHeader({ slug }: { slug: string }) {
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col gap-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-widest">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <ChevronRight size={14} />
        <span className="text-[#00ff8f] truncate max-w-[200px] sm:max-w-none">{title}</span>
      </nav>

      <div className="max-w-4xl flex flex-col gap-8">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white font-['Poppins',sans-serif] leading-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 md:gap-10 py-6 border-y border-white/10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#00ff8f]/20 flex items-center justify-center text-[#00ff8f] text-xs font-bold">TA</div>
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Written By</span>
              <span className="text-white text-sm font-bold">Tanmay Avhad</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-[#00ff8f]" />
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Published On</span>
              <span className="text-white text-sm font-bold">May 15, 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={20} className="text-[#00ff8f]" />
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Read Time</span>
              <span className="text-white text-sm font-bold">12 Min Read</span>
            </div>
          </div>

          <button className="ml-auto p-4 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-[#00ff8f] hover:border-[#00ff8f]/30 transition-all flex items-center gap-2 text-sm font-bold">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      {/* Main Hero Image */}
      <div className="relative aspect-[21/9] w-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
        <Image 
          src="/images/blog/blog-main.png"
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>
    </div>
  );
}
