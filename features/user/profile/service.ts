import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';

export async function profileService() {
  const res = await authFetch(`${BASE_URL}/auth/profile`, {
    method: 'GET',
    cache: 'no-store',
  });

  // If still unauthorized after auto-refresh, redirect to login
  if (res.status === 401) {
    redirect('/user/login');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch profile',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
