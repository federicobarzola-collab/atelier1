import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '../types';
import { PRODUCTS } from '../data/products';

export type ViewType = 'inicio' | 'catalogo' | 'producto' | 'favoritos' | 'bolsa' | 'checkout';

interface ShopContextType {
  currentView: ViewType;
  selectedProductId: string;
  cart: CartItem[];
  wishlist: string[];
  coupon: string | null;
  discountPercentage: number;
  toast: string | null;
  searchQuery: string;
  selectedCategory: string;
  orderDetails: OrderDetails;
  isReceiptOpen: boolean;
  isProfileOpen: boolean;
  isSearchOpen: boolean;
  
  // Computed
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  freeShippingThreshold: number;
  amountForFreeShipping: number;
  freeShippingProgress: number;

  // Actions
  navigateTo: (view: ViewType, productId?: string) => void;
  addToCart: (product: Product, quantity?: number, material?: string, lengthOrSize?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: string) => void;
  updateOrderDetails: (details: Partial<OrderDetails>) => void;
  showToast: (message: string) => void;
  setIsReceiptOpen: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  getWhatsAppOrderUrl: () => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-1',
    product: PRODUCTS.find(p => p.id === 'collar-eslabon-solar') || PRODUCTS[0],
    quantity: 1,
    selectedMaterial: 'Oro Vermeil 18k',
    selectedLengthOrSize: '45 cm',
    unitPrice: 48.00
  },
  {
    id: 'cart-2',
    product: PRODUCTS.find(p => p.id === 'aretes-aro-luna') || PRODUCTS[1],
    quantity: 1,
    selectedMaterial: 'Plata 925 y perla barroca',
    unitPrice: 36.00
  },
  {
    id: 'cart-3',
    product: PRODUCTS.find(p => p.id === 'anillo-escultural-aura') || PRODUCTS[2],
    quantity: 1,
    selectedMaterial: 'Baño de Oro 24k',
    selectedLengthOrSize: 'Talla 7',
    unitPrice: 29.00
  }
];

const INITIAL_ORDER: OrderDetails = {
  orderNumber: 'AU-9428',
  customerName: 'Valeria Montesino',
  phone: '+57 312 849 2011',
  address: 'Calle 85 #14-26, Apt 402, El Retiro',
  city: 'Bogotá',
  instructions: 'Portería principal, dejar con vigilancia si no contesto.',
  date: '28 Sep 2026',
  paymentMethod: 'Transferencia bancaria directa / Contraentrega',
  estimatedDelivery: '48 - 72 hrs hábiles'
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('inicio');
  const [selectedProductId, setSelectedProductId] = useState<string>('collar-eslabon-solar');
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [wishlist, setWishlist] = useState<string[]>(['collar-eslabon-solar', 'bolso-mini-baguette']);
  const [coupon, setCoupon] = useState<string | null>('AURA10');
  const [discountPercentage, setDiscountPercentage] = useState<number>(10);
  const [toast, setToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todo');
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(INITIAL_ORDER);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Scroll to top on view change
  const navigateTo = (view: ViewType, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    material?: string,
    lengthOrSize?: string
  ) => {
    const chosenMaterial = material || product.materials[0]?.name || 'Standard';
    const chosenLengthOrSize = lengthOrSize || product.chainLengths?.[1] || product.sizes?.[0];
    const unitPrice = product.materials.find(m => m.name === chosenMaterial)?.price ?? product.price;

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedMaterial === chosenMaterial &&
          item.selectedLengthOrSize === chosenLengthOrSize
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity,
          selectedMaterial: chosenMaterial,
          selectedLengthOrSize: chosenLengthOrSize,
          unitPrice
        };
        return [...prev, newItem];
      }
    });

    showToast(`✓ ${product.title} añadido a tu bolsa`);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Pieza removida de la bolsa');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isFavorited = prev.includes(productId);
      if (isFavorited) {
        showToast('Removido de Favoritos');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Guardado en Favoritos');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AURA10') {
      setCoupon('AURA10');
      setDiscountPercentage(10);
      showToast('¡Cupón AURA10 aplicado! 10% de descuento');
      return { success: true, message: 'CUPÓN APLICADO: 10% OFF' };
    } else if (cleanCode === 'ESTIO20') {
      setCoupon('ESTIO20');
      setDiscountPercentage(20);
      showToast('¡Cupón ESTIO20 aplicado! 20% de descuento');
      return { success: true, message: 'CUPÓN APLICADO: 20% OFF' };
    } else {
      return { success: false, message: 'Cupón no válido. Prueba con AURA10' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscountPercentage(0);
    showToast('Cupón removido');
  };

  const updateOrderDetails = (details: Partial<OrderDetails>) => {
    setOrderDetails(prev => ({ ...prev, ...details }));
  };

  // Computations
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!coupon || discountPercentage <= 0) return 0;
    return Number(((subtotal * discountPercentage) / 100).toFixed(2));
  }, [subtotal, coupon, discountPercentage]);

  const freeShippingThreshold = 100.00;
  const amountForFreeShipping = Math.max(0, Number((freeShippingThreshold - (subtotal - discountAmount)).toFixed(2)));
  const freeShippingProgress = Math.min(100, Math.round(((subtotal - discountAmount) / freeShippingThreshold) * 100));

  const shippingCost = amountForFreeShipping === 0 ? 0 : 7.00;
  const total = Number(Math.max(0, subtotal - discountAmount + shippingCost).toFixed(2));

  const getWhatsAppOrderUrl = () => {
    const itemsLines = cart
      .map(
        item =>
          `• ${item.quantity}x ${item.product.title} (${item.selectedMaterial}${item.selectedLengthOrSize ? ` · ${item.selectedLengthOrSize}` : ''}) - $${(item.unitPrice * item.quantity).toFixed(2)} USD`
      )
      .join('\n');

    const message =
      `🛍️ *Nuevo Pedido AURA Atelier #${orderDetails.orderNumber}*\n\n` +
      `${itemsLines}\n\n` +
      `Subtotal: $${subtotal.toFixed(2)} USD\n` +
      (coupon ? `Descuento ${coupon} (${discountPercentage}%): -$${discountAmount.toFixed(2)} USD\n` : '') +
      `Envío: ${shippingCost === 0 ? 'GRATIS (Asegurado)' : `$${shippingCost.toFixed(2)} USD`}\n\n` +
      `💰 *Total a Liquidar: $${total.toFixed(2)} USD*\n\n` +
      `👤 *Destinatario:* ${orderDetails.customerName}\n` +
      `📱 *Teléfono:* ${orderDetails.phone}\n` +
      `📍 *Entrega:* ${orderDetails.address}, ${orderDetails.city}\n` +
      `📝 *Notas:* ${orderDetails.instructions}\n\n` +
      `¿Me confirman disponibilidad y datos para el pago? ¡Gracias! ✨`;

    return `https://wa.me/573128492011?text=${encodeURIComponent(message)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        selectedProductId,
        cart,
        wishlist,
        coupon,
        discountPercentage,
        toast,
        searchQuery,
        selectedCategory,
        orderDetails,
        isReceiptOpen,
        isProfileOpen,
        isSearchOpen,
        cartCount,
        subtotal,
        discountAmount,
        shippingCost,
        total,
        freeShippingThreshold,
        amountForFreeShipping,
        freeShippingProgress,
        navigateTo,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        isWishlisted,
        applyCoupon,
        removeCoupon,
        setSearchQuery,
        setSelectedCategory,
        updateOrderDetails,
        showToast,
        setIsReceiptOpen,
        setIsProfileOpen,
        setIsSearchOpen,
        getWhatsAppOrderUrl
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
