"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";
import { getUserBookings, getUserBookingStats } from "@/lib/api/bookings";
import type { Booking, PaginatedResponse } from "@/lib/api/types";

/**
 * useBookings Hook
 *
 * Fetches and manages the current user's bookings with pagination.
 */
export function useBookings(options?: { pageSize?: number; status?: string }) {
  const { userProfile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const pageSize = options?.pageSize || 10;

  // Fetch bookings
  const fetchBookings = useCallback(
    async (pageNum: number = 1, append: boolean = false) => {
      if (!userProfile?.id) {
        setBookings([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await getUserBookings(
        userProfile.id,
        {
          page: pageNum,
          pageSize,
          status: options?.status,
        }
      );

      if (fetchError) {
        setError(fetchError);
      } else if (data) {
        setBookings(append ? [...bookings, ...data.data] : data.data);
        setHasMore(data.hasMore);
        setTotal(data.count);
        setPage(pageNum);
      }

      setLoading(false);
    },
    [userProfile?.id, pageSize, options?.status, bookings]
  );

  // Load more bookings
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchBookings(page + 1, true);
    }
  }, [hasMore, loading, page, fetchBookings]);

  // Refetch from start
  const refetch = useCallback(() => {
    fetchBookings(1, false);
  }, [fetchBookings]);

  // Fetch on mount and when user changes
  useEffect(() => {
    if (userProfile?.id) {
      fetchBookings(1, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile?.id, options?.status]);

  return {
    bookings,
    loading,
    error,
    page,
    hasMore,
    total,
    loadMore,
    refetch,
  };
}

/**
 * useBookingStats Hook
 *
 * Fetches booking statistics for dashboard.
 */
export function useBookingStats() {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!userProfile?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: fetchError } = await getUserBookingStats(
      userProfile.id
    );

    if (fetchError) {
      setError(fetchError);
    } else if (data) {
      setStats(data);
    }

    setLoading(false);
  }, [userProfile?.id]);

  useEffect(() => {
    if (userProfile?.id) {
      fetchStats();
    }
  }, [userProfile?.id, fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
