import { SectionHeading } from "@/components/common";

/**
 * Innovation Component (Server)
 *
 * Partner logos grid with CSS-only hover effects - fully server-rendered.
 */
export function Innovation() {
  return (
    <section className="w-full py-[100px] flex flex-col items-center gap-[60px] bg-black">
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

      <p className="text-[#bfbfbf] text-center max-w-[900px] font-['Outfit',sans-serif] text-lg px-6 leading-relaxed">
        Over the next five years, Sarvadnya Generators aims to expand fleet capacity across Maharashtra, introducing advanced fuel-efficient systems and becoming the primary partner for industrial and event power solutions.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {["Kirloskar", "Honda", "Cummins", "Mahindra", "Leyland"].map((brand) => (
          <div
            key={brand}
            className="px-10 h-[80px] bg-[#0a0a0a] border border-white/5 rounded-[20px] flex items-center justify-center hover:border-[#00ff8f]/30 transition-all group"
          >
            <span className="text-white/40 group-hover:text-[#00ff8f] font-bold font-['Poppins',sans-serif] text-xl tracking-wider transition-colors">{brand}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
