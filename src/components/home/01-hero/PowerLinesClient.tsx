"use client";

import { useEffect, useRef, useCallback } from "react";
import { useDeviceTier, DeviceTier } from "@/hooks/useDeviceTier";

/**
 * Props for the PowerLinesClient component
 */
interface PowerLinesClientProps {
  /** Line color in hex format. Default: "#00ff8f" */
  color?: string;
  /** Override auto-detected tier for testing */
  tier?: DeviceTier;
  /** Enable/disable animation. Default: true */
  enabled?: boolean;
}

/**
 * Normalized path data (0-1 range) for responsive scaling
 * These are the power line curves that animate across the hero section
 */
const NORMALIZED_PATHS = [
  { startY: 0.343, cp1Y: 0.371, cp2Y: 0.429, endY: 0.114 },
  { startY: 0.357, cp1Y: 0.4, cp2Y: 0.457, endY: 0.257 },
  { startY: 0.371, cp1Y: 0.429, cp2Y: 0.486, endY: 0.4 },
  { startY: 0.386, cp1Y: 0.457, cp2Y: 0.514, endY: 0.543 },
  { startY: 0.4, cp1Y: 0.486, cp2Y: 0.543, endY: 0.686 },
  { startY: 0.414, cp1Y: 0.514, cp2Y: 0.571, endY: 0.829 },
  { startY: 0.429, cp1Y: 0.543, cp2Y: 0.6, endY: 0.971 },
  { startY: 0.443, cp1Y: 0.571, cp2Y: 0.629, endY: 1.1 },
];

// ============================================================
// PULSE CONFIGURATION - Adjust these values to customize pulses
// ============================================================
const PULSE_CONFIG = {
  DASH_LENGTH: 25,
  GAP_LENGTH: 2550,
  LINE_WIDTH: 5,
  LINE_CAP: "round" as CanvasLineCap,
  MIN_SPEED: 20,
  MAX_SPEED: 90,
  RANDOM_OFFSET_RANGE: 2550,
};

/**
 * PowerLinesClient Component (Canvas-based)
 *
 * Optimized animated power lines using HTML Canvas.
 * Features tier-based rendering for optimal performance across devices.
 */
export function PowerLinesClient({
  color = "#00ff8f",
  tier,
  enabled = true,
}: PowerLinesClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const offsetsRef = useRef<number[]>([]);
  const speedsRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(0);

  const config = useDeviceTier(tier);

  // Initialize offsets and speeds for each line with randomness
  useEffect(() => {
    offsetsRef.current = Array.from(
      { length: config.lineCount },
      () => Math.random() * PULSE_CONFIG.RANDOM_OFFSET_RANGE
    );

    speedsRef.current = Array.from(
      { length: config.lineCount },
      () =>
        PULSE_CONFIG.MIN_SPEED +
        Math.random() * (PULSE_CONFIG.MAX_SPEED - PULSE_CONFIG.MIN_SPEED)
    );
  }, [config.lineCount]);

  /**
   * Draw a bezier curve path on the canvas
   */
  const drawPath = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      pathIndex: number,
      isAnimated: boolean,
      offset: number
    ) => {
      const path = NORMALIZED_PATHS[pathIndex % NORMALIZED_PATHS.length];

      ctx.beginPath();
      ctx.moveTo(0, path.startY * height);
      ctx.bezierCurveTo(
        width * 0.33,
        path.cp1Y * height,
        width * 0.5,
        path.cp2Y * height,
        width,
        path.endY * height
      );

      if (isAnimated) {
        ctx.strokeStyle = color;
        ctx.lineWidth = PULSE_CONFIG.LINE_WIDTH;
        ctx.lineCap = PULSE_CONFIG.LINE_CAP;

        if (config.shadowBlur > 0) {
          ctx.shadowColor = color;
          ctx.shadowBlur = config.shadowBlur;

          if (config.shadowSpread > 1) {
            ctx.globalAlpha = 0.3;
            for (let i = 0; i < config.shadowSpread; i++) {
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = config.glowOpacity;
        ctx.setLineDash([PULSE_CONFIG.DASH_LENGTH, PULSE_CONFIG.GAP_LENGTH]);
        ctx.lineDashOffset = -offset;
        ctx.stroke();

        ctx.shadowBlur = 0;
      } else {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = config.baseLineOpacity;
        ctx.setLineDash([]);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    },
    [color, config]
  );

  /**
   * Main animation loop
   */
  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const frameInterval = 1000 / config.fps;

      const loop = (currentTime: number) => {
        if (!enabled) {
          animationRef.current = requestAnimationFrame(loop);
          return;
        }

        const elapsed = currentTime - lastFrameTimeRef.current;
        if (elapsed < frameInterval) {
          animationRef.current = requestAnimationFrame(loop);
          return;
        }
        lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < config.lineCount; i++) {
          drawPath(ctx, width, height, i, false, 0);
        }

        for (let i = 0; i < config.lineCount; i++) {
          const offset = offsetsRef.current[i];
          const speed = speedsRef.current[i] || 50;
          drawPath(ctx, width, height, i, true, offset);

          const CYCLE_LENGTH =
            PULSE_CONFIG.DASH_LENGTH + PULSE_CONFIG.GAP_LENGTH;
          offsetsRef.current[i] = (offset + speed) % CYCLE_LENGTH;
        }

        animationRef.current = requestAnimationFrame(loop);
      };

      animationRef.current = requestAnimationFrame(loop);
    },
    [config.fps, config.lineCount, drawPath, enabled]
  );

  /**
   * Setup canvas and handle resize
   */
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      return { width: rect.width, height: rect.height };
    };

    const { width, height } = setupCanvas();

    animate(ctx, width, height);

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationRef.current);
      const { width: w, height: h } = setupCanvas();
      animate(ctx, w, h);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
