"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

interface PortalContextType {
  customerId: string;
  setCustomerId: (id: string) => void;
  clearCustomer: () => void;
  role: string;
  isAdmin: boolean;
  isViewingCustomer: boolean;
}

const PortalContext = createContext<PortalContextType | null>(null);

const STORAGE_KEY = "claudje-admin-customer";

export function PortalProvider({
  children,
  defaultCustomerId,
  role,
}: {
  children: React.ReactNode;
  defaultCustomerId: string;
  role: string;
}) {
  const isAdmin = role === "admin";

  const [customerId, setCustomerIdRaw] = useState(defaultCustomerId);

  useEffect(() => {
    if (isAdmin) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored !== "all") setCustomerIdRaw(stored);
    }
  }, [isAdmin]);

  const setCustomerId = useCallback(
    (id: string) => {
      setCustomerIdRaw(id);
      if (isAdmin && typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, id);
      }
    },
    [isAdmin]
  );

  const clearCustomer = useCallback(() => {
    setCustomerIdRaw(defaultCustomerId);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [defaultCustomerId]);

  const isViewingCustomer = isAdmin && customerId !== "all" && customerId !== "";

  return (
    <PortalContext.Provider
      value={{ customerId, setCustomerId, clearCustomer, role, isAdmin, isViewingCustomer }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortal must be used within PortalProvider");
  }
  return context;
}
