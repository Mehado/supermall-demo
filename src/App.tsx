import { useState, useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { Navbar, type Page } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { HomePage } from "@/pages/HomePage";
import { FoodPage, MerchandisePage } from "@/pages/CategoryPages";

function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar currentPage={page} onNavigate={setPage} />
        <main className="flex-1">
          {page === "home" && <HomePage onNavigate={setPage} />}
          {page === "food" && <FoodPage />}
          {page === "merchandise" && <MerchandisePage />}
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
