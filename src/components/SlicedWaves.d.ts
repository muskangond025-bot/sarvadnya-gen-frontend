import React from 'react';

export interface SlicedWavesProps {
  color1?: string;
  color2?: string;
  color3?: string;
  ribbons?: number;
  spacing?: number;
  perspective?: number;
  blur?: number;
  glow?: number;
  position?: number;
  mouseInteraction?: boolean;
  barWidth?: number;
  ribbonHeight?: number;
  spread?: number;
  amplitude?: number;
  frequency?: number;
  curve?: number;
  slices?: number;
  speed?: number;
  brightness?: number;
  rotation?: number;
  grain?: number;
  fade?: number;
  opacity?: number;
  intro?: boolean;
  lightMode?: boolean;
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const SlicedWaves: React.FC<SlicedWavesProps>;
export default SlicedWaves;

