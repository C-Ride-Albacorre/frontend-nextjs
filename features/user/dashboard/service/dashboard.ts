import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { getCookie } from '@/utils/cookies';
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';

export async function dashboardService() {

  const accessToken = getCookie('access_token') 

  // ✅ no token at all — redirect before even calling the API
  if (!accessToken) {
    redirect('/user/login');
  }

  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store', // ✅ never cache profile data
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch profile',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
