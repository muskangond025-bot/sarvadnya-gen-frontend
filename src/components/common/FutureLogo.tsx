import React from "react";
import { cn } from "@/lib/utils";

interface FutureLogoProps {
  className?: string;
}

export default function FutureLogo({ className }: FutureLogoProps) {
  return (
    <div className={cn("shrink-0 flex items-center justify-center p-2", className)}>
      <img
        src="/images/brand/sarvadnya-logo-dark.png"
        alt="Sarvadnya Generator — Power You Can Trust"
        width={704}
        height={659}
        className="w-auto h-full max-h-full object-contain drop-shadow-[0_12px_32px_rgba(243,104,5,0.28)]"
        draggable={false}
      />
    </div>
  );
}
