import React from 'react';
import { useShop } from '../context/ShopContext';

export const ReceiptModal: React.FC = () => {
  const { isReceiptOpen, setIsReceiptOpen, orderDetails, cart, subtotal, discountAmount, coupon, total, shippingCost } = useShop();

  if (!isReceiptOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={() => setIsReceiptOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Top Actions */}
        <div className="p-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Comprobante de Pedido
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-xs hover:bg-primary-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={() => setIsReceiptOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Printable Voucher Body */}
        <div className="overflow-y-auto p-6 flex flex-col gap-5 text-on-surface font-sans" id="printable-receipt">
          {/* Brand & Order Meta */}
          <div className="flex items-start justify-between border-b border-surface-container pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VR4ah6eaVZ2LE2wG8uKQUbL1GddOOThYIpIv0zMWSsqsraxp1gBAZZHT9qYusGUIxVyUbyGB2QRdO5Sd_NAewVKfRpN6cTvQdO8noiaSSuW2TuuRZZRhn92nSUe-ZZF8IeoJUlNtig206-VLsdB-BoSUxQlM-KGohzQ05p7EuMa5w-hZcYIMXPsyrfGPgu5RwW2h2VmVJnhIvEk2Jl6_n6MMzE5CEvxS-aFJlIAbogpJ85NkjeY3QXNFTg"
                  alt="AURA Atelier"
                  className="h-7 w-auto object-contain"
                />
                <span className="font-headline font-semibold text-lg">AURA Atelier</span>
              </div>
              <p className="text-[11px] text-secondary">Joyería Artesanal & Accesorios de Autor</p>
              <p className="text-[10px] text-outline">Buenos Aires · Bogotá · Envíos Internacionales</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold block">
                Comprobante Provisorio
              </span>
              <span className="font-mono text-sm font-bold text-on-surface block mt-0.5">
                #{orderDetails.orderNumber}
              </span>
              <span className="text-[11px] text-secondary block">{orderDetails.date}</span>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-surface-container-low border border-surface-container/60 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary block mb-1">
                Cliente & Entrega
              </span>
              <p className="font-semibold text-on-surface">{orderDetails.customerName}</p>
              <p className="text-secondary text-[11px]">{orderDetails.phone}</p>
              <p className="text-secondary text-[11px] mt-1">{orderDetails.address}</p>
              <p className="text-secondary text-[11px]">{orderDetails.city}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary block mb-1">
                Detalles del Servicio
              </span>
              <p className="text-[11px] text-secondary">
                <strong className="text-on-surface">Modalidad:</strong> {orderDetails.paymentMethod}
              </p>
              <p className="text-[11px] text-secondary mt-1">
                <strong className="text-on-surface">Despacho:</strong> {orderDetails.estimatedDelivery}
              </p>
              {orderDetails.instructions && (
                <p className="text-[10px] text-secondary italic mt-1">
                  "{orderDetails.instructions}"
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold text-secondary tracking-wider mb-2">
              Artículos Solicitados
            </span>
            <div className="border border-surface-container rounded-xl overflow-hidden divide-y divide-surface-container/60">
              {cart.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-10 h-12 rounded object-cover bg-surface-container"
                    />
                    <div>
                      <h5 className="font-semibold text-on-surface leading-tight">
                        {item.product.title}
                      </h5>
                      <p className="text-[10px] text-secondary">
                        {item.selectedMaterial}
                        {item.selectedLengthOrSize ? ` · ${item.selectedLengthOrSize}` : ''}
                      </p>
                      <span className="text-[10px] text-on-surface-variant">Cant: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-on-surface">
                    ${(item.unitPrice * item.quantity).toFixed(2)} USD
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-secondary">
              <span>Subtotal</span>
              <span className="text-on-surface">${subtotal.toFixed(2)} USD</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-tertiary">
                <span>Descuento aplicado ({coupon})</span>
                <span className="font-semibold">-${discountAmount.toFixed(2)} USD</span>
              </div>
            )}

            <div className="flex justify-between text-secondary">
              <span>Envío Asegurado</span>
              <span className="text-primary font-semibold">
                {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)} USD`}
              </span>
            </div>

            <div className="h-px bg-surface-container my-1" />

            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-sm text-on-surface">Total Liquidado</span>
              <span className="font-headline font-bold text-lg text-primary">
                ${total.toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* Authentication & Quality seal */}
          <div className="text-center pt-2 pb-1 border-t border-surface-container/60">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold mb-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Garantía de Autenticidad AURA Atelier</span>
            </div>
            <p className="text-[10px] text-secondary max-w-sm mx-auto leading-relaxed">
              Cada pieza está acuñada y supervisada por maestros orfebres en Buenos Aires. Para coordinar despacho o cambios, contáctanos a soporte@auraatelier.com o directamente por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
