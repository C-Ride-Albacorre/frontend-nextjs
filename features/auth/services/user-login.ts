import { BASE_URL } from '@/config/api';
import { ApiError } from '../../libs/api-error';

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
  | { phoneNumber: string; password: string; countryCode: string  };

export async function loginUser(
  payload: LoginPayload,
): Promise<LoginApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/customer/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
