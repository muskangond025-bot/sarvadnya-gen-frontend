"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { getUserByAuthId, updateUserProfile } from "@/lib/api/users";
import type { User, UpdateUserInput } from "@/lib/api/types";

/**
 * useUserProfile Hook
 *
 * Fetches and manages the current user's profile data.
 * Uses the auth context to get the current user ID.
 */
export function useUserProfile() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  // Fetch user profile
  const fetchProfile = useCallback(async (authId: string) => {
    console.log("useUserProfile: fetchProfile called for", authId);
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await getUserByAuthId(authId);
      console.log("useUserProfile: getUserByAuthId result", {
        data,
        fetchError,
      });

      if (fetchError) {
        setError(fetchError);
        setUser(null);
      } else {
        setUser(data);
      }
    } catch (err) {
      console.error("useUserProfile: unexpected error", err);
      setError("An unexpected error occurred");
      setUser(null);
    } finally {
      console.log("useUserProfile: Setting loading false");
      setLoading(false);
    }
  }, []);

  // Fetch when auth becomes ready
  useEffect(() => {
    console.log("useUserProfile: Effect running", {
      authLoading,
      authUserId: authUser?.id,
      hasFetched: hasFetched.current,
    });

    // If auth is still loading, wait
    if (authLoading) {
      console.log("useUserProfile: Auth still loading, waiting...");
      return;
    }

    // If no user, clear state
    if (!authUser?.id) {
      console.log("useUserProfile: No auth user, clearing state");
      setUser(null);
      setLoading(false);
      hasFetched.current = false;
      return;
    }

    // If we haven't fetched for this user yet, do it now
    if (!hasFetched.current) {
      console.log("useUserProfile: Triggering fetchProfile");
      hasFetched.current = true;
      fetchProfile(authUser.id);
    }
  }, [authLoading, authUser?.id, fetchProfile]);

  // Reset hasFetched when user changes
  useEffect(() => {
    hasFetched.current = false;
  }, [authUser?.id]);

  // Update user profile
  const updateProfileFn = useCallback(
    async (
      data: UpdateUserInput
    ): Promise<{ success: boolean; error?: string }> => {
      if (!user?.id) {
        return { success: false, error: "No user logged in" };
      }

      setLoading(true);
      setError(null);

      try {
        const { data: updatedUser, error: updateError } =
          await updateUserProfile(user.id, data);

        if (updateError) {
          setError(updateError);
          return { success: false, error: updateError };
        }

        setUser(updatedUser);
        return { success: true };
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  // Refresh profile
  const refreshProfile = useCallback(async () => {
    if (authUser?.id) {
      hasFetched.current = false;
      await fetchProfile(authUser.id);
    }
  }, [authUser?.id, fetchProfile]);

  // Compute the final loading state
  // We're loading if: auth is loading OR we're fetching profile OR we should fetch but haven't yet
  const isLoading =
    authLoading || loading || (!!authUser?.id && !hasFetched.current && !user);

  console.log("useUserProfile: Return values", {
    user: user?.id,
    isLoading,
    authLoading,
    internalLoading: loading,
  });

  return {
    user,
    loading: isLoading,
    error,
    updateProfile: updateProfileFn,
    refreshProfile,
    isAuthenticated: !!authUser,
  };
}
