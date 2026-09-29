import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { WishlistView } from './views/WishlistView';
import { SearchModal } from './views/SearchModal';
import { ProfileModal } from './views/ProfileModal';
import { ReceiptModal } from './views/ReceiptModal';

const MainContent: React.FC = () => {
  const { currentView, toast } = useShop();

  return (
    <div className="min-h-screen bg-surface flex flex-col relative text-on-surface antialiased">
      {/* Fixed Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1 pt-16 pb-8 w-full">
        {currentView === 'inicio' && <HomeView />}
        {currentView === 'catalogo' && <CatalogView />}
        {currentView === 'producto' && <ProductDetailView />}
        {currentView === 'favoritos' && <WishlistView />}
        {currentView === 'bolsa' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
      </main>

      {/* Floating Elements */}
      <FloatingWhatsApp />
      <BottomNav />

      {/* Modals & Drawers */}
      <SearchModal />
      <ProfileModal />
      <ReceiptModal />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 py-2.5 rounded-full bg-on-surface text-surface text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
            check_circle
          </span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
