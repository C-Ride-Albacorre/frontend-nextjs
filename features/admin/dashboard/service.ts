import { BASE_URL } from '@/config/api';
import { authRequest } from '@/libs/api/auth-request';

export type DashboardStats = {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
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
};

export async function dashboardStatsService() {
  return await authRequest<DashboardStats>(
    `${BASE_URL}/admin/dashboard/stats`,
    {
      nextTags: ['dashboard-stats'],
    },
  );
}
