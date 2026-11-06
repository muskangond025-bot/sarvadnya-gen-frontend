import { createClient } from "@/lib/supabase/client";
import type {
  UserAddress,
  CreateAddressInput,
  UpdateAddressInput,
  ApiResponse,
} from "./types";

/**
 * Address API Functions
 *
 * CRUD operations for user_addresses table.
 */

/**
 * Get all addresses for a user
 */
export async function getUserAddresses(
  userId: string
): Promise<ApiResponse<UserAddress[]>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_addresses")
    .select("*")
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user addresses:", error);
    return { data: null, error: error.message };
  }

  return { data: data as UserAddress[], error: null };
}

/**
 * Get single address by ID
 */
export async function getAddressById(
  id: string
): Promise<ApiResponse<UserAddress>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_addresses")
    .select("*")
    .eq("id", id)
    .eq("is_deleted", false)
    .single();

  if (error) {
    console.error("Error fetching address:", error);
    return { data: null, error: error.message };
  }

  return { data: data as UserAddress, error: null };
}

/**
 * Create a new address
 */
export async function createAddress(
  data: CreateAddressInput
): Promise<ApiResponse<UserAddress>> {
  const supabase = createClient();

  // If this is set as default, unset other defaults first
  if (data.is_default) {
    await supabase
      .from("user_addresses")
      .update({ is_default: false })
      .eq("user_id", data.user_id)
      .eq("address_type", data.address_type)
      .eq("is_deleted", false);
  }

  const { data: newAddress, error } = await supabase
    .from("user_addresses")
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("Error creating address:", error);
    return { data: null, error: error.message };
  }

  return { data: newAddress as UserAddress, error: null };
}

/**
 * Update an address
 */
export async function updateAddress(
  id: string,
  userId: string,
  data: UpdateAddressInput
): Promise<ApiResponse<UserAddress>> {
  const supabase = createClient();

  // If setting as default, unset other defaults first
  if (data.is_default) {
    const addressType = data.address_type;
    if (addressType) {
      await supabase
        .from("user_addresses")
        .update({ is_default: false })
        .eq("user_id", userId)
        .eq("address_type", addressType)
        .eq("is_deleted", false)
        .neq("id", id);
    }
  }

  const { data: updatedAddress, error } = await supabase
    .from("user_addresses")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .select()
    .single();

  if (error) {
    console.error("Error updating address:", error);
    return { data: null, error: error.message };
  }

  return { data: updatedAddress as UserAddress, error: null };
}

/**
 * Soft delete an address
 */
export async function deleteAddress(
  id: string,
  userId: string
): Promise<ApiResponse<boolean>> {
  const supabase = createClient();

  const { error } = await supabase
    .from("user_addresses")
    .update({
      is_deleted: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting address:", error);
    return { data: false, error: error.message };
  }

  return { data: true, error: null };
}

/**
 * Set an address as default
 */
export async function setDefaultAddress(
  id: string,
  userId: string,
  addressType: string
): Promise<ApiResponse<boolean>> {
  const supabase = createClient();

  // Unset all defaults for this address type
  await supabase
    .from("user_addresses")
    .update({ is_default: false })
    .eq("user_id", userId)
    .eq("address_type", addressType)
    .eq("is_deleted", false);

  // Set the new default
  const { error } = await supabase
    .from("user_addresses")
    .update({
      is_default: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Error setting default address:", error);
    return { data: false, error: error.message };
  }

  return { data: true, error: null };
}
