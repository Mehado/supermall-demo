import { useState, useMemo, useCallback } from "react";
import { Shuffle, Apple, SlidersHorizontal } from "lucide-react";
import type { Category } from "@/data/products";
import { getProductsByCategory, shuffle } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface CategoryPageProps {
  category: Category;
  title: string;
  subtitle: string;
  icon: typeof Apple;
  accent: string;
  gradient: string;
}

export function CategoryPage({ category, title, subtitle, icon: Icon, accent, gradient }: CategoryPageProps) {
  const [sort, setSort] = useState<"random" | "price-low" | "price-high" | "rating">("random");
  const [seed, setSeed] = useState(0);

  const products = useMemo(() => {
    const items = getProductsByCategory(category);
    switch (sort) {
      case "price-low":
        return [...items].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...items].sort((a, b) => b.price - a.price);
      case "rating":
        return [...items].sort((a, b) => b.rating - a.rating);
      default:
        return items;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, seed]);

  const reshuffle = useCallback(() => setSeed((s) => s + 1), []);

  return (
    <div>
      {/* Banner */}
      <section className={`relative overflow-hidden ${gradient}`}>
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
              <p className="mt-1 text-white/80">{subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-16 z-20 border-b border-gray-200/80 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-gray-400"
            >
              <option value="random">Random</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <button
            onClick={reshuffle}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-95"
          >
            <Shuffle className="h-4 w-4" />
            <span className="hidden sm:inline">Shuffle</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
