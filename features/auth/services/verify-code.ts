import { BASE_URL } from '@/config/api';

export async function verifyOtpService(data: {
  identifier: string;
  otp: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/customer/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
}
