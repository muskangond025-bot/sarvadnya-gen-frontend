import {
  Hero,
  ServicesWeOffer,
  IndustriesServed,
  Marquee,
  Technology,
  GeneratorRange,
  Solutions,
  Testimonials,
  CTA,
  Blog,
  TrustedBy,
} from "@/components/home";

/**
 * Home Page
 *
 * Landing page composed of section components.
 * Header and Footer are now in layout.tsx for consistent display across all pages.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Hero />
      <TrustedBy />
      <ServicesWeOffer />
      <IndustriesServed />
      <GeneratorRange />
      <Solutions />
      <Marquee />
      <Testimonials />
      <CTA />
      <Blog />
      <Technology />
    </div>
  );
}
