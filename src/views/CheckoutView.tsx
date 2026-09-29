import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    coupon,
    discountPercentage,
    total,
    shippingCost,
    orderDetails,
    updateOrderDetails,
    navigateTo,
    getWhatsAppOrderUrl,
    setIsReceiptOpen
  } = useShop();

  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    customerName: orderDetails.customerName,
    phone: orderDetails.phone,
    address: orderDetails.address,
    city: orderDetails.city,
    instructions: orderDetails.instructions
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderDetails(formData);
    setIsEditingAddress(false);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 md:px-6 pb-28 pt-2">
      {/* Status Header */}
      <div className="flex flex-col items-center text-center mt-3 mb-5">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary-fixed mb-3 shadow-xs">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
          <span
            className="material-symbols-outlined text-primary text-[36px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] uppercase tracking-wider mb-2 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
          Paso final para despachar
        </div>

        <h1 className="font-headline text-2xl md:text-3xl text-on-surface mb-1">
          ¡Casi listo!
        </h1>
        <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
          Tu pedido <span className="font-bold text-on-surface">#{orderDetails.orderNumber}</span> está generado. Envíanos el resumen pre-cargado a WhatsApp para apartar tu stock.
        </p>
      </div>

      {/* Delivery Details Card */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-4 shadow-2xs border border-surface-container/60 mb-4">
        <div className="flex items-center justify-between mb-3 border-b border-surface-container/40 pb-2">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px]">person_pin_circle</span>
            <span className="text-xs md:text-sm font-bold text-on-surface">Detalles de Entrega</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-secondary bg-surface-container px-2 py-0.5 rounded-full font-medium">
              Estándar
            </span>
            <button
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-[11px] text-primary hover:underline font-semibold"
            >
              {isEditingAddress ? 'Cancelar' : 'Editar'}
            </button>
          </div>
        </div>

        {isEditingAddress ? (
          <form onSubmit={handleSaveAddress} className="flex flex-col gap-2.5 pt-1">
            <div>
              <label className="text-[10px] uppercase font-bold text-secondary">Destinatario</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full h-9 px-3 text-xs rounded-lg bg-surface-container-low border border-surface-container mt-0.5"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase font-bold text-secondary">Teléfono</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-9 px-3 text-xs rounded-lg bg-surface-container-low border border-surface-container mt-0.5"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-secondary">Ciudad</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full h-9 px-3 text-xs rounded-lg bg-surface-container-low border border-surface-container mt-0.5"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-secondary">Dirección</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full h-9 px-3 text-xs rounded-lg bg-surface-container-low border border-surface-container mt-0.5"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-secondary">Instrucciones</label>
              <input
                type="text"
                value={formData.instructions}
                onChange={e => setFormData({ ...formData, instructions: e.target.value })}
                className="w-full h-9 px-3 text-xs rounded-lg bg-surface-container-low border border-surface-container mt-0.5"
              />
            </div>
            <button
              type="submit"
              className="mt-2 py-2 px-4 rounded-full bg-primary text-on-primary text-xs font-semibold self-end shadow-xs"
            >
              Guardar Cambios
            </button>
          </form>
        ) : (
          <div className="space-y-1 text-xs text-on-surface-variant">
            <div className="flex justify-between items-baseline py-1 border-b border-surface-container/30">
              <span className="text-secondary text-[11px]">Destinatario</span>
              <span className="font-semibold text-on-surface text-right">{orderDetails.customerName}</span>
            </div>
            <div className="flex justify-between items-baseline py-1 border-b border-surface-container/30">
              <span className="text-secondary text-[11px]">Teléfono</span>
              <span className="font-semibold text-on-surface text-right">{orderDetails.phone}</span>
            </div>
            <div className="flex justify-between items-start py-1 border-b border-surface-container/30">
              <span className="text-secondary text-[11px]">Dirección</span>
              <span className="font-semibold text-on-surface text-right max-w-[65%]">
                {orderDetails.address}, {orderDetails.city}
              </span>
            </div>
            <div className="flex justify-between items-start py-1">
              <span className="text-secondary text-[11px]">Instrucciones</span>
              <span className="italic text-on-surface text-right max-w-[65%] text-[11px]">
                {orderDetails.instructions}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Message Preview Card */}
      <div className="w-full bg-surface-container-low rounded-2xl p-4 mb-5 shadow-2xs border border-surface-container">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-secondary uppercase tracking-wider font-bold">
            Vista previa del mensaje
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-primary font-semibold">
            <span className="material-symbols-outlined text-[15px]">chat</span>
            WhatsApp Directo
          </span>
        </div>

        {/* Bubble */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-2xs relative border border-surface-container/50">
          <div className="absolute -top-1.5 left-6 w-3 h-3 bg-surface-container-lowest border-t border-l border-surface-container/50 rotate-45" />

          <div className="flex items-center gap-1.5 mb-2 text-primary text-xs font-bold">
            <span>🛍️</span>
            <span className="text-on-surface">Nuevo Pedido AURA Atelier</span>
            <span className="text-primary font-semibold">#{orderDetails.orderNumber}</span>
          </div>

          <div className="space-y-1.5 text-xs text-on-surface-variant py-1 border-t border-b border-surface-container/40">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px]">
                <span className="truncate pr-2">
                  • {item.quantity}x {item.product.title}{' '}
                  <span className="text-secondary text-[10px]">
                    ({item.selectedMaterial}
                    {item.selectedLengthOrSize ? ` / ${item.selectedLengthOrSize}` : ''})
                  </span>
                </span>
                <span className="text-on-surface font-semibold shrink-0">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-[11px] text-tertiary">
                <span>Descuento aplicado ({coupon})</span>
                <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-secondary text-[10px] pt-0.5">
              <span>Envío nacional asegurado</span>
              <span className="text-primary uppercase font-bold">
                {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="mt-2 pt-1 flex justify-between items-baseline bg-surface-container-low p-2 rounded-lg">
            <span className="text-xs font-bold text-on-surface">💰 Total a Liquidar:</span>
            <span className="font-headline text-base md:text-lg text-primary font-bold">
              ${total.toFixed(2)} USD
            </span>
          </div>

          <div className="mt-2 text-secondary text-[10px] flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">local_shipping</span>
              <span>📍 Entrega estimada: {orderDetails.estimatedDelivery}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">account_balance_wallet</span>
              <span>Modalidad: {orderDetails.paymentMethod}</span>
            </div>
          </div>

          <div className="mt-2 text-right">
            <span className="text-[10px] text-secondary inline-flex items-center gap-1">
              11:42 AM
              <span className="material-symbols-outlined text-[14px] text-emerald-600">done_all</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 w-full mb-5">
        <a
          href={getWhatsAppOrderUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between bg-primary text-on-primary p-3.5 rounded-full shadow-md active:scale-[0.99] hover:bg-primary-container transition-all"
        >
          <div className="flex items-center gap-3 pl-1">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px] text-on-primary">send</span>
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs md:text-sm font-bold text-on-primary leading-tight">
                Enviar Pedido por WhatsApp
              </p>
              <p className="text-[10px] text-primary-fixed-dim opacity-90 truncate">
                Abre tu app con el resumen listo
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-primary pr-1 text-[20px]">
            arrow_forward
          </span>
        </a>

        <button
          onClick={() => setIsReceiptOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-surface-container text-on-surface text-xs md:text-sm font-semibold hover:bg-surface-container-high transition-colors border border-surface-container-highest"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">download</span>
          Descargar comprobante en PDF
        </button>
      </div>

      {/* Atelier Guarantee Card */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-low shadow-2xs border border-surface-container/60">
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
          <span className="material-symbols-outlined text-[20px]">support_agent</span>
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-on-surface leading-snug">
            Atención artesanal garantizada
          </h4>
          <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
            Al recibir tu mensaje, una asesora del taller verificará el empaque de regalo y te compartirá la guía en tiempo real.
          </p>
        </div>
      </div>

      {/* Back to Catalog */}
      <div className="text-center mt-5 mb-2">
        <button
          onClick={() => navigateTo('catalogo')}
          className="inline-flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors font-medium"
        >
          <span className="material-symbols-outlined text-[15px]">storefront</span>
          Volver al catálogo de la colección
        </button>
      </div>
    </div>
  );
};
