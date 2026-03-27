'use client';

import {
  Package,
  RefreshCcw,
  ShieldUser,
  Store,
  UserRoundPen,
  Users,
} from 'lucide-react';
import StatCard from '@/components/layout/stat-card';
import { Button } from '@/components/ui/buttons/button';
import ErrorMessage from '@/components/layout/error-message';
import { useRouter } from 'next/navigation';
import type { DashboardStats } from '../service';

type Props = {
  data: DashboardStats | null;
  error: string | null;
};

export default function DashboardStats({ data, error }: Props) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {error && (
        <div className="space-y-4 flex justify-between items-center">
          <ErrorMessage message={error} />

          <Button
            variant="white"
            leftIcon={<RefreshCcw size={14} />}
            size="icon"
            onClick={() => router.refresh()}
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
          value={data?.totalUsers}
          trend="4.1%"
          positive
          trendDuration="since last month"
        />

        <StatCard
          icon={<ShieldUser size={20} className="text-[#E88D09]" />}
          iconBackground="bg-[#E88D09]/10"
          title="Active Vendors"
          value={data?.totalVendors ?? ''}
          trend="3.4%"
          positive
          trendDuration="since last month"
        />

        <StatCard
          icon={<Package size={20} className="text-[#824DEE]" />}
          iconBackground="bg-[#824DEE]/10"
          title="Total Products"
          value={data?.totalProducts}
          trend="8.5%"
          negative
          trendDuration="since last month"
        />

        <StatCard
          icon={<Store size={20} className="text-[#2C68E7]" />}
          iconBackground="bg-[#2C68E7]/10"
          title="Active Stores"
          value={data?.totalStores}
          trend="1.2%"
          trendDuration="since last month"
        />

        <StatCard
          icon={<UserRoundPen size={20} className="text-[#10B981]" />}
          iconBackground="bg-[#10B981]/10"
          title="Pending Approvals Vendors"
          value={data?.pendingApprovals?.vendors}
          trend="5.2%"
          positive
          trendDuration="since last month"
        />

        <StatCard
          icon={<Store size={20} className="text-primary" />}
          iconBackground="bg-primary/10"
          title="Pending Approvals Stores"
          value={data?.pendingApprovals?.stores}
          trend="2.8%"
          positive
          trendDuration="since last month"
        />
      </div>
    </div>
  );
}
