import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const ProductDetailView: React.FC = () => {
  const { selectedProductId, addToCart, toggleWishlist, isWishlisted, navigateTo } = useShop();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const favorited = isWishlisted(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    product.materials[0]?.name || 'Oro Vermeil 18k'
  );
  const [selectedLength, setSelectedLength] = useState<string>(
    product.chainLengths?.[1] || product.chainLengths?.[0] || product.sizes?.[0] || '45 cm'
  );

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  // Related products for "Completa el Look"
  const crossSellProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 2);

  const currentPrice =
    product.materials.find(m => m.name === selectedMaterial)?.price ?? product.price;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedMaterial, selectedLength);
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola AURA Atelier! ✨ Quisiera consultar y ordenar:
• ${product.title}
• Acabado: ${selectedMaterial}
• Longitud / Talla: ${selectedLength}
• Precio: $${currentPrice.toFixed(2)} USD

¿Tienen disponibilidad en el taller?`
  );

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto pb-32">
      {/* Visual Carousel */}
      <section className="relative w-full overflow-hidden bg-surface-container-low">
        <div className="relative aspect-[4/5] w-full bg-surface-container overflow-hidden">
          <img
            src={product.images[activeImageIndex] || product.thumbnail}
            alt={`${product.title} vista ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <span className="pointer-events-auto px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-xs text-[10px] md:text-xs text-on-surface uppercase tracking-wider font-semibold">
              {product.badge || 'Edición Limitada'}
            </span>

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Guardar en favoritos"
              className="pointer-events-auto w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center justify-center text-on-surface hover:text-primary transition-all active:scale-90"
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors ${
                  favorited ? 'text-primary' : 'text-on-surface'
                }`}
                style={favorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Pagination Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Ir a foto ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeImageIndex === idx
                      ? 'w-6 h-1.5 bg-primary'
                      : 'w-1.5 h-1.5 bg-surface-container-highest/80 backdrop-blur-sm'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Information */}
      <div className="px-4 md:px-6 pt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] uppercase text-secondary tracking-widest font-semibold">
            Aura Joyería Fina
          </span>
          <div className="flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full">
            <span
              className="material-symbols-outlined text-[15px] text-tertiary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-xs font-bold text-on-surface">{product.rating}</span>
            <span className="text-xs text-secondary">({product.reviewsCount} reseñas)</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-headline text-2xl md:text-3xl text-on-surface font-normal leading-tight">
            {product.title}
          </h1>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-xl md:text-2xl font-bold text-primary">
              ${currentPrice.toFixed(2)} USD
            </span>
            <span className="text-xs text-secondary">IVA incluido</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed pt-1">
          {product.description}
        </p>
      </div>

      {/* Variant Selectors */}
      <div className="px-4 md:px-6 pt-5 flex flex-col gap-5">
        {/* Material Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-secondary uppercase tracking-wider font-semibold">
              Material & Acabado
            </label>
            <span className="text-xs text-on-surface font-medium">{selectedMaterial}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {product.materials.map((mat, idx) => {
              const isSelected = selectedMaterial === mat.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedMaterial(mat.name)}
                  className={`p-2.5 rounded-xl bg-surface-container-lowest shadow-2xs flex flex-col items-center gap-2 transition-all border ${
                    isSelected
                      ? 'ring-2 ring-primary bg-primary/5 border-primary/40'
                      : 'border-surface-container hover:bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full shadow-2xs flex items-center justify-center bg-gradient-to-tr ${
                      mat.hexGradient || 'from-[#cca72f] via-[#f7e089] to-[#d4af37]'
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px] text-white">check</span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] text-center line-clamp-1 ${
                      isSelected ? 'text-on-surface font-semibold' : 'text-secondary'
                    }`}
                  >
                    {mat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chain Length or Size Selector */}
        {(product.chainLengths || product.sizes) && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-secondary uppercase tracking-wider font-semibold">
                {product.chainLengths ? 'Longitud de Cadena' : 'Talla de Anillo'}
              </label>
              <button
                onClick={() => setOpenAccordion('sizing')}
                className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">straighten</span> Ver guía
              </button>
            </div>

            <div className="flex items-center gap-2">
              {(product.chainLengths || product.sizes)?.map((opt, idx) => {
                const isSelected = selectedLength === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedLength(opt)}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-center text-xs transition-all ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-xs font-semibold ring-1 ring-primary'
                        : 'bg-surface-container-lowest text-secondary hover:bg-surface-container-low border border-surface-container'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tactile Sensory Note Card */}
        <div className="rounded-xl bg-surface-container-low p-3.5 flex items-start gap-3 border border-surface-container/60">
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="text-xs font-bold text-on-surface">Garantía Artesanal AURA</h4>
            <p className="text-[11px] text-on-surface-variant pt-0.5 leading-relaxed">
              Elaborado de manera responsable bajo comercio ético, libre de níquel y diseñado para acompañarte toda la vida.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Accordions */}
      <div className="px-4 md:px-6 pt-5 flex flex-col gap-2">
        {/* Accordion 1: Materiales & Cuidados */}
        <div className="rounded-xl bg-surface-container-lowest shadow-2xs border border-surface-container/60 overflow-hidden">
          <button
            onClick={() =>
              setOpenAccordion(openAccordion === 'materials' ? null : 'materials')
            }
            className="w-full p-3.5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-primary">spa</span>
              <span className="text-xs md:text-sm font-semibold text-on-surface">
                Materiales & Cuidados
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-300 ${
                openAccordion === 'materials' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === 'materials' && (
            <div className="px-4 pb-3.5 pt-1 flex flex-col gap-2 text-xs text-on-surface-variant border-t border-surface-container/40">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-tertiary-container mt-0.5">
                  water_drop
                </span>
                <p>
                  <strong className="text-on-surface">Resistente al uso diario:</strong> Acabado sellado al vacío que resiste duchas y contacto cotidiano sin decoloración prematura.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-tertiary-container mt-0.5">
                  health_and_safety
                </span>
                <p>
                  <strong className="text-on-surface">Hipoalergénico:</strong> 100% libre de plomo, níquel y cadmio. Seguro incluso para las pieles más reactivas.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-tertiary-container mt-0.5">
                  clean_hands
                </span>
                <p>
                  <strong className="text-on-surface">Cuidado sugerido:</strong> Limpiar suavemente con el paño de microfibra de algodón natural incluido en cada estuche.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Guía de Tallas */}
        <div className="rounded-xl bg-surface-container-lowest shadow-2xs border border-surface-container/60 overflow-hidden">
          <button
            onClick={() => setOpenAccordion(openAccordion === 'sizing' ? null : 'sizing')}
            className="w-full p-3.5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-primary">straighten</span>
              <span className="text-xs md:text-sm font-semibold text-on-surface">
                Guía de Tallas & Caída
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-300 ${
                openAccordion === 'sizing' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === 'sizing' && (
            <div className="px-4 pb-3.5 pt-1 flex flex-col gap-1.5 text-xs text-on-surface-variant border-t border-surface-container/40">
              <p>
                <strong className="text-on-surface">40 cm:</strong> Caída estilo gargantilla sutil justo por encima de las clavículas.
              </p>
              <p>
                <strong className="text-on-surface">45 cm (Favorita):</strong> Descansa suavemente sobre el esternón medio; óptima para combinar con escotes o blusas.
              </p>
              <p>
                <strong className="text-on-surface">50 cm:</strong> Caída relajada y estilizada, perfecta para lucir sobre jerséis o prendas de cuello alto.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 3: Envíos & Devoluciones */}
        <div className="rounded-xl bg-surface-container-lowest shadow-2xs border border-surface-container/60 overflow-hidden">
          <button
            onClick={() =>
              setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')
            }
            className="w-full p-3.5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
              <span className="text-xs md:text-sm font-semibold text-on-surface">
                Envíos & Devoluciones
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-300 ${
                openAccordion === 'shipping' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === 'shipping' && (
            <div className="px-4 pb-3.5 pt-1 flex flex-col gap-1.5 text-xs text-on-surface-variant border-t border-surface-container/40">
              <p>
                <strong className="text-on-surface">Envío Exprés:</strong> Entregas en 2 a 4 días laborables en empaque compostable premium con sello de cera de abeja.
              </p>
              <p>
                <strong className="text-on-surface">Cambios sin fricción:</strong> Dispones de 30 días para cambios de talla o devoluciones íntegras si la pieza no te enamora por completo.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Completa el Look (Cross-selling) */}
      <section className="px-4 md:px-6 pt-6 flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
            Estilismo Recomendado
          </span>
          <h3 className="font-headline text-lg text-on-surface">Completa el Look</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {crossSellProducts.map(rel => (
            <div
              key={rel.id}
              className="flex flex-col bg-surface-container-lowest p-2.5 rounded-2xl shadow-2xs border border-surface-container/60 gap-2"
            >
              <div
                onClick={() => navigateTo('producto', rel.id)}
                className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface-container-low cursor-pointer"
              >
                <img
                  src={rel.thumbnail}
                  alt={rel.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-secondary">
                  {rel.categoryLabel}
                </span>
                <h4
                  onClick={() => navigateTo('producto', rel.id)}
                  className="text-xs font-semibold text-on-surface line-clamp-1 cursor-pointer hover:text-primary"
                >
                  {rel.title}
                </h4>
                <span className="text-xs font-bold text-on-surface mt-0.5">
                  ${rel.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => addToCart(rel)}
                className="w-full py-1.5 rounded-full bg-surface-container-high hover:bg-secondary-container text-on-surface text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                <span>Sumar al look</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Action Bar */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-8px_30px_rgba(43,37,35,0.08)] px-4 md:px-6 pt-3 pb-safe">
        <div className="max-w-md mx-auto flex flex-col gap-2 pb-2">
          {/* WhatsApp Direct Inquiry Button */}
          <a
            href={`https://wa.me/573128492011?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-full bg-surface-container-lowest border border-surface-container shadow-2xs flex items-center justify-center gap-2 text-on-surface hover:bg-surface-container transition-all active:scale-98 text-xs font-semibold"
          >
            <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.58 1.968.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-1.921-.448-1.569-.652-2.576-2.253-2.655-2.357-.078-.105-.634-.844-.634-1.611 0-.766.402-1.144.545-1.298.143-.155.312-.194.417-.194.103 0 .207.001.297.005.097.004.227-.037.355.27.13.313.442 1.077.481 1.156.039.078.065.17.013.273-.052.104-.078.169-.156.26-.078.091-.164.203-.234.273-.078.077-.16.16-.069.316.091.156.405.669.869 1.082.598.533 1.101.698 1.258.776.156.078.247.065.338-.039.091-.104.39-.455.494-.611.104-.156.208-.13.351-.078.143.052.909.429 1.065.507.156.078.26.117.299.182.039.065.039.377-.105.782zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.309A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
            </svg>
            <span>Pedir o Consultar por WhatsApp</span>
          </a>

          {/* Primary Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3.5 px-6 rounded-full bg-primary text-on-primary shadow-md shadow-primary/20 flex items-center justify-between text-xs md:text-sm font-bold active:scale-98 transition-all hover:bg-primary-container"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Agregar al Carrito</span>
            </span>
            <span>${currentPrice.toFixed(2)} USD</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
