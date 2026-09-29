import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateTo } = useShop();

  const favoriteProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-4 shadow-xs">
          <span className="material-symbols-outlined text-[32px]">favorite</span>
        </div>
        <h2 className="font-headline text-2xl font-medium text-on-surface mb-1">
          Sin favoritos guardados
        </h2>
        <p className="text-xs text-secondary max-w-xs mb-6 leading-relaxed">
          Guarda tus piezas deseadas haciendo clic en el corazón para consultarlas o agregarlas después a tu bolsa.
        </p>
        <button
          onClick={() => navigateTo('catalogo')}
          className="px-6 py-3 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-sm active:scale-95 hover:bg-primary-container transition-all"
        >
          Explorar Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 md:px-6 pb-28 pt-2">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h1 className="font-headline text-2xl text-on-surface">Mis Favoritos</h1>
          <p className="text-xs text-secondary">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'pieza guardada' : 'piezas guardadas'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {favoriteProducts.map(product => (
          <article
            key={product.id}
            className="flex flex-col rounded-2xl bg-surface-container-lowest p-2 shadow-xs border border-surface-container/40 group"
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
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center text-primary shadow-xs hover:bg-surface transition-colors"
                aria-label={`Remover ${product.title} de favoritos`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
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
                <h3 className="text-xs md:text-sm text-on-surface font-semibold line-clamp-1 mt-0.5">
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
        ))}
      </div>
    </div>
  );
};
