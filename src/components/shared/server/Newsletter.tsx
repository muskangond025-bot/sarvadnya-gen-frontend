import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Newsletter() {
  return (
    <section className="relative w-full py-20 rounded-3xl overflow-hidden border border-white/10 bg-[#111]">
      <div className="absolute inset-0 bg-linear-to-br from-[#00ff8f]/5 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif] mb-4">
          Stay Empowered.
        </h2>
        <p className="text-[#bfbfbf] font-['Outfit',sans-serif] text-lg mb-10 max-w-xl">
          Subscribe to our newsletter for expert insights, maintenance tips, and the latest news in power management.
        </p>
        
        <form className="w-full max-w-md relative flex flex-col gap-4">
          <div className="relative w-full">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-white font-['Outfit',sans-serif] focus:outline-none focus:border-[#00ff8f]/50 transition-all placeholder:text-white/30"
              required
            />
            <button 
              type="button"
              className="absolute right-2 top-2 bottom-2 bg-[#00ff8f] hover:bg-[#00e67a] text-black px-6 rounded-lg font-bold font-['Poppins',sans-serif] transition-all flex items-center justify-center group"
            >
              Subscribe
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#bfbfbf] text-xs font-['Outfit',sans-serif]">
            <ShieldCheck size={14} className="text-[#00ff8f]" />
            <span>We respect your privacy. Unsubscribe at any time.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
