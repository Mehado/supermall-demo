import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/data/products";

interface UIContextValue {
  selectedProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openProduct = useCallback((product: Product) => setSelectedProduct(product), []);
  const closeProduct = useCallback(() => setSelectedProduct(null), []);

  return (
    <UIContext.Provider
      value={{ selectedProduct, openProduct, closeProduct, searchQuery, setSearchQuery }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
