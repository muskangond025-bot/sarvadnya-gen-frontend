"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
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
  CheckCircle2,
  Calendar,
  Settings,
  Loader2,
  Search,
  ArrowRight,
  Zap,
  ChevronDown,
  ShieldAlert,
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
  const router = useRouter();
  const user = mockUser;
  const bookings = mockBookings;
  const sites = mockSites;

  const [activeTab, setActiveTab] = useState<TabValue>("dashboard");

  const bookingStats = {
    total: bookings.length,
    active: bookings.filter((b) => b.status === "in-progress").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    pending: bookings.filter((b) => b.status === "confirmed").length,
  };

  const handleRepeatBooking = () => {
    const kva = bookings[0]?.generatorKva || "25 kVA";
    router.push(`/book?kVA=${encodeURIComponent(kva)}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111315] relative overflow-x-clip pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8">
      {/* Subtle Warm Top Atmospheric Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 15%, rgba(255,85,0,0.08), transparent 48%), linear-gradient(to right, rgba(24,24,27,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Page Title */}
        <header className="mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111315]">
            My <span className="text-[#FF5500]">Profile</span>
          </h1>
          <p className="text-[#403C36] text-base sm:text-xl mt-2.5">
            Manage your bookings, sites, and rental history
          </p>
        </header>

        {/* Mobile Dropdown Selector (Guarantees zero text overflow on phones) */}
        <div className="sm:hidden mb-4">
          <label htmlFor="mobile-profile-tab" className="sr-only">
            Select Section
          </label>
          <div className="relative">
            <select
              id="mobile-profile-tab"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabValue)}
              className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] rounded-xl py-3 pl-11 pr-10 text-xs font-bold text-[#111315] shadow-2xs appearance-none focus:outline-none cursor-pointer"
            >
              {TABS.map((tab) => (
                <option key={tab.value} value={tab.value}>
                  {tab.label}
                </option>
              ))}
            </select>
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF5500] pointer-events-none">
              {React.createElement(TABS.find((t) => t.value === activeTab)?.icon || LayoutDashboard, {
                className: "w-4 h-4",
              })}
            </div>
            <ChevronDown className="w-4 h-4 text-[#6E685F] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Pill Tab Navigation (Safe horizontal scroll with zero overflow) */}
        <div className="relative w-full max-w-full mb-6 sm:mb-8 overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white p-1 sm:p-1.5 shadow-[0_8px_28px_-14px_rgba(17,19,21,0.06)]">
          <div className="overflow-x-auto no-scrollbar touch-pan-x flex items-center gap-1 sm:gap-1.5 w-full">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0",
                    isActive
                      ? "bg-[#18181B] text-white shadow-xs"
                      : "text-[#524E48] hover:text-[#111315] hover:bg-[#FAF8F5]"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0",
                      isActive ? "text-[#FF5500]" : "text-[#6E685F]"
                    )}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Workspace */}
        <div className="mt-6">
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

        {/* Quick Actions Footer Band */}
        <div className="mt-14 pt-8 border-t border-[#E8E2D9]">
          <h3 className="text-xl sm:text-2xl font-bold text-[#111315] mb-5">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={handleRepeatBooking}
              className="flex items-center justify-center gap-2.5 px-6 py-4 bg-white border border-[#DED8CE] hover:border-[#FF5500] text-[#111315] hover:text-[#FF5500] transition-colors rounded-2xl font-bold text-sm shadow-2xs cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#FF5500]" />
              <span>Repeat Last Booking</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("sites")}
              className="flex items-center justify-center gap-2.5 px-6 py-4 bg-white border border-[#DED8CE] hover:border-[#FF5500] text-[#111315] hover:text-[#FF5500] transition-colors rounded-2xl font-bold text-sm shadow-2xs cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#FF5500]" />
              <span>Manage Saved Sites</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bookings")}
              className="flex items-center justify-center gap-2.5 px-6 py-4 bg-[#18181B] hover:bg-[#FF5500] text-white transition-colors rounded-2xl font-bold text-sm shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Booking History</span>
              <ArrowRight className="w-4 h-4" />
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
      {/* User Identity Header Card */}
      <div className="bg-white border border-[#E8E2D9] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_12px_36px_-14px_rgba(17,19,21,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
          {/* Avatar */}
          <div className="relative shrink-0">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E8E2D9] bg-[#FAF8F5]"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#18181B] flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                {user.name.charAt(0)}
              </div>
            )}
            {(user.emailVerified || user.phoneVerified) && (
              <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 bg-[#FF5500] text-white rounded-full p-0.5 sm:p-1 border-2 border-white shadow-xs">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2 w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111315] break-words">
                {user.name}
              </h2>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-[#FFF3EC] border border-[#FF5500]/25 text-[#FF5500] shrink-0">
                {user.userType}
              </span>
            </div>

            {user.company && (
              <p className="text-xs sm:text-sm font-semibold text-[#403C36] break-words">
                {user.company}
              </p>
            )}

            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 pt-1 text-xs sm:text-sm text-[#524E48]">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 max-w-full">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500] shrink-0" />
                <span className="font-medium text-[#111315] truncate break-all max-w-[220px] sm:max-w-none">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500] shrink-0" />
                  <span className="font-medium text-[#111315] whitespace-nowrap">
                    {user.phoneCountryCode} {user.phone}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Member Since Badge */}
          <div className="md:text-right pt-3 sm:pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E8E2D9] md:pl-6 w-full md:w-auto shrink-0">
            <div className="inline-flex items-center gap-1.5 text-[#524E48] text-[11px] sm:text-xs font-mono uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Member Since</span>
            </div>
            <p className="text-[#111315] font-bold text-sm sm:text-base mt-0.5 sm:mt-1">
              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          label="Total Bookings"
          value={stats.total.toString()}
          icon={FileText}
        />
        <StatCard
          label="Active Rentals"
          value={stats.active.toString()}
          icon={Zap}
        />
        <StatCard
          label="Saved Sites"
          value={sites.length.toString()}
          icon={MapPin}
        />
      </div>

      {/* Active / Next Booking Spotlight Card */}
      {nextBooking && (
        <div className="bg-white border border-[#E8E2D9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_14px_40px_-14px_rgba(17,19,21,0.07)]">
          <div className="bg-[#18181B] px-5 sm:px-8 py-3.5 sm:py-4 border-b-2 border-[#FF5500] flex items-center justify-between gap-3">
            <h3 className="text-base sm:text-xl font-bold text-white">
              Active Deployment
            </h3>
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 font-mono text-[11px] sm:text-xs text-white capitalize">
              {nextBooking.status.replace("-", " ")}
            </span>
          </div>

          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="min-w-0">
              <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6E685F] mb-1">
                Generator Model
              </span>
              <p className="text-[#111315] font-bold text-sm sm:text-base break-words">
                {nextBooking.generatorName}
              </p>
            </div>
            <div className="min-w-0">
              <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6E685F] mb-1">
                Deployment Site
              </span>
              <p className="text-[#111315] font-semibold text-sm sm:text-base break-words">
                {nextBooking.siteName}
              </p>
            </div>
            <div>
              <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6E685F] mb-1">
                Start Date
              </span>
              <p className="text-[#111315] font-semibold text-sm sm:text-base">
                {new Date(nextBooking.startDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6E685F] mb-1">
                Estimated Cost
              </span>
              <p className="text-[#FF5500] font-extrabold text-lg sm:text-xl font-mono">
                ₹{nextBooking.totalCost.toLocaleString("en-IN")}
              </p>
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
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-xs flex items-center justify-between gap-4">
      <div>
        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111315] mb-1">
          {value}
        </div>
        <div className="text-sm font-semibold text-[#524E48]">{label}</div>
      </div>
      <div className="size-12 rounded-2xl bg-[#FFF3EC] border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500] shrink-0">
        <Icon className="w-6 h-6" />
      </div>
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
          className="bg-white border border-[#E8E2D9] rounded-2xl p-6 space-y-4 shadow-xs"
        >
          <h3 className="text-xl font-bold text-[#111315] border-b border-[#EFECE6] pb-3">
            {site.name}
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                Location
              </span>
              <p className="text-[#111315] font-medium mt-0.5">
                {site.location}
              </p>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                Site Manager
              </span>
              <p className="text-[#111315] font-semibold mt-0.5">
                {site.manager.name}
              </p>
              <p className="text-[#524E48] text-xs">{site.manager.phone}</p>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                Allocated Generator
              </span>
              <p className="text-[#FF5500] font-bold mt-0.5">
                {site.allocatedGenerator}
              </p>
            </div>

            {site.instructions && (
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6E685F]">
                  Instructions
                </span>
                <p className="text-[#403C36] text-xs mt-1 leading-relaxed">
                  {site.instructions}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      {sites.length === 0 && (
        <div className="col-span-full bg-white border border-[#E8E2D9] rounded-2xl text-center py-12 text-[#524E48]">
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

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.generatorName.toLowerCase().includes(search.toLowerCase()) ||
      b.siteName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: MockBooking["status"]) => {
    switch (status) {
      case "confirmed":
      case "in-progress":
        return "bg-[#FFF3EC] text-[#C2410C] border-[#FF5500]/30";
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-[#6E685F] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by generator or site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#DED8CE] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#111315] placeholder:text-[#8C847A] focus:border-[#FF5500] focus:outline-none transition-colors shadow-2xs"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-[#DED8CE] rounded-xl px-5 py-3.5 text-sm font-medium text-[#111315] focus:border-[#FF5500] focus:outline-none shadow-2xs"
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
          className="bg-white border border-[#E8E2D9] rounded-2xl p-6 space-y-5 shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#EFECE6] pb-4">
            <div>
              <h3 className="text-xl font-bold text-[#111315]">
                {booking.generatorName}
              </h3>
              <p className="text-sm text-[#524E48] mt-1">{booking.siteName}</p>
            </div>
            <span
              className={cn(
                "px-3.5 py-1 rounded-full text-xs font-mono font-bold border capitalize w-fit",
                getStatusColor(booking.status)
              )}
            >
              {booking.status.replace("-", " ")}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                Start Date
              </span>
              <p className="text-[#111315] font-semibold mt-0.5">
                {new Date(booking.startDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                End Date
              </span>
              <p className="text-[#111315] font-semibold mt-0.5">
                {new Date(booking.endDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                Total Amount
              </span>
              <p className="text-[#FF5500] font-extrabold text-base font-mono mt-0.5">
                ₹{booking.totalCost.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                Booking ID
              </span>
              <p className="text-[#111315] font-mono font-semibold mt-0.5">
                #{booking.id}
              </p>
            </div>
          </div>
        </div>
      ))}

      {filteredBookings.length === 0 && (
        <div className="bg-white border border-[#E8E2D9] rounded-2xl text-center py-12 text-[#524E48]">
          No bookings matched your filter.
        </div>
      )}
    </div>
  );
}

// Reminders Tab
function RemindersTab({ reminders }: { reminders: Reminder[] }) {
  const router = useRouter();

  const getReminderTypeLabel = (type: Reminder["type"]) => {
    switch (type) {
      case "last-year":
        return { label: "This time last year", color: "text-[#FF5500]" };
      case "last-month":
        return { label: "Last month", color: "text-[#111315]" };
      case "festival":
        return { label: "Festival / Event", color: "text-[#C2410C]" };
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
            <h3 className={cn("text-lg font-bold", color)}>{label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {typeReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="bg-white border border-[#E8E2D9] rounded-2xl p-5 space-y-4 shadow-xs"
                >
                  <div>
                    <p className="text-[#111315] font-bold">
                      {reminder.generatorName}
                    </p>
                    {reminder.occasion && (
                      <p className="text-[#524E48] text-sm mt-1">
                        {reminder.occasion}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#EFECE6]">
                    <span className="font-mono text-xs text-[#524E48]">
                      {new Date(reminder.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() => router.push("/book")}
                      className="px-4 py-2 bg-[#18181B] hover:bg-[#FF5500] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
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
        <div className="bg-white border border-[#E8E2D9] rounded-2xl text-center py-12 text-[#524E48]">
          No reminders yet. Your past bookings will appear here as suggestions.
        </div>
      )}
    </div>
  );
}

// Venues Tab
function VenuesTab({ venues }: { venues: Venue[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => {
        const isExpanded = expandedId === venue.id;
        return (
          <div
            key={venue.id}
            className="bg-white border border-[#E8E2D9] rounded-2xl p-6 space-y-4 shadow-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold text-[#111315]">{venue.name}</h3>
              <span
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-mono font-bold capitalize border",
                  venue.status === "active"
                    ? "bg-[#FFF3EC] text-[#FF5500] border-[#FF5500]/30"
                    : "bg-[#FAF8F5] text-[#524E48] border-[#E8E2D9]"
                )}
              >
                {venue.status}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                  Last Booking
                </span>
                <p className="text-[#111315] font-semibold mt-0.5">
                  {new Date(venue.lastBooking).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E685F]">
                  Generator Used
                </span>
                <p className="text-[#FF5500] font-bold mt-0.5">
                  {venue.generatorUsed}
                </p>
              </div>
            </div>

            {isExpanded && (
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-[#403C36] space-y-1">
                <p>
                  <strong className="text-[#111315]">Venue ID:</strong>{" "}
                  <span className="font-mono">{venue.id}</span>
                </p>
                <p>Ready for repeat dispatch with stored load specs.</p>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                setExpandedId((prev) => (prev === venue.id ? null : venue.id))
              }
              className="w-full py-2.5 px-4 bg-[#FAF8F5] border border-[#DED8CE] hover:border-[#FF5500] text-[#111315] hover:text-[#FF5500] rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{isExpanded ? "Hide Details" : "View Details"}</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          </div>
        );
      })}
      {venues.length === 0 && (
        <div className="col-span-full bg-white border border-[#E8E2D9] rounded-2xl text-center py-12 text-[#524E48]">
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
          className="bg-white border border-[#E8E2D9] rounded-2xl p-6 space-y-4 shadow-xs"
        >
          <div className="border-b border-[#EFECE6] pb-3">
            <h3 className="text-xl font-bold text-[#111315]">
              {site.manager.name}
            </h3>
            <p className="text-sm text-[#524E48] mt-0.5">{site.name}</p>
          </div>

          <div className="space-y-2.5 text-sm text-[#403C36]">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#FF5500] shrink-0" />
              <span className="font-medium text-[#111315]">
                {site.manager.phone}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#FF5500] shrink-0" />
              <span className="font-medium text-[#111315] truncate">
                {site.manager.email}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href={`tel:${site.manager.phone}`}
              className="flex-1 py-2.5 px-4 bg-[#18181B] hover:bg-[#FF5500] text-white rounded-xl font-bold text-xs text-center transition-colors"
            >
              Call
            </a>
            <a
              href={`mailto:${site.manager.email}`}
              className="flex-1 py-2.5 px-4 bg-[#FAF8F5] border border-[#DED8CE] hover:border-[#FF5500] text-[#111315] hover:text-[#FF5500] rounded-xl font-bold text-xs text-center transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      ))}
      {sites.length === 0 && (
        <div className="col-span-full bg-white border border-[#E8E2D9] rounded-2xl text-center py-12 text-[#524E48]">
          No contacts found. Add sites to see contacts here.
        </div>
      )}
    </div>
  );
}

// Maintenance Tab
function MaintenanceTab({ logs }: { logs: MaintenanceLog[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getServiceTypeStyles = (type: MaintenanceLog["serviceType"]) => {
    switch (type) {
      case "call-raised":
        return {
          label: "Call Raised",
          color: "bg-amber-50 text-amber-800 border-amber-200",
        };
      case "fuel-refill":
        return {
          label: "Fuel Refill",
          color: "bg-sky-50 text-sky-800 border-sky-200",
        };
      case "repair":
        return {
          label: "Repair",
          color: "bg-red-50 text-red-700 border-red-200",
        };
    }
  };

  const getStatusStyles = (status: MaintenanceLog["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "in-progress":
        return "bg-[#FFF3EC] text-[#C2410C] border-[#FF5500]/30";
      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <div className="space-y-5">
      {logs.map((log) => {
        const serviceType = getServiceTypeStyles(log.serviceType);
        const isExpanded = expandedId === log.id;
        return (
          <div
            key={log.id}
            className="bg-white border border-[#E8E2D9] rounded-2xl p-6 space-y-4 shadow-xs"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-mono font-bold border",
                      serviceType.color
                    )}
                  >
                    {serviceType.label}
                  </span>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-mono font-bold border capitalize",
                      getStatusStyles(log.status)
                    )}
                  >
                    {log.status.replace("-", " ")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#111315]">
                  {log.generatorCapacity} {log.generatorType}
                </h3>
              </div>

              <div className="font-mono text-xs text-[#524E48]">
                Rented:{" "}
                {new Date(log.rentedDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-4">
              <p className="text-sm text-[#403C36] leading-relaxed">
                {log.technicianNotes}
              </p>
            </div>

            {isExpanded && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-[#403C36] space-y-1">
                <p>
                  <strong className="text-[#111315]">Log ID:</strong>{" "}
                  <span className="font-mono">{log.id}</span>
                </p>
                <p>Service verified by Sarvadnya Field Engineering team.</p>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                setExpandedId((prev) => (prev === log.id ? null : log.id))
              }
              className="text-xs font-bold text-[#FF5500] hover:text-[#111315] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{isExpanded ? "Hide Details" : "View Details"}</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          </div>
        );
      })}
      {logs.length === 0 && (
        <div className="bg-white border border-[#E8E2D9] rounded-2xl text-center py-12 text-[#524E48]">
          No maintenance logs found.
        </div>
      )}
    </div>
  );
}

// Settings Tab
function SettingsTab({ user }: { user: MockUserProfile }) {
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    await new Promise((resolve) => setTimeout(resolve, 600));
    setMessage({ type: "success", text: "Profile updated successfully!" });
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-xs">
        <h3 className="text-2xl font-bold text-[#111315] mb-6">
          Account Settings
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-[#524E48] font-semibold mb-2">
                Full Name
              </label>
              <input
                name="name"
                defaultValue={user.name}
                className="w-full bg-[#FAF8F5] border border-[#DED8CE] rounded-xl px-4 py-3 text-sm text-[#111315] focus:outline-none focus:border-[#FF5500] transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#524E48] font-semibold mb-2">
                Email
              </label>
              <input
                defaultValue={user.email}
                disabled
                className="w-full bg-[#EFEAE1] border border-[#DED8CE] rounded-xl px-4 py-3 text-sm text-[#6E685F] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#524E48] font-semibold mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                defaultValue={user.phone || ""}
                className="w-full bg-[#FAF8F5] border border-[#DED8CE] rounded-xl px-4 py-3 text-sm text-[#111315] focus:outline-none focus:border-[#FF5500] transition-colors"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#524E48] font-semibold mb-2">
                Company Name
              </label>
              <input
                name="company"
                defaultValue={user.company || ""}
                className="w-full bg-[#FAF8F5] border border-[#DED8CE] rounded-xl px-4 py-3 text-sm text-[#111315] focus:outline-none focus:border-[#FF5500] transition-colors"
                placeholder="Business Name"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#524E48] font-semibold mb-2">
                Business Type / Industry
              </label>
              <select
                name="industry"
                className="w-full bg-[#FAF8F5] border border-[#DED8CE] rounded-xl px-4 py-3 text-sm text-[#111315] focus:outline-none focus:border-[#FF5500] transition-colors"
              >
                <option value="construction">Construction</option>
                <option value="events">Events &amp; Weddings</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="agriculture">Agriculture</option>
                <option value="hospital">Hospital</option>
                <option value="telecom">Telecom</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#524E48] font-semibold mb-2">
                City / Location
              </label>
              <input
                name="city"
                className="w-full bg-[#FAF8F5] border border-[#DED8CE] rounded-xl px-4 py-3 text-sm text-[#111315] focus:outline-none focus:border-[#FF5500] transition-colors"
                placeholder="Nashik / Pune / Mumbai"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#524E48] font-semibold mb-2">
                GST Number
              </label>
              <input
                name="gst"
                className="w-full bg-[#FAF8F5] border border-[#DED8CE] rounded-xl px-4 py-3 text-sm text-[#111315] focus:outline-none focus:border-[#FF5500] transition-colors placeholder:uppercase"
                placeholder="GSTIN"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-[#524E48] font-semibold mb-2">
                Full Address
              </label>
              <textarea
                name="address"
                className="w-full bg-[#FAF8F5] border border-[#DED8CE] rounded-xl px-4 py-3 text-sm text-[#111315] focus:outline-none focus:border-[#FF5500] transition-colors min-h-[100px] resize-none"
                placeholder="Detailed address for logistics"
              />
            </div>
          </div>

          {message && (
            <div
              className={cn(
                "p-4 rounded-xl text-sm font-semibold border",
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-red-50 text-red-700 border-red-200"
              )}
            >
              {message.text}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#18181B] hover:bg-[#FF5500] text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating...</span>
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-red-50/70 border border-red-200 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-2">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          <h4 className="text-lg font-bold text-red-700">Danger Zone</h4>
        </div>
        <p className="text-[#524E48] text-sm mb-5">
          Deleting your account will remove all your data, bookings, and
          history. This action cannot be undone.
        </p>

        {deleteConfirm ? (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirm(false);
                setMessage({
                  type: "error",
                  text: "Account deletion requests require verification via our dispatch desk.",
                });
              }}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Confirm Deletion Request
            </button>
            <button
              type="button"
              onClick={() => setDeleteConfirm(false)}
              className="px-5 py-2.5 bg-white border border-[#DED8CE] text-[#111315] font-semibold text-xs rounded-xl hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setDeleteConfirm(true)}
            className="px-5 py-3 bg-white border border-red-300 text-red-700 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}
