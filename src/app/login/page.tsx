import { Metadata } from "next";
import { Login } from "@/components/auth";

export const metadata: Metadata = {
  title: "Login | Sarvadnya Generators",
  description: "Sign in to manage your generator rentals and bookings",
};

export default function LoginPage() {
  return <Login />;
}
