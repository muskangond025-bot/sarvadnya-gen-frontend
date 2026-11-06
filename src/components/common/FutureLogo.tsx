import React from "react";
import { cn } from "@/lib/utils";

interface FutureLogoProps {
  className?: string;
}

export default function FutureLogo({ className }: FutureLogoProps) {
  return (
    <div className={cn("shrink-0 flex items-center justify-center", className)}>
      <span className="text-white font-['Poppins',sans-serif] font-bold text-2xl tracking-wide">
        Sarvadnya <span className="text-[#00ff8f]">Generators</span>
      </span>
    </div>
  );
}

/* Original FutureLogo SVG - commented out for now
"use client";

import React from "react";
import svgPaths from "@/lib/svg-paths-full";
import { cn } from "@/lib/utils";

interface FutureLogoProps {
  className?: string;
}

export default function FutureLogo({ className }: FutureLogoProps) {
  return (
    <div className={cn("shrink-0", className)}>
      <svg
        className="w-full h-full"
        fill="none"
        viewBox="0 0 170 170"
      >
        <g id="FutureLogoGroup">
          <path d={svgPaths.p8585f00} fill="white" fillOpacity="0.1" />
          <path
            d={svgPaths.p8585f00}
            stroke="url(#paint0_linear_future_logo)"
            strokeWidth="1.32813"
          />
          <path d={svgPaths.p2722eef0} fill="#00FF8F" />
          <path d={svgPaths.p17b81980} fill="#272727" />
          <path d={svgPaths.p33755f00} fill="#00894D" />
          <path d={svgPaths.p2483f480} fill="#00FF8F" />
          <path d={svgPaths.p379cde00} fill="#007B45" />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_future_logo"
            x1="6.67356"
            x2="170"
            y1="7.72727"
            y2="170.351"
          >
            <stop stopColor="#0AC271" />
            <stop offset="0.456222" stopColor="#089356" stopOpacity="0.3" />
            <stop offset="1" stopColor="#0AC271" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
*/
