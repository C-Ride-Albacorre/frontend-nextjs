import { BASE_URL } from '@/config/api';
import { ApiError } from '../../libs/api-error';

export type VendorLoginApiResponse = {
  status: string;
  statusCode: number;
  data: {
    success: boolean;
    status: string;
    message: string;
    phoneNumber: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    verificationToken: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    user: {
      id: string;
      email: string;
      role: string;
    };
    onboardingStatus: string;
    onboardingStep: number;
  };
};

export type VendorLoginPayload = {
  email: string;
  password: string;
};

export async function loginVendor(
  payload: VendorLoginPayload,
): Promise<VendorLoginApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/vendor/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log('Login API error response:', data);

    throw new ApiError(
      data?.message || 'Login failed',
      data?.statusCode ?? res.status,
      data?.reason,
    );
  }

  return data;
}
