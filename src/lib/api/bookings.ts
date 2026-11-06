import { createClient } from "@/lib/supabase/client";
import type {
  Booking,
  BookingItem,
  ApiResponse,
  PaginatedResponse,
} from "./types";

/**
 * Booking API Functions
 *
 * Query functions for bookings and booking items.
 */

/**
 * Get user's bookings with pagination
 */
export async function getUserBookings(
  userId: string,
  options?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }
): Promise<ApiResponse<PaginatedResponse<Booking>>> {
  const supabase = createClient();
  const page = options?.page || 1;
  const pageSize = options?.pageSize || 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("bookings")
    .select("*, booking_items(*)", { count: "exact" })
    .eq("customer_id", userId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (options?.status) {
    query = query.eq("booking_status", options.status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching user bookings:", error);
    return { data: null, error: error.message };
  }

  // Transform data to include items
  const bookings = (data || []).map((booking: any) => ({
    ...booking,
    items: booking.booking_items || [],
  })) as Booking[];

  return {
    data: {
      data: bookings,
      count: count || 0,
      page,
      pageSize,
      hasMore: (count || 0) > to + 1,
    },
    error: null,
  };
}

/**
 * Get single booking by ID with full details
 */
export async function getBookingById(
  id: string
): Promise<ApiResponse<Booking>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*, booking_items(*)")
    .eq("id", id)
    .eq("is_deleted", false)
    .single();

  if (error) {
    console.error("Error fetching booking:", error);
    return { data: null, error: error.message };
  }

  const booking = {
    ...data,
    items: data.booking_items || [],
  } as Booking;

  return { data: booking, error: null };
}

/**
 * Get booking items for a booking
 */
export async function getBookingItems(
  bookingId: string
): Promise<ApiResponse<BookingItem[]>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("booking_items")
    .select("*")
    .eq("booking_id", bookingId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching booking items:", error);
    return { data: null, error: error.message };
  }

  return { data: data as BookingItem[], error: null };
}

/**
 * Get booking statistics for user dashboard
 */
export async function getUserBookingStats(userId: string): Promise<
  ApiResponse<{
    total: number;
    active: number;
    completed: number;
    pending: number;
  }>
> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("booking_status")
    .eq("customer_id", userId)
    .eq("is_deleted", false);

  if (error) {
    console.error("Error fetching booking stats:", error);
    return { data: null, error: error.message };
  }

  const stats = {
    total: data.length,
    active: data.filter((b: any) => b.booking_status === "in_progress").length,
    completed: data.filter((b: any) => b.booking_status === "completed").length,
    pending: data.filter(
      (b: any) => b.booking_status === "pending" || b.booking_status === "confirmed"
    ).length,
  };

  return { data: stats, error: null };
}
