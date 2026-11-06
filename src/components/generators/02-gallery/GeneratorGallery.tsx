import GeneratorGalleryClient from "./GeneratorGalleryClient";

/**
 * GeneratorGallery Component (Server Wrapper)
 *
 * Server wrapper for the Generator Gallery.
 * The gallery uses hooks and context, so it remains a client component.
 */
export function GeneratorGallery() {
  return <GeneratorGalleryClient />;
}
