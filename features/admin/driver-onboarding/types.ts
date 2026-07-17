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

export interface GetDriversResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    success: true;
    data: {
      id: string;
      name: string;
      email: string;
      phoneNumber: string;
      status: string;
      createdAt: string;
    }[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  };
}

export interface DriverProps {
  id: string;
  email: string;
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'DISPATCHER';
  isActive: boolean;
  refreshTokenHash: string | null;
  referralCode: string | null;
  referredBy: string | null;
  lastLoginAt: string | null;
  isVerified: boolean;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  onboardingCompletedAt: string | null;
  phoneVerifiedAt: string | null;
  status: 'PENDING_EMAIL_VERIFICATION';
  profilePicture: string | null;
  onboardingStatus: 'NOT_STARTED';
  onboardingStep: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  isNewUser: boolean;
  countryCode: string | null;
  fcmToken: string | null;
  deviceType: string | null;
  driverProfile: DriverProfile | null;
  orders: any[];
  documents: DriverDocument[];
}

export interface GetDriverByIdResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    success: boolean;
    data: DriverProps;
  };
}

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
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
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
  driver: DriverProps | null;
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

export interface ApproveDriverPayload {
  action: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}
