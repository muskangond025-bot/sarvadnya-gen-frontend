/**
 * Product API Client
 *
 * Functions to interact with backend product endpoints.
 * Uses NEXT_PUBLIC_BACKEND_URL environment variable.
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// =============================================================================
// TYPES
// =============================================================================

export interface GetPublicProductsParams {
  page?: number;
  limit?: number;
  category_id?: string;
  min_kva?: number;
  max_kva?: number;
  fuel_type?: "diesel" | "petrol" | "natural_gas" | "dual_fuel" | "lpg";
  phase?: "single_phase" | "three_phase";
  canopy_type?: "open" | "silent" | "weatherproof" | "soundproof_enclosure";
  search?: string;
  sort_by?:
    | "power_asc"
    | "power_desc"
    | "price_asc"
    | "price_desc"
    | "rating"
    | "newest";
}

export interface PublicProduct {
  id: string;
  slug: string;
  name: string;
  asset_code: string;
  power_output_kva: number;
  power_output_kw: number;
  fuel_type: string;
  phase: string | null;
  primary_image_url: string | null;
  shift_rate: string | null;
  daily_rate: string | null;
  security_deposit: string | null;
  average_rating: number | null;
  rental_count: number;
  is_featured: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface ProductDetailResponse {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  asset_code: string;
  power_output_kva: number;
  power_output_kw: number;
  fuel_type: string;
  phase: string | null;
  voltage: string | null;
  frequency_hz: number | null;
  engine_make: string | null;
  engine_model: string | null;
  alternator_make: string | null;
  alternator_model: string | null;
  starting_type: string | null;
  canopy_type: string | null;
  cooling_system: string | null;
  fuel_tank_capacity_liters: number | null;
  fuel_consumption_per_hour: number | null;
  runtime_hours_full_tank: number | null;
  noise_level_db: number | null;
  weight_kg: number | null;
  dimensions: {
    length_cm: number | null;
    width_cm: number | null;
    height_cm: number | null;
  };
  brand: string | null;
  model_number: string | null;
  year_of_manufacture: number | null;
  primary_image_url: string | null;
  images: Array<{
    id: string;
    url: string;
    alt_text: string | null;
    position: number;
  }>;
  average_rating: number | null;
  total_reviews: number;
  rental_count: number;
  minimum_rental_hours: number;
  max_advance_booking_days: number;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  pricing: Array<{
    rate_type: string;
    rate_amount: string;
    shift_rate: string | null;
    shift_duration_hours: number | null;
    transport_base_cost: string | null;
    fuel_cost_per_shift: string | null;
    standby_cost: string | null;
    operator_cost_per_shift: string | null;
    security_deposit: string;
    bulk_discount_percentage: string | null;
    bulk_discount_min_dates: number | null;
  }>;
  specifications: Array<{
    group_name: string;
    spec_key: string;
    spec_value: string;
  }>;
  features: Array<{
    title: string;
    description: string | null;
    icon_name: string | null;
  }>;
  meta_title: string | null;
  meta_description: string | null;
}

export interface BackendPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface BackendResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// =============================================================================
// MOCK DATA (Fallback for local development without backend)
// =============================================================================

const MOCK_PRODUCTS: PublicProduct[] = [
  {
    id: "mock-1",
    slug: "5kva-portable-honda",
    name: "5 kVA Portable Honda Generator",
    asset_code: "GEN-001",
    power_output_kva: 5,
    power_output_kw: 4,
    fuel_type: "petrol",
    phase: "single_phase",
    primary_image_url: null,
    shift_rate: "500",
    daily_rate: "1200",
    security_deposit: "5000",
    average_rating: 4.8,
    rental_count: 42,
    is_featured: true,
    category: { id: "cat-1", name: "Residential", slug: "residential" }
  },
  {
    id: "mock-2",
    slug: "30kva-silent-kirloskar",
    name: "30 kVA Silent Kirloskar Generator",
    asset_code: "GEN-002",
    power_output_kva: 30,
    power_output_kw: 24,
    fuel_type: "diesel",
    phase: "three_phase",
    primary_image_url: null,
    shift_rate: "1500",
    daily_rate: "3500",
    security_deposit: "15000",
    average_rating: 4.7,
    rental_count: 28,
    is_featured: true,
    category: { id: "cat-2", name: "Commercial", slug: "commercial" }
  },
  {
    id: "mock-3",
    slug: "125kva-industrial-cummins",
    name: "125 kVA Industrial Cummins Generator",
    asset_code: "GEN-003",
    power_output_kva: 125,
    power_output_kw: 100,
    fuel_type: "diesel",
    phase: "three_phase",
    primary_image_url: null,
    shift_rate: "4000",
    daily_rate: "8000",
    security_deposit: "50000",
    average_rating: 4.9,
    rental_count: 15,
    is_featured: false,
    category: { id: "cat-3", name: "Industrial", slug: "industrial" }
  },
  {
    id: "mock-4",
    slug: "15kva-mid-range-mahindra",
    name: "15 kVA Mahindra Powerol",
    asset_code: "GEN-004",
    power_output_kva: 15,
    power_output_kw: 12,
    fuel_type: "diesel",
    phase: "single_phase",
    primary_image_url: null,
    shift_rate: "800",
    daily_rate: "2200",
    security_deposit: "8000",
    average_rating: 4.5,
    rental_count: 19,
    is_featured: false,
    category: { id: "cat-1", name: "Residential", slug: "residential" }
  }
];

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Get public products (no auth required)
 */
