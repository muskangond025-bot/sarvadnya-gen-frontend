import { Logo } from "@/components/common";
import HeaderClient from "../client/HeaderClient";

/**
 * Header Component (Server Component)
 *
 * Server component that renders the logo on the server side.
 * Interactive elements (navigation, mobile menu, scroll behavior) are handled by HeaderClient.
 */
export function Header() {
  return (
    <HeaderClient>
      <Logo />
    </HeaderClient>
  );
}
