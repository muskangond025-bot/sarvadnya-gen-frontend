"use client";

import React from "react";
import { Zap } from "lucide-react";

/**
 * LightningBoltClient Component
 *
 * Animated lightning bolt with pulsing glow effect.
 * Uses Lucide's Zap icon with CSS animations.
 */
export function LightningBoltClient() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Global CSS Animation keyframes */}
      <style>
        {`
          @keyframes lightning-pulse-glow {
            0%, 100% {
              filter: drop-shadow(0 0 10px rgba(0, 255, 143, 0.6))
                      drop-shadow(0 0 25px rgba(0, 255, 143, 0.4))
                      drop-shadow(0 0 50px rgba(0, 255, 143, 0.2));
            }
            50% {
              filter: drop-shadow(0 0 20px rgba(0, 255, 143, 1))
                      drop-shadow(0 0 45px rgba(0, 255, 143, 0.7))
                      drop-shadow(0 0 80px rgba(0, 255, 143, 0.4));
            }
          }

          @keyframes lightning-flicker {
            0%, 100% { opacity: 1; }
            9% { opacity: 0.6; }
            20% { opacity: 1; }            
            92% { opacity: 1; }
            93% { opacity: 0.6; }
            94% { opacity: 1; }
            96% { opacity: 0.7; }
            97% { opacity: 1; }
          }

          .lightning-bolt-animated {
            animation: lightning-pulse-glow 2s ease-in-out infinite,
                       lightning-flicker 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Glowing lightning bolt icon */}
      <div className="relative lightning-bolt-animated">
        <Zap
          className="w-24 h-24 sm:w-32 sm:h-40 text-[#00ff8f]/50 fill-[#00ff8f]/50"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
