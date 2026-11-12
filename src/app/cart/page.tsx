import type { Metadata } from "next";
import { Wishlist } from "@/components/wishlist";

export const metadata: Metadata = {
  title: "Generator Cart | Shortlisted DG Sets | Sarvadnya Generators",
  description:
    "Review your shortlisted silent diesel generators, compare rental rates, and proceed to book reliable power solutions.",
};

export default function CartPage() {
  return <Wishlist />;
}

