import { PaymentsClient } from "../client/PaymentsClient";
import { SectionHeading } from "@/components/common";

export function Payments() {
  return (
    <section className="w-full min-h-screen bg-[#FAF8F5] text-[#111315] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-10 lg:px-[60px] relative overflow-x-clip">
      {/* Subtle Warm Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[460px] h-[460px] rounded-full bg-[#FF5500]/[0.05] blur-[140px]"
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="mb-10 sm:mb-12 pb-8 border-b border-[#E8E2D9]">
          <SectionHeading
            label="Checkout"
            title={
              <>
                Select Payment{" "}
                <span className="text-[#FF5500]">Method</span>
              </>
            }
            align="left"
          />
        </div>

        <PaymentsClient />
      </div>
    </section>
  );
}
