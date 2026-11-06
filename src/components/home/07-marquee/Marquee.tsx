import React from "react";
import { MarqueeClient } from "./MarqueeClient";

/**
 * Marquee Component (Server Component)
 * 
 * Twin-line editorial text marquee:
 * - Line 1: Solid heavy typography (scrolls left)
 * - Line 2: Outline architectural typography (scrolls right)
 * - Pure light surface background with zero visual clutter
 */
export function Marquee() {
  return <MarqueeClient />;
}
