import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';

export async function logoutService(accessToken: string) {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  // 200 or 401 — either way we clear cookies locally
  if (!res.ok && res.status !== 401) {
    const data = await res.json();
    throw new ApiError(
      data?.message || 'Logout failed',
      data?.statusCode ?? res.status,
    );
  }
}