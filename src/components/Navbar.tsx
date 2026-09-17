import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "@/context/CartContext";

export type Page = "home" | "food" | "merchandise";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { totalItems, setIsOpen } = useCart();

  const navItems: { key: Page; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "food", label: "Food" },
    { key: "merchandise", label: "Merchandise" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Store className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            ShopMart
          </span>
        </button>

        <nav className="hidden items-center gap-1 sm:flex">
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

      <nav className="flex items-center justify-center gap-1 border-t border-gray-100 py-2 sm:hidden">
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
