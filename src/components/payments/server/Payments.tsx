import { PaymentsClient } from "../client/PaymentsClient";
import { SectionHeading } from "@/components/common";

export function Payments() {
  return (
    <section className="w-full py-[100px] px-[60px] bg-black min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <SectionHeading
            label="Checkout"
            title={
              <>
                Select Payment <br />
                <span className="text-[#00ff8f]">Method</span>
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
