// upload-service.ts
'use server';

import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';

export async function submitOnboardingService(formData: FormData) {
  const res = await authFetch(`${BASE_URL}/auth/vendor/onboarding/submit`, {
    method: 'POST',
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