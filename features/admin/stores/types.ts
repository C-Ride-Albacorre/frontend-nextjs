export type StoreStatus =
  | 'PENDING_APPROVAL'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'REJECTED'
  | 'CLOSED';

export type StoreApproveAction = 'ACTIVE' | 'REJECTED';

export interface StoreUser {
  id: string;
  name: string;
  businessName: string;
  email: string;
}

export interface StoreProduct {
  id: string;
  productName: string;
  productCategory: string;
  sku: string;
  description: string;
  productType: string;
  stockStatus: string;
  productStatus: string;
  basePrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  storeId: string;
  metadata: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStore {
  id: string;
  name: string;
  description: string | null;
  email: string;
  phoneNumber: string;
  status: StoreStatus;
  totalProducts: number;
  createdAt: string;
  user: StoreUser;
}

export interface StoreDetail {
  id: string;
  storeName: string;
  storeCategory: string;
  storeDescription: string | null;
  storeAddress: string;
  phoneNumber: string;
  email: string;
  minimumOrder: number;
  preparationTime: number;
  deliveryFee: number;
  storeLogo: string | null;
  status: StoreStatus;
  userId: string;
  metadata: unknown;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    role: string;
    businessInfo: {
      businessName: string;
      businessType: string;
      description: string;
      address: string;
      city: string;
      state: string;
    } | null;
  };
  products: StoreProduct[];
}

export interface StoresMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApproveStorePayload {
  action: StoreApproveAction;
  rejectionReason?: string;
}
