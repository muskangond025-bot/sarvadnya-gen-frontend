// seed-data.ts

import { v4 as uuidv4 } from "uuid";

// ============================================
// ANSWER TO YOUR QUESTIONS
// ============================================

/*
1. FIELD OF GENERATOR PRODUCTS:
   - Residential backup (homes, apartments)
   - Commercial (offices, retail, restaurants)
   - Industrial (factories, manufacturing)
   - Events (weddings, concerts, exhibitions)
   - Construction sites
   - Medical facilities (hospitals, clinics)
   - Agricultural (farms, cold storage)

2. TYPES OF GENERATORS (as per schema):
   - Portable: 5-15 kVA, movable, for events/construction
   - Standby: 15-50 kVA, home/office backup
   - Industrial: 50-300 kVA, continuous heavy-duty use
   - Inverter: 2-10 kVA, silent operation for residential
   - Towable: 100-500 kVA, large events/construction

3. MAINTENANCE WORKFLOW:
   - Weekly: Visual inspection, oil/fuel level check
   - Monthly: Load testing, battery check, coolant levels
   - Quarterly: Filter replacement, belt inspection
   - Semi-Annual: Professional service (250 hrs runtime)
   - Annual: Complete overhaul, transfer switch inspection
   - Preventive based on runtime hours
   - Emergency maintenance on breakdown

4. PAYMENT METHODS:
   - Online: Razorpay (UPI, Cards, Net Banking, Wallets)
   - Cash: COD for delivery, physical payment
   - Bank Transfer/NEFT/RTGS
   - Cheque (for B2B clients)
   - Partial: Security deposit + rental fee split
*/

// ============================================
// HELPER: Generate UUIDs
// ============================================

const generateId = () => uuidv4();

// User IDs (assume these exist in your system)
const ADMIN_USER_ID = generateId();
const CUSTOMER_1_ID = generateId();
const CUSTOMER_2_ID = generateId();
const CUSTOMER_3_ID = generateId();
const OPERATOR_1_ID = generateId();
const OPERATOR_2_ID = generateId();

// Address IDs
const ADDRESS_1_ID = 1;
const ADDRESS_2_ID = 2;
const ADDRESS_3_ID = 3;

// ============================================
// 1. GENERATOR CATEGORIES
// ============================================

export const generatorCategoriesData = [
  {
    id: generateId(),
    name: "Residential Generators",
    slug: "residential",
    description:
      "Perfect for homes, apartments, and small villas. Power your essentials during outages.",
    parent_id: null,
    image_url: "https://example.com/images/residential-generators.jpg",
    display_order: 1,
    is_active: true,
  },
  {
    id: generateId(),
    name: "Commercial Generators",
    slug: "commercial",
    description:
      "Ideal for offices, retail stores, restaurants, and small businesses.",
    parent_id: null,
    image_url: "https://example.com/images/commercial-generators.jpg",
    display_order: 2,
    is_active: true,
  },
  {
    id: generateId(),
    name: "Industrial Generators",
    slug: "industrial",
    description:
      "Heavy-duty power for factories, warehouses, and manufacturing units.",
    parent_id: null,
    image_url: "https://example.com/images/industrial-generators.jpg",
    display_order: 3,
    is_active: true,
  },
  {
    id: generateId(),
    name: "Event Generators",
    slug: "events",
    description:
      "Portable and silent generators for weddings, concerts, and exhibitions.",
    parent_id: null,
    image_url: "https://example.com/images/event-generators.jpg",
    display_order: 4,
    is_active: true,
  },
  {
    id: generateId(),
    name: "Construction Generators",
    slug: "construction",
    description:
      "Rugged generators for construction sites and outdoor projects.",
    parent_id: null,
    image_url: "https://example.com/images/construction-generators.jpg",
    display_order: 5,
    is_active: true,
  },
];

// ============================================
// 2. GENERATORS (Fleet Inventory)
// ============================================

