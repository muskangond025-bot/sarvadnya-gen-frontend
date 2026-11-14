"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { SplashCursorProps } from "@/components/SplashCursor";

const SplashCursorComponent = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" aria-hidden="true" />,
});

/**
 * SplashCursorBackground
 * 
 * Interactive WebGL fluid dynamics component from React Bits.
 * Generates interactive fluid ripples and splash bursts with cursor movement and clicks.
 * Custom-tuned with vibrant Sarvadnya Energy Orange hues (#FF5500).
 */
export function SplashCursorBackground(props: Partial<SplashCursorProps>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-transparent" aria-hidden="true" />;
  }

  return (
    <SplashCursorComponent
      rainbow={false}
      colors={["#FF5500", "#FF6E1A", "#FF8833", "#FFA04D", "#FF3D00"]}
      colorSpeed={1}
      intensity={1}
      size={1.1}
      force={1}
      swirl={3}
      trail={1.2}
      momentum={1}
      shading={0.8}
      glow={0.3}
      quality="high"
      clickSplash={true}
      intro={false}
      contained={true}
      theme="light"
      zIndex={1}
      {...props}
    />
  );
}
