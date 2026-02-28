import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import StatCard from '@/components/layout/stat-card';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import PendingApprovals from '@/features/admin/dashboard/components/pending-approvals';
import RecentAlerts from '@/features/admin/dashboard/components/recent-alert';
import TopDrivers from '@/features/admin/dashboard/components/top-drivers';
import TopVendors from '@/features/admin/dashboard/components/top-vendors';
import {
  Banknote,
  Package,
  Store,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <>
      <MainLayout>
        <AdminDashboardHeader />

        <SectionLayout>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCard
              icon={<Banknote size={20} className="text-[#10B981]" />}
              iconBackground=" bg-[#10B981]/10"
              title="Total Revenue"
              value="₦1,250,000"
              trend="5.2%"
              positive
              trendDuration="since last month"
            />

            <StatCard
              icon={<Package size={20} className="text-primary" />}
              iconBackground="bg-primary/10"
              title="Total Orders"
              value="1,200"
              trend="2.8%"
              positive
              trendDuration="since last month"
            />

            <StatCard
              icon={<TrendingUp size={20} className="text-[#824DEE]" />}
              iconBackground="bg-[#824DEE]/10"
              title="Platform Fees"
              value="18 min"
              trend="8.5%"
              negative
              trendDuration="since last month"
            />

            <StatCard
              icon={<Truck size={20} className="text-[#2C68E7]" />}
              iconBackground="  bg-[#2C68E7]/10"
              title="Active Drivers"
              value="85"
              trend="1.2%"
              trendDuration="since last month"
            />

            <StatCard
              icon={<Store size={20} className="text-[#E88D09]" />}
              iconBackground="bg-[#E88D09]/10"
              title="Active Vendors"
              value="50"
              trend="3.4%"
              positive
              trendDuration="since last month"
            />

            <StatCard
              icon={<Users size={20} className="text-[#6B7280]" />}
              iconBackground="bg-[#6B7280]/10"
              title="Total Customers"
              value="500"
              trend="4.1%"
              positive
              trendDuration="since last month"
            />
          </div>

          <div className="grid xl:grid-cols-2 gap-8">
            <PendingApprovals />
            <RecentAlerts />
            <TopVendors />
            <TopDrivers />
          </div>
        </SectionLayout>
      </MainLayout>
    </>
  );
}
