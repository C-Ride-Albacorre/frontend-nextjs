import { BASE_URL } from '@/config/api';
import { ApiError } from '../../libs/api-error';
import { COOKIE_KEYS, getCookie } from '@/utils/cookies';

export type LoginApiResponse = {
  status: string;
  statusCode: number;
  data: {
    success: boolean;
    status: string;
    message: string;
    accessToken: string;
    refreshToken: string;
    verificationToken?: string;
    verificationMethod: string;
    identifier: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
};

export type LoginPayload =
  | { email: string; password: string }
  | { phoneNumber: string; password: string };

export async function loginUser(
  payload: LoginPayload,
): Promise<LoginApiResponse> {
  const guestSessionId = await getCookie(COOKIE_KEYS.GUEST_SESSION_ID);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (guestSessionId) {
    headers['x-session-id'] = guestSessionId;
  }

  const res = await fetch(`${BASE_URL}/auth/customer/login`, {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  console.log('Login API error response:', data);

  if (!res.ok) {
    throw new ApiError(
      data?.message ?? 'Login failed',
      data?.statusCode ?? res.status,
      data?.reason,
    );
  }

  console.log('Login API response:', data);

  return data;
}
