import { Metadata } from "next";
import { Profile } from "@/components/profile";

export const metadata: Metadata = {
  title: "My Profile | Sarvadnya Generators",
  description: "Manage your bookings, sites, and rental history",
};

export default function ProfilePage() {
  return <Profile />;
}
