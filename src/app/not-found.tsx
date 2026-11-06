"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-black px-4">
      {/* Large 404 Text with Gradient */}
      <motion.h1
        className="text-[12rem] md:text-[18rem] font-bold leading-none select-none"
        style={{
          background:
            "linear-gradient(180deg, #4a4a4a 0%, #1a1a1a 50%, #000000 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Description Text */}
      <motion.p
        className="text-[#808080] text-base md:text-lg mt-4 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        The page you are looking for doesn&apos;t exist or has been moved
      </motion.p>

      {/* Back To Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 bg-[#0ac271] hover:bg-[#09a863] text-white font-medium px-6 py-3 rounded-md transition-all duration-300"
        >
          Back To Home
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </div>
  );
}
