"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getPublicProducts,
  GetPublicProductsParams,
  PublicProduct,
} from "@/lib/api/products";

// =============================================================================
// TYPES
// =============================================================================

interface UseProductsState {
  products: PublicProduct[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
}

interface UseProductsReturn extends UseProductsState {
  refetch: (params?: GetPublicProductsParams) => Promise<void>;
  loadMore: () => Promise<void>;
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook to fetch public products from backend API
 */
export function useProducts(
  initialParams?: GetPublicProductsParams
): UseProductsReturn {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    isLoading: true,
    error: null,
    pagination: null,
  });

  const [currentParams, setCurrentParams] = useState<
    GetPublicProductsParams | undefined
  >(initialParams);

  const fetchProducts = useCallback(
    async (params?: GetPublicProductsParams, append = false) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await getPublicProducts(params);

        if (response.success) {
          setState((prev) => ({
            products: append
              ? [...prev.products, ...response.data]
              : response.data,
            isLoading: false,
            error: null,
            pagination: response.pagination,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: response.message || "Failed to fetch products",
          }));
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch products";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      }
    },
    []
  );

  // Initial fetch
  useEffect(() => {
    fetchProducts(currentParams);
  }, [fetchProducts, currentParams]);

  const refetch = useCallback(
    async (params?: GetPublicProductsParams) => {
      if (params) {
        setCurrentParams(params);
      }
      await fetchProducts(params || currentParams);
    },
    [fetchProducts, currentParams]
  );

  const loadMore = useCallback(async () => {
    if (!state.pagination?.hasNext) return;

    const nextPage = (state.pagination?.page || 1) + 1;
    await fetchProducts({ ...currentParams, page: nextPage }, true);
  }, [state.pagination, currentParams, fetchProducts]);

  return {
    ...state,
    refetch,
    loadMore,
  };
}
