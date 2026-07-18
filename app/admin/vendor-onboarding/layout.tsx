import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';

export default function VendorOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <AdminDashboardHeader />

      <SectionLayout>{children}</SectionLayout>
    </MainLayout>
  );
}
