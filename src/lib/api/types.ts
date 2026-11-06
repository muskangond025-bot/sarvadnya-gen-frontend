/**
 * TypeScript Types for Supabase Database
 *
 * These types are based on the database schema and designed to be flexible.
 * When the schema changes, update these types and TypeScript will flag breaking changes.
 */

// =============================================================================
// ENUMS
// =============================================================================

export type UserType = "individual" | "business";
export type Gender = "male" | "female" | "other" | "prefer_not_to_say";
export type AddressType = "shipping" | "billing" | "site";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "refunded";
export type PaymentStatus =
  | "pending"
  | "partial"
  | "paid"
  | "refunded"
  | "failed";
export type BookingItemStatus =
  | "pending"
  | "confirmed"
  | "delivered"
  | "in_use"
  | "returned"
  | "cancelled";
export type DeliveryType = "delivery" | "pickup" | "both";

// =============================================================================
// USER
// =============================================================================

export interface User {
  id: string;
  auth_id: string | null;
  user_type: UserType;
  name: string;
  email: string;
  email_verified: boolean;
  email_verified_at: string | null;
  phone_number: string | null;
  phone_country_code: string | null;
  phone_verified: boolean;
  phone_verified_at: string | null;
  profile_image_url: string | null;
  date_of_birth: string | null;
  gender: Gender | null;
  preferred_language: string;
  preferred_currency: string;
  timezone: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export type UpdateUserInput = Partial<
  Pick<
    User,
    | "name"
    | "phone_number"
    | "phone_country_code"
    | "date_of_birth"
    | "gender"
    | "preferred_language"
    | "preferred_currency"
    | "timezone"
    | "profile_image_url"
  >
>;

// =============================================================================
// USER ADDRESS
// =============================================================================

export interface UserAddress {
  id: string;
  user_id: string;
  address_type: AddressType;
  is_default: boolean;
  recipient_name: string;
  company_name: string | null;
  phone_number: string | null;
  phone_country_code: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  country_code: string;
  latitude: number | null;
  longitude: number | null;
  delivery_instructions: string | null;
  is_international: boolean;
  tax_id: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export type CreateAddressInput = Omit<
  UserAddress,
  "id" | "created_at" | "updated_at" | "is_deleted"
>;

export type UpdateAddressInput = Partial<
  Omit<
    UserAddress,
    "id" | "user_id" | "created_at" | "updated_at" | "is_deleted"
  >
>;

// =============================================================================
// BOOKING
// =============================================================================

export interface Booking {
  id: string;
  booking_number: string;
  customer_id: string | null;
  customer_name_snapshot: string | null;
  customer_email_snapshot: string | null;
  customer_phone_snapshot: string | null;
  rental_start_date: string;
  rental_end_date: string;
  expected_duration_days: number;
  actual_return_date: string | null;
  delivery_type: DeliveryType;
  delivery_address_snapshot: string | null;
  delivery_date: string | null;
  delivery_time_slot: string | null;
  delivery_instructions: string | null;
  pickup_date: string | null;
  pickup_time_slot: string | null;
  booking_status: BookingStatus;
  payment_status: PaymentStatus;
  currency: string;
  subtotal: number;
  delivery_charges: number;
  security_deposit: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  due_amount: number;
  customer_notes: string | null;
  admin_notes: string | null;
  is_extended: boolean;
  extension_count: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  // Joined data
  items?: BookingItem[];
}

// =============================================================================
// BOOKING ITEM
// =============================================================================

export interface BookingItem {
  id: string;
  booking_id: string;
  product_id: string | null;
  product_name_snapshot: string;
  product_asset_code_snapshot: string;
  product_kva_snapshot: number | null;
  number_of_shifts: number;
  shift_start_time: string | null;
  shift_end_time: string | null;
  shift_duration_hours: number | null;
  delivery_location: string | null;
  rate_type: string;
  unit_rate: number;
  quantity_units: number;
  line_total: number;
  security_deposit: number;
  has_standby_generator: boolean;
  include_transport: boolean;
  include_fuel: boolean;
  include_operator: boolean;
  transport_cost: number;
  fuel_cost: number;
  operator_cost: number;
  item_status: BookingItemStatus;
  delivered_at: string | null;
  returned_at: string | null;
  condition_on_delivery: string | null;
  condition_on_return: string | null;
  damage_charges: number;
  damage_notes: string | null;
  item_notes: string | null;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
