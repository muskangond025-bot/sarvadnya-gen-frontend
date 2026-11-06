"use client";

import { motion } from "framer-motion";
import { Headphones, ShieldCheck, Zap, Settings, LucideIcon, ArrowUpRight } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  headphones: Headphones,
  shield: ShieldCheck,
  zap: Zap,
  settings: Settings,
};

interface ServiceCard {
  iconName: string;
  title: string;
  desc: string;
}

/**
 * ServiceCardsClient Component
 * 
 * High-fidelity trust cards with sophisticated animations and interactive depth.
 */
export function ServiceCardsClient({ cards }: { cards: ServiceCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      {cards.map((card, i) => {
        const Icon = ICON_MAP[card.iconName] || Settings;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 1, 
              delay: i * 0.15, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            whileHover={{ y: -12 }}
            className="group relative h-full"
          >
            {/* Card Main Container */}
            <div className="relative h-full p-10 rounded-[40px] border border-white/5 bg-[#080808] backdrop-blur-xl transition-all duration-500 group-hover:border-[#00ff8f]/30 flex flex-col">
              
              {/* Animated Reveal Background */}
              <div className="absolute inset-0 rounded-[40px] bg-linear-to-b from-[#00ff8f]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Corner Glow */}
              <div className="absolute -top-10 -right-10 size-40 bg-[#00ff8f]/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Section */}
                <div className="flex items-center justify-between mb-10">
                  <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff8f] group-hover:bg-[#00ff8f] group-hover:text-black group-hover:shadow-[0_0_25px_rgba(0,255,143,0.4)] transition-all duration-500 group-hover:rotate-6">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <div className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#00ff8f] group-hover:border-[#00ff8f]/20 transition-all duration-500">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                
                {/* Text Content */}
                <h4 className="text-white font-['Poppins',sans-serif] text-2xl font-bold mb-4 tracking-tight group-hover:text-[#00ff8f] transition-colors duration-300">
                  {card.title}
                </h4>
                
                <p className="text-[#888] font-['Outfit',sans-serif] text-lg leading-relaxed font-light group-hover:text-[#bfbfbf] transition-colors duration-300">
                  {card.desc}
                </p>

                {/* Bottom Decorative Element */}
                <div className="mt-auto pt-8">
                  <div className="w-0 h-px bg-linear-to-r from-[#00ff8f] to-transparent group-hover:w-full transition-all duration-700" />
                </div>
              </div>

              {/* Technical Detail Badge (Invisible until hover) */}
              <div className="absolute bottom-6 right-8 text-[10px] uppercase tracking-[0.2em] font-bold text-[#00ff8f]/0 group-hover:text-[#00ff8f]/30 transition-all duration-500 pointer-events-none">
                Reliability Verified
              </div>
            </div>

            {/* Subtle Drop Shadow Glow */}
            <div className="absolute -inset-2 bg-[#00ff8f]/5 blur-[30px] rounded-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </motion.div>
        );
      })}
    </div>
  );
}
