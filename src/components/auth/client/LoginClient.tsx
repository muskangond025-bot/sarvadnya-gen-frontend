"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, Phone, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

/**
 * Login Client Component - Compact View
 *
 * Reduced vertical padding and spacing to ensure 100vh fit.
 */
export function LoginClient() {
  const { signInWithGoogle, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const authError = searchParams.get("error");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("Failed to sign in with Google.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#161616] border border-white/10 rounded-[20px] p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      {/* Subtle Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff8f]/5 blur-3xl -z-10" />

      {/* Heading */}
      <div className="mb-8 hidden lg:block">
        <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif] mb-1">
          Welcome Back
        </h2>
        <p className="text-white/40 text-sm font-['Outfit',sans-serif]">
          Manage your generator rentals easily
        </p>
      </div>

      {/* Error */}
      {(error || authError) && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-xs mb-6">
          {error || "Authentication failed."}
        </div>
      )}

      {/* Google Button - Slimmer */}
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading || loading}
        className="w-full flex items-center justify-center gap-3 bg-white text-black font-['Outfit',sans-serif] font-bold px-6 py-3.5 rounded-xl transition-all hover:bg-[#f0f0f0] active:scale-[0.98] disabled:opacity-50 mb-6 shadow-lg"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm">Continue with Google</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">or email</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Form - Compact Spacing */}
      <div className="space-y-4 mb-6">
        <div className="relative group">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00ff8f] transition-colors" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-black/50 border border-white/10 focus:border-[#00ff8f] text-white pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all placeholder:text-white/20"
          />
        </div>

        <div className="relative group">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00ff8f] transition-colors" />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black/50 border border-white/10 focus:border-[#00ff8f] text-white pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all placeholder:text-white/20"
          />
        </div>

        <button className="w-full bg-[#00ff8f] hover:bg-[#00dd7a] text-black font-bold py-3.5 rounded-xl text-sm transition-all shadow-[0_10px_20px_rgba(0,255,143,0.15)] active:scale-[0.98]">
          Sign In
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3 text-center mb-8">
        <Link href="/forgot-password" className="text-white/30 hover:text-white text-[13px] transition-colors">
          Forgot your password?
        </Link>
        <p className="text-white/30 text-[13px]">
          New here? <Link href="/signup" className="text-[#00ff8f] font-bold hover:underline">Create Account</Link>
        </p>
      </div>

      {/* Help Line - Slimmer */}
      <div className="pt-6 border-t border-white/5 flex items-center justify-center gap-3">
        <div className="size-6 rounded-full bg-white/5 flex items-center justify-center text-white/40">
          <Phone size={12} />
        </div>
        <p className="text-white/30 text-[11px]">
          Generator support? <span className="text-white font-bold">+91 62626 29944</span>
        </p>
      </div>
    </motion.div>
  );
}
