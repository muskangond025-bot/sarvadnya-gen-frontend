"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";
import {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/api/addresses";
import type {
  UserAddress,
  CreateAddressInput,
  UpdateAddressInput,
} from "@/lib/api/types";

/**
 * useAddresses Hook
 *
 * CRUD operations for user addresses.
 */
export function useAddresses() {
  const { userProfile } = useAuth();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch addresses
  const fetchAddresses = useCallback(async () => {
    if (!userProfile?.id) {
      setAddresses([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await getUserAddresses(userProfile.id);

    if (fetchError) {
      setError(fetchError);
    } else {
      setAddresses(data || []);
    }

    setLoading(false);
  }, [userProfile?.id]);

  // Create address
  const create = useCallback(
    async (
      data: Omit<CreateAddressInput, "user_id">
    ): Promise<{ success: boolean; error?: string; address?: UserAddress }> => {
      if (!userProfile?.id) {
        return { success: false, error: "No user logged in" };
      }

      setError(null);

      const { data: newAddress, error: createError } = await createAddress({
        ...data,
        user_id: userProfile.id,
      });

      if (createError) {
        setError(createError);
        return { success: false, error: createError };
      }

      if (newAddress) {
        // If new address is default, update others
        if (newAddress.is_default) {
          setAddresses((prev) =>
            prev.map((addr) =>
              addr.address_type === newAddress.address_type
                ? { ...addr, is_default: false }
                : addr
            )
          );
        }
        setAddresses((prev) => [newAddress, ...prev]);
      }

      return { success: true, address: newAddress || undefined };
    },
    [userProfile?.id]
  );

  // Update address
  const update = useCallback(
    async (
      id: string,
      data: UpdateAddressInput
    ): Promise<{ success: boolean; error?: string }> => {
      if (!userProfile?.id) {
        return { success: false, error: "No user logged in" };
      }

      setError(null);

      const { data: updatedAddress, error: updateError } = await updateAddress(
        id,
        userProfile.id,
        data
      );

      if (updateError) {
        setError(updateError);
        return { success: false, error: updateError };
      }

      if (updatedAddress) {
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === id ? updatedAddress : addr))
        );
      }

      return { success: true };
    },
    [userProfile?.id]
  );

  // Delete address
  const remove = useCallback(
    async (id: string): Promise<{ success: boolean; error?: string }> => {
      if (!userProfile?.id) {
        return { success: false, error: "No user logged in" };
      }

      setError(null);

      const { data: success, error: deleteError } = await deleteAddress(
        id,
        userProfile.id
      );

      if (deleteError) {
        setError(deleteError);
        return { success: false, error: deleteError };
      }

      if (success) {
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      }

      return { success: true };
    },
    [userProfile?.id]
  );

  // Set default address
  const setDefault = useCallback(
    async (
      id: string,
      addressType: string
    ): Promise<{ success: boolean; error?: string }> => {
      if (!userProfile?.id) {
        return { success: false, error: "No user logged in" };
      }

      setError(null);

      const { data: success, error: setDefaultError } = await setDefaultAddress(
        id,
        userProfile.id,
        addressType
      );

      if (setDefaultError) {
        setError(setDefaultError);
        return { success: false, error: setDefaultError };
      }

      if (success) {
        setAddresses((prev) =>
          prev.map((addr) => ({
            ...addr,
            is_default:
              addr.address_type === addressType
                ? addr.id === id
                : addr.is_default,
          }))
        );
      }

      return { success: true };
    },
    [userProfile?.id]
  );

  // Fetch on mount
  useEffect(() => {
    if (userProfile?.id) {
      fetchAddresses();
    }
  }, [userProfile?.id, fetchAddresses]);

  return {
    addresses,
    loading,
    error,
    create,
    update,
    remove,
    setDefault,
    refetch: fetchAddresses,
  };
}
