"use client";

import { useState, useEffect } from "react";

/**
 * Device performance tier for adaptive rendering
 */
export type DeviceTier = "high" | "medium" | "low";

/**
 * Configuration for each tier
 */
export interface TierConfig {
  tier: DeviceTier;
  lineCount: number;
  fps: number;
  shadowBlur: number;
  shadowSpread: number;
  lineWidth: number;
  glowOpacity: number;
  baseLineOpacity: number;
}

const STORAGE_KEY = "device-tier-cache";

/**
 * ============================================================
 * TWEAK: Tier configurations - Adjust these values to customize
 * ============================================================
 *
 * lineCount    - Number of animated lines (more = heavier)
 * fps          - Target frames per second (30 or 60)
 * shadowBlur   - Glow intensity (0 = no glow, 15 = max)
 * shadowSpread - Number of glow passes (1-3)
 * lineWidth    - Thickness of the pulse line
 * glowOpacity  - Opacity of animated pulse (0-1)
 * baseLineOpacity - Opacity of static base lines (0-1)
 */
export const TIER_CONFIGS: Record<DeviceTier, TierConfig> = {
  high: {
    tier: "high",
    lineCount: 8,
    fps: 60,
    shadowBlur: 15,
    shadowSpread: 2,
    lineWidth: 2.5,
    glowOpacity: 0.8,
    baseLineOpacity: 0.15,
  },
  medium: {
    tier: "medium",
    lineCount: 5,
    fps: 60,
    shadowBlur: 5,
    shadowSpread: 1,
    lineWidth: 2,
    glowOpacity: 0.6,
    baseLineOpacity: 0.12,
  },
  low: {
    tier: "low",
    lineCount: 4,
    fps: 30,
    shadowBlur: 0,
    shadowSpread: 0,
    lineWidth: 1.5,
    glowOpacity: 0.5,
    baseLineOpacity: 0.1,
  },
};

/**
 * Detect device tier based on hardware capabilities
 */
function detectTier(): DeviceTier {
  // Check reduced motion preference first (accessibility)
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return "low";
  }

  // Hardware detection
  const cores = navigator.hardwareConcurrency || 4;
  const memory =
    (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
  const isMobile =
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // GPU detection (detect software renderers)
  let hasWeakGPU = false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        hasWeakGPU = /SwiftShader|llvmpipe|Software|Microsoft Basic/i.test(
          renderer
        );
      }
    }
  } catch {
    // WebGL not available, assume medium tier
  }

  // Connection-based detection (slow connection = likely mobile)
  let hasSlowConnection = false;
  if ("connection" in navigator) {
    const conn = (
      navigator as unknown as { connection?: { effectiveType?: string } }
    ).connection;
    if (conn?.effectiveType) {
      hasSlowConnection = ["slow-2g", "2g"].includes(conn.effectiveType);
    }
  }

  // Tier decision logic
  if (hasWeakGPU || hasSlowConnection || isMobile || cores < 4 || memory < 4) {
    return "low";
  }
  if (cores >= 8 && memory >= 8) {
    return "high";
  }
  return "medium";
}

/**
 * Hook to get device tier configuration with session caching
 *
 * The tier is detected once and cached in sessionStorage for the
 * duration of the browser session to avoid repeated detection.
 *
 * @param override - Optional tier override for testing/debugging
 * @returns TierConfig object with rendering parameters
 *
 * @example
 * ```tsx
 * const config = useDeviceTier();
 * // Use config.shadowBlur, config.lineCount, etc.
 *
 * // Force a specific tier for testing
 * const lowConfig = useDeviceTier("low");
 * ```
 */
export function useDeviceTier(override?: DeviceTier): TierConfig {
  const [config, setConfig] = useState<TierConfig>(TIER_CONFIGS.medium);

  useEffect(() => {
    // If override provided, use it directly
    if (override) {
      setConfig(TIER_CONFIGS[override]);
      return;
    }

    // Check session cache first
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      if (cached && cached in TIER_CONFIGS) {
        const tier = cached as DeviceTier;
        setConfig(TIER_CONFIGS[tier]);
        return;
      }
    } catch {
      // sessionStorage not available (SSR or private mode)
    }

    // Detect and cache
    const tier = detectTier();
    try {
      sessionStorage.setItem(STORAGE_KEY, tier);
    } catch {
      // sessionStorage not available
    }
    setConfig(TIER_CONFIGS[tier]);
  }, [override]);

  return config;
}

/**
 * Utility to clear the cached tier (useful for testing)
 */
export function clearDeviceTierCache(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // sessionStorage not available
  }
}
