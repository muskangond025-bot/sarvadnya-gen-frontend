import { GENERATOR_IMAGES } from "@/constants";

/**
 * Resolves the display image URL for a generator based on its backend image
 * or its rated kVA capacity.
 */
export function resolveGeneratorImage(
  kva: number,
  primaryImageUrl: string | null | undefined
): string {
  if (primaryImageUrl) return primaryImageUrl;
  if (kva <= 10) return GENERATOR_IMAGES.entry_5kva;
  if (kva <= 40) return GENERATOR_IMAGES.midRange_30kva;
  if (kva <= 80) return GENERATOR_IMAGES.commercial_65kva;
  if (kva <= 150) return GENERATOR_IMAGES.industrial_125kva;
  if (kva <= 280) return GENERATOR_IMAGES.heavyIndustrial_250kva;
  return GENERATOR_IMAGES.enterprise_300kva;
}

/**
 * Formats snake_case backend spec strings (e.g. "three_phase", "diesel") into
 * crisp human-readable labels ("Three Phase", "Diesel").
 */
export function formatGeneratorSpecValue(
  raw: string | null | undefined,
  fallback = "Standard"
): string {
  if (!raw) return fallback;
  return raw
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

