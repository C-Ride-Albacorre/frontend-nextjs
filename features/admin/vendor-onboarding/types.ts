// features/admin/vendor-onboarding/types.ts

export type VendorStatus =
  | 'PENDING_VERIFICATION'
  | 'PENDING_EMAIL_VERIFICATION'
  | 'PENDING_PHONE_VERIFICATION'
  | 'PENDING_ONBOARDING'
  | 'PENDING_DOCUMENTS'
  | 'READY_FOR_REVIEW'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'ACTIVE'
  | 'REJECTED'
  | 'SUSPENDED';

export type VendorApproveAction = 'APPROVED' | 'REJECTED';

export interface VendorBusinessInfo {
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

export interface VendorStore {
  id: string;
  storeName: string;
  status: string;
}

export interface Vendor {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  status: VendorStatus;
  createdAt: string;
  businessInfo: VendorBusinessInfo | null;
  stores: VendorStore[];
  storeCount: number;
}

export interface VendorDetail extends Vendor {
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
  onboardingStatus: string;
  onboardingStep: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  updatedAt: string;
}

export type ViewVendorModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  vendor: VendorDetail | null;
  isLoading: boolean;
  onAction: (
    vendorId: string,
    action: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

export type VendorPageSectionProps = {
  vendors: Vendor[];
  meta: VendorsMeta;
  currentPage: number;
  currentStatus: string;
  currentSearch: string;
  error: string | null;
};

export interface VendorsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetVendorsParams {
  status?: string;
  search?: string;
  hasStores?: boolean;
  page?: number;
  limit?: number;
}

export interface GetVendorsResponse {
  data: Vendor[];
  meta: VendorsMeta;
}

export interface ApproveVendorPayload {
  action: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}
