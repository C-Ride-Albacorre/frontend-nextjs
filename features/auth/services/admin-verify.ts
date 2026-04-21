import { BASE_URL } from '@/config/api';
import { ApiError } from '../../libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';

export async function verifyAdminOtpService(data: {
  identifier: string;
  otp: string;
  verificationToken: string;
}) {
  const res = await authFetch(`${BASE_URL}/auth/admin/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Verification failed',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}
