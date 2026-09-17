import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Store, Search, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { products } from "@/data/products";

export type Page = "home" | "food" | "merchandise";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { totalItems, setIsOpen } = useCart();
  const { searchQuery, setSearchQuery, openProduct } = useUI();
  const [searchOpen, setSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = localQuery.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(localQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(localQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const handleSearchFocus = () => {
    setSearchOpen(true);
    setLocalQuery(searchQuery);
  };

  const handleResultClick = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      openProduct(product);
      setSearchOpen(false);
    }
  };

  const navItems: { key: Page; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "food", label: "Food" },
    { key: "merchandise", label: "Merchandise" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate("home")}
          className="flex flex-shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Store className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            ShopMart
          </span>
        </button>

        {/* Search */}
        <div ref={searchRef} className="relative hidden flex-1 max-w-md sm:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onFocus={handleSearchFocus}
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-gray-400 focus:bg-white"
            />
            {localQuery && (
              <button
                onClick={() => {
                  setLocalQuery("");
                  setSearchQuery("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {searchOpen && localQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
              {searchResults.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-gray-400">
                  No products found
                </p>
              ) : (
                <ul className="max-h-80 overflow-y-auto py-1">
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <button
                        onClick={() => handleResultClick(product.id)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-50"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">
                            {product.category}
                          </p>
                        </div>
                        <span className="flex-shrink-0 text-sm font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <nav className="hidden flex-shrink-0 items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                currentPage === item.key
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.label}
              {currentPage === item.key && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gray-900" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 sm:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-95"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-white shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="border-t border-gray-100 px-4 py-2 sm:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              autoFocus
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-gray-400 focus:bg-white"
            />
          </div>
          {localQuery.trim() && (
            <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white">
              {searchResults.length === 0 ? (
                <p className="px-4 py-4 text-center text-sm text-gray-400">
                  No products found
                </p>
              ) : (
                <ul className="max-h-64 overflow-y-auto py-1">
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <button
                        onClick={() => handleResultClick(product.id)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                        />
                        <p className="truncate text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        <span className="ml-auto flex-shrink-0 text-sm font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      <nav className="flex items-center justify-center gap-1 border-t border-gray-100 py-2 lg:hidden">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              currentPage === item.key
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
