import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import PendingApprovals from '@/features/admin/dashboard/components/pending-approvals';
import RecentAlerts from '@/features/admin/dashboard/components/recent-alert';
import DashboardStats from '@/features/admin/dashboard/components/stats';
import TopDrivers from '@/features/admin/dashboard/components/top-drivers';
import TopVendors from '@/features/admin/dashboard/components/top-vendors';
import { getDashboardStatsAction } from '@/features/admin/dashboard/action';

export const revalidate = 60;

export default async function AdminDashboard() {
  let data = null;
  let error: string | null = null;

  try {
    data = await getDashboardStatsAction();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load dashboard stats';
  }

  return (
    <>
      <MainLayout>
        <AdminDashboardHeader />

        <SectionLayout>
          <DashboardStats data={data} error={error} />

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
