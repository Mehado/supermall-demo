import { useState, useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { UIProvider, useUI } from "@/context/UIContext";
import { Navbar, type Page } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { HomePage } from "@/pages/HomePage";
import { FoodPage, MerchandisePage } from "@/pages/CategoryPages";

function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const { selectedProduct, closeProduct } = useUI();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar currentPage={page} onNavigate={setPage} />
      <main className="flex-1">
        {page === "home" && <HomePage onNavigate={setPage} />}
        {page === "food" && <FoodPage />}
        {page === "merchandise" && <MerchandisePage />}
      </main>
      <Footer />
      <CartDrawer />
      <ProductModal product={selectedProduct} onClose={closeProduct} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <UIProvider>
        <AppContent />
      </UIProvider>
    </CartProvider>
  );
}

export default App;
