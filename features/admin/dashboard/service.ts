import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';

export type DashboardStats = {
  totalUsers: number;
  totalVendors: number;
  totalStores: number;
  totalProducts: number;
  pendingApprovals: {
    vendors: number;
    stores: number;
  };
  approved: {
    vendors: number;
    stores: number;
  };
};

export async function dashboardStatsService() {
  const res = await authFetch(`${BASE_URL}/admin/dashboard/stats`, {
    method: 'GET',
  });

  if (res.status === 401) {
    redirect('/admin/login');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch dashboard stats',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
