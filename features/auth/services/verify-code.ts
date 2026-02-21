import { BASE_URL } from '@/config/api';
import { ApiError } from '../libs/api-error';

export async function verifyOtpService(data: {
  identifier: string;
  otp: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/customer/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const result = await res.json();

    throw new ApiError(
      result?.message || 'Verification failed',
      result?.statusCode ?? res.status,
    );
  }

  return res.json();
}
