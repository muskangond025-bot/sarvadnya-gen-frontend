"use client";

import { usePathname } from "next/navigation";

/**
 * Footer Client Wrapper
 * 
 * Conditionally hides the footer on authentication pages.
 */
export function FooterClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) return null;

  return <>{children}</>;
}
