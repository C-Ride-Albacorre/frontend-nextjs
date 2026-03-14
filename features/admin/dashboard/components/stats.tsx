'use client';

import {
  Package,
  RefreshCcw,
  RefreshCw,
  ShieldUser,
  Store,
  UserRoundPen,
  Users,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import StatCard from '@/components/layout/stat-card';
import { getDashboardStatsAction } from '../action';
import { Button } from '@/components/ui/buttons/button';
import ErrorMessage from '@/components/layout/error-message';
import { refresh } from 'next/cache';

export default function DashboardStatsClient() {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStatsAction,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="space-y-4">
      {isError && (
        <div className="space-y-4 flex justify-between items-center">
          <ErrorMessage
            message={
              isError
                ? (error as Error)?.message || 'Failed to load dashboard stats'
                : 'An unknown error occurred'
            }
          />

          <Button
            variant="white"
            leftIcon={<RefreshCcw size={14} />}
            size="icon"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<Users size={20} className="text-[#6B7280]" />}
          iconBackground="bg-[#6B7280]/10"
          title="Total Customers"
          value={isPending ? undefined : data?.totalUsers}
          trend="4.1%"
          positive
          trendDuration="since last month"
        />

        <StatCard
          icon={<ShieldUser size={20} className="text-[#E88D09]" />}
          iconBackground="bg-[#E88D09]/10"
          title="Active Vendors"
          value={isPending ? undefined : data?.totalVendors}
          trend="3.4%"
          positive
          trendDuration="since last month"
        />

        <StatCard
          icon={<Package size={20} className="text-[#824DEE]" />}
          iconBackground="bg-[#824DEE]/10"
          title="Total Products"
          value={isPending ? undefined : data?.totalProducts}
          trend="8.5%"
          negative
          trendDuration="since last month"
        />

        <StatCard
          icon={<Store size={20} className="text-[#2C68E7]" />}
          iconBackground="bg-[#2C68E7]/10"
          title="Active Stores"
          value={isPending ? undefined : data?.totalStores}
          trend="1.2%"
          trendDuration="since last month"
        />

        <StatCard
          icon={<UserRoundPen size={20} className="text-[#10B981]" />}
          iconBackground="bg-[#10B981]/10"
          title="Pending Approvals Vendors"
          value={isPending ? undefined : data?.pendingApprovals?.vendors}
          trend="5.2%"
          positive
          trendDuration="since last month"
        />

        <StatCard
          icon={<Store size={20} className="text-primary" />}
          iconBackground="bg-primary/10"
          title="Pending Approvals Stores"
          value={isPending ? undefined : data?.pendingApprovals?.stores}
          trend="2.8%"
          positive
          trendDuration="since last month"
        />
      </div>
    </div>
  );
}
