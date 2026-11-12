import type { Metadata } from "next";
import { getPublicProductBySlug, getPublicProducts } from "@/lib/api/products";
import { GeneratorDetailPageClient } from "@/components/generators/02-gallery/GeneratorDetailPageClient";

interface GeneratorDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: GeneratorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await getPublicProductBySlug(decodeURIComponent(slug));
  const product = res?.data;

  return {
    title: product
      ? `${product.name} | Sarvadnya Generators`
      : "Generator Details | Sarvadnya Generators",
    description:
      product?.description ||
      "Detailed technical specifications, acoustic rating, and daily rental rates for silent diesel generators.",
  };
}

export default async function GeneratorDetailPage({
  params,
}: GeneratorDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const [detailRes, listRes] = await Promise.all([
    getPublicProductBySlug(decodedSlug),
    getPublicProducts({ limit: 8 }),
  ]);

  const product = detailRes.data;
  const relatedProducts = (listRes?.data || []).filter(
    (p) => p.slug !== product.slug && p.id !== product.id
  );

  return (
    <GeneratorDetailPageClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}

