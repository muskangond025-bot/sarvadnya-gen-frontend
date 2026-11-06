import React from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  Coins,
  UserCheck,
  Network,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
  className?: string;
}

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  transactions: ArrowUpDown,
  tokenization: Coins,
  identity: UserCheck,
  interoperability: Network,
};

export function FeatureCard({
  title,
  description,
  icon,
  featured,
  className,
}: FeatureCardProps) {
  const baseClasses =
    "bg-[#191921] relative rounded-[12px] shrink-0 w-full overflow-hidden";
  const featuredClasses = featured
    ? "bg-gradient-to-br from-[#010101] to-[#00b566] border-sm border-white/20"
    : "border border-transparent hover:border-[#00ff8f]/20 transition-colors duration-300";

  // Get the icon component or fallback to Sparkles
  const IconComponent = iconMap[icon] || Sparkles;

  return (
    <div className={cn(baseClasses, featuredClasses, className)}>
      <div className="flex flex-row justify-center size-full">
        <div className="flex items-start justify-center px-[20px] py-[60px] relative w-full">
          <div className="flex flex-col gap-[20px] items-start w-full max-w-[347px]">
            {/* Icon */}
            <div className="flex items-start justify-end w-full">
              {/* Outer ring with radial gradient glow effect */}
              <div className="relative size-[100px] rounded-full flex items-center justify-center">
                {/* Gradient ring - edge to center fade */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, transparent 50%, rgba(0, 148, 83, 0.4) 70%, rgba(0, 255, 143, 0.6) 100%)",
                  }}
                />
                {/* Inner dark circle */}
                <div className="absolute inset-[8px] rounded-full bg-[#0a1f15]" />
                {/* Icon */}
                <IconComponent
                  className="relative z-10 size-10 text-white"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <h3 className="capitalize font-['Poppins',sans-serif] font-medium leading-[1.3] text-[30px] text-white">
                {title}
              </h3>
              <p className="font-['Outfit',sans-serif] font-normal leading-normal text-[#bfbfbf] text-[16px]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
