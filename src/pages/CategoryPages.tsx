import { Apple, ShoppingBag } from "lucide-react";
import { CategoryPage } from "@/pages/CategoryPage";

export function FoodPage() {
  return (
    <CategoryPage
      category="food"
      title="Fresh Food"
      subtitle="Farm-fresh produce, bakery items, and everyday essentials"
      icon={Apple}
      accent="emerald"
      gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
    />
  );
}

export function MerchandisePage() {
  return (
    <CategoryPage
      category="merchandise"
      title="General Merchandise"
      subtitle="Kitchenware, home goods, and everyday accessories"
      icon={ShoppingBag}
      accent="gray"
      gradient="bg-gradient-to-br from-gray-800 to-gray-950"
    />
  );
}
