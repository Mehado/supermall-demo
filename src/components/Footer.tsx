import { Store, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
                <Store className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-gray-900">ShopMart</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Your one-stop shop for fresh food and quality merchandise.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li className="cursor-pointer transition-colors hover:text-gray-900">Food</li>
              <li className="cursor-pointer transition-colors hover:text-gray-900">Merchandise</li>
              <li className="cursor-pointer transition-colors hover:text-gray-900">New Arrivals</li>
              <li className="cursor-pointer transition-colors hover:text-gray-900">Best Sellers</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li className="cursor-pointer transition-colors hover:text-gray-900">Help Center</li>
              <li className="cursor-pointer transition-colors hover:text-gray-900">Returns</li>
              <li className="cursor-pointer transition-colors hover:text-gray-900">Shipping</li>
              <li className="cursor-pointer transition-colors hover:text-gray-900">Track Order</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                hello@shopmart.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                123 Market Street
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ShopMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
