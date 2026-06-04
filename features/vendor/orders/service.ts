import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { VendorOrderActionPayload } from './types';

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    data: {
      id: string;
      orderNumber: string;
      orderCode: string;
      createdAt: string;
      orderStatus: string;
      paymentStatus: string;
      user: {
        id: string;
        email: string;
        phoneNumber: string | null;
        countryCode: string | null;
        password: string;
        firstName: string;
        lastName: string;
        role: string;
        isActive: boolean;
        refreshTokenHash: string | null;
        referralCode: string | null;
        referredBy: string | null;
        lastLoginAt: string;
        isVerified: boolean;
        verifiedAt: string;
        createdAt: string;
        updatedAt: string;
        emailVerifiedAt: string;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        onboardingCompletedAt: string | null;
        phoneVerifiedAt: string | null;
        status: string;
        profilePicture: string | null;
        onboardingStatus: string;
        onboardingStep: string | null;
        approvedAt: string | null;
        approvedBy: string | null;
        rejectionReason: string | null;
        isNewUser: boolean;
        fcmToken: string | null;
        deviceType: string | null;
      };
      items: any[];
      vendorSummary: {
        itemCount: number;
        totalQuantity: number;
        subtotal: number;
      };
    };
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function getVendorOrdersService({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ApiResponse> {
  const res = await authFetch(
    `${BASE_URL}/vendor/orders?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to fetch store',
      result?.statusCode ?? res.status,
    );
  }

  return result as ApiResponse;
}

export async function vendorOrderActionService({
  orderId,
  payload,
}: VendorOrderActionPayload) {
  console.log(' Performing vendor order action service with payload:', {
    orderId,
    payload,
  });

  const res = await authFetch(`${BASE_URL}/vendor/orders/${orderId}/action`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  console.log(' Vendor order action service response:', result);

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to perform order action',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}
