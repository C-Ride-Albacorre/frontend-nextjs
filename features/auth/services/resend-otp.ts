import { BASE_URL } from '@/config/api';

export async function resendOtpService(data: { identifier: string }) {
  const res = await fetch(`${BASE_URL}/auth/customer/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || 'Failed to resend OTP');
  }

  return result;
}
