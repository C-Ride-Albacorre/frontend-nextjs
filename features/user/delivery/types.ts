// ─── Store Card ───

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

// ─── Cart ───

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
  unitPrice: number;
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

// ─── Orders ───

export interface DropoffLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface CreateOrderPayload {
  cartId: string;
  deliveryOptionId?: string; 
  dropoffLocation: DropoffLocation;
  recipientName: string;
  recipientPhone: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string;
  status?: string;
  amount?: number;
  reference?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Payment ───

export interface InitializePaymentPayload {
  orderId: string;
  paymentMethod: 'CARD';
  callbackUrl: string;
}

// ─── Vendor Address ───

export interface VendorAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

// ─── API Result ───

export type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };
