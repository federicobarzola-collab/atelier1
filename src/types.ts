export interface MaterialVariant {
  name: string;
  price: number;
  hexGradient?: string;
  colorHex?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: 'collares' | 'aretes' | 'anillos' | 'bolsos' | 'cintos' | 'pulseras';
  categoryLabel: string;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: 'primary' | 'gold' | 'silver' | 'neutral';
  description: string;
  materials: MaterialVariant[];
  chainLengths?: string[];
  sizes?: string[];
  thumbnail: string;
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedMaterial: string;
  selectedLengthOrSize?: string;
  unitPrice: number;
}

export interface OrderDetails {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  instructions: string;
  date: string;
  paymentMethod: string;
  estimatedDelivery: string;
}
