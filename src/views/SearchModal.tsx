import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useShop();
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim() === ''
    ? []
    : PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-surface rounded-2xl shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-surface-container flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar joyas, collares, aretes, bolsos..."
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-secondary focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-secondary hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold text-primary px-2 py-1 rounded-md hover:bg-surface-container"
          >
            Cerrar
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 flex flex-col gap-2 divide-y divide-surface-container/50">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-secondary">
              Escribe algo como "Collar", "Oro", "Bolso" o "Aretes" para buscar.
            </div>
          ) : results.length > 0 ? (
            results.map(prod => (
              <div
                key={prod.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  navigateTo('producto', prod.id);
                }}
                className="pt-2 first:pt-0 flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
              >
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="w-12 h-14 rounded-lg object-cover bg-surface-container shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                    {prod.categoryLabel}
                  </span>
                  <h4 className="text-xs font-semibold text-on-surface truncate">{prod.title}</h4>
                  <p className="text-[11px] text-secondary truncate">{prod.subtitle}</p>
                </div>
                <span className="text-xs font-bold text-on-surface">${prod.price.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-secondary">
              No se encontraron piezas para "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
