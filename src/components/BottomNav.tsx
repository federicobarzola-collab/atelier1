import React from 'react';
import { useShop, ViewType } from '../context/ShopContext';

export const BottomNav: React.FC = () => {
  const { currentView, navigateTo, cartCount } = useShop();

  const navItems: { id: ViewType; label: string; icon: string; badge?: number }[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'catalogo', label: 'Catálogo', icon: 'grid_view' },
    { id: 'favoritos', label: 'Favoritos', icon: 'favorite' },
    { id: 'bolsa', label: 'Bolsa', icon: 'shopping_bag', badge: cartCount }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t border-surface-container shadow-[0_-2px_16px_rgba(74,62,61,0.06)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map(item => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-full transition-all relative ${
                isActive
                  ? 'text-primary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive && item.id === 'favoritos' ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-bold shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-normal leading-none font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
