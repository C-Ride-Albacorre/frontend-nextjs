// features/admin/driver-onboarding/types.ts

export type DriverStatus =
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

export type DriverApproveAction = 'APPROVED' | 'REJECTED';

export interface DriverProfile {
  id: string;
  status: string;
 vehicleType: string;
 vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  description: string;
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

export interface DriverStore {
  id: string;
  storeName: string;
  status: string;
}

export interface Driver {
  id: string;
  email: string;
  name: string;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  status: DriverStatus;
  createdAt: string;
  driverProfile: DriverProfile | null;
  stores: DriverStore[];
  storeCount: number;
}

export interface DriverDocument {
  id: string;
  documentType: string;
  documentUrl: string;
  createdAt: string;
}

export interface DriverDetail extends Driver {
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
  documents: DriverDocument[];
}

export type ViewDriverModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  driver: DriverDetail | null;
  isLoading: boolean;
  onAction: (
    driverId: string,
    action: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

export type DriverPageSectionProps = {
  drivers: Driver[];
  meta: DriversMeta;
  currentPage: number;
  currentStatus: string;
  currentSearch: string;
  error: string | null;
};

export interface DriversMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetDriversParams {
  status?: string;
  search?: string;
  hasStores?: boolean;
  page?: number;
  limit?: number;
}

export interface GetDriversResponse {
  data: Driver[];
  meta: DriversMeta;
}

export interface ApproveDriverPayload {
  action: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}
