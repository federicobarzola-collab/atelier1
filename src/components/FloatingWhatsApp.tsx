import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = 'https://wa.me/573128492011?text=' + encodeURIComponent('¡Hola AURA Atelier! ✨ Me gustaría recibir asesoramiento para elegir una pieza de su colección.');

  return (
    <aside className="fixed right-4 bottom-20 md:bottom-24 z-30 pb-safe pointer-events-none">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_8px_24px_-4px_rgba(43,37,35,0.14),0_2px_8px_-1px_rgba(43,37,35,0.06)] hover:bg-surface-container-lowest active:scale-95 transition-all border border-surface-container group"
        aria-label="Contactar estilista por WhatsApp"
      >
        <span className="text-xs text-on-surface-variant font-medium hidden sm:inline-block">
          ¿Dudas?
        </span>
        <span className="text-xs text-primary font-semibold group-hover:underline">
          Escríbenos
        </span>
        <span className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_2px_8px_rgba(37,211,102,0.4)]">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.58 1.968.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-1.921-.448-1.569-.652-2.576-2.253-2.655-2.357-.078-.105-.634-.844-.634-1.611 0-.766.402-1.144.545-1.298.143-.155.312-.194.417-.194.103 0 .207.001.297.005.097.004.227-.037.355.27.13.313.442 1.077.481 1.156.039.078.065.17.013.273-.052.104-.078.169-.156.26-.078.091-.164.203-.234.273-.078.077-.16.16-.069.316.091.156.405.669.869 1.082.598.533 1.101.698 1.258.776.156.078.247.065.338-.039.091-.104.39-.455.494-.611.104-.156.208-.13.351-.078.143.052.909.429 1.065.507.156.078.26.117.299.182.039.065.039.377-.105.782zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.309A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
          </svg>
        </span>
      </a>
    </aside>
  );
};
