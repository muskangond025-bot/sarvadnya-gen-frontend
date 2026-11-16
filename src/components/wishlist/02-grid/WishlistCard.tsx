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
      className="group relative rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D9] hover:border-[#FF5500]/45 hover:shadow-[0_12px_36px_-12px_rgba(17,19,21,0.1)] p-3 sm:p-5 md:p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-4">
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[10px] sm:text-xs font-medium text-[#FF5500] truncate max-w-[70%]">
            {item.category}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 sm:p-2 rounded-lg sm:rounded-xl text-[#524E48] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
            title="Remove from cart"
          >
            <Trash2 className="size-3.5 sm:size-4" />
          </button>
        </div>

        <div className="relative h-28 sm:h-36 md:h-44 w-full mb-3 sm:mb-5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] overflow-hidden flex items-center justify-center border border-[#E8E2D9]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <h3 className="text-xs sm:text-base md:text-xl font-bold text-[#111315] font-sans group-hover:text-[#FF5500] transition-colors line-clamp-1">
          {item.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-[#524E48] font-sans mt-0.5 truncate">
          {item.brand} • {item.fuelType}
        </p>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-3 my-2.5 sm:my-5 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <Zap className="size-3 sm:size-4 text-[#FF5500] shrink-0" />
            <div className="min-w-0 truncate">
              <p className="text-[8px] sm:text-[10px] font-mono tracking-wider text-[#524E48]">
                OUTPUT
              </p>
              <p className="text-[11px] sm:text-sm font-semibold text-[#111315] truncate">{item.kva}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <ShieldCheck className="size-3 sm:size-4 text-[#FF5500] shrink-0" />
            <div className="min-w-0 truncate">
              <p className="text-[8px] sm:text-[10px] font-mono tracking-wider text-[#524E48]">
                COMPLIANCE
              </p>
              <p className="text-[11px] sm:text-sm font-semibold text-[#111315] truncate">CPCB II</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2.5 sm:pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <p className="text-[10px] sm:text-xs text-[#524E48] font-sans">Daily Rental</p>
          <p className="text-xs sm:text-base md:text-xl font-bold text-[#FF5500] font-sans">
            ₹{item.dailyRate}
            <span className="text-[9px] sm:text-xs text-[#524E48] font-normal">/day</span>
          </p>
        </div>
        <Button
          href={`/book?kVA=${item.kva.replace(/[^0-9.]/g, "") || "30"}&quote=active`}
          variant="primary"
          size="sm"
          className="w-full sm:w-auto text-[11px] sm:text-xs py-1.5 sm:py-2 px-2.5 sm:px-4 text-center justify-center font-bold"
        >
          Book Now
        </Button>
      </div>
    </motion.div>
  );
}
