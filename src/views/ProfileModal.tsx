import React from 'react';
import { useShop } from '../context/ShopContext';

export const ProfileModal: React.FC = () => {
  const { isProfileOpen, setIsProfileOpen, orderDetails, navigateTo } = useShop();

  if (!isProfileOpen) return null;

  return (
    <div
      onClick={() => setIsProfileOpen(false)}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-surface rounded-t-3xl sm:rounded-3xl shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfdFgngY2D4t_Bn8l8lgh32PE7j9HzuC_Aolf0wT3Q2B5Lw1vKpALVioXrxSqomkZYyvuLq8aO6V91E7464pyrzKARDgh5HyEgMlj14R5x_A3zl0WK80V_f4I1B6iGBztzanQLV21oZgw8FVs1FGam_KozM32fASeHYukIqOfVLgfJ7ocFUgvXZJfZ_tz8x5xdlVW5l1noozz9SB7aSQ60p4kVszz5A18zVBbkGYJJ5H9fKOSBOccRmA"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shadow-xs"
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-on-surface leading-tight">
                {orderDetails.customerName}
              </h3>
              <span className="text-[11px] text-secondary">Cliente Preferente AURA</span>
            </div>
          </div>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 flex flex-col gap-4">
          {/* Active Order Card */}
          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                Pedido en curso
              </span>
              <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-semibold">
                #{orderDetails.orderNumber}
              </span>
            </div>
            <p className="text-xs text-on-surface font-medium">
              Entrega programada en {orderDetails.city}
            </p>
            <p className="text-[11px] text-secondary mt-0.5">
              Estado: Esperando confirmación de stock por WhatsApp
            </p>
            <div className="mt-3 pt-2 border-t border-surface-container/50 flex justify-between items-center">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigateTo('checkout');
                }}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                <span>Ver resumen completo</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Saved Delivery Address */}
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container/60">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <h4 className="text-xs font-bold text-on-surface">Dirección Registrada</h4>
            </div>
            <p className="text-xs text-on-surface font-medium">{orderDetails.address}</p>
            <p className="text-[11px] text-secondary">{orderDetails.city} · Tel: {orderDetails.phone}</p>
          </div>

          {/* Concierge & Assistance */}
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[17px]">chat</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Atención Concierge</p>
                <p className="text-[10px] text-secondary">Horario: Lun - Sáb (9am - 8pm)</p>
              </div>
            </div>
            <a
              href="https://wa.me/573128492011?text=Hola%20AURA%20Atelier,%20deseo%20consultar%20sobre%20mi%20cuenta."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Chatear
            </a>
          </div>

          {/* Sustainability & Origin */}
          <div className="text-center pt-2 pb-1 text-[11px] text-secondary">
            <p>AURA Atelier · Joyas con alma cálida</p>
            <p className="text-[10px] text-outline mt-0.5">Metales éticos certificados · Hecho a mano</p>
          </div>
        </div>
      </div>
    </div>
  );
};
