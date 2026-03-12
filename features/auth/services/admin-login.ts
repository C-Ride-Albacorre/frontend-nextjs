import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';

export type loginApiResponse = {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
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

type LoginAdminPayload = {
  email: string;
  password: string;
};

export async function adminLoginService(
  payload: LoginAdminPayload,
): Promise<loginApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
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

  return data as loginApiResponse;
}
