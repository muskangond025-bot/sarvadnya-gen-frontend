"use client";

import React from "react";
import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/common";
import { useAuth } from "@/lib/AuthContext";
import { Cart3D } from "./Cart3D";

export function WishlistEmpty() {
  const { user, loading } = useAuth();
  const isLoggedIn = !loading && Boolean(user);

  return (
    <section className="px-6 md:px-10 lg:px-[60px] max-w-[1440px] mx-auto pt-4 pb-16 sm:pb-20 text-center">
      <Cart3D />

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111315] font-sans tracking-tight mt-2">
        Your Cart is Empty
      </h2>
      <p className="text-[#403C36] font-sans mt-2.5 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
        {isLoggedIn
          ? "Your cart has no generator sets yet. Head straight to our fleet to add silent DG sets for your project."
          : "Sign in to manage your shortlisted silent DG sets or add generators from our fleet."}
      </p>

      <div className="mt-7 flex justify-center">
        {isLoggedIn ? (
          <Button href="/generators" variant="primary" size="md">
            Explore Products <ArrowRight className="size-4 ml-2" />
          </Button>
        ) : (
          <Button href="/login?next=/generators" variant="primary" size="md">
            <LogIn className="size-4 mr-2" /> Login
          </Button>
        )}
      </div>
    </section>
  );
}
