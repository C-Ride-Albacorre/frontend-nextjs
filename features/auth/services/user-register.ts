import { BASE_URL } from '@/config/api';
import { RegisterFormData } from '../libs/register.schema';

export type RegisterApiResponse = {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  message?: string;
  data: {
    status: string;
    requiresVerification: boolean;
    registrationMethod: string;
    verificationIdentifier: string;
  };
};

type RegisterUserPayload = Omit<RegisterFormData, 'password'> & {
  password: string;
};

export async function registerUser(
  payload: RegisterUserPayload,
): Promise<RegisterApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/customer/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Registration failed');
  }

  return data as RegisterApiResponse;
}
