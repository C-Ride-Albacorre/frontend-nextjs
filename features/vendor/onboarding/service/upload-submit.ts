// upload-service.ts
'use server';

import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { getCookie } from '@/utils/cookies';

export async function submitOnboardingService(formData: FormData) {
  const accessToken = await getCookie('accessToken');

  const res = await fetch(`${BASE_URL}/auth/vendor/onboarding/submit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to submit onboarding',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}