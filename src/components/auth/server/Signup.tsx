import { SignupClient } from "../client/SignupClient";
import { Zap, Users, Award, CheckCircle2 } from "lucide-react";

/**
 * Signup Server Component
 *
 * High-fidelity split layout:
 * - Left side: Full-bleed background image with trust stats and features.
 * - Right side: Multi-step signup form.
 */
export function Signup() {
  const stats = [
    { label: "Clients", value: "500+", icon: <Users size={14} /> },
    { label: "Experience", value: "12+ Yrs", icon: <Award size={14} /> },
    { label: "Rentals", value: "1000+", icon: <CheckCircle2 size={14} /> },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black flex">
      
      {/* Left Column: Background Image Experience */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center px-16 xl:px-24">
        {/* The Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-[url('/images/auth_bg.png')] bg-cover bg-center transition-transform duration-[15s] hover:scale-110"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%), url('/images/auth_bg.png')" }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff8f]/10 border border-[#00ff8f]/20 text-[#00ff8f] text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
              <Zap size={12} /> Powering Innovation
            </div>
            
            <h1 className="text-6xl xl:text-7xl font-bold text-white font-['Poppins',sans-serif] leading-[1.1] tracking-tight">
              Power Your Projects <br />
              With <span className="text-[#00ff8f]">Reliable Rentals</span>
            </h1>
            
            <p className="text-white/60 text-xl font-['Outfit',sans-serif] max-w-lg leading-relaxed">
              Create your account to manage rentals, invoices, and support from one premium dashboard.
            </p>
          </div>

          {/* Trust Statistics */}
          <div className="flex items-center gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-white/40 mb-1">
                  {stat.icon}
                  <span className="text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
                </div>
                <div className="text-4xl font-bold text-white font-['Poppins',sans-serif]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Accent */}
        <div className="absolute top-12 left-16 xl:left-24">
          <div className="text-[#00ff8f] font-bold tracking-widest text-xs uppercase opacity-50">
            Sarvadnya Discovery Portal
          </div>
        </div>
      </div>

      {/* Right Column: Signup Form Container */}
      <div className="flex-1 flex items-center justify-center relative p-6">
        {/* Background Atmosphere for Right Side */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00ff8f]/[0.05] blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00ff8f]/[0.02] blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03]" />
        </div>

        <div className="w-full max-w-xl relative z-10">
          <div className="lg:hidden text-center mb-10 space-y-2">
            <h1 className="text-4xl font-bold text-white font-['Poppins',sans-serif]">Create Account</h1>
            <p className="text-white/40 text-sm">Power your next big project with us</p>
          </div>
          <SignupClient />
        </div>
      </div>
    </section>
  );
}
