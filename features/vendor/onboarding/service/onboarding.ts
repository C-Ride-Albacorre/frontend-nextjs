// service.ts
'use server';

import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { getCookie } from '@/utils/cookies';

interface OnboardingData {
  businessName: string;
  businessType: string;
  registrationNumber: string;
  taxId: string;
  description: string;
  businessEmail: string;
  businessPhone: string;
  address: string;
  city: string;
  state: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export async function onboardingService(
  step: 1 | 2 | 3 | 4,
  data: Partial<OnboardingData>,
) {
  const accessToken = await getCookie('accessToken');

  const res = await fetch(`${BASE_URL}/auth/vendor/onboarding/${step}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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


export async function getAccessToken() {
  return getCookie('accessToken');
}
