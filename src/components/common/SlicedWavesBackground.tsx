"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { SlicedWavesProps } from "@/components/SlicedWaves";

const SlicedWavesComponent = dynamic(() => import("@/components/SlicedWaves"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" aria-hidden="true" />,
});

/**
 * SlicedWavesBackground
 * 
 * Interactive WebGL background component from React Bits.
 * Renders glowing ribbon waves reacting to mouse movement in bright or dark mode.
 */
export function SlicedWavesBackground(props: Partial<SlicedWavesProps>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-transparent" aria-hidden="true" />;
  }

  return (
    <div className="w-full h-full relative overflow-hidden pointer-events-auto">
      <SlicedWavesComponent
        color1="#ff9d4d"
        color2="#ff2d78"
        color3="#3060ff"
        ribbons={3}
        spacing={28}
        perspective={0.45}
        blur={0.6}
        glow={1}
        position={0.78}
        mouseInteraction
        barWidth={0.5}
        ribbonHeight={0.26}
        spread={0.1}
        amplitude={0.1}
        frequency={1}
        curve={0.5}
        slices={0}
        speed={1}
        brightness={1.25}
        rotation={0}
        grain={0.08}
        fade={0}
        opacity={1}
        intro
        lightMode
        {...props}
      />
    </div>
  );
}

export default SlicedWavesBackground;

