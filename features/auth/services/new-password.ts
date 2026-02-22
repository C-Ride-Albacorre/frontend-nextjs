import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';

export async function newPasswordService(payload: {
  token: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Password reset failed',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
