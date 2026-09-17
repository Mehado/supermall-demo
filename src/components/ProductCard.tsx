import { useState } from "react";
import { ShoppingCart, Plus, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gray-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
            {product.tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>

        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.286 3.957c.3.922-.755 1.584-1.448.853l-3.368-2.447a1 1 0 00-1.176 0l-3.368 2.447c-.783.57-1.838-.193-1.448-.853l1.286-3.957a1 1 0 00-.363-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-1.5 text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              added
                ? "bg-green-500 text-white"
                : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <ShoppingCart className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
