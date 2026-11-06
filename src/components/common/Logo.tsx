"use client";

import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group cursor-pointer" aria-label="Sarvadnya Generators Home">
      <div className="relative h-10 md:h-12 w-auto">
        <img 
          src="/images/sarvadnya_logo.png" 
          alt="Sarvadnya Generators" 
          className="h-full w-auto object-contain brightness-105 contrast-105"
        />
      </div>
    </Link>
  );
}
