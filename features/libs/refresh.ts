import { BASE_URL } from '@/config/api';
import { ApiError } from './api-error';

export async function refreshTokenService(payload: {
  refreshToken: string;
  previousAccessToken: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      refreshToken: payload.refreshToken,
      previousAccessToken: payload.previousAccessToken,

      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Session expired',
      data?.statusCode ?? res.status,
    );
  }

  return data as {
    accessToken: string;
    refreshToken?: string;
    user: { id: string; name: string; email: string };
  };
}
