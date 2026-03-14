import MainLayout from '@/components/layout/main-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import SectionLayout from '@/components/layout/section-layout';
import StorePageSection from '@/features/admin/stores/stores-page-section';

export default function StoresPage() {
  return (
    <>
      <MainLayout>
        <AdminDashboardHeader />

        <SectionLayout>
          <StorePageSection />
        </SectionLayout>
      </MainLayout>
    </>
  );
}
