// features/admin/stores/types.ts

export type StoreStatus =
  | 'PENDING_APPROVAL'
  | 'ACTIVE'
  | 'REJECTED'
  | 'SUSPENDED'
  | 'INACTIVE';

export type StoreApproveAction = 'ACTIVE' | 'REJECTED';

// ─── Store List (from GET /admin/stores) ────────────────────────────────────

export interface StoreListUser {
  id: string;
  name: string;
  businessName: string;
  email: string;
}

export interface Store {
  id: string;
  name: string;
  description: string | null;
  email: string;
  phoneNumber: string;
  status: StoreStatus;
  totalProducts: number;
  createdAt: string;
  user: StoreListUser;
}

export interface StoresMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Store Detail (from GET /admin/stores/:storeId) ─────────────────────────

export interface StoreDetailBusinessInfo {
  id: string;
  businessName: string;
  businessType: string;
  description: string;
  businessPhone: string;
  businessEmail: string;
  address: string;
  city: string;
  state: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  registrationNumber: string;
  taxId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreDetailUser {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  verifiedAt: string | null;
  isEmailVerified: boolean;
  emailVerifiedAt: string | null;
  isPhoneVerified: boolean;
  phoneVerifiedAt: string | null;
  onboardingCompletedAt: string | null;
  status: string;
  onboardingStatus: string;
  onboardingStep: number | null;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  businessInfo: StoreDetailBusinessInfo | null;
}

export interface StoreProduct {
  id: string;
  productName: string;
  subcategoryId: string;
  sku: string;
  description: string;
  productType: string;
  stockStatus: string;
  productStatus: string;
  basePrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreDetail {
  id: string;
  storeName: string;
  categoryId: string;
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
  user: StoreDetailUser;
  products: StoreProduct[];
}

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface ApproveStorePayload {
  action: StoreApproveAction;
  rejectionReason?: string;
}

export interface GetStoresParams {
  status?: string;
  search?: string;
  vendorId?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export type StoreRowProps = {
  store: Store;
  onView: (store: Store) => void;
  onAction: (
    storeId: string,
    action: 'ACTIVE' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};