export const generatorsData = [
  // --- PORTABLE GENERATORS ---
  {
    id: generateId(),
    asset_code: "GEN-001",
    slug: "5kva-honda-portable-generator",
    name: "5 kVA Honda Portable Generator",
    description:
      "Compact and fuel-efficient generator ideal for homes, small shops, and outdoor events. Features automatic voltage regulation and low noise operation.",
    type: "portable",
    status: "available",
    fuel_type: "petrol",

    // Technical Specs
    power_output_kva: "5.00",
    power_output_kw: "4.00",
    voltage: "230V",
    phase: "Single Phase",
    frequency_hz: "50.0",

    // Fuel
    fuel_tank_capacity_liters: "25.00",
    fuel_consumption_per_hour: "1.50",
    runtime_hours_full_tank: "16.0",

    // Physical
    noise_level_db: "65.0",
    weight_kg: "85.00",
    dimensions_cm: { length: 60, width: 45, height: 50 },

    // Brand
    brand: "Honda",
    model_number: "EP5000",
    year_of_manufacture: "2023",
    serial_number: "HND-EP5000-2023-001",

    // Pricing (Based on Indian market rates)
    hourly_rate: "150.00",
    daily_rate: "1200.00",
    weekly_rate: "7000.00",
    monthly_rate: "22000.00",
    security_deposit: "10000.00",
    currency: "INR",

    // Media
    primary_image_url: "https://example.com/generators/honda-5kva.jpg",
    additional_images: [
      "https://example.com/generators/honda-5kva-side.jpg",
      "https://example.com/generators/honda-5kva-front.jpg",
    ],
    manual_pdf_url: "https://example.com/manuals/honda-ep5000.pdf",
    video_url: "https://youtube.com/watch?v=demo",

    // Features
    features: [
      "Automatic Voltage Regulator (AVR)",
      "Overload Protection",
      "Low Oil Shutdown",
      "Digital Display Panel",
      "Recoil + Electric Start",
      "Fuel Gauge",
    ],
    highlights: [
      "16 hours runtime on full tank",
      "Only 65dB noise level",
      "Suitable for AC, refrigerator, TV, lights",
      "Compact and portable design",
    ],
    specs: {
      starting_system: "Recoil + Electric",
      cooling_system: "Air-cooled",
      alternator_type: "Brushless",
      power_factor: "0.8",
      outlet_configuration: "1x 230V socket, 1x 12V DC",
    },

    // Location
    current_location: "Main Warehouse - Mumbai",
    assigned_operator_id: null,

    // Maintenance (Following research - 250 hrs service interval)
    last_service_date: new Date("2025-12-15"),
    next_service_due: new Date("2026-03-15"),
    total_runtime_hours: "125.5",

    // SEO
    meta_title: "5 kVA Honda Portable Generator for Rent in Mumbai | ₹1200/day",
    meta_description:
      "Rent Honda 5kVA portable generator in Mumbai. Perfect for homes, events & shops. Low noise, fuel-efficient. Book now at ₹1200/day.",

    // Audit
    created_by: ADMIN_USER_ID,
    created_at: new Date("2025-01-01"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2025-01-01"),
    is_deleted: false,
  },

  // --- INVERTER GENERATOR ---
  {
    id: generateId(),
    asset_code: "GEN-002",
    slug: "7kva-yamaha-inverter-generator",
    name: "7 kVA Yamaha Inverter Generator (Silent)",
    description:
      "Ultra-quiet inverter generator with advanced noise reduction. Perfect for residential areas, outdoor events, and sensitive electronic equipment.",
    type: "inverter",
    status: "rented",
    fuel_type: "petrol",

    power_output_kva: "7.00",
    power_output_kw: "5.60",
    voltage: "230V",
    phase: "Single Phase",
    frequency_hz: "50.0",

    fuel_tank_capacity_liters: "30.00",
    fuel_consumption_per_hour: "1.80",
    runtime_hours_full_tank: "16.5",

    noise_level_db: "58.0", // Very quiet
    weight_kg: "95.00",
    dimensions_cm: { length: 70, width: 50, height: 55 },

    brand: "Yamaha",
    model_number: "EF7000iS",
    year_of_manufacture: "2024",
    serial_number: "YMH-EF7000-2024-045",

    hourly_rate: "200.00",
    daily_rate: "1800.00",
    weekly_rate: "10500.00",
    monthly_rate: "32000.00",
    security_deposit: "15000.00",
    currency: "INR",

    primary_image_url:
      "https://example.com/generators/yamaha-7kva-inverter.jpg",
    additional_images: [],

    features: [
      "Super Silent Operation (58dB)",
      "Pure Sine Wave Output",
      "Smart Throttle (Eco Mode)",
      "Parallel Capability",
      "USB Charging Port",
      "Oil Warning System",
    ],
    highlights: [
      "Safe for laptops and mobiles",
      "Quieter than normal conversation",
      "Fuel-efficient eco mode",
      "Ideal for residential areas",
    ],
    specs: {
      inverter_technology: "True Sine Wave",
      thd: "<3%",
      eco_mode: "Yes",
      parallel_ports: "2",
    },

    current_location: "Customer Site - Pune",
    assigned_operator_id: OPERATOR_1_ID,

    last_service_date: new Date("2025-11-20"),
    next_service_due: new Date("2026-02-20"),
    total_runtime_hours: "287.0",

    meta_title: "7 kVA Yamaha Silent Inverter Generator Rental | Mumbai & Pune",
    meta_description:
      "Ultra-quiet 7kVA Yamaha inverter generator for rent. Only 58dB noise. Perfect for homes & events. ₹1800/day.",

    created_by: ADMIN_USER_ID,
    created_at: new Date("2024-06-15"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2025-12-20"),
    is_deleted: false,
  },

  // --- STANDBY GENERATOR ---
  {
    id: generateId(),
    asset_code: "GEN-003",
    slug: "25kva-kirloskar-standby-generator",
    name: "25 kVA Kirloskar Standby Generator",
    description:
      "Reliable standby generator for offices, clinics, and small commercial establishments. Automatic start with power failure detection.",
    type: "standby",
    status: "available",
    fuel_type: "diesel",

    power_output_kva: "25.00",
    power_output_kw: "20.00",
    voltage: "415V",
    phase: "Three Phase",
    frequency_hz: "50.0",

    fuel_tank_capacity_liters: "80.00",
    fuel_consumption_per_hour: "4.50",
    runtime_hours_full_tank: "17.8",

    noise_level_db: "72.0",
    weight_kg: "450.00",
    dimensions_cm: { length: 150, width: 80, height: 120 },

    brand: "Kirloskar",
    model_number: "KG1-25AS",
    year_of_manufacture: "2023",
    serial_number: "KLR-KG125-2023-089",

    hourly_rate: "350.00",
    daily_rate: "3500.00",
    weekly_rate: "21000.00",
    monthly_rate: "65000.00",
    security_deposit: "30000.00",
    currency: "INR",

    primary_image_url: "https://example.com/generators/kirloskar-25kva.jpg",
    additional_images: [
      "https://example.com/generators/kirloskar-25kva-control-panel.jpg",
    ],
    manual_pdf_url: "https://example.com/manuals/kirloskar-kg125.pdf",

    features: [
      "Automatic Transfer Switch (ATS)",
      "Auto Start/Stop",
      "Digital Control Panel",
      "Remote Monitoring Ready",
      "Circuit Breaker Protection",
      "Fuel Level Indicator",
      "Battery Charger Included",
    ],
    highlights: [
      "Starts automatically during power cuts",
      "Suitable for 3-phase loads",
      "Industrial-grade reliability",
      "Can power lifts, ACs, and heavy equipment",
    ],
    specs: {
      engine_make: "Kirloskar 4R1040",
      rpm: "1500",
      alternator: "Stamford PI144G",
      control_system: "DSE6020 MKII",
    },

    current_location: "Main Warehouse - Mumbai",
    assigned_operator_id: null,

    last_service_date: new Date("2025-10-10"),
    next_service_due: new Date("2026-01-10"),
    total_runtime_hours: "542.3",

    meta_title: "25 kVA Kirloskar Diesel Generator on Rent | Auto Start ATS",
    meta_description:
      "Rent Kirloskar 25kVA standby generator with ATS. Perfect for offices & clinics. Three-phase power. ₹3500/day.",

    created_by: ADMIN_USER_ID,
    created_at: new Date("2023-08-20"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2025-10-15"),
    is_deleted: false,
  },

  // --- INDUSTRIAL GENERATOR ---
  {
    id: generateId(),
    asset_code: "GEN-004",
    slug: "125kva-cummins-industrial-generator",
    name: "125 kVA Cummins Industrial Generator",
    description:
      "Heavy-duty industrial generator for factories, manufacturing units, and continuous operation. Built for 24/7 reliability.",
    type: "industrial",
    status: "available",
    fuel_type: "diesel",

    power_output_kva: "125.00",
    power_output_kw: "100.00",
    voltage: "415V",
    phase: "Three Phase",
    frequency_hz: "50.0",

    fuel_tank_capacity_liters: "300.00",
    fuel_consumption_per_hour: "18.50",
    runtime_hours_full_tank: "16.2",

    noise_level_db: "85.0",
    weight_kg: "1850.00",
    dimensions_cm: { length: 280, width: 120, height: 160 },

    brand: "Cummins",
    model_number: "C125D5",
    year_of_manufacture: "2022",
    serial_number: "CMN-C125D5-2022-234",

    hourly_rate: "1200.00",
    daily_rate: "12000.00",
    weekly_rate: "70000.00",
    monthly_rate: "220000.00",
    security_deposit: "100000.00",
    currency: "INR",

    primary_image_url: "https://example.com/generators/cummins-125kva.jpg",
    additional_images: [
      "https://example.com/generators/cummins-engine.jpg",
      "https://example.com/generators/cummins-control-panel.jpg",
    ],
    manual_pdf_url: "https://example.com/manuals/cummins-c125d5.pdf",
    video_url: "https://youtube.com/watch?v=cummins-demo",

    features: [
      "Prime Power Rated",
      "Weather-Proof Canopy",
      "Digital Control Module",
      "Remote Monitoring & Control",
      "Automatic Load Sharing",
      "Overload & Short Circuit Protection",
      "Low Oil Pressure Shutdown",
      "High Coolant Temperature Alarm",
    ],
    highlights: [
      "24/7 continuous operation capability",
      "Suitable for factories and large facilities",
      "Low maintenance Cummins engine",
      "Can run multiple heavy machines simultaneously",
    ],
    specs: {
      engine_model: "Cummins 6BT5.9-G2",
      cylinders: "6",
      displacement: "5.9L",
      alternator: "Stamford HCI434F",
      cooling: "Radiator Cooled",
      starting: "Electric Start (24V)",
    },

    current_location: "South Yard - Bangalore",
    assigned_operator_id: OPERATOR_2_ID,

    last_service_date: new Date("2025-12-01"),
    next_service_due: new Date("2026-03-01"),
    total_runtime_hours: "1254.7",

    meta_title:
      "125 kVA Cummins Industrial Generator Rental | Factory Power Backup",
    meta_description:
      "Rent Cummins 125kVA industrial diesel generator. 24/7 operation. Perfect for factories. ₹12000/day.",

    created_by: ADMIN_USER_ID,
    created_at: new Date("2022-11-10"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2025-12-01"),
    is_deleted: false,
  },

  // --- TOWABLE GENERATOR ---
  {
    id: generateId(),
    asset_code: "GEN-005",
    slug: "250kva-caterpillar-towable-generator",
    name: "250 kVA Caterpillar Towable Generator",
    description:
      "High-capacity towable generator for large events, construction sites, and temporary power installations. Hospital-grade reliability.",
    type: "towable",
    status: "maintenance",
    fuel_type: "diesel",

    power_output_kva: "250.00",
    power_output_kw: "200.00",
    voltage: "415V",
    phase: "Three Phase",
    frequency_hz: "50.0",

    fuel_tank_capacity_liters: "500.00",
    fuel_consumption_per_hour: "35.00",
    runtime_hours_full_tank: "14.3",

    noise_level_db: "78.0", // Soundproof canopy
    weight_kg: "3200.00",
    dimensions_cm: { length: 400, width: 180, height: 220 },

    brand: "Caterpillar",
    model_number: "CAT-DE250E0",
    year_of_manufacture: "2021",
    serial_number: "CAT-DE250-2021-567",

    hourly_rate: "2500.00",
    daily_rate: "25000.00",
    weekly_rate: "150000.00",
    monthly_rate: "480000.00",
    security_deposit: "200000.00",
    currency: "INR",

    primary_image_url: "https://example.com/generators/cat-250kva.jpg",
    additional_images: [],
    manual_pdf_url: "https://example.com/manuals/cat-de250.pdf",

    features: [
      "Soundproof Weatherproof Canopy",
      "Trailer Mounted with Towing Hitch",
      "Advanced Digital Control System",
      "Remote Monitoring (GSM/GPRS)",
      "Automatic Voltage Regulator",
      "Load Bank Tested",
      "Fuel Polishing System",
      "Paralleling Capability",
    ],
    highlights: [
      "Hospital & data center grade reliability",
      "Ideal for large weddings and concerts",
      "Can power entire buildings",
      "Forklift pockets for easy positioning",
    ],
    specs: {
      engine_model: "CAT C9",
      alternator: "Leroy Somer LSA 46.2",
      canopy: "Super Silent (Level 2)",
      trailer_type: "Heavy Duty with Brakes",
    },

    current_location: "Service Center - Delhi",
    assigned_operator_id: null,

    // Under maintenance
    last_service_date: new Date("2026-01-02"),
    next_service_due: new Date("2026-04-02"),
    total_runtime_hours: "2876.4",

    meta_title: "250 kVA CAT Towable Generator for Rent | Large Events & Sites",
    meta_description:
      "Rent Caterpillar 250kVA towable diesel generator. Perfect for events, hospitals, construction. ₹25000/day.",

    created_by: ADMIN_USER_ID,
    created_at: new Date("2021-03-15"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2026-01-02"),
    is_deleted: false,
  },

  // --- ANOTHER AVAILABLE PORTABLE ---
  {
    id: generateId(),
    asset_code: "GEN-006",
    slug: "10kva-mahindra-portable-generator",
    name: "10 kVA Mahindra Portable Generator",
    description:
      "Indian-made reliable generator for small businesses and homes. Fuel-efficient diesel engine with low maintenance.",
    type: "portable",
    status: "available",
    fuel_type: "diesel",

    power_output_kva: "10.00",
    power_output_kw: "8.00",
    voltage: "230V / 415V",
    phase: "Single/Three Phase",
    frequency_hz: "50.0",

    fuel_tank_capacity_liters: "45.00",
    fuel_consumption_per_hour: "2.80",
    runtime_hours_full_tank: "16.0",

    noise_level_db: "70.0",
    weight_kg: "320.00",
    dimensions_cm: { length: 130, width: 65, height: 85 },

    brand: "Mahindra Powerol",
    model_number: "MDG10",
    year_of_manufacture: "2024",
    serial_number: "MPL-MDG10-2024-112",

    hourly_rate: "220.00",
    daily_rate: "2200.00",
    weekly_rate: "13000.00",
    monthly_rate: "40000.00",
    security_deposit: "18000.00",
    currency: "INR",

    primary_image_url: "https://example.com/generators/mahindra-10kva.jpg",
    additional_images: [],

    features: [
      "Dual Voltage Output",
      "Single & Three Phase Support",
      "Digital Voltmeter & Ammeter",
      "Trolley Mounted (Portable)",
      "Low Fuel Consumption",
      "Easy Spare Parts Availability",
    ],
    highlights: [
      "Made in India - easy servicing",
      "Can run AC, refrigerator, and lights together",
      "Budget-friendly rental",
      "Suitable for small shops and homes",
    ],
    specs: {
      engine: "Mahindra 2-cylinder diesel",
      cooling: "Air-cooled",
      starting: "Manual Recoil",
    },

    current_location: "Main Warehouse - Mumbai",
    assigned_operator_id: null,

    last_service_date: new Date("2025-11-25"),
    next_service_due: new Date("2026-02-25"),
    total_runtime_hours: "98.2",

    meta_title: "10 kVA Mahindra Diesel Generator Rental | Mumbai",
    meta_description:
      "Rent Mahindra 10kVA portable diesel generator. Dual voltage. Perfect for shops & homes. ₹2200/day.",

    created_by: ADMIN_USER_ID,
    created_at: new Date("2024-03-10"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2025-11-25"),
    is_deleted: false,
  },

  // --- RETIRED GENERATOR (for demonstration) ---
  {
    id: generateId(),
    asset_code: "GEN-007",
    slug: "15kva-old-retired-generator",
    name: "15 kVA Greaves Standby Generator (Retired)",
    description: "Retired from active fleet. Kept for parts and backup.",
    type: "standby",
    status: "retired",
    fuel_type: "diesel",

    power_output_kva: "15.00",
    power_output_kw: "12.00",
    voltage: "230V",
    phase: "Single Phase",
    frequency_hz: "50.0",

    fuel_tank_capacity_liters: "50.00",
    fuel_consumption_per_hour: "3.00",
    runtime_hours_full_tank: "16.7",

    noise_level_db: "80.0",
    weight_kg: "380.00",
    dimensions_cm: { length: 140, width: 70, height: 90 },

    brand: "Greaves Power",
    model_number: "GP15",
    year_of_manufacture: "2018",
    serial_number: "GRV-GP15-2018-444",

    hourly_rate: "0.00",
    daily_rate: "0.00",
    weekly_rate: "0.00",
    monthly_rate: "0.00",
    security_deposit: "0.00",
    currency: "INR",

    primary_image_url: null,
    additional_images: [],
    features: [],
    highlights: [],
    specs: {},

    current_location: "Warehouse - Spare Parts Section",
    assigned_operator_id: null,

    last_service_date: new Date("2024-05-10"),
    next_service_due: null,
    total_runtime_hours: "5678.9",

    meta_title: null,
    meta_description: null,

    created_by: ADMIN_USER_ID,
    created_at: new Date("2018-06-01"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2024-11-20"),
    is_deleted: false,
  },
];

// Store generator IDs for reference
const GEN_1_ID = generatorsData[0].id; // 5 kVA Honda
const GEN_2_ID = generatorsData[1].id; // 7 kVA Yamaha (rented)
const GEN_3_ID = generatorsData[2].id; // 25 kVA Kirloskar
const GEN_4_ID = generatorsData[3].id; // 125 kVA Cummins
const GEN_5_ID = generatorsData[4].id; // 250 kVA CAT (maintenance)
const GEN_6_ID = generatorsData[5].id; // 10 kVA Mahindra

// ============================================
// 3. GENERATOR AVAILABILITY
// ============================================

export const generatorAvailabilityData = [
  // GEN-002 (Yamaha) - Currently rented
  {
    id: generateId(),
    generator_id: GEN_2_ID,
    status: "booked",
    start_date: new Date("2026-01-03"),
    end_date: new Date("2026-01-10"),
    booking_id: "will-be-booking-1", // Reference to booking below
    block_reason: null,
    created_by: ADMIN_USER_ID,
    created_at: new Date("2025-12-28"),
  },

  // GEN-005 (CAT) - Blocked for maintenance
  {
    id: generateId(),
    generator_id: GEN_5_ID,
    status: "maintenance",
    start_date: new Date("2026-01-02"),
    end_date: new Date("2026-01-12"),
    booking_id: null,
    block_reason: "Scheduled preventive maintenance - engine overhaul",
    created_by: ADMIN_USER_ID,
    created_at: new Date("2025-12-30"),
  },

  // GEN-001 (Honda) - Future booking
  {
    id: generateId(),
    generator_id: GEN_1_ID,
    status: "booked",
    start_date: new Date("2026-01-15"),
    end_date: new Date("2026-01-18"),
    booking_id: "will-be-booking-2",
    block_reason: null,
    created_by: CUSTOMER_1_ID,
    created_at: new Date("2026-01-05"),
  },

  // GEN-003 (Kirloskar) - Blocked for event
  {
    id: generateId(),
    generator_id: GEN_3_ID,
    status: "blocked",
    start_date: new Date("2026-01-20"),
    end_date: new Date("2026-01-25"),
    booking_id: null,
    block_reason: "Reserved for corporate client - pending confirmation",
    created_by: ADMIN_USER_ID,
    created_at: new Date("2026-01-04"),
  },
];

// ============================================
// 4. BOOKINGS
// ============================================

const BOOKING_1_ID = generateId();
const BOOKING_2_ID = generateId();
const BOOKING_3_ID = generateId();

export const bookingsData = [
  // --- BOOKING 1: ACTIVE RENTAL (Yamaha Inverter) ---
  {
    id: BOOKING_1_ID,
    booking_number: "RENT-2026-00001",
    customer_id: CUSTOMER_2_ID,

    // Period
    rental_start_date: new Date("2026-01-03T10:00:00"),
    rental_end_date: new Date("2026-01-10T18:00:00"),
    expected_duration_days: 7,
    actual_return_date: null, // Still active

    // Delivery
    delivery_type: "delivery",
    delivery_address_id: ADDRESS_2_ID,
    delivery_date: new Date("2026-01-03"),
    delivery_time_slot: "10:00 AM - 12:00 PM",
    delivery_instructions:
      "Call 30 mins before arrival. Building has parking restrictions.",

    // Pickup
    pickup_date: new Date("2026-01-10"),
    pickup_time_slot: "4:00 PM - 6:00 PM",

    // Status
    booking_status: "active",
    payment_status: "paid",
    channel: "web",

    // Pricing (7 days * ₹1800/day = ₹12,600)
    currency: "INR",
    subtotal: "12600.00",
    delivery_charges: "800.00",
    security_deposit: "15000.00",
    discount_code: "NEWYEAR2026",
    discount_amount: "1260.00", // 10% off

    // Tax (18% GST on ₹12,140)
    tax_amount: "2185.20",
    cgst: "1092.60",
    sgst: "1092.60",
    igst: "0.00",

    // Totals
    total_amount: "14325.20", // subtotal - discount + delivery + tax
    paid_amount: "29325.20", // total + security deposit
    due_amount: "0.00",
    refund_amount: "0.00",

    // Payment (ONLINE - Razorpay)
    payment_method: "razorpay_upi",
    payment_ref: "pay_MnB2k3lP9qRsT4u",
    razorpay_order_id: "order_MnB2k3lP9qRsT4u",
    razorpay_payment_id: "pay_MnB2k3lP9qRsT4u",
    paid_at: new Date("2025-12-28T14:30:00"),

    // Assignment
    assigned_operator_id: OPERATOR_1_ID,
    approved_by: ADMIN_USER_ID,
    approved_at: new Date("2025-12-28T15:00:00"),

    // B2B
    customer_gstin: null,
    company_name: null,
    purchase_order_number: null,

    // Metadata
    customer_notes:
      "Need generator for outdoor wedding event. Please ensure full tank on delivery.",
    admin_notes:
      "VIP customer - priority service. Operator instructed to provide usage demo.",
    tags: ["wedding", "event", "vip_customer"],
    metadata: {
      event_type: "wedding",
      guest_count: 150,
      venue: "Backyard Garden",
    },

    // Internal
    requires_approval: true,
    is_extended: false,
    extension_count: 0,

    // Audit
    created_by: CUSTOMER_2_ID,
    created_at: new Date("2025-12-28T14:15:00"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2026-01-03T10:15:00"),
    is_deleted: false,
    deleted_by: null,
    deleted_at: null,
  },

  // --- BOOKING 2: UPCOMING RENTAL (Honda Portable) ---
  {
    id: BOOKING_2_ID,
    booking_number: "RENT-2026-00002",
    customer_id: CUSTOMER_1_ID,

    rental_start_date: new Date("2026-01-15T09:00:00"),
    rental_end_date: new Date("2026-01-18T18:00:00"),
    expected_duration_days: 3,
    actual_return_date: null,

    delivery_type: "pickup", // Customer will pickup
    delivery_address_id: null,
    delivery_date: null,
    delivery_time_slot: null,
    delivery_instructions: null,

    pickup_date: new Date("2026-01-15T09:00:00"),
    pickup_time_slot: "9:00 AM - 11:00 AM",

    booking_status: "confirmed",
    payment_status: "partial", // Paid 50% advance
    channel: "phone",

    // Pricing (3 days * ₹1200/day = ₹3,600)
    currency: "INR",
    subtotal: "3600.00",
    delivery_charges: "0.00", // Self pickup
    security_deposit: "10000.00",
    discount_code: null,
    discount_amount: "0.00",

    // Tax (18% GST)
    tax_amount: "648.00",
    cgst: "324.00",
    sgst: "324.00",
    igst: "0.00",

    total_amount: "4248.00",
    paid_amount: "2124.00", // 50% paid + security deposit to be collected
    due_amount: "12124.00", // Remaining 50% + security deposit
    refund_amount: "0.00",

    // Payment (CASH advance - balance on pickup)
    payment_method: "cash",
    payment_ref: "CASH-ADV-001",
    razorpay_order_id: null,
    razorpay_payment_id: null,
    paid_at: new Date("2026-01-05T11:00:00"),

    assigned_operator_id: null,
    approved_by: ADMIN_USER_ID,
    approved_at: new Date("2026-01-05T11:30:00"),

    customer_gstin: null,
    company_name: null,
    purchase_order_number: null,

    customer_notes: "Need for construction site. Will collect from warehouse.",
    admin_notes:
      "Balance ₹12,124 to be collected on pickup. Ensure generator is fueled.",
    tags: ["construction", "self_pickup"],
    metadata: {
      pickup_location: "Main Warehouse - Mumbai",
    },

    requires_approval: true,
    is_extended: false,
    extension_count: 0,

    created_by: ADMIN_USER_ID, // Phone booking by admin
    created_at: new Date("2026-01-05T10:45:00"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2026-01-05T11:30:00"),
    is_deleted: false,
    deleted_by: null,
    deleted_at: null,
  },

  // --- BOOKING 3: COMPLETED RENTAL (Cummins Industrial) ---
  {
    id: BOOKING_3_ID,
    booking_number: "RENT-2025-00089",
    customer_id: CUSTOMER_3_ID,

    rental_start_date: new Date("2025-12-10T08:00:00"),
    rental_end_date: new Date("2025-12-20T17:00:00"),
    expected_duration_days: 10,
    actual_return_date: new Date("2025-12-20T16:30:00"),

    delivery_type: "delivery",
    delivery_address_id: ADDRESS_3_ID,
    delivery_date: new Date("2025-12-10"),
    delivery_time_slot: "8:00 AM - 10:00 AM",
    delivery_instructions: "Factory gate - ask for Mr. Sharma",

    pickup_date: new Date("2025-12-20"),
    pickup_time_slot: "3:00 PM - 5:00 PM",

    booking_status: "completed",
    payment_status: "paid",
    channel: "web",

    // Pricing (10 days * ₹12,000/day = ₹1,20,000) - Used weekly rate instead
    // Actually: 1 week (₹70,000) + 3 days (₹36,000) = ₹1,06,000
    currency: "INR",
    subtotal: "106000.00",
    delivery_charges: "2500.00",
    security_deposit: "100000.00",
    discount_code: null,
    discount_amount: "0.00",

    // Tax (18% GST) - B2B with IGST
    tax_amount: "19530.00",
    cgst: "0.00",
    sgst: "0.00",
    igst: "19530.00", // Inter-state supply

    total_amount: "128030.00",
    paid_amount: "228030.00", // Total + security deposit
    due_amount: "0.00",
    refund_amount: "100000.00", // Security deposit refunded after inspection

    // Payment (ONLINE - Net Banking)
    payment_method: "razorpay_netbanking",
    payment_ref: "pay_LzA1b2cP3qRsT5v",
    razorpay_order_id: "order_LzA1b2cP3qRsT5v",
    razorpay_payment_id: "pay_LzA1b2cP3qRsT5v",
    paid_at: new Date("2025-12-08T16:20:00"),

    assigned_operator_id: OPERATOR_2_ID,
    approved_by: ADMIN_USER_ID,
    approved_at: new Date("2025-12-08T17:00:00"),

    // B2B
    customer_gstin: "27AABCU9603R1ZM",
    company_name: "Precision Engineering Pvt Ltd",
    purchase_order_number: "PO-PE-2025-445",

    customer_notes:
      "Required for emergency factory operations during grid maintenance.",
    admin_notes:
      "Generator returned in excellent condition. Security deposit refunded via NEFT on 22-Dec-2025.",
    tags: ["b2b", "industrial", "completed", "good_customer"],
    metadata: {
      industry: "manufacturing",
      usage: "emergency_backup",
      refund_method: "neft",
      refund_reference: "NEFT/456789/22Dec2025",
    },

    requires_approval: true,
    is_extended: false,
    extension_count: 0,

    created_by: CUSTOMER_3_ID,
    created_at: new Date("2025-12-08T15:45:00"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2025-12-22T10:00:00"),
    is_deleted: false,
    deleted_by: null,
    deleted_at: null,
  },

  // --- BOOKING 4: CANCELLED BOOKING ---
  {
    id: generateId(),
    booking_number: "RENT-2026-00003",
    customer_id: CUSTOMER_1_ID,

    rental_start_date: new Date("2026-01-08T10:00:00"),
    rental_end_date: new Date("2026-01-12T18:00:00"),
    expected_duration_days: 4,
    actual_return_date: null,

    delivery_type: "delivery",
    delivery_address_id: ADDRESS_1_ID,
    delivery_date: null,
    delivery_time_slot: null,
    delivery_instructions: null,

    pickup_date: null,
    pickup_time_slot: null,

    booking_status: "cancelled",
    payment_status: "refunded",
    channel: "whatsapp",

    currency: "INR",
    subtotal: "4800.00", // 4 days * ₹1200
    delivery_charges: "500.00",
    security_deposit: "10000.00",
    discount_code: null,
    discount_amount: "0.00",

    tax_amount: "954.00",
    cgst: "477.00",
    sgst: "477.00",
    igst: "0.00",

    total_amount: "6254.00",
    paid_amount: "6254.00",
    due_amount: "0.00",
    refund_amount: "6254.00", // Full refund (cancelled 5 days in advance)

    payment_method: "razorpay_upi",
    payment_ref: "pay_CnC3d4eQ5rStU6w",
    razorpay_order_id: "order_CnC3d4eQ5rStU6w",
    razorpay_payment_id: "pay_CnC3d4eQ5rStU6w",
    paid_at: new Date("2026-01-02T09:15:00"),

    assigned_operator_id: null,
    approved_by: ADMIN_USER_ID,
    approved_at: new Date("2026-01-02T09:30:00"),

    customer_gstin: null,
    company_name: null,
    purchase_order_number: null,

    customer_notes: "Need for family function.",
    admin_notes:
      "Customer cancelled on 03-Jan due to event postponement. Full refund processed as per cancellation policy (>48hrs notice).",
    tags: ["cancelled", "refunded"],
    metadata: {
      cancellation_reason: "Event postponed",
      cancelled_at: "2026-01-03T14:00:00",
      refund_processed_at: "2026-01-04T11:00:00",
    },

    requires_approval: true,
    is_extended: false,
    extension_count: 0,

    created_by: CUSTOMER_1_ID,
    created_at: new Date("2026-01-02T08:50:00"),
    updated_by: ADMIN_USER_ID,
    updated_at: new Date("2026-01-04T11:00:00"),
    is_deleted: false,
    deleted_by: null,
    deleted_at: null,
  },
];

// ============================================
// 5. BOOKING ITEMS
// ============================================

export const bookingItemsData = [
  // Booking 1 - Yamaha Inverter
  {
    id: generateId(),
    booking_id: BOOKING_1_ID,
    generator_id: GEN_2_ID,

    generator_name: "7 kVA Yamaha Inverter Generator (Silent)",
    generator_asset_code: "GEN-002",

    rate_type: "daily",
    unit_rate: "1800.00",
    quantity_units: 7,
    line_total: "12600.00",
    security_deposit: "15000.00",

    item_status: "delivered",
    delivered_at: new Date("2026-01-03T11:45:00"),
    returned_at: null,
    condition_notes:
      "Generator delivered in perfect condition. Customer provided with user manual and safety instructions.",

    created_at: new Date("2025-12-28T14:15:00"),
  },

  // Booking 2 - Honda Portable
  {
    id: generateId(),
    booking_id: BOOKING_2_ID,
    generator_id: GEN_1_ID,

    generator_name: "5 kVA Honda Portable Generator",
    generator_asset_code: "GEN-001",

    rate_type: "daily",
    unit_rate: "1200.00",
    quantity_units: 3,
    line_total: "3600.00",
    security_deposit: "10000.00",

    item_status: "preparing",
    delivered_at: null,
    returned_at: null,
    condition_notes:
      "Generator inspected and fueled. Ready for customer pickup on 15-Jan.",

    created_at: new Date("2026-01-05T10:45:00"),
  },

  // Booking 3 - Cummins Industrial
  {
    id: generateId(),
    booking_id: BOOKING_3_ID,
    generator_id: GEN_4_ID,

    generator_name: "125 kVA Cummins Industrial Generator",
    generator_asset_code: "GEN-004",

    rate_type: "weekly", // Used weekly + daily rate
    unit_rate: "70000.00", // 1 week
    quantity_units: 1,
    line_total: "70000.00",
    security_deposit: "100000.00",

    item_status: "returned",
    delivered_at: new Date("2025-12-10T09:30:00"),
    returned_at: new Date("2025-12-20T16:30:00"),
    condition_notes:
      "Generator returned in excellent condition. All systems functioning normally. Total runtime: 187.5 hours. Security deposit refunded.",

    created_at: new Date("2025-12-08T15:45:00"),
  },

  // Second line item for Booking 3 (additional 3 days)
  {
    id: generateId(),
    booking_id: BOOKING_3_ID,
    generator_id: GEN_4_ID,

    generator_name: "125 kVA Cummins Industrial Generator",
    generator_asset_code: "GEN-004",

    rate_type: "daily",
    unit_rate: "12000.00",
    quantity_units: 3,
    line_total: "36000.00",
    security_deposit: "0.00", // Already collected above

    item_status: "returned",
    delivered_at: new Date("2025-12-10T09:30:00"),
    returned_at: new Date("2025-12-20T16:30:00"),
    condition_notes: "Additional 3 days beyond weekly rate.",

    created_at: new Date("2025-12-08T15:45:00"),
  },
];

// ============================================
// 6. BOOKING EXTENSIONS
// ============================================

export const bookingExtensionsData = [
  // Example: If Booking 1 gets extended
  {
    id: generateId(),
    booking_id: BOOKING_1_ID,

    original_end_date: new Date("2026-01-10T18:00:00"),
    new_end_date: new Date("2026-01-13T18:00:00"),
    extension_days: 3,

    additional_amount: "5400.00", // 3 days * ₹1800
    payment_status: "pending",
    payment_ref: null,

    reason:
      "Wedding ceremonies extended by 3 days. Customer requested extension.",

    approved_by: ADMIN_USER_ID,
    approved_at: new Date("2026-01-08T15:30:00"),

    created_by: CUSTOMER_2_ID,
    created_at: new Date("2026-01-08T14:00:00"),
  },
];

// ============================================
// 7. RENTAL AGREEMENTS
// ============================================

export const rentalAgreementsData = [
  // Agreement for Booking 1
  {
    id: generateId(),
    agreement_number: "AGREE-2026-00001",

    booking_id: BOOKING_1_ID,
    customer_id: CUSTOMER_2_ID,

    template_used: "standard_rental_v2.1",
    document_url: "https://example.com/agreements/AGREE-2026-00001-draft.pdf",
    signed_document_url:
      "https://example.com/agreements/AGREE-2026-00001-signed.pdf",

    terms_version: "v2.1",
    special_terms:
      "Customer responsible for fuel costs. Generator must be returned with minimum 25% fuel. Late return charges: ₹500/hour.",

    customer_signed_at: new Date("2025-12-28T14:45:00"),
    customer_signature_url:
      "https://example.com/signatures/customer-sig-001.png",
    customer_ip_address: "103.212.145.67",

    admin_signed_at: new Date("2025-12-28T15:00:00"),
    admin_signer_id: ADMIN_USER_ID,

    status: "signed",
    sent_at: new Date("2025-12-28T14:20:00"),
    expires_at: new Date("2026-01-11T23:59:59"),

    created_by: ADMIN_USER_ID,
    created_at: new Date("2025-12-28T14:20:00"),
    updated_at: new Date("2025-12-28T15:00:00"),
  },

  // Agreement for Booking 2
  {
    id: generateId(),
    agreement_number: "AGREE-2026-00002",

    booking_id: BOOKING_2_ID,
    customer_id: CUSTOMER_1_ID,

    template_used: "standard_rental_v2.1",
    document_url: "https://example.com/agreements/AGREE-2026-00002-draft.pdf",
    signed_document_url: null, // Not yet signed

    terms_version: "v2.1",
    special_terms:
      "Self-pickup rental. Customer must inspect generator before taking. Damage waiver not applicable for self-pickup.",

    customer_signed_at: null,
    customer_signature_url: null,
    customer_ip_address: null,

    admin_signed_at: null,
    admin_signer_id: null,

    status: "sent",
    sent_at: new Date("2026-01-05T12:00:00"),
    expires_at: new Date("2026-01-19T23:59:59"),

    created_by: ADMIN_USER_ID,
    created_at: new Date("2026-01-05T11:45:00"),
    updated_at: new Date("2026-01-05T12:00:00"),
  },

  // Agreement for Booking 3 (completed)
  {
    id: generateId(),
    agreement_number: "AGREE-2025-00089",

    booking_id: BOOKING_3_ID,
    customer_id: CUSTOMER_3_ID,

    template_used: "b2b_rental_v1.5",
    document_url: "https://example.com/agreements/AGREE-2025-00089-draft.pdf",
    signed_document_url:
      "https://example.com/agreements/AGREE-2025-00089-signed.pdf",

    terms_version: "v1.5",
    special_terms:
      "B2B Agreement. Net 30 payment terms. On-site technical support included. Operator visit once every 3 days for maintenance checks.",

    customer_signed_at: new Date("2025-12-08T17:30:00"),
    customer_signature_url:
      "https://example.com/signatures/customer-sig-089.png",
    customer_ip_address: "103.212.145.89",

    admin_signed_at: new Date("2025-12-08T18:00:00"),
    admin_signer_id: ADMIN_USER_ID,

    status: "signed",
    sent_at: new Date("2025-12-08T16:45:00"),
    expires_at: new Date("2025-12-21T23:59:59"),

    created_by: ADMIN_USER_ID,
    created_at: new Date("2025-12-08T16:30:00"),
    updated_at: new Date("2025-12-08T18:00:00"),
  },
];

// ============================================
// EXPORT ALL SEED DATA
// ============================================

export const seedData = {
  generatorCategories: generatorCategoriesData,
  generators: generatorsData,
  generatorAvailability: generatorAvailabilityData,
  bookings: bookingsData,
  bookingItems: bookingItemsData,
  bookingExtensions: bookingExtensionsData,
  rentalAgreements: rentalAgreementsData,
};

// ============================================
// USAGE INSTRUCTIONS
// ============================================

/*
## How to Use This Seed Data:

1. Install uuid: npm install uuid

2. Create a seed script (src/db/seed.ts):

```typescript
import { db } from './index';
import { seedData } from './seed-data';

async function seed() {
  try {
    console.log('🌱 Seeding database...');
    
    // Insert categories
    await db.insert(generatorCategories).values(seedData.generatorCategories);
    console.log('✅ Categories inserted');
    
    // Insert generators
    await db.insert(generators).values(seedData.generators);
    console.log('✅ Generators inserted');
    
    // Insert availability
    await db.insert(generatorAvailability).values(seedData.generatorAvailability);
    console.log('✅ Availability inserted');
    
    // Insert bookings
    await db.insert(bookings).values(seedData.bookings);
    console.log('✅ Bookings inserted');
    
    // Insert booking items
    await db.insert(bookingItems).values(seedData.bookingItems);
    console.log('✅ Booking items inserted');
    
    // Insert extensions
    await db.insert(bookingExtensions).values(seedData.bookingExtensions);
    console.log('✅ Extensions inserted');
    
    // Insert agreements
    await db.insert(rentalAgreements).values(seedData.rentalAgreements);
    console.log('✅ Agreements inserted');
    
    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

 seed(); */

// ============================================
// SOLUTIONS DATA (for Solutions component)
// ============================================

export interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  powerRating?: string;
}

export const solutionsData: SolutionItem[] = [
  {
    id: "01",
    title: "Residential",
    subtitle: "Homes & Apartments",
    description:
      "Keep your home powered during outages. Perfect for essential appliances, lighting, and climate control.",
    features: ["Quiet Operation", "Compact Design", "Easy Installation"],
    powerRating: "5-25 kVA",
  },
  {
    id: "02",
    title: "Retail & Small Business",
    subtitle: "Shops & Offices",
    description:
      "Maintain business operations with reliable backup power for POS systems, computers, and lighting.",
    features: ["Fast Startup", "Load Management", "Remote Monitoring"],
    powerRating: "25-75 kVA",
  },
  {
    id: "03",
    title: "Commercial",
    subtitle: "Offices & Hotels",
    description:
      "Ensure uninterrupted operations for elevators, HVAC systems, and critical business infrastructure.",
    features: ["High Capacity", "Auto-Transfer", "Load Shedding"],
    powerRating: "75-200 kVA",
  },
  {
    id: "04",
    title: "Industrial",
    subtitle: "Manufacturing & Production",
    description:
      "Heavy-duty power for continuous operations, machinery, and production lines without interruption.",
    features: ["Continuous Operation", "Peak Load Handling", "24/7 Support"],
    powerRating: "125-300 kVA",
  },
  {
    id: "05",
    title: "Healthcare",
    subtitle: "Hospitals & Clinics",
    description:
      "Mission-critical power for life-saving equipment, emergency systems, and patient care facilities.",
    features: ["Instant Backup", "Medical Grade", "Redundant Systems"],
    powerRating: "125-300 kVA",
  },
  {
    id: "06",
    title: "Events & Construction",
    subtitle: "Temporary Power",
    description:
      "Portable power solutions for outdoor events, construction sites, and temporary installations.",
    features: ["Mobile Units", "Quick Deployment", "Weather Resistant"],
    powerRating: "30-125 kVA",
  },
];

// ============================================
// SERVICES DATA (for Services component)
// ============================================

export interface ServiceFeature {
  title: string;
  subtitle: string;
}

export interface ServiceItem {
  id: string;
  label: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features?: ServiceFeature[];
  buttonText?: string;
  reversed?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: "generator-rental",
    label: "Hourly Rental",
    titleLine1: "Flexible short-term",
    titleHighlight: "generator rental",
    description:
      "Our hourly rental service provides immediate access to high-quality generators for short-term needs. Perfect for outdoor events, emergency power backup, and situations requiring quick deployment. We offer flexible rates with no minimum commitment, ensuring you only pay for what you need.",
    imageSrc: "/images/features/abstract-icon.png",
    imageAlt: "Generator Rental Service",
    buttonText: "Get Started",
    reversed: false,
  },
  {
    id: "maintenance",
    label: "Daily Rental",
    titleLine1: "Cost-effective",
    titleHighlight: "daily rental",
    description:
      "Daily rental plans offer cost-effective solutions for construction sites, film productions, and outdoor events. Our generators are fully maintained and tested before deployment. Includes 24/7 technical support, fuel options, and same-day delivery for urgent requirements.",
    imageSrc: "/images/features/development-icon.png",
    imageAlt: "Generator Maintenance",
    features: [
      { title: "Daily Rentals", subtitle: "Cost Effective" },
      { title: "Reliable Power", subtitle: "Instant Delivery" },
    ],
    reversed: true,
  },
  {
    id: "installation",
    label: "Weekly Rental",
    titleLine1: "rental options",
    titleHighlight: " with discounted rates",
    description:
      "Weekly rentals provide excellent value for medium-term projects with discounted rates. Ideal for construction phases, facility maintenance, or temporary installations. Includes scheduled maintenance visits, fuel management options, and flexible extension terms without penalty.",
    imageSrc: "/images/features/security-icon.png",
    imageAlt: "Generator Installation",
    reversed: false,
  },
];
