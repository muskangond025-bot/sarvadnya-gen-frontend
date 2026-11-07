import { SectionHeading } from "@/components/common";

/**
 * Innovation Component (Server)
 *
 * Partner logos grid with CSS-only hover effects - fully server-rendered.
 */
export function Innovation() {
  return (
    <section className="w-full py-16 sm:py-[100px] px-4 sm:px-6 flex flex-col items-center gap-10 sm:gap-[60px] bg-black">
      <SectionHeading
        label="THE FUTURE"
        title={
          <>
            Expanding Horizons for
            <br />
            Sustainable <span className="text-[#00ff8f]">Power</span>
          </>
        }
      />

      <p className="text-[#bfbfbf] text-center max-w-[900px] font-['Outfit',sans-serif] text-base sm:text-lg px-2 sm:px-6 leading-relaxed">
        Over the next five years, Sarvadnya Generators aims to expand fleet capacity across Maharashtra, introducing advanced fuel-efficient systems and becoming the primary partner for industrial and event power solutions.
      </p>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-8">
        {["Kirloskar", "Honda", "Cummins", "Mahindra", "Leyland"].map((brand) => (
          <div
            key={brand}
            className="px-6 sm:px-10 h-16 sm:h-[80px] bg-[#0a0a0a] border border-white/5 rounded-2xl sm:rounded-[20px] flex items-center justify-center hover:border-[#00ff8f]/30 transition-all group"
          >
            <span className="text-white/40 group-hover:text-[#00ff8f] font-bold font-['Poppins',sans-serif] text-base sm:text-xl tracking-wider transition-colors">{brand}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
