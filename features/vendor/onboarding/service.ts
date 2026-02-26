// business-info/service.ts
import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { getCookie } from '@/utils/cookies';

interface OnboardingData {
  businessName: string;
  businessType: string;
  businessRegistrationNo: string;
  tinNo: string;
  businessDescription: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessBankName: string;
  businessAccountNumber: string;
  businessAccountName: string;
}

export async function onboardingService(
  step: 1 | 2 | 3 | 4 | 5,
  data: Partial<OnboardingData>,
) {
  const vendorId = await getCookie('vendor_id');
  const accessToken = await getCookie('accessToken');

  if (!vendorId) throw new ApiError('Vendor session expired.', 401);

  const res = await fetch(`${BASE_URL}/auth/vendor/onboarding/${step}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || `Failed to save step ${step}`,
      result?.statusCode ?? res.status,
    );
  }

  return result;
}
