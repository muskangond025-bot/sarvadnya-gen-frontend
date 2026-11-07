"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
// TEMPORARILY DISABLED: Dynamic Supabase hooks
// import {
//   useUserProfile,
//   useBookings,
//   useAddresses,
//   useBookingStats,
// } from "@/hooks";
// import { useAuth } from "@/lib/AuthContext";
// import { useRouter } from "next/navigation";
// import type { User, Booking, UserAddress } from "@/lib/api/types";

// Using mock data temporarily
import type {
  Venue,
  MaintenanceLog,
  Reminder,
  UserProfile as MockUserProfile,
  Booking as MockBooking,
  SavedSite,
} from "@/constants/profileData";
import {
  mockUser,
  mockBookings,
  mockSites,
  mockVenues,
  mockMaintenanceLogs,
  mockReminders,
} from "@/constants/profileData";
import {
  LayoutDashboard,
  MapPin,
  FileText,
  Bell,
  Building2,
  Users,
  Wrench,
  Phone,
  Mail,
  CheckCircle,
  Calendar,
  Settings,
  Loader2,
} from "lucide-react";

type TabValue =
  | "dashboard"
  | "sites"
  | "bookings"
  | "reminders"
  | "venues"
  | "contacts"
  | "maintenance"
  | "settings";

