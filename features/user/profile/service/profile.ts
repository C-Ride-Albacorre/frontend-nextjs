import { BASE_URL } from '@/config/api';
import { getCookie } from '@/utils/cookies';
import { refreshSession } from '@/utils/refresh-session';
import { redirect } from 'next/navigation';

export async function profileService() {
  const accessToken = await getCookie('accessToken');

  // Build headers - include Authorization only if we have a local token
  const headers: HeadersInit = {};
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let res = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'GET',
    headers,
    credentials: 'include', // Required for backend HTTP-only cookies (Google auth)
    cache: 'no-store',
  });

  // If unauthorized and we have a local token, try refreshing
  if (res.status === 401 && accessToken) {
    const newToken = await refreshSession();

    if (!newToken) redirect('/user/login');

    res = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${newToken}` },
      credentials: 'include',
      cache: 'no-store',
    });
  }

  // If still unauthorized (no local token or refresh failed), redirect to login
  if (res.status === 401) {
    redirect('/user/login');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message || 'Failed to fetch profile',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
