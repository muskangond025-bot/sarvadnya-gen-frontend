import { Suspense } from "react";
import { LoginClient } from "../client/LoginClient";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

/**
 * Login Server Component
 *
 * High-fidelity split layout:
 * - Left side: Full-bleed background image with brand content overlay.
 * - Right side: Login form card.
 */
export function Login() {
  const features = [
    { icon: <ShieldCheck className="text-[#00ff8f]" size={16} />, label: "Verified Rentals" },
    { icon: <Zap className="text-[#00ff8f]" size={16} />, label: "Fast Booking" },
    { icon: <CheckCircle2 className="text-[#00ff8f]" size={16} />, label: "24/7 Support" },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black flex">
      
      {/* Left Column: Background Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center px-16 xl:px-24">
        {/* The Background Image */}
        <div 
          className="absolute inset-0 bg-[url('/images/auth_bg.png')] bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%), url('/images/auth_bg.png')" }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 space-y-10">
          <div className="space-y-6">
            <h1 className="text-6xl xl:text-7xl font-bold text-white font-['Poppins',sans-serif] leading-tight">
              Empower Your <br />
              <span className="text-[#00ff8f]">Business</span>
            </h1>
            <p className="text-white/70 text-xl font-['Outfit',sans-serif] max-w-lg leading-relaxed">
              Manage bookings, rental requests, and support from one premium dashboard.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10"
              >
                {feature.icon}
                <span className="text-white/80 font-['Outfit',sans-serif] text-xs font-bold uppercase tracking-widest">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Bottom Accent */}
        <div className="absolute bottom-12 left-16 xl:left-24 flex items-center gap-4 text-white/40 text-sm">
          <div className="w-12 h-px bg-white/20" />
          <span className="font-['Outfit',sans-serif]">Premium Power Solutions</span>
        </div>
      </div>

      {/* Right Column: Login Form Section */}
      <div className="flex-1 flex items-center justify-center relative p-6">
        {/* Background Atmosphere for Right Side */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00ff8f]/[0.05] blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00ff8f]/[0.02] blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02]" />
        </div>

        <div className="w-full max-w-lg">
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-4xl font-bold text-white font-['Poppins',sans-serif] mb-2">Welcome Back</h1>
            <p className="text-white/40">Manage your generator rentals easily</p>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-white/10 border-t-[#00ff8f] rounded-full animate-spin" />
              </div>
            }
          >
            <LoginClient />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
