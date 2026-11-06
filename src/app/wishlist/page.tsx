import { Metadata } from "next";
import { Wishlist } from "@/components/wishlist";

export const metadata: Metadata = {
  title: "Generator Wishlist | Shortlisted DG Sets | Sarvadnya Generators",
  description:
    "Review your saved silent diesel generators. Compare specifications, rental rates, and book power solutions for weddings, events, and industrial plants in Nashik.",
};

export default function WishlistPage() {
  return <Wishlist />;
}

