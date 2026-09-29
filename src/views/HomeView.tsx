import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const HomeView: React.FC = () => {
  const { navigateTo, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('todo');

  const categories = [
    { id: 'todo', label: 'Todo' },
    { id: 'collares', label: 'Collares' },
    { id: 'aretes', label: 'Aretes' },
    { id: 'anillos', label: 'Anillos' },
    { id: 'bolsos', label: 'Bolsos & Carteras' },
    { id: 'cintos', label: 'Cintos' },
    { id: 'pulseras', label: 'Pulseras' }
  ];

  const filteredProducts = activeCategory === 'todo'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-8">
      {/* Hero Editorial Banner */}
      <section className="relative w-full px-4 md:px-6 pt-2 pb-4">
        <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-md flex flex-col justify-end p-5 md:p-8">
          <div
            className="absolute inset-0 bg-cover bg-center w-full h-full scale-105 transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuARITOaKRIFDJ-7TflpF09KdG-BrgnQVXIRAExfPVvcg6JZD3ytG2nX8-F_XbCqPaGbJ6onnWmzUp1fCRqx8Hp6R37LTFp4jbntPniYLxCA-3z8binwFVO8a8ux-Ns0cyGHHEM68cX2CprsoSrcCOhtpkHcSPhXjOfGzRn3u3DAs6MYIMJyESXTeJf7w-uR8Qsq0xQi18AYfxiY8vVoY0Lij93pCmjggUB1HWbmmXpKRC8VkmrZ_Ph2mg')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/90 via-on-background/40 to-transparent" />

          <div className="relative z-10 flex flex-col gap-1.5 text-inverse-on-surface">
            <span className="text-[11px] uppercase tracking-widest text-primary-fixed-dim font-bold">
              Lanzamiento Exclusivo
            </span>
            <h1 className="font-headline text-2xl md:text-4xl font-normal leading-tight text-surface max-w-lg">
              Nueva Colección Estío — <span className="italic font-light">Joyas con alma cálida</span>
            </h1>
            <p className="text-xs md:text-sm text-surface-container-high/90 max-w-md line-clamp-2 mt-0.5">
              Piezas elaboradas a mano con metales nobles y siluetas fluidas inspiradas en la luz del atardecer.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('catalogo')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs md:text-sm font-semibold shadow-sm active:scale-95 hover:bg-primary-container transition-all"
              >
                <span>Explorar Novedades</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Pill Category Filter */}
      <section className="w-full pb-4">
        <div className="flex items-center gap-2 overflow-x-auto px-4 md:px-6 no-scrollbar py-1">
          {categories.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-on-background text-surface font-semibold shadow-sm'
                    : 'bg-surface-container text-on-surface-variant font-medium hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Personalized Concierge Banner */}
      <section className="px-4 md:px-6 pb-5">
        <div className="w-full p-3 rounded-2xl bg-surface-container-low shadow-sm flex items-center justify-between gap-3 border border-surface-container/60">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">diamond</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                Atelier Privado
              </span>
              <p className="text-xs md:text-sm text-on-surface font-medium truncate">
                Atención personalizada 1 a 1 por WhatsApp
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/573128492011?text=Hola%20AURA%20Atelier!%20Me%20gustar%C3%ADa%20atenci%C3%B3n%20personalizada%20con%20una%20estilista."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar estilista"
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-primary text-on-primary shadow-sm active:scale-95 hover:bg-primary-container transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">forum</span>
          </a>
        </div>
      </section>

      {/* Curated Product Showcase */}
      <section className="w-full px-4 md:px-6 flex flex-col gap-4 pb-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] tracking-widest uppercase text-outline font-medium">
              Selección Fina
            </span>
            <h2 className="font-headline text-xl md:text-2xl font-medium text-on-surface">
              Piezas Más Amadas
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalogo')}
            className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline"
          >
            <span>Ver todas</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {filteredProducts.map(product => {
            const favorited = isWishlisted(product.id);
            return (
              <article
                key={product.id}
                className="flex flex-col rounded-2xl bg-surface-container-lowest p-2 shadow-xs transition-all duration-300 hover:shadow-md border border-surface-container/40 group"
              >
                {/* Product Image & Badges */}
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

                  {/* Wishlist Button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label={`Guardar ${product.title} en favoritos`}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md text-on-surface flex items-center justify-center shadow-xs active:scale-90 transition-transform hover:bg-surface"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-colors ${
                        favorited ? 'text-primary' : 'text-on-surface'
                      }`}
                      style={favorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface shadow-xs">
                    <span
                      className="material-symbols-outlined text-[13px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-[10px] font-bold">{product.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col pt-2 px-1 pb-1 flex-1 justify-between">
                  <div
                    onClick={() => navigateTo('producto', product.id)}
                    className="cursor-pointer"
                  >
                    {/* Material Swatches */}
                    <div className="flex items-center gap-1.5 mb-1">
                      {product.materials.slice(0, 3).map((mat, idx) => (
                        <span
                          key={idx}
                          className="w-2.5 h-2.5 rounded-full shadow-2xs border border-black/10"
                          style={{ backgroundColor: mat.colorHex || '#E6C687' }}
                          title={mat.name}
                        />
                      ))}
                    </div>

                    <h3 className="font-sans text-xs md:text-sm text-on-surface font-semibold leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-surface-container/50">
                    <span className="text-xs md:text-sm text-on-surface font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      aria-label={`Añadir ${product.title} al carrito`}
                      className="flex items-center justify-center px-3 py-1.5 rounded-full bg-primary text-on-primary text-[11px] font-semibold active:scale-95 shadow-xs hover:bg-primary-container transition-all"
                    >
                      <span>Añadir</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Editorial Brand Craft Vignette */}
      <section className="px-4 md:px-6 pb-8">
        <div className="w-full rounded-2xl bg-secondary-container/40 p-5 md:p-6 flex flex-col gap-3 shadow-xs relative overflow-hidden border border-surface-container">
          <div className="flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Manifiesto AURA</span>
          </div>
          <h3 className="font-headline text-lg md:text-xl text-on-secondary-fixed">
            El arte de la imperfección premeditada
          </h3>
          <p className="text-xs md:text-sm text-on-secondary-container leading-relaxed">
            Cada una de nuestras joyas y bolsos es producida en series limitadas por maestros orfebres y marroquineros en talleres locales con prácticas circulares.
          </p>
          <div className="pt-2 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-headline text-lg font-bold text-primary">100%</span>
              <span className="text-[11px] text-on-surface-variant">Metales Reciclados</span>
            </div>
            <div className="w-px h-8 bg-outline-variant/40" />
            <div className="flex flex-col">
              <span className="font-headline text-lg font-bold text-primary">15 días</span>
              <span className="text-[11px] text-on-surface-variant">Prueba en Casa</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
