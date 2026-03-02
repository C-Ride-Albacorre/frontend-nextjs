import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />
        <SectionLayout>{children}</SectionLayout>
      </MainLayout>
    </>
  );
}