export async function getPublicProducts(
  params?: GetPublicProductsParams
): Promise<BackendPaginatedResponse<PublicProduct>> {
  try {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
    }

    const url = `${BACKEND_URL}/api/v1/products/public?${searchParams}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable, returning mock products:", error);
    return {
      success: true,
      message: "Mock data returned due to backend unavailability",
      data: MOCK_PRODUCTS,
      pagination: {
        page: 1,
        limit: 10,
        total: MOCK_PRODUCTS.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
}

/**
 * Get product details by slug (no auth required)
 */
export async function getPublicProductBySlug(
  slug: string
): Promise<BackendResponse<ProductDetailResponse>> {
  try {
    const url = `${BACKEND_URL}/api/v1/products/public/${slug}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`Backend unavailable for slug ${slug}, returning mock details:`, error);
    const mockProd = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
    
    return {
      success: true,
      message: "Mock detail returned due to backend unavailability",
      data: {
        ...mockProd,
        description: `${mockProd.name} - High performance generator for reliable power backup.`,
        voltage: "230V / 415V",
        frequency_hz: 50,
        engine_make: "Kirloskar/Honda/Cummins",
        engine_model: "Latest Series",
        alternator_make: "Stamford",
        alternator_model: "Standard",
        starting_type: "Electric Start",
        canopy_type: "Silent",
        cooling_system: "Air/Water Cooled",
        fuel_tank_capacity_liters: 50,
        fuel_consumption_per_hour: 2.5,
        runtime_hours_full_tank: 20,
        noise_level_db: 75,
        weight_kg: 150,
        dimensions: { length_cm: 100, width_cm: 60, height_cm: 80 },
        brand: "Sarvadnya",
        model_number: "2024-V1",
        year_of_manufacture: 2024,
        images: [],
        total_reviews: 12,
        minimum_rental_hours: 4,
        max_advance_booking_days: 30,
        pricing: [
          {
            rate_type: "daily",
            rate_amount: mockProd.daily_rate || "0",
            shift_rate: mockProd.shift_rate,
            shift_duration_hours: 8,
            transport_base_cost: "500",
            fuel_cost_per_shift: "1000",
            standby_cost: "200",
            operator_cost_per_shift: "500",
            security_deposit: mockProd.security_deposit || "0",
            bulk_discount_percentage: "10",
            bulk_discount_min_dates: 7,
          }
        ],
        specifications: [],
        features: [],
        meta_title: mockProd.name,
        meta_description: mockProd.name,
      } as ProductDetailResponse
    };
  }
}

/**
 * Get featured products (no auth required)
 */
export async function getFeaturedProducts(): Promise<
  BackendResponse<PublicProduct[]>
> {
  try {
    const url = `${BACKEND_URL}/api/products/featured`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch featured products: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable, returning mock featured products:", error);
    return {
      success: true,
      message: "Mock data returned",
      data: MOCK_PRODUCTS.filter(p => p.is_featured)
    };
  }
}

