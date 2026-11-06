import { createClient } from "@/lib/supabase/client";
import type { User, UpdateUserInput, ApiResponse } from "./types";

/**
 * User API Functions
 *
 * CRUD operations for the users table.
 */

/**
 * Get user profile by auth_id (Supabase Auth ID)
 */
export async function getUserByAuthId(
  authId: string
): Promise<ApiResponse<User>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", authId)
    .eq("is_deleted", false)
    .single();

  if (error) {
    console.error("Error fetching user by auth_id:", error);
    return { data: null, error: error.message };
  }

  return { data: data as User, error: null };
}

/**
 * Get user profile by user ID
 */
export async function getUserById(id: string): Promise<ApiResponse<User>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .eq("is_deleted", false)
    .single();

  if (error) {
    console.error("Error fetching user by id:", error);
    return { data: null, error: error.message };
  }

  return { data: data as User, error: null };
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  id: string,
  data: UpdateUserInput
): Promise<ApiResponse<User>> {
  const supabase = createClient();

  const { data: updatedUser, error } = await supabase
    .from("users")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("is_deleted", false)
    .select()
    .single();

  if (error) {
    console.error("Error updating user profile:", error);
    return { data: null, error: error.message };
  }

  return { data: updatedUser as User, error: null };
}

/**
 * Soft delete user account
 */
export async function deleteUserAccount(
  id: string,
  deletedBy?: string
): Promise<ApiResponse<boolean>> {
  const supabase = createClient();

  const { error } = await supabase
    .from("users")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
      deleted_by: deletedBy || id,
    })
    .eq("id", id);

  if (error) {
    console.error("Error deleting user account:", error);
    return { data: false, error: error.message };
  }

  return { data: true, error: null };
}
