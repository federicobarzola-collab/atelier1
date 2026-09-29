import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const CartView: React.FC = () => {
  const {
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    coupon,
    discountPercentage,
    applyCoupon,
    removeCoupon,
    total,
    freeShippingThreshold,
    amountForFreeShipping,
    freeShippingProgress,
    navigateTo,
    showToast,
    getWhatsAppOrderUrl
  } = useShop();

  const [couponInput, setCouponInput] = useState<string>(coupon || '');

  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      alert(res.message);
    }
  };

  const handleSaveSession = () => {
    showToast('✓ Sesión y piezas de tu bolsa guardadas en tu dispositivo');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-4 shadow-xs">
          <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
        </div>
        <h2 className="font-headline text-2xl font-medium text-on-surface mb-1">
          Tu Bolsa está vacía
        </h2>
        <p className="text-xs text-secondary max-w-xs mb-6 leading-relaxed">
          Explora nuestra selección artesanal de joyas bañadas en oro, plata 925 y marroquinería de autor.
        </p>
        <button
          onClick={() => navigateTo('catalogo')}
          className="px-6 py-3 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-sm active:scale-95 hover:bg-primary-container transition-all"
        >
          Explorar Colección
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 md:px-6 pb-28 pt-2">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-baseline gap-2">
          <h1 className="font-headline text-2xl text-on-surface">Mi Carrito</h1>
          <span className="text-xs text-on-surface-variant font-medium">
            ({cartCount} {cartCount === 1 ? 'artículo' : 'artículos'})
          </span>
        </div>

        <button
          onClick={handleSaveSession}
          type="button"
          className="flex items-center gap-1 text-[11px] text-primary hover:text-primary-container transition-colors py-1 px-2.5 rounded-full hover:bg-surface-container border border-surface-container/60"
        >
          <span className="material-symbols-outlined text-[15px]">history</span>
          <span>Guardar sesión</span>
        </button>
      </div>

      {/* Free Shipping Progress Card */}
      <div className="mt-3 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span>
            </span>
            <p className="text-xs text-on-surface font-medium">
              {amountForFreeShipping > 0 ? (
                <>
                  ¡Faltan solo{' '}
                  <span className="font-bold text-primary">${amountForFreeShipping.toFixed(2)}</span>{' '}
                  para envío gratis!
                </>
              ) : (
                <span className="text-primary font-bold">
                  ¡Felicitaciones! Has desbloqueado Envío Gratis a todo el país.
                </span>
              )}
            </p>
          </div>
          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
            {freeShippingProgress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden p-0.5 flex items-center">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-700 ease-out"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col gap-2.5 mt-4">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex p-3 rounded-2xl bg-surface-container-lowest shadow-2xs border border-surface-container/60 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div
              onClick={() => navigateTo('producto', item.product.id)}
              className="w-20 h-24 rounded-xl overflow-hidden bg-surface-container shrink-0 relative cursor-pointer"
            >
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {item.product.badge && (
                <span className="absolute bottom-1 left-1 bg-surface-container-lowest/90 backdrop-blur-sm text-primary text-[8px] px-1 py-0.5 rounded font-bold">
                  {item.product.badge.split('·')[0].trim()}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0 justify-between pl-3">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <h2
                    onClick={() => navigateTo('producto', item.product.id)}
                    className="text-xs md:text-sm text-on-surface font-semibold truncate leading-tight cursor-pointer hover:text-primary"
                  >
                    {item.product.title}
                  </h2>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Eliminar producto"
                    className="text-on-surface-variant hover:text-error transition-colors p-1 -mr-1 -mt-1 rounded-full hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-[17px]">close</span>
                  </button>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-0.5 truncate">
                  {item.selectedMaterial}
                  {item.selectedLengthOrSize ? ` · ${item.selectedLengthOrSize}` : ''}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-surface-container/40">
                <span className="text-xs md:text-sm text-on-surface font-bold">
                  ${(item.unitPrice * item.quantity).toFixed(2)}{' '}
                  <span className="text-[10px] text-on-surface-variant font-normal">USD</span>
                </span>

                {/* Quantity Stepper */}
                <div className="flex items-center bg-surface-container-low rounded-full px-1 py-0.5 shadow-inner border border-surface-container">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Disminuir cantidad"
                    className="w-6 h-6 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[14px]">remove</span>
                  </button>
                  <span className="text-xs text-on-surface w-6 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Aumentar cantidad"
                    className="w-6 h-6 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Code Section */}
      <div className="mt-4">
        <form
          onSubmit={handleApplyCoupon}
          className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container shadow-2xs"
        >
          <label
            htmlFor="coupon-input"
            className="text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1.5 font-bold"
          >
            Código Promocional
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                id="coupon-input"
                type="text"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value.toUpperCase())}
                placeholder="EJ. AURA10"
                className="w-full h-11 pl-9 pr-3 rounded-full bg-surface-container-lowest text-on-surface text-xs font-semibold tracking-wider placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary/40 uppercase border border-surface-container"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-primary">
                sell
              </span>
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-full bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-xs"
            >
              Aplicar
            </button>
          </div>

          {/* Applied notice badge */}
          {coupon && (
            <div className="flex items-center justify-between mt-2.5 px-3 py-1.5 rounded-xl bg-surface-container-highest/70 text-on-surface">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  check_circle
                </span>
                <span className="text-[10px] font-bold tracking-wider text-on-surface">
                  CUPÓN APLICADO: {discountPercentage}% OFF ({coupon})
                </span>
              </div>
              <button
                type="button"
                onClick={removeCoupon}
                className="text-[10px] text-primary font-semibold hover:underline"
              >
                Quitar
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Order Breakdown Card */}
      <div className="mt-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-2xs border border-surface-container/60 flex flex-col gap-2.5">
          <h3 className="text-xs md:text-sm font-bold text-on-surface pb-1 border-b border-surface-container/50">
            Resumen del Pedido
          </h3>

          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="font-semibold text-on-surface">${subtotal.toFixed(2)} USD</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex items-center justify-between text-xs text-tertiary">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">loyalty</span>
                <span>Descuento ({discountPercentage}%)</span>
              </div>
              <span className="font-bold">-${discountAmount.toFixed(2)} USD</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-on-surface-variant">Envío Standard</span>
              <span className="text-[9px] bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.5 rounded font-bold">
                Promo
              </span>
            </div>
            <span className="text-primary font-bold">
              {amountForFreeShipping === 0 ? 'Gratis' : '$7.00 USD'}
            </span>
          </div>

          <div className="h-px w-full bg-surface-container my-1" />

          <div className="flex items-baseline justify-between pt-0.5">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-on-surface">Total Estimado</span>
              <span className="text-[10px] text-on-surface-variant">Impuestos incluidos</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-xl md:text-2xl font-bold text-on-surface">
                ${total.toFixed(2)}
              </span>
              <span className="text-[10px] text-on-surface-variant font-semibold">USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Micro Guarantees */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant border border-surface-container/50">
          <span className="material-symbols-outlined text-[17px] text-primary shrink-0">
            verified_user
          </span>
          <span className="text-[10px] font-medium leading-tight">
            Empaque de regalo ecológico incluido
          </span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant border border-surface-container/50">
          <span className="material-symbols-outlined text-[17px] text-primary shrink-0">
            published_with_changes
          </span>
          <span className="text-[10px] font-medium leading-tight">
            30 días de garantía artesanal
          </span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="mt-5 flex flex-col gap-2.5">
        {/* Primary Checkout Button */}
        <button
          onClick={() => navigateTo('checkout')}
          type="button"
          className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-container text-on-primary text-xs md:text-sm font-bold tracking-wide shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Continuar con el Pedido</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        {/* WhatsApp Direct Order Button */}
        <a
          href={getWhatsAppOrderUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold shadow-xs active:scale-98 transition-all flex items-center justify-between border border-surface-container"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xs shrink-0">
              <span className="material-symbols-outlined text-[17px]">chat</span>
            </span>
            <span className="text-left font-semibold text-on-surface">
              Pedir directo por WhatsApp
            </span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
            chevron_right
          </span>
        </a>

        {/* WhatsApp Note */}
        <p className="text-center text-[10px] text-on-surface-variant px-4 leading-normal">
          Al ordenar por WhatsApp un asesor de AURA coordinará tu pago y detalles de personalización de inmediato.
        </p>
      </div>
    </div>
  );
};
