/**
 * Profile Mock Data
 *
 * Mock data for user profile, bookings, sites, venues, and maintenance logs
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  avatar: string;
  company: string;
  userType: "individual" | "business";
  emailVerified: boolean;
  phoneVerified: boolean;
  dateOfBirth: string | null;
  preferredLanguage: string;
  preferredCurrency: string;
  timezone: string;
  createdAt: string; // Member since
}

export interface Booking {
  id: string;
  generatorName: string;
  generatorKva: string;
  startDate: string;
  endDate: string;
  status: "confirmed" | "in-progress" | "completed" | "cancelled";
  totalCost: number;
  dailyRate: number;
  siteName: string;
  currentStage: number; // 1-8 for progress bar
  documents: {
    invoice?: string;
    deliveryChallan?: string;
    rentalContract?: string;
  };
}

export interface SavedSite {
  id: string;
  name: string;
  location: string;
  manager: {
    name: string;
    phone: string;
    email: string;
  };
  allocatedGenerator: string;
  instructions: string;
}

export interface Venue {
  id: string;
  name: string;
  lastBooking: string;
  generatorUsed: string;
  status: "active" | "completed";
}

export interface MaintenanceLog {
  id: string;
  generatorCapacity: string;
  generatorType: string;
  rentedDate: string;
  serviceType: "call-raised" | "fuel-refill" | "repair";
  technicianNotes: string;
  proofPhotos: string[];
  status: "pending" | "in-progress" | "resolved";
}

export interface Reminder {
  id: string;
  type: "last-year" | "last-month" | "festival";
  date: string;
  generatorName: string;
  occasion?: string;
}

// Mock User
export const mockUser: UserProfile = {
  id: "1",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "98765 43210",
  phoneCountryCode: "+91",
  avatar: "/images/avatar-placeholder.svg",
  company: "Kumar Construction Ltd.",
  userType: "business",
  emailVerified: true,
  phoneVerified: true,
  dateOfBirth: "1985-06-15",
  preferredLanguage: "en",
  preferredCurrency: "INR",
  timezone: "Asia/Kolkata",
  createdAt: "2024-03-15",
};

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: "BK001",
    generatorName: "Cummins 125 kVA Silent DG Set",
    generatorKva: "125 kVA",
    startDate: "2026-01-15",
    endDate: "2026-02-15",
    status: "in-progress",
    totalCost: 180000,
    dailyRate: 6000,
    siteName: "Nashik Industrial Hub - Satpur",
    currentStage: 6,
    documents: {
      invoice: "/documents/invoice-BK001.pdf",
      deliveryChallan: "/documents/challan-BK001.pdf",
      rentalContract: "/documents/contract-BK001.pdf",
    },
  },
  {
    id: "BK002",
    generatorName: "Kirloskar 250 kVA Silent DG Set",
    generatorKva: "250 kVA",
    startDate: "2026-01-20",
    endDate: "2026-03-20",
    status: "confirmed",
    totalCost: 360000,
    dailyRate: 12000,
    siteName: "Ambad Manufacturing Cluster",
    currentStage: 3,
    documents: {
      invoice: "/documents/invoice-BK002.pdf",
    },
  },
];

// Mock Saved Sites
export const mockSites: SavedSite[] = [
  {
    id: "ST001",
    name: "Nashik Industrial Hub - Satpur",
    location: "MIDC Satpur, Nashik, Maharashtra 422007",
    manager: {
      name: "Amit Sharma",
      phone: "+91 98765 11111",
      email: "amit.sharma@example.com",
    },
    allocatedGenerator: "Cummins 125 kVA",
    instructions:
      "Generator to be placed near main building. Ensure proper ventilation. Daily fuel check required.",
  },
  {
    id: "ST002",
    name: "Ambad Manufacturing Cluster",
    location: "Ambad MIDC, Nashik, Maharashtra 422010",
    manager: {
      name: "Priya Patel",
      phone: "+91 98765 22222",
      email: "priya.patel@example.com",
    },
    allocatedGenerator: "Kirloskar 250 kVA",
    instructions:
      "24/7 operation required. Backup fuel tank on-site. Weekly maintenance scheduled.",
  },
  {
    id: "ST003",
    name: "Sinnar Industrial Estate",
    location: "Malegaon MIDC, Sinnar, Nashik 422113",
    manager: {
      name: "Vikram Singh",
      phone: "+91 98765 33333",
      email: "vikram.singh@example.com",
    },
    allocatedGenerator: "Mahindra 65 kVA",
    instructions:
      "Event-based usage. Noise level must be below 75 dB. Setup 2 days before event.",
  },
];

// Mock Venues
export const mockVenues: Venue[] = [
  {
    id: "VN001",
    name: "Nashik Industrial Hub",
    lastBooking: "2026-01-15",
    generatorUsed: "Cummins 125 kVA",
    status: "active",
  },
  {
    id: "VN002",
    name: "Ambad MIDC Cluster",
    lastBooking: "2026-01-20",
    generatorUsed: "Kirloskar 250 kVA",
    status: "active",
  },
  {
    id: "VN003",
    name: "Sinnar Estate",
    lastBooking: "2025-12-25",
    generatorUsed: "Mahindra 65 kVA",
    status: "completed",
  },
  {
    id: "VN004",
    name: "Pune Tech Park",
    lastBooking: "2025-11-10",
    generatorUsed: "Cummins 250 kVA",
    status: "completed",
  },
];

// Mock Maintenance Logs
export const mockMaintenanceLogs: MaintenanceLog[] = [
  {
    id: "ML001",
    generatorCapacity: "125 kVA",
    generatorType: "Cummins Diesel",
    rentedDate: "2026-01-15",
    serviceType: "fuel-refill",
    technicianNotes: "Fuel tank refilled to full capacity. All systems normal.",
    proofPhotos: ["/images/maintenance/fuel-refill-1.jpg"],
    status: "resolved",
  },
  {
    id: "ML002",
    generatorCapacity: "250 kVA",
    generatorType: "Kirloskar Diesel",
    rentedDate: "2026-01-20",
    serviceType: "call-raised",
    technicianNotes: "Minor oil leak detected. Scheduled for repair tomorrow.",
    proofPhotos: [
      "/images/maintenance/oil-leak-1.jpg",
      "/images/maintenance/oil-leak-2.jpg",
    ],
    status: "in-progress",
  },
  {
    id: "ML003",
    generatorCapacity: "62.5 kVA",
    generatorType: "Mahindra Diesel",
    rentedDate: "2025-12-25",
    serviceType: "repair",
    technicianNotes: "Battery replacement required. Waiting for parts.",
    proofPhotos: [],
    status: "pending",
  },
];

// Mock Reminders
export const mockReminders: Reminder[] = [
  {
    id: "RM001",
    type: "last-year",
    date: "2025-01-08",
    generatorName: "Cummins 125 kVA Diesel Generator",
    occasion: "Construction project",
  },
  {
    id: "RM002",
    type: "festival",
    date: "2025-12-25",
    generatorName: "Mahindra 62.5 kVA Diesel Generator",
    occasion: "Christmas Event",
  },
  {
    id: "RM003",
    type: "last-month",
    date: "2025-12-08",
    generatorName: "Kirloskar 250 kVA Diesel Generator",
    occasion: "Industrial backup",
  },
];

// Progress stages
export const PROGRESS_STAGES = [
  "Booking Confirmation",
  "Site Inspection",
  "Generator Assignment",
  "Technician Assignment",
  "Dispatching",
  "Installation",
  "Rental Progress",
  "Pickup Scheduling",
] as const;
