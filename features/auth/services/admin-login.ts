// features/auth/services/admin-login.ts
import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';

export type AdminLoginApiResponse = {
  status: string;
  statusCode: number;
  timestamp: string;
  message?: string;
  path: string;
  data: {
    status: 'OTP_REQUIRED';
    requiresVerification: true;
    verificationIdentifier: string;
    verificationToken: string;
    verificationMethod: string;
    accessToken: null;
    refreshToken: null;
  };
};

type LoginAdminPayload = {
  email: string;
  password: string;
};

export async function adminLoginService(
  payload: LoginAdminPayload,
): Promise<AdminLoginApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Login failed',
      data?.statusCode ?? res.status,
      data?.reason,
    );
  }

  console.log('Admin Login API response:', data);

  return data as AdminLoginApiResponse;
}
