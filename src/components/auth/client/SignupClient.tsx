"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { 
  Check, 
  Smartphone, 
  Mail, 
  Building2, 
  User, 
  Lock, 
  MapPin, 
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Building,
  Info
} from "lucide-react";
import Link from "next/link";

const BUSINESS_TYPES = [
  "Construction",
  "Events & Weddings",
  "Manufacturing",
  "Agriculture",
  "Hospital",
  "Telecom",
  "Other"
];

/**
 * Signup Client Component - Compact Multi-Step View
 *
 * Optimized vertical density for 100vh fit.
 */
export function SignupClient() {
  const { signInWithGoogle, signUpWithEmail, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    company: "",
    industry: "",
    gst: "",
    address: ""
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "password") {
      let strength = 0;
      if (value.length > 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("Fill in all basic details.");
      return;
    }
    setError(null);
    setCurrentStep(2);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signUpWithEmail(formData.email, formData.password, formData.name);
      setSuccess("Account created! Check email.");
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("Google sign-in failed.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[24px] p-6 md:p-8 lg:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] relative overflow-hidden"
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[#00ff8f] font-bold text-[10px] tracking-widest uppercase">Step {currentStep} / 2</span>
          <div className="flex gap-1">
            <div className={`h-1 w-6 rounded-full ${currentStep >= 1 ? "bg-[#00ff8f]" : "bg-white/10"}`} />
            <div className={`h-1 w-6 rounded-full ${currentStep >= 2 ? "bg-[#00ff8f]" : "bg-white/10"}`} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white font-['Poppins',sans-serif] mb-1">
          {currentStep === 1 ? "Get Started" : "Business Profile"}
        </h2>
        <p className="text-white/40 text-[13px] font-['Outfit',sans-serif]">
          {currentStep === 1 ? "Create your personal secure account" : "Add details for generator management"}
        </p>
      </div>

      {(error || success) && (
        <div className={`mb-6 p-3 rounded-lg text-xs border ${error ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"}`}>
          {error || success}
        </div>
      )}

      <form onSubmit={handleEmailSignUp} className="space-y-4">
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <motion.div key="s1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <IconInput name="name" placeholder="Full Name" icon={<User size={16} />} value={formData.name} onChange={updateFormData} />
                <IconInput name="email" type="email" placeholder="Email" icon={<Mail size={16} />} value={formData.email} onChange={updateFormData} />
                <IconInput name="phone" type="tel" placeholder="Mobile" icon={<Smartphone size={16} />} value={formData.phone} onChange={updateFormData} />
                <IconInput name="city" placeholder="Location" icon={<MapPin size={16} />} value={formData.city} onChange={updateFormData} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <IconInput name="password" type="password" placeholder="Password" icon={<Lock size={16} />} value={formData.password} onChange={updateFormData} />
                <IconInput name="confirmPassword" type="password" placeholder="Confirm" icon={<Lock size={16} />} value={formData.confirmPassword} onChange={updateFormData} />
              </div>

              {/* Security Strength - Ultra Compact */}
              <div className="flex gap-1 h-0.5 px-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`flex-1 rounded-full ${i <= passwordStrength ? "bg-[#00ff8f]" : "bg-white/5"}`} />
                ))}
              </div>

              <div className="pt-2">
                <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3.5 rounded-xl text-[13px] hover:bg-white/90 active:scale-[0.98]">
                  <svg className="size-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  <span>Signup with Google</span>
                </button>
              </div>

              <button type="button" onClick={handleNext} className="w-full flex items-center justify-center gap-2 bg-[#00ff8f] text-black font-bold py-4 rounded-xl text-sm shadow-lg hover:bg-[#00e67a] active:scale-[0.98]">
                <span>Continue to Step 2</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.div key="s2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <IconInput name="company" placeholder="Company" icon={<Building2 size={16} />} value={formData.company} onChange={updateFormData} />
                <div className="relative group">
                  <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00ff8f]" />
                  <select name="industry" value={formData.industry} onChange={updateFormData} className="w-full bg-black/50 border border-white/10 text-white pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none appearance-none">
                    <option value="" disabled>Industry</option>
                    {BUSINESS_TYPES.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
                  </select>
                </div>
                <IconInput name="gst" placeholder="GST Number" icon={<Info size={16} />} value={formData.gst} onChange={updateFormData} />
                <IconInput name="altPhone" placeholder="Alt Mobile" icon={<Smartphone size={16} />} />
              </div>

              <textarea name="address" placeholder="Delivery Address" value={formData.address} onChange={updateFormData} className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 rounded-xl text-sm h-24 outline-none resize-none" />

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setCurrentStep(1)} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-xl text-sm border border-white/10">Back</button>
                <button type="submit" disabled={isLoading || loading} className="flex-[2] flex items-center justify-center gap-2 bg-[#00ff8f] text-black font-bold py-4 rounded-xl text-sm shadow-lg hover:bg-[#00e67a] disabled:opacity-50">
                  {isLoading ? "Signing up..." : "Complete Signup"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <div className="mt-8 text-center">
        <p className="text-white/30 text-[13px]">
          Member? <Link href="/login" className="text-[#00ff8f] font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </motion.div>
  );
}

function IconInput({ name, type = "text", placeholder, icon, value, onChange, required = false }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00ff8f] transition-colors">{icon}</div>
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} className="w-full bg-black/50 border border-white/10 focus:border-[#00ff8f] text-white pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all placeholder:text-white/20" />
    </div>
  );
}
