import { Sparkles, Apple, ShoppingBag, ArrowRight, Truck, ShieldCheck, RotateCcw, Flame } from "lucide-react";
import type { Page } from "@/components/Navbar";
import { products, shuffle } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featured = shuffle(products).slice(0, 8);
  const deals = shuffle(products.filter((p) => p.originalPrice)).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
        <div className="absolute right-0 top-0 -z-0 h-full w-1/2 opacity-30">
          <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute bottom-10 right-40 h-60 w-60 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
              <Sparkles className="h-4 w-4" />
              Fresh arrivals every day
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Everything you need, <br />
              <span className="text-amber-600">all in one place.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600">
              From farm-fresh food to everyday household goods — discover quality
              products at great prices, delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("food")}
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-95"
              >
                <Apple className="h-5 w-5" />
                Shop Food
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate("merchandise")}
                className="group inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 active:scale-95"
              >
                <ShoppingBag className="h-5 w-5" />
                Shop Merchandise
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders over $50" },
            { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Fresh products, every time" },
            { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <f.icon className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-gray-500">
              A random selection from our full catalog
            </p>
          </div>
          <button
            onClick={() => onNavigate("food")}
            className="hidden items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Deals Section */}
      {deals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                <Flame className="h-7 w-7 text-red-500" />
                Hot Deals
              </h2>
              <p className="mt-1 text-gray-500">Limited-time discounts on selected items</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Category Banners */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <button
            onClick={() => onNavigate("food")}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-left transition-transform hover:scale-[1.02]"
          >
            <div className="relative z-10">
              <Apple className="h-10 w-10 text-white/90" />
              <h3 className="mt-4 text-2xl font-bold text-white">Food</h3>
              <p className="mt-1 text-white/80">
                Fresh produce, bakery items, and more
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </button>

          <button
            onClick={() => onNavigate("merchandise")}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-950 p-8 text-left transition-transform hover:scale-[1.02]"
          >
            <div className="relative z-10">
              <ShoppingBag className="h-10 w-10 text-white/90" />
              <h3 className="mt-4 text-2xl font-bold text-white">Merchandise</h3>
              <p className="mt-1 text-white/70">
                Kitchenware, home goods, and accessories
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-500/20 blur-2xl" />
          </button>
        </div>
      </section>
    </div>
  );
}
