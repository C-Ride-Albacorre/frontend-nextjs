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
    items: CartItem[];
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
  productName?: string;
  productId?: string;
  variantId?: string | null;
  packageId?: string | null;
  addonIds?: string[];
  name?: string;
  imageUrl?: string;
  quantity: number;
  basePrice?: number;
  unitPrice: number;
  totalPrice: number;
  selectedAddons?: any[];
  storeId?: string;
  storeName?: string;
  categoryId?: string;
  specialInstructions?: string | null;
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
    items: CartItem[];
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
    items: CartItem[];
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
  postalCode: string;
}

export interface PickupLocation {
  address: string;
  storeId: string;
  latitude: number;
  longitude: number;
  storeName: string;
}

export interface StatusHistory {
  note: string;
  status: string;
  timestamp: string;
}

export interface CreateOrderPayload {
  cartId: string;
  deliveryOptionId?: string;
  dropoffLocation: DropoffLocation;
  recipientName: string;
  recipientPhone: string;
  deliveryInstructions?: string;
}

export interface GetDeliveryOptionResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
  data: {
    success: boolean;
    message: string;
  };
}

export interface OrderResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: [
    {
      id: string;
      orderNumber: string;
      userId: string;
      orderType: 'VENDOR';
      subtotal: number;
      deliveryFee: number;
      serviceFee: number;
      taxAmount: number;
      totalAmount: number;
      deliveryOptionId: string | null;
      dropoffLocation: DropoffLocation[];
      recipientName: string;
      recipientPhone: string;
      deliveryInstructions: string | null;
      paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
      paymentMethod: string | null;
      paymentReference: string | null;
      monnifyReference: string | null;
      orderStatus: string;
      statusHistory: StatusHistory[];
      metadata: Record<string, unknown> | null;
      createdAt: string;
      updatedAt: string;
      pickupLocation: PickupLocation[];
      orderCode: string;
      respondedAt: string | null;
      reason: string | null;
      canceledAt: string | null;
      deliveredAt: string | null;
      driverAssignedAt: string | null;
      pickedUpAt: string | null;
      vendorAcceptedAt: string | null;
      vendorDeclinedAt: string | null;
      storeId: string | null;
      items: CartItem[];
      deliveryOption: null;
    },
  ];
}

export interface CreateOrderResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
  data: {
    orderId: string;
    orderNumber: string;
    orderType: 'VENDOR';
    items: CartItem[];

    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    taxAmount: number;
    totalAmount: number;
    dropoffLocation: DropoffLocation;
    pickupLocation: PickupLocation;
    recipientName: string;
    recipientPhone: string;
    deliveryInstructions: string | null;
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
    orderStatus: string;
    statusHistory: StatusHistory[];
    createdAt: string;
    updatedAt: string;
    deliveryOption: null;
  };
}

export interface Order {
  id: string;
  status?: string;
  amount?: number;
  reference?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderDetailsResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    id: string;
    orderNumber: string;
    userId: string;
    orderType: 'VENDOR';
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    taxAmount: number;
    totalAmount: number;
    deliveryOptionId: string | null;
    dropoffLocation: {
      address: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      latitude: number;
      longitude: number;
    };
    recipientName: string;
    recipientPhone: string;
    deliveryInstructions: string | null;
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
    paymentMethod: string | null;
    paymentReference: string | null;
    monnifyReference: string | null;
    orderStatus: string;
    statusHistory: StatusHistory[];
    metadata: Record<string, unknown> | null;
    createdAt: string;
    updatedAt: string;
    pickupLocation: PickupLocation;
    orderCode: string;
    respondedAt: string | null;
    reason: string | null;
    canceledAt: string | null;
    deliveredAt: string | null;
    driverAssignedAt: string | null;
    pickedUpAt: string | null;
    vendorAcceptedAt: string | null;
    vendorDeclinedAt: string | null;
    storeId: string | null;
    items: CartItem[];
    deliveryOption: string | null;
  };
}

export interface CancelOrderResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
  data: {
    success: boolean;
    message: string;
  };
}

// ─── Payment ───

export interface InitializePaymentPayload {
  orderId: string;
  paymentMethod: 'CARD';
  callbackUrl: string;
}

export interface InitializePaymentResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
  data: {
    success: boolean;
    message: string;
  };
}

export interface GetPaymentStatusResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
  data: {
    success: boolean;
    message: string;
  };
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
