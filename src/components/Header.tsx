import React from 'react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const { currentView, navigateTo, cartCount, setIsProfileOpen, setIsSearchOpen } = useShop();

  const isDetailPage = currentView === 'producto';
  const isCheckoutPage = currentView === 'checkout';

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(74,62,61,0.04)] border-b border-surface-container/60">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Left: Back button if in detail/checkout, else brand logo */}
        <div className="flex items-center gap-2 min-w-0">
          {isDetailPage || isCheckoutPage ? (
            <button
              onClick={() => navigateTo(isCheckoutPage ? 'bolsa' : 'inicio')}
              className="w-10 h-10 -ml-1 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-95"
              aria-label="Volver atrás"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
          ) : null}

          <button
            onClick={() => navigateTo('inicio')}
            className="flex items-center gap-2 text-left group"
            aria-label="Ir a página de inicio"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1VR4ah6eaVZ2LE2wG8uKQUbL1GddOOThYIpIv0zMWSsqsraxp1gBAZZHT9qYusGUIxVyUbyGB2QRdO5Sd_NAewVKfRpN6cTvQdO8noiaSSuW2TuuRZZRhn92nSUe-ZZF8IeoJUlNtig206-VLsdB-BoSUxQlM-KGohzQ05p7EuMa5w-hZcYIMXPsyrfGPgu5RwW2h2VmVJnhIvEk2Jl6_n6MMzE5CEvxS-aFJlIAbogpJ85NkjeY3QXNFTg"
              alt="AURA Atelier Logo"
              className="h-7 md:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-headline font-semibold text-base md:text-lg tracking-tight text-on-surface leading-none">
                AURA
              </span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest leading-none mt-0.5 font-medium">
                {isDetailPage ? 'Detalle' : isCheckoutPage ? 'Proceso De Pago' : 'Atelier'}
              </span>
            </div>
          </button>
        </div>

        {/* Right Action Icons: Search, Bag with badge, Profile avatar */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-95"
            aria-label="Buscar en catálogo"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={() => navigateTo('bolsa')}
            className="w-10 h-10 relative flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-95"
            aria-label="Ver bolsa de compras"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold leading-none shadow-[0_2px_6px_rgba(148,69,44,0.35)] animate-in fade-in zoom-in duration-200">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-95 ml-1"
            aria-label="Abrir perfil de usuario"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfdFgngY2D4t_Bn8l8lgh32PE7j9HzuC_Aolf0wT3Q2B5Lw1vKpALVioXrxSqomkZYyvuLq8aO6V91E7464pyrzKARDgh5HyEgMlj14R5x_A3zl0WK80V_f4I1B6iGBztzanQLV21oZgw8FVs1FGam_KozM32fASeHYukIqOfVLgfJ7ocFUgvXZJfZ_tz8x5xdlVW5l1noozz9SB7aSQ60p4kVszz5A18zVBbkGYJJ5H9fKOSBOccRmA"
              alt="Perfil de usuario"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover ring-1 ring-primary/20 shadow-sm"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
