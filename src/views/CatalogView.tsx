import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES_META, THEMATIC_COLLECTIONS } from '../data/products';

export const CatalogView: React.FC = () => {
  const { navigateTo, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeChip, setActiveChip] = useState<string>('all');

  const chips = [
    { id: 'all', label: 'Todos (70)' },
    { id: 'bolsos', label: 'Bolsos (18)' },
    { id: 'collares', label: 'Collares (24)' },
    { id: 'cintos', label: 'Cintos (12)' },
    { id: 'pulseras', label: 'Pulseras (16)' }
  ];

  // Filtering products
  const matchingProducts = PRODUCTS.filter(p => {
    const matchesChip = activeChip === 'all' || p.category === activeChip;
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      p.title.toLowerCase().includes(query) ||
      p.subtitle.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    return matchesChip && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-12">
      {/* Search Bar & Fast Filters */}
      <section className="px-4 md:px-6 pt-3 pb-3">
        <div className="flex flex-col gap-3">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar en bolsos, collares, cintos, pulseras..."
              className="w-full h-12 pl-11 pr-11 bg-surface-container-low text-on-surface placeholder:text-secondary text-xs md:text-sm rounded-full shadow-xs focus:outline-none focus:bg-surface-container transition-all border border-surface-container/60"
            />
            {searchTerm.length > 0 && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors p-1"
                aria-label="Limpiar búsqueda"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            {chips.map(chip => {
              const isSelected = activeChip === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setActiveChip(chip.id)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-on-surface text-surface font-semibold shadow-xs'
                      : 'bg-secondary-container text-on-secondary-container hover:bg-surface-variant font-medium'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* If filtering or searching, show the product results first */}
      {(searchTerm.trim() !== '' || activeChip !== 'all') && (
        <section className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline text-lg md:text-xl text-on-surface">
              Resultados ({matchingProducts.length})
            </h2>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveChip('all');
              }}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Restablecer filtros
            </button>
          </div>

          {matchingProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {matchingProducts.map(product => {
                const favorited = isWishlisted(product.id);
                return (
                  <article
                    key={product.id}
                    className="flex flex-col rounded-2xl bg-surface-container-lowest p-2 shadow-xs transition-all duration-300 hover:shadow-md border border-surface-container/40 group"
                  >
                    <div
                      onClick={() => navigateTo('producto', product.id)}
                      className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low cursor-pointer"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${favorited ? 'text-primary' : 'text-on-surface'}`}
                          style={favorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                          favorite
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-col pt-2 px-1 pb-1 flex-1 justify-between">
                      <div
                        onClick={() => navigateTo('producto', product.id)}
                        className="cursor-pointer"
                      >
                        <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                          {product.categoryLabel}
                        </span>
                        <h3 className="font-sans text-xs md:text-sm text-on-surface font-semibold line-clamp-1 mt-0.5">
                          {product.title}
                        </h3>
                        <p className="text-[11px] text-on-surface-variant truncate">
                          {product.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-surface-container/50">
                        <span className="text-xs md:text-sm text-on-surface font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3 py-1.5 rounded-full bg-primary text-on-primary text-[11px] font-semibold active:scale-95 hover:bg-primary-container transition-all"
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-12 px-4 text-center bg-surface-container-low rounded-2xl flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-secondary mb-2">
                search_off
              </span>
              <h3 className="font-headline text-base font-semibold text-on-surface">
                Sin coincidencias
              </h3>
              <p className="text-xs text-secondary mt-1 max-w-xs">
                No encontramos piezas bajo este criterio en bolsos, collares, cintos o pulseras.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveChip('all');
                }}
                className="mt-4 px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-xs"
              >
                Ver todas las categorías
              </button>
            </div>
          )}
        </section>
      )}

      {/* Main Photographic Category Cards (Shown when not filtering search) */}
      {searchTerm.trim() === '' && activeChip === 'all' && (
        <section className="px-4 md:px-6 pt-2 pb-6 flex flex-col gap-5">
          {CATEGORIES_META.map(cat => (
            <article
              key={cat.id}
              onClick={() => setActiveChip(cat.id)}
              className="group relative w-full overflow-hidden rounded-2xl bg-surface-container-low shadow-sm transition-transform active:scale-[0.99] cursor-pointer border border-surface-container/60"
            >
              <div className="relative w-full h-80 md:h-96 overflow-hidden bg-surface-container">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-primary text-[10px] uppercase tracking-widest font-bold shadow-xs">
                    {cat.count} Modelos
                  </span>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-xs group-hover:bg-surface transition-colors">
                  <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-surface">
                  <p className="text-[11px] tracking-widest uppercase text-tertiary-fixed mb-1 font-semibold">
                    {cat.kicker}
                  </p>
                  <h2 className="font-headline text-3xl font-medium tracking-tight text-surface-bright leading-none mb-2">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-surface-variant line-clamp-2 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

              {/* Sub-footer bar */}
              <div className="p-3.5 bg-surface-container-low flex items-center justify-between border-t border-surface-container/60">
                <span className="text-[11px] uppercase tracking-wider text-secondary font-medium">
                  {cat.tag}
                </span>
                <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explorar selección{' '}
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Thematic Collections */}
      <section className="px-4 md:px-6 pt-4 pb-6">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold">
              Curaduría Especial
            </p>
            <h2 className="font-headline text-xl text-on-surface tracking-tight">
              Colecciones Temáticas
            </h2>
          </div>
          <span className="text-xs text-secondary font-medium">Edición 2025</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {THEMATIC_COLLECTIONS.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveChip('collares')}
              className="group relative block overflow-hidden rounded-2xl bg-surface-container-low shadow-xs cursor-pointer border border-surface-container/60"
            >
              <div className="relative h-44 w-full overflow-hidden bg-surface-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-on-surface/90 via-on-surface/40 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-surface">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                      wb_sunny
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-tertiary-fixed font-bold">
                      {item.kicker}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline text-lg text-surface-bright leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-surface-variant mt-0.5">{item.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-xs text-surface font-semibold">
                    <span>Explorar cápsula</span>
                    <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stylist Concierge Assistance */}
      <section className="px-4 md:px-6 pb-6">
        <div className="relative overflow-hidden rounded-2xl bg-secondary-container/50 text-on-secondary-container p-5 shadow-xs border border-surface-container">
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-11 h-11 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">stylus</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
                <span className="text-[10px] uppercase tracking-wider text-secondary font-bold">
                  Atelier Concierge
                </span>
              </div>
              <h3 className="font-sans text-sm md:text-base font-semibold text-on-surface leading-snug mb-1">
                ¿Dudas combinando accesorios?
              </h3>
              <p className="text-xs text-on-secondary-container leading-relaxed mb-3">
                Nuestra estilista te asesora personalmente para armonizar metales, texturas de cuero y proporciones.
              </p>
              <a
                href="https://wa.me/573128492011?text=Hola,%20me%20gustar%C3%ADa%20recibir%20asesoramiento%20para%20combinar%20accesorios%20de%20AURA%20Atelier."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-xs active:scale-95 hover:bg-primary-container transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Hablar con nuestra asesora</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
