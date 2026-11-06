import React from "react";
import Link from "next/link";
import { BookmarkX, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/common";

export function WishlistEmpty() {
  return (
    <section className="px-6 md:px-10 lg:px-[60px] max-w-[1440px] mx-auto py-24 text-center">
      <div className="size-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-white/40">
        <BookmarkX className="size-10" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white font-['Poppins',sans-serif]">
        Your Wishlist is Empty
      </h2>
      <p className="text-[#bfbfbf] font-['Outfit',sans-serif] mt-2 max-w-md mx-auto">
        You haven't saved any silent DG sets yet. Explore our fleet from 5kVA to 250kVA and shortlist the best fit for your project.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button href="/generators" variant="primary" size="md">
          Explore Fleet <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}
