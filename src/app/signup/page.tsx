import { Metadata } from "next";
import { Signup } from "@/components/auth";

export const metadata: Metadata = {
  title: "Create Account | Sarvadnya Generators",
  description:
    "Join thousands of customers powering their world with premium generator rentals",
};

export default function SignupPage() {
  return <Signup />;
}
