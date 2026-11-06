"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Banknote } from "lucide-react";

export function PaymentsClient() {
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "online">(
    "online"
  );
  const [orderReview, setOrderReview] = useState<{
    selectedRanges: any[];
    generatorConfigs: any[];
  } | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("checkoutData");
      if (savedData) {
        setOrderReview(JSON.parse(savedData));
      }
    }
  }, []);

  const router = useRouter();

  const handleProceed = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("checkoutData");
      alert(`Order placed successfully using ${selectedMethod === 'online' ? 'Online Payment' : 'Cash'}. Our team will contact you shortly to confirm the details.`);
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Order Review Section */}
      {orderReview && orderReview.generatorConfigs?.length > 0 && (
        <div className="mb-12 p-8 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-[#00ff8f] mb-6 font-['Poppins',sans-serif]">
            Order Review
          </h3>
          <div className="space-y-6">
            {orderReview.selectedRanges.map((range: any, idx: number) => (
              <div
                key={idx}
                className="border-b border-white/5 pb-6 last:border-0 last:pb-0"
              >
                <div className="text-white font-semibold mb-3">
                  {new Date(range.start).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                  {" - "}
                  {new Date(range.end).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="space-y-3 pl-4 border-l-2 border-[#00ff8f]/20">
                  {orderReview.generatorConfigs
                    .filter((c: any) => c.dateRangeId === range.id)
                    .map((config: any, cIdx: number) => (
                      <div key={cIdx} className="text-white/80 text-sm">
                        <div className="flex justify-between">
                          <span>Generator ({config.quantity}x)</span>
                          <span className="text-[#00ff8f]">
                            {config.numberOfShifts} Shift(s)
                          </span>
                        </div>
                        {config.siteLocation && (
                          <div className="text-white/40 text-xs mt-1">
                            Location: {config.siteLocation}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
            <span className="text-white/60">Total Estimated</span>
            <span className="text-2xl font-bold text-white">
              To be calculated
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Online Payment Option */}
        <div
          onClick={() => setSelectedMethod("online")}
          className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 border ${
            selectedMethod === "online"
              ? "border-[#00ff8f]"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                selectedMethod === "online" ? "bg-[#00ff8f]" : "bg-[#333]"
              }`}
            >
              {selectedMethod === "online" && (
                <div className="w-2.5 h-2.5 rounded-full bg-black" />
              )}
            </div>
            <h3
              className={`text-xl font-bold font-['Outfit',sans-serif] ${
                selectedMethod === "online" ? "text-white" : "text-white/60"
              }`}
            >
              Online Payment
            </h3>
          </div>
          <div className="flex flex-col items-center py-6">
            <div
              className={`p-4 rounded-full mb-4 ${
                selectedMethod === "online" ? "bg-[#00ff8f]/10" : "bg-white/5"
              }`}
            >
              <CreditCard
                className={`w-8 h-8 ${
                  selectedMethod === "online"
                    ? "text-[#00ff8f]"
                    : "text-white/40"
                }`}
              />
            </div>
            <p className="text-white/60 text-center font-['Outfit',sans-serif]">
              Secure payment via UPI, Cards, or Net Banking
            </p>
          </div>
        </div>

        {/* Cash Payment Option */}
        <div
          onClick={() => setSelectedMethod("cash")}
          className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 border ${
            selectedMethod === "cash"
              ? "border-[#00ff8f]"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                selectedMethod === "cash" ? "bg-[#00ff8f]" : "bg-[#333]"
              }`}
            >
              {selectedMethod === "cash" && (
                <div className="w-2.5 h-2.5 rounded-full bg-black" />
              )}
            </div>
            <h3
              className={`text-xl font-bold font-['Outfit',sans-serif] ${
                selectedMethod === "cash" ? "text-white" : "text-white/60"
              }`}
            >
              Cash Payment
            </h3>
          </div>
          <div className="flex flex-col items-center py-6">
            <div
              className={`p-4 rounded-full mb-4 ${
                selectedMethod === "cash" ? "bg-[#00ff8f]/10" : "bg-white/5"
              }`}
            >
              <Banknote
                className={`w-8 h-8 ${
                  selectedMethod === "cash" ? "text-[#00ff8f]" : "text-white/40"
                }`}
              />
            </div>
            <p className="text-white/60 text-center font-['Outfit',sans-serif]">
              Pay cash upon delivery or pickup
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-start">
        <button 
          onClick={handleProceed}
          className="px-8 py-4 bg-[#00ff8f] hover:bg-[#00dd7a] text-black text-lg font-bold font-['Outfit',sans-serif] rounded-xl transition-colors min-w-[200px]"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
