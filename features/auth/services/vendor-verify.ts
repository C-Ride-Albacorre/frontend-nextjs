import { BASE_URL } from '@/config/api';
import { ApiError } from '../../libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';

export async function verifyVendorPhoneService(data: {
  phoneNumber: string;
  otp: string;
}) {
  const res = await authFetch(`${BASE_URL}/auth/user/verify/phone`, {
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

export async function verifyVendorEmailService(data: {
  email: string;
  otp: string;
}) {
  const res = await authFetch(`${BASE_URL}/auth/user/verify/email`, {
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
