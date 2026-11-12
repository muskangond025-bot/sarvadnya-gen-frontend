"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Trash2 } from "lucide-react";
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
      className="group relative rounded-3xl bg-white border border-[#E8E2D9] hover:border-[#FF5500]/45 hover:shadow-[0_12px_36px_-12px_rgba(17,19,21,0.1)] p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-medium text-[#FF5500]">
            {item.category}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 rounded-xl text-[#524E48] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Remove from wishlist"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="relative h-44 w-full mb-6 rounded-2xl bg-[#FAF8F5] overflow-hidden flex items-center justify-center border border-[#E8E2D9]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <h3 className="text-xl font-bold text-[#111315] font-sans group-hover:text-[#FF5500] transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-[#524E48] font-sans mt-1">
          {item.brand} • {item.fuelType}
        </p>

        <div className="grid grid-cols-2 gap-3 my-6 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-[#FF5500]" />
            <div>
              <p className="text-[10px] font-mono tracking-wider text-[#524E48]">
                OUTPUT
              </p>
              <p className="text-sm font-semibold text-[#111315]">{item.kva}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#FF5500]" />
            <div>
              <p className="text-[10px] font-mono tracking-wider text-[#524E48]">
                COMPLIANCE
              </p>
              <p className="text-sm font-semibold text-[#111315]">CPCB II</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#524E48] font-sans">Daily Rental</p>
          <p className="text-xl font-bold text-[#FF5500] font-sans">
            ₹{item.dailyRate}
            <span className="text-xs text-[#524E48] font-normal">/day</span>
          </p>
        </div>
        <Button href={`/book?generator=${item.id}`} variant="primary" size="sm">
          Book Now
        </Button>
      </div>
    </motion.div>
  );
}
