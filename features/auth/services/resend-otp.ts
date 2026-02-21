import { BASE_URL } from '@/config/api';
import { ApiError } from '../libs/api-error';

export async function resendOtpService(data: { identifier: string }) {
  const res = await fetch(`${BASE_URL}/auth/customer/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to resend OTP',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}
