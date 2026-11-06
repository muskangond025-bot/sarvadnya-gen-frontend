"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/common";

export interface WishlistItem {
  id: string;
  name: string;
  kva: string;
  dailyRate: string;
  brand: string;
  fuelType: string;
  image: string;
  category: string;
}

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
}

export function WishlistCard({ item, onRemove }: WishlistCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl bg-[#111] border border-white/10 hover:border-[#00ff8f]/40 p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff8f]/5 blur-3xl rounded-full pointer-events-none group-hover:bg-[#00ff8f]/10 transition-colors" />

      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#00ff8f]">
            {item.category}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Remove from wishlist"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="relative h-44 w-full mb-6 rounded-2xl bg-black/40 overflow-hidden flex items-center justify-center border border-white/5">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <h3 className="text-xl font-bold text-white font-['Poppins',sans-serif] group-hover:text-[#00ff8f] transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-white/50 font-['Outfit',sans-serif] mt-1">{item.brand} • {item.fuelType}</p>

        <div className="grid grid-cols-2 gap-3 my-6 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-[#00ff8f]" />
            <div>
              <p className="text-[10px] text-white/40">OUTPUT</p>
              <p className="text-sm font-semibold text-white">{item.kva}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#00ff8f]" />
            <div>
              <p className="text-[10px] text-white/40">COMPLIANCE</p>
              <p className="text-sm font-semibold text-white">CPCB II</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-white/40 font-['Outfit',sans-serif]">Daily Rental</p>
          <p className="text-xl font-bold text-[#00ff8f] font-['Poppins',sans-serif]">₹{item.dailyRate}<span className="text-xs text-white/60 font-normal">/day</span></p>
        </div>
        <Button href={`/book?generator=${item.id}`} variant="primary" size="sm">
          Book Now
        </Button>
      </div>
    </motion.div>
  );
}
