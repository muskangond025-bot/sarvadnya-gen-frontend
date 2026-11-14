"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export interface QuoteItem {
  id: string;
  name: string;
  brand: string;
  kva: string;
  dailyRate: number;
  fuelConsumption?: string;
  noiseLevel?: string;
  phase?: string;
  image?: string;
  days: number;
  quantity: number;
}

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: {
    id: string;
    name: string;
    brand?: string;
    power_output_kva?: string;
    kva?: string | number;
    daily_rate?: string | number;
    fuel_consumption_per_hour?: string;
    noise_level_db?: string;
    phase?: string;
    primary_image_url?: string | null;
  }) => void;
  removeItem: (id: string) => void;
  updateDays: (id: string, days: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearQuote: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  totalItems: number;
  totalDailyEstimate: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = "sarvadnya_fleet_quote";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore from localStorage upon client hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore storage read errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write errors
    }
  }, [items, isHydrated]);

  const addItem = (gen: {
    id: string;
    name: string;
    brand?: string;
    power_output_kva?: string;
    kva?: string | number;
    daily_rate?: string | number;
    fuel_consumption_per_hour?: string;
    noise_level_db?: string;
    phase?: string;
    primary_image_url?: string | null;
  }) => {
    const kvaStr = String(gen.power_output_kva || gen.kva || "").replace(/[^0-9.]/g, "");
    const rateNum = Number(String(gen.daily_rate || "0").replace(/[^0-9.]/g, "")) || 0;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === gen.id);
      if (existingIndex > -1) {
        // Increment quantity if already in quote
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      // Add new item
      const newItem: QuoteItem = {
        id: gen.id,
        name: gen.name || "Silent DG Generator",
        brand: gen.brand || "Cummins",
        kva: kvaStr ? `${kvaStr} kVA` : "Silent DG",
        dailyRate: rateNum,
        fuelConsumption: gen.fuel_consumption_per_hour,
        noiseLevel: gen.noise_level_db,
        phase: gen.phase,
        image: gen.primary_image_url || "/placeholder-gen.jpg",
        days: 1,
        quantity: 1,
      };
      return [...prev, newItem];
    });

    // Auto-open slide-over drawer
    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateDays = (id: string, days: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, days: Math.max(1, Math.min(90, days)) } : item
      )
    );
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(20, quantity)) }
          : item
      )
    );
  };

  const clearQuote = () => {
    setItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalDailyEstimate = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.dailyRate * item.days * item.quantity,
        0
      ),
    [items]
  );

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateDays,
        updateQuantity,
        clearQuote,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        totalItems,
        totalDailyEstimate,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
}
