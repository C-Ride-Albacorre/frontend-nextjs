export type StoreCardProps = {
  id: string;
  image: string;
  tag?: string;
  name: string;
  cuisine: string;
  rating: number;
  location: string;
  delivery: string;
  time: string;
};

export type CartItemType = 'PRODUCT' | 'PACKAGE';

export interface CartItem {
  id: string;
  itemType: CartItemType;
  productId?: string;
  variantId?: string;
  packageId?: string;
  addonIds?: string[];
  quantity: number;
  specialInstructions?: string;
  productName: string;
  productImage?: string;
  basePrice: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subTotal: number;
  itemCount: number;
}

export interface AddToCartPayload {
  itemType: CartItemType;
  productId?: string;
  variantId?: string;
  packageId?: string;
  addonIds?: string[];
  quantity: number;
  specialInstructions?: string;
}

export interface UpdateCartQuantityPayload {
  quantity: number;
}

export interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

export type Order = {
  id: string;
  status?: string;
  amount?: number;
  reference?: string;
};
