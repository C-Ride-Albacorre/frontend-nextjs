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

export interface CategoryStoresResponse {
  id: string;
  storeName: string;
  categoryId: string;
  storeCategory: string;
  storeDescription: string;
  storeAddress: string;
  phoneNumber: string;
  dailyOrderLimit: number | null;
  preparationTime: number;
  storeLogo: string | null;
  isOpen: boolean;
  distance: number | null;
  subcategories: string[];
  products: any[];
}

export interface CategoryStoresApiResponse {
  data: {
    data: CategoryStoresResponse[];
  };

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface StoreDetailsResponse {
  status: 'success';
  statusCode: 200;
  timestamp: string;
  path: string;
  data: {
    id: string;
    storeName: string;
    storeDescription: string;
    storeAddress: string;
    phoneNumber: string;
    email: string;
    storeLogo: string | null;
    dailyOrderLimit: number | null;
    preparationTime: number;
    deliveryFee: number | null;
    status: 'ACTIVE' | 'INACTIVE';
    category: {
      id: string;
      name: string;
      description: string;
      icon: string;
      image: string;
      isActive: boolean;
      displayOrder: number;
      createdAt: string;
      updatedAt: string;
    };
    operatingHours: any[];
    products: any[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface VendorAddressDetails {
  storeId: string;
  storeName: string;
  vendorId: string;
  businessName: string;

  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };

  contact: {
    phone?: string;
    email?: string;
  };
}

// types/api.ts

export interface VendorAddressDetailsApiResponse {
  success: boolean;
  message?: string;
  data: VendorAddressDetails;
}

export interface CategoriesResponse {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  _count: { stores: number };
  subcategories: any[];
}

export interface CategoriesApiResponse {
  data: CategoriesResponse[];
}

export interface SubCategoriesResponse {
  data: {
    id: string;
    name: string;
    description: string;
    storeCount: number;
  }[];
}

// ─── Cart ───

export type CartItemType = 'PRODUCT' | 'PACKAGE';

export interface CartResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
  data: {
    cartId: string;
    storeId: string;
    storeName: string;
    items: {
      id: string;
      itemType: CartItemType;
      productId?: string;
      variantId?: string | null;
      packageId?: string | null;
      name: string;
      imageUrl: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      selectedAddons: any[];
      storeId: string;
      storeName: string;
      categoryId: string;
      specialInstructions?: string | null;
    }[];
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    taxAmount: number;
    totalAmount: number;
  };
}

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
  imageUrl?: string;
  basePrice: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  storeId: string;
  storeName: string;
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

export interface AddToCartResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  error: string;
  message: string;
  data: {
    cartId: string;
    storeId: string;
    storeName: string;
    items: {
      id: string;
      itemType: CartItemType;
      productId?: string;
      variantId?: string | null;
      packageId?: string | null;
      name: string;
      imageUrl: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      selectedAddons: any[];
      storeId: string;
      storeName: string;
      categoryId: string;
      specialInstructions?: string | null;
    }[];
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    taxAmount: number;
    totalAmount: number;
  };
}

export interface UpdateCartQuantityPayload {
  quantity: number;
}

export interface UpdateCartQuantityResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
  data: {
    cartId: string;
    storeId: string;
    storeName: string;
    items: {
      id: string;
      itemType: string;
      productId: string;
      variantId: string | null;
      packageId: string | null;
      name: string;
      imageUrl: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      selectedAddons: any[];
      storeId: string;
      storeName: string;
      categoryId: string;
      specialInstructions: string | null;
    }[];
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    taxAmount: number;
    totalAmount: number;
  };
}

export interface ClearCartResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
  data: { success: boolean; message: string };
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
