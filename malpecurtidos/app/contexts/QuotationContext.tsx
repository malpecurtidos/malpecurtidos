import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product, ProductVariant } from "../data/productsData";

export interface QuotationItem {
  productId: string;
  variantId: string;
  thickness: string;
  notes?: string;
  // Denormalized data for display
  productName: string;
  productImage: string;
  variantName: string;
  sku: string;
}

interface QuotationContextType {
  items: QuotationItem[];
  addToQuotation: (item: QuotationItem) => void;
  removeFromQuotation: (productId: string, variantId: string) => void;
  clearQuotation: () => void;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const QuotationContext = createContext<QuotationContextType | undefined>(undefined);

const STORAGE_KEY = "malpe_quotation_cart";

export function QuotationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);

  // Load from localStorage on mount (client-only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const loadedItems = JSON.parse(stored) as QuotationItem[];
        // Don't clobber user interactions that could have happened before hydration finishes.
        setItems((prevItems) => (prevItems.length > 0 ? prevItems : loadedItems));
      }
    } catch (error) {
      console.error("Failed to load quotation cart from storage:", error);
    } finally {
      setIsStorageHydrated(true);
    }
  }, []);

  // Save to localStorage whenever items change after hydration is complete.
  useEffect(() => {
    if (typeof window === "undefined" || !isStorageHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save quotation cart to storage:", error);
    }
  }, [items, isStorageHydrated]);

  const addToQuotation = (newItem: QuotationItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId &&
          item.thickness === newItem.thickness
      );

      if (existingItemIndex > -1) {
        return prevItems; // Already in cart, do nothing special as we don't track quantity
      }

      return [...prevItems, newItem];
    });
    setIsOpen(true);
  };

  const removeFromQuotation = (productId: string, variantId: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    );
  };


  const clearQuotation = () => {
    setItems([]);
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear quotation cart from storage:", error);
    }
  };

  const totalItems = items.length;

  return (
    <QuotationContext.Provider
      value={{
        items,
        addToQuotation,
        removeFromQuotation,
        clearQuotation,
        totalItems,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
}

export function useQuotation() {
  const context = useContext(QuotationContext);
  if (context === undefined) {
    throw new Error("useQuotation must be used within a QuotationProvider");
  }
  return context;
}

