import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import PendingApprovals from '@/features/admin/dashboard/components/pending-approvals';
import RecentAlerts from '@/features/admin/dashboard/components/recent-alert';
import DashboardStatsClient from '@/features/admin/dashboard/components/stats';
import TopDrivers from '@/features/admin/dashboard/components/top-drivers';
import TopVendors from '@/features/admin/dashboard/components/top-vendors';

export default function AdminDashboard() {
  return (
    <>
      <MainLayout>
        <AdminDashboardHeader />

        <SectionLayout>
          <DashboardStatsClient />

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
