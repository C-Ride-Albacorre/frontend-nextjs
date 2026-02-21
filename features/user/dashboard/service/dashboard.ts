import { BASE_URL } from '@/config/api';
import { cookies } from 'next/headers';

export async function dashboardService() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;

  const res = await fetch(`${BASE_URL}/dashboard`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to fetch dashboard data');
  }

  return data;
}
