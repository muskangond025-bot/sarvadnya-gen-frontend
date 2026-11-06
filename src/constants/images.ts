/**
 * Generator Image Constants
 *
 * Centralized image URLs for all generator products.
 * These are used across GeneratorRange and GeneratorDetails components.
 */

export const GENERATOR_IMAGES = {
  // Entry Series - 5 kVA
  entry_5kva: "/images/generators/generator_5.png",

  // Mid-Range Series - 30 kVA
  midRange_30kva: "/images/generators/generator_27.png",

  // Commercial Series - 65 kVA
  commercial_65kva: "/images/generators/generator_36.png",

  // Industrial Series - 125 kVA
  industrial_125kva: "/images/generators/generator_38.png",

  // Heavy Industrial Series - 250 kVA
  heavyIndustrial_250kva: "/images/generators/generator_39.png",

  // Enterprise Series - 300+ kVA
  enterprise_300kva: "/images/generators/generator_14.png",
} as const;

// Type for accessing image keys
export type GeneratorImageKey = keyof typeof GENERATOR_IMAGES;

// Helper function to get image URL by key
export function getGeneratorImage(key: GeneratorImageKey): string {
  return GENERATOR_IMAGES[key];
}
