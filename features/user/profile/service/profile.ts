import { BASE_URL } from '@/config/api';
import { getCookie } from '@/utils/cookies';

export async function profileService() {
  const accessToken = await getCookie('accessToken');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'GET',

    headers: {
      Authorization: `Bearer ${accessToken}`,
    },

    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to fetch profile', data?.statusCode ?? res.status);
  }

  return data;
}
