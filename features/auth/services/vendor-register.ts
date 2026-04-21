import { BASE_URL } from '@/config/api';
import { RegisterFormData } from '../libs/register.schema';

export type RegisterApiResponse = {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  message?: string;
  data: {
    success: string;
    message: string;
    accessToken: string;
    verificationToken: string;
    user: {
      id: string;
      email: string;
      phoneNumber: string;
      status: string;
      role: string;
    };
    nextSteps: string[];
  };
};

type RegisterUserPayload = Omit<RegisterFormData, 'password'> & {
  password: string;
};

export async function registerVendorService(
  payload: RegisterUserPayload,
): Promise<RegisterApiResponse> {
  const response = await fetch(`${BASE_URL}/auth/vendor/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Registration failed');
  }

  return data as RegisterApiResponse;
}
