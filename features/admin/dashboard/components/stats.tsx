import { Package, ShieldUser, Store, UserRoundPen, Users } from 'lucide-react';
import StatCard from '@/features/admin/dashboard/components/stat-card';
import { dashboardStatsService, type DashboardStats } from '../service';
import ErrorMessage from '@/components/layout/error-message';

export default async function DashboardStats() {
  try {
    const response = await dashboardStatsService();

    console.log(' [DashboardStats] Response:', response);

    const data = response?.data.data;

    console.log(' [DashboardStats] Data:', data);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<Users size={20} className="text-[#6B7280]" />}
            iconBackground="bg-[#6B7280]/10"
            title="Total Customers"
            value={data?.totalUsers}
            // trend="4.1%"
            // positive
            // trendDuration="since last month"
          />

          <StatCard
            icon={<ShieldUser size={20} className="text-[#E88D09]" />}
            iconBackground="bg-[#E88D09]/10"
            title="Active Vendors"
            value={data?.totalVendors}
            // trend="3.4%"
            // positive
            // trendDuration="since last month"
          />

          <StatCard
            icon={<Package size={20} className="text-[#824DEE]" />}
            iconBackground="bg-[#824DEE]/10"
            title="Total Products"
            value={data?.totalProducts}
            // trend="8.5%"
            // negative
            // trendDuration="since last month"
          />

          <StatCard
            icon={<Store size={20} className="text-[#2C68E7]" />}
            iconBackground="bg-[#2C68E7]/10"
            title="Active Stores"
            value={data?.totalStores}
            // trend="1.2%"
            // trendDuration="since last month"
          />

          <StatCard
            icon={<UserRoundPen size={20} className="text-[#10B981]" />}
            iconBackground="bg-[#10B981]/10"
            title="Pending Approvals Vendors"
            value={data?.pendingApprovals?.vendors}
            // trend="5.2%"
            // positive
            // trendDuration="since last month"
          />

          <StatCard
            icon={<Store size={20} className="text-primary" />}
            iconBackground="bg-primary/10"
            title="Pending Approvals Stores"
            value={data?.pendingApprovals?.stores}
            // trend="2.8%"
            // positive
            // trendDuration="since last month"
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('', error);

    return (
      <section className="space-y-2">
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : 'Something went wrong! Please try again later'
          }
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCard
              icon={<Users size={20} className="text-[#6B7280]" />}
              iconBackground="bg-[#6B7280]/10"
              title="Total Customers"
            />

            <StatCard
              icon={<ShieldUser size={20} className="text-[#E88D09]" />}
              iconBackground="bg-[#E88D09]/10"
              title="Active Vendors"
            />

            <StatCard
              icon={<Package size={20} className="text-[#824DEE]" />}
              iconBackground="bg-[#824DEE]/10"
              title="Total Products"
            />

            <StatCard
              icon={<Store size={20} className="text-[#2C68E7]" />}
              iconBackground="bg-[#2C68E7]/10"
              title="Active Stores"
            />

            <StatCard
              icon={<UserRoundPen size={20} className="text-[#10B981]" />}
              iconBackground="bg-[#10B981]/10"
              title="Pending Approvals Vendors"
            />

            <StatCard
              icon={<Store size={20} className="text-primary" />}
              iconBackground="bg-primary/10"
              title="Pending Approvals Stores"
            />
          </div>
        </div>
      </section>
    );
  }
}
