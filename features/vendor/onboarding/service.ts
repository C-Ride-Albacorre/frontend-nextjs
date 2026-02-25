// business-info/service.ts
import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { getCookie } from '@/utils/cookies';

export async function onboardingService(data: {
  businessName: string;
  businessType: string;
  businessDescription?: string;
}) {
  const vendorId = await getCookie('vendor_id');
  const accessToken = await getCookie('accessToken');

  if (!vendorId) throw new ApiError('Vendor session expired.', 401);

  const res = await fetch(`${BASE_URL}/vendor/onboarding/${vendorId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    //   Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to submit onboarding data',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}
