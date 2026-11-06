export interface Generator {
  id: string;
  asset_code: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  status: 'available' | 'rented' | 'maintenance' | 'blocked' | 'retired';
  fuel_type: string;
  
  // Brand
  brand: string;
  brand_logo?: string;
  model_number: string;
  year_of_manufacture: string;
  
  // Power
  power_output_kva: string;
  power_output_kw: string;
  phase: string;
  voltage: string;
  frequency_hz: string;
  
  // Fuel & Runtime
  fuel_tank_capacity_liters: string;
  fuel_consumption_per_hour: string;
  runtime_hours_full_tank: string;
  
  // Physical
  noise_level_db: string;
  weight_kg: string;
  dimensions_cm: {
    length: number;
    width: number;
    height: number;
  };
  
  // Pricing
  hourly_rate: string;
  daily_rate: string;
  weekly_rate: string;
  monthly_rate: string;
  security_deposit: string;
  currency: string;
  transport_extra?: boolean;
  
  // Media
  primary_image_url: string | null;
  additional_images: string[];
  manual_pdf_url?: string | null;
  video_url?: string | null;
  
  // Features & Specs
  features: string[];
  highlights: string[];
  specs: Record<string, string>;
  
  // New operational info
  suitable_for: string[];
  recommended_industries: string[];
  included_services: string[];
  
  // SEO
  meta_title: string | null;
  meta_description: string | null;
}
