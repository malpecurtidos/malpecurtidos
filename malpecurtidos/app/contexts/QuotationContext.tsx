import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product, ProductVariant } from "../data/productsData";

export interface QuotationItem {
  productId: string;
  variantId: string;
  thickness: string;
  size: string;
  quantity: number;
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
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
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

  // Load from sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load quotation cart from storage:", error);
    }
  }, []);

  // Save to sessionStorage whenever items change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save quotation cart to storage:", error);
    }
  }, [items]);

  const addToQuotation = (newItem: QuotationItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId &&
          item.thickness === newItem.thickness &&
          item.size === newItem.size
      );

      if (existingItemIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
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

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuotation(productId, variantId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearQuotation = () => {
    setItems([]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <QuotationContext.Provider
      value={{
        items,
        addToQuotation,
        removeFromQuotation,
        updateQuantity,
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
