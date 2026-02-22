import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';

type Payload = {
  email?: string;
  phoneNumber?: string;
};

export type ResetApiResponse = {
  status: string;
  statusCode: number;
  data: {
    success: boolean;
    message: string;
    identifier: string;
    method: 'email' | 'phone';
  };
};

export async function resetPasswordService(
  payload: Payload,
): Promise<ResetApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Password reset failed',
      data?.statusCode ?? res.status,
      data?.reason,
    );
  }

  return data;
}
