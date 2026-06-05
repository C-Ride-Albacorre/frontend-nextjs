import { BASE_URL } from '@/config/api';
import { ApiError } from './api-error';

export type RefreshApiResponse = {
  status: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
};

export async function refreshTokenService(payload: {
  refreshToken: string;
}): Promise<RefreshApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: payload.refreshToken,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Session expired',
      data?.statusCode ?? res.status,
    );
  }

  return data as RefreshApiResponse;
}
