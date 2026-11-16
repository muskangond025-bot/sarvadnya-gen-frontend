"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Droplet,
  Fuel,
  Gauge,
  MessageSquare,
  Phone,
  Plus,
  ShieldCheck,
  Volume2,
  Zap,
} from "lucide-react";
import type { ProductDetailResponse, PublicProduct } from "@/lib/api/products";
import {
  formatGeneratorSpecValue,
  resolveGeneratorImage,
} from "@/lib/generatorImages";
import { useQuote } from "@/lib/QuoteContext";
import { cn } from "@/lib/utils";

interface GeneratorDetailPageClientProps {
  product: ProductDetailResponse;
  relatedProducts: PublicProduct[];
}

export function GeneratorDetailPageClient({
  product,
  relatedProducts,
}: GeneratorDetailPageClientProps) {
  const { addItem } = useQuote();
  const [isAdded, setIsAdded] = React.useState(false);

  const imageSrc = resolveGeneratorImage(
    product.power_output_kva,
    product.primary_image_url
  );
  const pricingRow = product.pricing?.[0];
  const rawDaily = Number(pricingRow?.rate_amount || 0);
  const dailyFormatted = rawDaily
    ? `₹${rawDaily.toLocaleString("en-IN")}`
    : "On Request";
  const rawShift = Number(pricingRow?.shift_rate || 0);
  const shiftFormatted = rawShift
    ? `₹${rawShift.toLocaleString("en-IN")}`
    : null;
  const rawDeposit = Number(pricingRow?.security_deposit || 0);
  const depositFormatted = rawDeposit
    ? `₹${rawDeposit.toLocaleString("en-IN")}`
    : null;

  const phaseLabel = formatGeneratorSpecValue(product.phase, "Three Phase");
  const fuelLabel = formatGeneratorSpecValue(product.fuel_type, "Diesel");
  const categoryName = product.category?.name || "Silent Fleet";
  const brandName = product.brand || product.engine_make || "Sarvadnya";

  const derivedHighlights = [
    product.canopy_type
      ? {
          title: `${formatGeneratorSpecValue(product.canopy_type)} Enclosure`,
          desc: "CPCB-II acoustic shielding for low-noise operation",
        }
      : null,
    product.starting_type
      ? {
          title: product.starting_type,
          desc: "Reliable quick-ignition panel with safety interlocks",
        }
      : null,
    product.alternator_make
      ? {
          title: `${product.alternator_make} Alternator`,
          desc: "Stable sine wave voltage regulation under peak load",
        }
      : null,
    product.cooling_system
      ? {
          title: product.cooling_system,
          desc: "Engineered for sustained ambient thermal stability",
        }
      : null,
  ].filter(Boolean) as Array<{ title: string; desc: string }>;

  const displayFeatures =
    product.features && product.features.length > 0
      ? product.features.map((f) => ({
          title: f.title,
          desc: f.description || "",
        }))
      : derivedHighlights;

  const handleAddToQuote = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: brandName,
      power_output_kva: String(product.power_output_kva),
      daily_rate: rawDaily,
      fuel_consumption_per_hour: product.fuel_consumption_per_hour ? String(product.fuel_consumption_per_hour) : undefined,
      noise_level_db: product.noise_level_db ? String(product.noise_level_db) : undefined,
      phase: product.phase ? String(product.phase) : undefined,
      primary_image_url: imageSrc,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#111315] font-sans pt-28 sm:pt-32 pb-20 sm:pb-24 selection:bg-[#FF5500]/15 selection:text-[#FF5500]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Top Back Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E2D9]">
          <Link
            href="/generators"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#111315] hover:text-[#FF5500] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Generator Fleet</span>
          </Link>

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-[#524E48]"
          >
            <Link href="/" className="hover:text-[#FF5500] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/generators"
              className="hover:text-[#FF5500] transition-colors"
            >
              Generators
            </Link>
            <span>/</span>
            <span className="text-[#111315] font-medium truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Main Asymmetric 2-Column Editorial Product Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Studio Plinth Showcase */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
            <div className="relative rounded-3xl bg-[#F3EFEA] border border-[#E8E2D9] p-6 sm:p-10 flex items-center justify-center overflow-hidden shadow-xs">
              <div className="w-full rounded-2xl bg-white/85 border border-[#E8E2D9]/80 p-6 sm:p-8 flex items-center justify-center">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  width={560}
                  height={460}
                  priority
                  className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_24px_48px_rgba(17,19,21,0.12)]"
                />
              </div>
            </div>

            {/* Clean Hairline Studio Metadata Row */}
            <div className="grid grid-cols-3 divide-x divide-[#E8E2D9] border border-[#E8E2D9] rounded-2xl bg-white py-3.5 text-center shadow-2xs">
              <div className="px-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#524E48]">
                  Asset Code
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#111315] mt-0.5">
                  {product.asset_code}
                </p>
              </div>
              <div className="px-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#524E48]">
                  Voltage
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#111315] mt-0.5">
                  {product.voltage || "230V / 415V"}
                </p>
              </div>
              <div className="px-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#524E48]">
                  Frequency
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#111315] mt-0.5">
                  {product.frequency_hz || 50} Hz
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Details, Specs & Booking Actions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Identity & Title */}
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF5500] mb-2">
                {categoryName} • {brandName}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111315] tracking-tight leading-[1.12]">
                {product.name}
              </h1>

              {/* Pricing Bar */}
              <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 pb-6 border-b border-[#E8E2D9]">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-bold text-[#FF5500]">
                    {dailyFormatted}
                  </span>
                  <span className="text-sm font-medium text-[#524E48]">/day</span>
                </div>
                {shiftFormatted && (
                  <div className="text-sm text-[#403C36]">
                    <span className="text-[#524E48]">Shift Rate: </span>
                    <span className="font-semibold text-[#111315]">
                      {shiftFormatted}
                    </span>
                  </div>
                )}
                {depositFormatted && (
                  <div className="text-sm text-[#403C36]">
                    <span className="text-[#524E48]">Security Deposit: </span>
                    <span className="font-semibold text-[#111315]">
                      {depositFormatted}
                    </span>
                  </div>
                )}
              </div>

              {product.description && (
                <p className="mt-5 text-base text-[#403C36] leading-relaxed max-w-2xl">
                  {product.description}
                </p>
              )}
            </div>

            {/* Technical Specifications Grid */}
            <section className="pt-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#524E48] mb-4">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <SpecTile
                  icon={<Zap className="w-4 h-4" />}
                  label="Power"
                  value={`${product.power_output_kva} kVA`}
                />
                <SpecTile
                  icon={<Gauge className="w-4 h-4" />}
                  label="Phase"
                  value={phaseLabel}
                />
                <SpecTile
                  icon={<Droplet className="w-4 h-4" />}
                  label="Fuel"
                  value={fuelLabel}
                />
                <SpecTile
                  icon={<Volume2 className="w-4 h-4" />}
                  label="Noise Level"
                  value={
                    product.noise_level_db
                      ? `${product.noise_level_db} dB`
                      : "CPCB II"
                  }
                />
                {product.fuel_tank_capacity_liters && (
                  <SpecTile
                    icon={<Fuel className="w-4 h-4" />}
                    label="Fuel Tank"
                    value={`${product.fuel_tank_capacity_liters} L`}
                  />
                )}
                {product.fuel_consumption_per_hour && (
                  <SpecTile
                    icon={<Droplet className="w-4 h-4" />}
                    label="Fuel Cons."
                    value={`${product.fuel_consumption_per_hour} L/hr`}
                  />
                )}
                {product.runtime_hours_full_tank && (
                  <SpecTile
                    icon={<Clock className="w-4 h-4" />}
                    label="Max Runtime"
                    value={`${product.runtime_hours_full_tank} hrs`}
                  />
                )}
                <SpecTile
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Compliance"
                  value="CPCB II / IV+"
                />
              </div>
            </section>

            {/* Key Engineering Features */}
            {displayFeatures.length > 0 && (
              <section className="pt-7 border-t border-[#E8E2D9]">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#524E48] mb-4">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayFeatures.map((item, idx) => (
                    <div
                      key={idx}
                      className="pl-4 border-l-2 border-[#FF5500] space-y-0.5"
                    >
                      <h3 className="text-sm font-bold text-[#111315]">
                        {item.title}
                      </h3>
                      {item.desc && (
                        <p className="text-xs sm:text-sm text-[#403C36]">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Primary Conversion Actions */}
            <section className="pt-7 border-t border-[#E8E2D9]">
              <h2 className="text-base font-bold text-[#111315] mb-1">
                Need More Information?
              </h2>
              <p className="text-sm text-[#524E48] mb-5">
                Our experts are ready to help you choose the right product
              </p>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  href={`/book?kVA=${encodeURIComponent(`${product.power_output_kva} kVA`)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold text-xs sm:text-sm transition-colors shadow-[0_12px_28px_rgba(255,85,0,0.26)] active:scale-95"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
                <button
                  type="button"
                  onClick={handleAddToQuote}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm border transition-all duration-200 cursor-pointer shadow-xs active:scale-95",
                    isAdded
                      ? "bg-[#111315] text-white border-[#111315]"
                      : "bg-white hover:bg-[#111315] hover:text-white text-[#111315] border-[#E8E2D9]"
                  )}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500]" />
                      <span className="hidden sm:inline">Added to Quote</span>
                      <span className="sm:hidden">Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500]" />
                      <span className="hidden sm:inline">Add to Quote</span>
                      <span className="sm:hidden">Add to Quote</span>
                    </>
                  )}
                </button>
                <a
                  href="tel:+916262629944"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-[#F3EFEA] text-[#111315] font-semibold text-xs sm:text-sm border border-[#E8E2D9] transition-colors active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500]" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/916262629944"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-[#F3EFEA] text-[#111315] font-semibold text-xs sm:text-sm border border-[#E8E2D9] transition-colors active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Related Fleet Recommendations */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-12 border-t border-[#E8E2D9]">
            <div className="flex items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] tracking-tight">
                You May Also Like
              </h2>
              <Link
                href="/generators"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF5500] hover:text-[#E04B00] transition-colors"
              >
                <span>View Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((item) => {
                const relImg = resolveGeneratorImage(
                  item.power_output_kva,
                  item.primary_image_url
                );
                const relDaily = Number(item.daily_rate || 0);
                return (
                  <Link
                    key={item.id}
                    href={`/generators/${encodeURIComponent(item.slug || item.id)}`}
                    className="group rounded-3xl bg-white border border-[#E8E2D9] hover:border-[#FF5500]/45 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-40 mb-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]/80 flex items-center justify-center p-4">
                        <Image
                          src={relImg}
                          alt={item.name}
                          width={200}
                          height={150}
                          className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#524E48]">
                        {item.category?.name || "Silent Fleet"}
                      </p>
                      <h3 className="text-lg font-bold text-[#111315] mt-1 group-hover:text-[#FF5500] transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </div>
                    <div className="mt-4 pt-3.5 border-t border-[#E8E2D9] flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-[#FF5500]">
                          {relDaily
                            ? `₹${relDaily.toLocaleString("en-IN")}`
                            : "On Request"}
                        </span>
                        {relDaily > 0 && (
                          <span className="text-xs text-[#524E48]">/day</span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#111315] group-hover:text-[#FF5500] transition-colors">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function SpecTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-[#E8E2D9] rounded-2xl p-4 shadow-2xs">
      <div className="text-[#FF5500] mb-2">{icon}</div>
      <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#524E48]">
        {label}
      </p>
      <p className="text-sm font-bold text-[#111315] mt-0.5">{value}</p>
    </div>
  );
}

