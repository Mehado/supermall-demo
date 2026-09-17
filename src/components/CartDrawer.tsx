import { useEffect, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shipping = useMemo(() => (totalPrice > 50 || totalPrice === 0 ? 0 : 4.99), [totalPrice]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">
              Cart {totalItems > 0 && `(${totalItems})`}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart className="h-10 w-10 text-gray-300" />
            </div>
            <p className="text-gray-500">Your cart is empty</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-1 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {totalPrice < 50 && totalPrice > 0 && (
                  <p className="text-xs text-amber-600">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>${(totalPrice + shipping).toFixed(2)}</span>
                </div>
              </div>
              <button className="mt-4 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:scale-[0.98]">
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="mt-2 w-full rounded-xl py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-700"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