const TABS = [
  { value: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { value: "sites" as const, label: "Saved Sites", icon: MapPin },
  { value: "bookings" as const, label: "Bookings", icon: FileText },
  { value: "reminders" as const, label: "Reminders", icon: Bell },
  { value: "venues" as const, label: "Venues", icon: Building2 },
  { value: "contacts" as const, label: "Contacts", icon: Users },
  { value: "maintenance" as const, label: "Maintenance", icon: Wrench },
  { value: "settings" as const, label: "Settings", icon: Settings },
];

export function ProfileClient() {
  // TEMPORARILY DISABLED: Dynamic data fetching
  // const router = useRouter();
  // const { loading: authLoading, user: authUser } = useAuth();
  // const {
  //   user,
  //   loading: profileLoading,
  //   error: profileError,
  //   updateProfile,
  // } = useUserProfile();
  // const { bookings, loading: bookingsLoading } = useBookings();
  // const { addresses, loading: addressesLoading } = useAddresses();
  // const { stats: bookingStats } = useBookingStats();

  // Using mock data instead
  const user = mockUser;
  const bookings = mockBookings;
  const sites = mockSites;

  const [activeTab, setActiveTab] = useState<TabValue>("dashboard");

  // Mock stats
  const bookingStats = {
    total: bookings.length,
    active: bookings.filter((b) => b.status === "in-progress").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    pending: bookings.filter((b) => b.status === "confirmed").length,
  };

  return (
    <div className="min-h-screen bg-black pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-['Poppins',sans-serif]">
            My <span className="text-brand-green">Profile</span>
          </h1>
          <p className="text-white/60 text-base sm:text-xl mt-2 sm:mt-4">
            Manage your bookings, sites, and rental history
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-4 border-b border-white/10 no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg font-['Outfit',sans-serif] font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.value
                    ? "bg-brand-green text-black"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "dashboard" && user && (
            <DashboardTab
              user={user}
              bookings={bookings}
              sites={sites}
              stats={bookingStats}
            />
          )}
          {activeTab === "sites" && <SavedSitesTab sites={sites} />}
          {activeTab === "bookings" && <BookingsTab bookings={bookings} />}
          {activeTab === "reminders" && (
            <RemindersTab reminders={mockReminders} />
          )}
          {activeTab === "venues" && <VenuesTab venues={mockVenues} />}
          {activeTab === "contacts" && <ContactsTab sites={sites} />}
          {activeTab === "maintenance" && (
            <MaintenanceTab logs={mockMaintenanceLogs} />
          )}
          {activeTab === "settings" && user && <SettingsTab user={user} />}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white font-['Poppins',sans-serif] mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => alert("Repeat last booking feature coming soon!")}
              className="flex items-center justify-center gap-3 px-6 py-4 border border-brand-green text-brand-green hover:bg-brand-green hover:text-black transition-colors rounded-xl font-['Outfit',sans-serif] font-medium"
            >
              <FileText className="w-5 h-5" />
              Repeat Last Booking
            </button>

            <button
              onClick={() => setActiveTab("sites")}
              className="flex items-center justify-center gap-3 px-6 py-4 border border-brand-green text-brand-green hover:bg-brand-green hover:text-black transition-colors rounded-xl font-['Outfit',sans-serif] font-medium"
            >
              <MapPin className="w-5 h-5" />
              Add New Site
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-brand-green text-black hover:bg-brand-green-dark transition-colors rounded-xl font-['Outfit',sans-serif] font-medium"
            >
              <FileText className="w-5 h-5" />
              View Booking History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Tab
function DashboardTab({
  user,
  bookings,
  sites,
  stats,
}: {
  user: MockUserProfile;
  bookings: MockBooking[];
  sites: SavedSite[];
  stats: { total: number; active: number; completed: number; pending: number };
}) {
  const nextBooking = bookings.find(
    (b) => b.status === "confirmed" || b.status === "in-progress"
  );

  return (
    <div className="space-y-8">
      {/* User Profile Card */}
      <div className="border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Avatar */}
          <div className="relative">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-brand-green to-brand-green-dark flex items-center justify-center text-3xl font-bold text-black">
                {user.name.charAt(0)}
              </div>
            )}
            {(user.emailVerified || user.phoneVerified) && (
              <div className="absolute -bottom-1 -right-1 bg-brand-green rounded-full p-1">
                <CheckCircle className="w-4 h-4 text-black" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white font-['Poppins',sans-serif]">
                {user.name}
              </h2>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                  user.userType === "business"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-blue-500/20 text-blue-400"
                )}
              >
                {user.userType}
              </span>
            </div>
            {/* Business info could go here */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
                {user.emailVerified && (
                  <CheckCircle className="w-3 h-3 text-brand-green" />
                )}
              </div>
              {user.phone && (
                <div className="flex items-center gap-2 text-white/60">
                  <Phone className="w-4 h-4" />
                  <span>
                    {user.phoneCountryCode} {user.phone}
                  </span>
                  {user.phoneVerified && (
                    <CheckCircle className="w-3 h-3 text-brand-green" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Member Since */}
          <div className="text-right">
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Member since</span>
            </div>
            <p className="text-white font-medium mt-1">
              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Bookings"
          value={stats.total.toString()}
          icon={FileText}
        />
        <StatCard
          label="Active Rentals"
          value={stats.active.toString()}
          icon={LayoutDashboard}
        />
        <StatCard
          label="Saved Sites"
          value={sites.length.toString()}
          icon={MapPin}
        />
      </div>

      {/* Next Booking Card */}
      {nextBooking && (
        <div className="border border-white/10 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white font-['Poppins',sans-serif] mb-4">
            Next Booking
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/60">Generator</span>
              <span className="text-white font-medium">
                {nextBooking.generatorName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Site</span>
              <span className="text-white font-medium">
                {nextBooking.siteName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Start Date</span>
              <span className="text-white font-medium">
                {new Date(nextBooking.startDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Estimated Cost</span>
              <span className="text-brand-green font-bold text-xl">
                ₹{nextBooking.totalCost.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: any;
}) {
  return (
    <div className="border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-brand-green" />
      </div>
      <div className="text-4xl font-bold text-white font-['Poppins',sans-serif] mb-2">
        {value}
      </div>
      <div className="text-white/60 font-['Outfit',sans-serif]">{label}</div>
    </div>
  );
}

// Saved Sites Tab
function SavedSitesTab({ sites }: { sites: SavedSite[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map((site) => (
        <div
          key={site.id}
          className="border border-white/10 rounded-xl p-6 space-y-4"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white font-['Poppins',sans-serif]">
              {site.name}
            </h3>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-white/40 text-sm">Location</span>
              <p className="text-white">{site.location}</p>
            </div>

            <div>
              <span className="text-white/40 text-sm">Site Manager</span>
              <p className="text-white">{site.manager.name}</p>
              <p className="text-white/60 text-sm">{site.manager.phone}</p>
            </div>

            <div>
              <span className="text-white/40 text-sm">Allocated Generator</span>
              <p className="text-brand-green font-medium">
                {site.allocatedGenerator}
              </p>
            </div>

            {site.instructions && (
              <div>
                <span className="text-white/40 text-sm">Instructions</span>
                <p className="text-white/80 text-sm">{site.instructions}</p>
              </div>
            )}
          </div>
        </div>
      ))}
      {sites.length === 0 && (
        <div className="col-span-full text-center py-12 text-white/40">
          No saved sites found. Add a new site to see it here.
        </div>
      )}
    </div>
  );
}

// Bookings Tab
export function BookingsTab({ bookings }: { bookings: MockBooking[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.generatorName.toLowerCase().includes(search.toLowerCase()) || 
                         b.siteName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: MockBooking["status"]) => {
    switch (status) {
      case "confirmed":
      case "in-progress":
        return "bg-brand-green/20 text-brand-green border-brand-green/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search by generator or site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:border-brand-green/50 transition-all outline-none"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
            <LayoutDashboard size={18} />
          </div>
        </div>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white focus:border-brand-green/50 outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredBookings.map((booking) => (
        <div
          key={booking.id}
          className="border border-white/10 rounded-xl p-6 space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-['Poppins',sans-serif]">
                {booking.generatorName}
              </h3>
              <p className="text-white/60 mt-1">{booking.siteName}</p>
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border capitalize w-fit",
                getStatusColor(booking.status)
              )}
            >
              {booking.status.replace("-", " ")}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-white/40 text-sm">Start Date</span>
              <p className="text-white font-medium">
                {new Date(booking.startDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <span className="text-white/40 text-sm">End Date</span>
              <p className="text-white font-medium">
                {new Date(booking.endDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <span className="text-white/40 text-sm">Total Amount</span>
              <p className="text-brand-green font-bold text-lg">
                ₹{booking.totalCost.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <span className="text-white/40 text-sm">Booking ID</span>
              <p className="text-white font-medium text-sm">#{booking.id}</p>
            </div>
          </div>
        </div>
      ))}
      {bookings.length === 0 && (
        <div className="text-center py-12 text-white/40">
          No bookings found. Start by making your first booking!
        </div>
      )}
    </div>
  );
}

// Reminders Tab
function RemindersTab({ reminders }: { reminders: Reminder[] }) {
  const getReminderTypeLabel = (type: Reminder["type"]) => {
    switch (type) {
      case "last-year":
        return { label: "This time last year", color: "text-purple-400" };
      case "last-month":
        return { label: "Last month", color: "text-blue-400" };
      case "festival":
        return { label: "Festival/Event", color: "text-orange-400" };
    }
  };

  const groupedReminders = reminders.reduce((acc, reminder) => {
    if (!acc[reminder.type]) acc[reminder.type] = [];
    acc[reminder.type].push(reminder);
    return acc;
  }, {} as Record<Reminder["type"], Reminder[]>);

  return (
    <div className="space-y-8">
      {(
        Object.entries(groupedReminders) as [Reminder["type"], Reminder[]][]
      ).map(([type, typeReminders]) => {
        const { label, color } = getReminderTypeLabel(type);
        return (
          <div key={type} className="space-y-4">
            <h3 className={cn("text-lg font-semibold", color)}>{label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typeReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="border border-white/10 rounded-xl p-5 space-y-4"
                >
                  <div>
                    <p className="text-white font-medium">
                      {reminder.generatorName}
                    </p>
                    {reminder.occasion && (
                      <p className="text-white/60 text-sm mt-1">
                        {reminder.occasion}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-sm">
                      {new Date(reminder.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <button className="px-4 py-2 bg-brand-green text-black rounded-lg font-medium text-sm hover:bg-brand-green-dark transition-colors">
                      Rebook Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {reminders.length === 0 && (
        <div className="text-center py-12 text-white/40">
          No reminders yet. Your past bookings will appear here as suggestions.
        </div>
      )}
    </div>
  );
}

// Venues Tab
function VenuesTab({ venues }: { venues: Venue[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <div
          key={venue.id}
          className="border border-white/10 rounded-xl p-6 space-y-4"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white font-['Poppins',sans-serif]">
              {venue.name}
            </h3>
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium capitalize",
                venue.status === "active"
                  ? "bg-brand-green/20 text-brand-green"
                  : "bg-gray-500/20 text-gray-400"
              )}
            >
              {venue.status}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-white/40 text-sm">Last Booking</span>
              <p className="text-white">
                {new Date(venue.lastBooking).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <span className="text-white/40 text-sm">Generator Used</span>
              <p className="text-brand-green font-medium">
                {venue.generatorUsed}
              </p>
            </div>
          </div>

          <button className="w-full px-4 py-2 border border-brand-green text-brand-green hover:bg-brand-green hover:text-black rounded-lg font-medium text-sm transition-colors">
            View Details
          </button>
        </div>
      ))}
      {venues.length === 0 && (
        <div className="col-span-full text-center py-12 text-white/40">
          No venues found. Your booking venues will appear here.
        </div>
      )}
    </div>
  );
}

// Contacts Tab
function ContactsTab({ sites }: { sites: SavedSite[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map((site) => (
        <div
          key={site.id}
          className="border border-white/10 rounded-xl p-6 space-y-4"
        >
          <div>
            <h3 className="text-xl font-bold text-white font-['Poppins',sans-serif]">
              {site.manager.name}
            </h3>
            <p className="text-white/60 mt-1">{site.name}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-white/80">
              <Phone className="w-4 h-4 text-brand-green" />
              <span className="text-sm">{site.manager.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Mail className="w-4 h-4 text-brand-green" />
              <span className="text-sm">{site.manager.email}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href={`tel:${site.manager.phone}`}
              className="flex-1 px-4 py-2 bg-brand-green text-black rounded-lg font-medium text-sm text-center hover:bg-brand-green-dark transition-colors"
            >
              Call
            </a>
            <a
              href={`mailto:${site.manager.email}`}
              className="flex-1 px-4 py-2 border border-brand-green text-brand-green rounded-lg font-medium text-sm text-center hover:bg-brand-green hover:text-black transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      ))}
      {sites.length === 0 && (
        <div className="col-span-full text-center py-12 text-white/40">
          No contacts found. Add sites to see contacts here.
        </div>
      )}
    </div>
  );
}

// Maintenance Tab
function MaintenanceTab({ logs }: { logs: MaintenanceLog[] }) {
  const getServiceTypeStyles = (type: MaintenanceLog["serviceType"]) => {
    switch (type) {
      case "call-raised":
        return {
          label: "Call Raised",
          color: "bg-yellow-500/20 text-yellow-400",
        };
      case "fuel-refill":
        return { label: "Fuel Refill", color: "bg-blue-500/20 text-blue-400" };
      case "repair":
        return { label: "Repair", color: "bg-red-500/20 text-red-400" };
    }
  };

  const getStatusStyles = (status: MaintenanceLog["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "resolved":
        return "bg-brand-green/20 text-brand-green border-brand-green/30";
    }
  };

  return (
    <div className="space-y-6">
      {logs.map((log) => {
        const serviceType = getServiceTypeStyles(log.serviceType);
        return (
          <div
            key={log.id}
            className="border border-white/10 rounded-xl p-6 space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      serviceType.color
                    )}
                  >
                    {serviceType.label}
                  </span>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium border capitalize",
                      getStatusStyles(log.status)
                    )}
                  >
                    {log.status.replace("-", " ")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Poppins',sans-serif]">
                  {log.generatorCapacity} {log.generatorType}
                </h3>
              </div>
              <div className="text-white/40 text-sm">
                Rented:{" "}
                {new Date(log.rentedDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/80">{log.technicianNotes}</p>
            </div>

            {log.proofPhotos && log.proofPhotos.length > 0 && (
              <div className="flex gap-2">{/* Images would go here */}</div>
            )}

            <div className="flex justify-between items-center text-sm">
              <button className="text-brand-green hover:underline">
                View Details
              </button>
            </div>
          </div>
        );
      })}
      {logs.length === 0 && (
        <div className="text-center py-12 text-white/40">
          No maintenance logs found.
        </div>
      )}
    </div>
  );
}

// Settings Tab
function SettingsTab({ user }: { user: MockUserProfile }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessage({ type: "success", text: "Profile updated successfully!" });

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="border border-white/10 rounded-xl p-6 md:p-8">
        <h3 className="text-2xl font-bold text-white font-['Poppins',sans-serif] mb-6">
          Account Settings
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-white/60 text-sm mb-2">
                Full Name
              </label>
              <input
                name="name"
                defaultValue={user.name}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff8f] transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">Email</label>
              <input
                defaultValue={user.email}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/40 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                defaultValue={user.phone || ""}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff8f] transition-colors"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">Company Name</label>
              <input
                name="company"
                defaultValue={user.company || ""}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff8f] transition-colors"
                placeholder="Business Name"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">Business Type / Industry</label>
              <select 
                name="industry"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff8f] transition-colors appearance-none"
              >
                <option value="construction">Construction</option>
                <option value="events">Events & Weddings</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="agriculture">Agriculture</option>
                <option value="hospital">Hospital</option>
                <option value="telecom">Telecom</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">City / Location</label>
              <input
                name="city"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff8f] transition-colors"
                placeholder="Mumbai / Pune"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">GST Number</label>
              <input
                name="gst"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff8f] transition-colors placeholder:uppercase"
                placeholder="GSTIN"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/60 text-sm mb-2">Full Address</label>
              <textarea
                name="address"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff8f] transition-colors min-h-[100px] resize-none"
                placeholder="Detailed address for logistics"
              />
            </div>
          </div>

          {message && (
            <div
              className={cn(
                "p-4 rounded-lg text-sm",
                message.type === "success"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              )}
            >
              {message.text}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green text-black font-semibold py-3 rounded-lg hover:bg-brand-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="border border-red-500/20 rounded-xl p-6 md:p-8 bg-red-500/5">
        <h4 className="text-xl font-bold text-red-400 font-['Poppins',sans-serif] mb-2">
          Danger Zone
        </h4>
        <p className="text-white/60 text-sm mb-6">
          Deleting your account will remove all your data, bookings, and
          history. This action cannot be undone.
        </p>
        <button className="px-6 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
