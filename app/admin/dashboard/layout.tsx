import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <AdminDashboardHeader />

      <SectionLayout>
        {children}

        {/* <div className="grid xl:grid-cols-2 gap-8">
                <PendingApprovals />
                <RecentAlerts />
                <TopVendors />
                <TopDrivers />
              </div> */}
      </SectionLayout>
    </MainLayout>
  );
}
