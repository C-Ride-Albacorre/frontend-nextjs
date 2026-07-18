

export type VendorStatus =
  | 'PENDING_VERIFICATION'
  | 'PENDING_EMAIL_VERIFICATION'
  | 'PENDING_PHONE_VERIFICATION'
  | 'SUSPENDED'
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
  userId: string;
  createdAt: string;
  updatedAt: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  registrationNumber: string;
  taxId: string;
}

export interface Vendor {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  status: VendorStatus;
  createdAt: string;
  businessInfo: VendorBusinessInfo | null;
  stores: VendorStore[];
  storeCount: number;
  documents: any[];
  documentsByType: { ID_PROOF: any[]; CAC: any[]; BUSINESS_PERMIT: any[] };
  hasDocuments: boolean;
}

export interface GetVendorsApiResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    success: boolean;
    data: Vendor[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  };
}

export interface GetVendorByIdApiResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    success: boolean;
    data: VendorDetail;
  };
}
export interface VendorStore {

    id: string,
    storeName: string;
    storeDescription: string;
    storeAddress: string;
    phoneNumber: string;
    email: string;
    preparationTime: number;
    deliveryFee: number | null;
    storeLogo: string;
    status: string;
    userId: string;
    metadata: any;
    createdAt: string;
    updatedAt: string;
    approvedAt: string;
    approvedBy: string;
    rejectionReason: string | null;
    categoryId: string;
    latitude: number;
    longitude: number;
    dailyOrderLimit: number;
    _count: { products: number };
  }


export interface VendorDocument {
  id: string;
  documentType: string;
  documentUrl: string;
  createdAt: string;
}

export interface VendorDetail {
  id: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  isVerified: boolean;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  onboardingCompletedAt: string;
  phoneVerifiedAt: string;
  status: string;
  profilePicture: string | null;
  onboardingStatus: string;
  onboardingStep: number;
  approvedAt: string;
  approvedBy: string;
  rejectionReason: string | null;
  isNewUser: boolean;
  businessInfo: VendorBusinessInfo | null;
  stores: VendorStore[];
  documents: VendorDocument[];
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

// export interface GetVendorsResponse {
//   data: Vendor[];
//   meta: VendorsMeta;
// }

export interface ApproveVendorPayload {
  action: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}
