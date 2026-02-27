import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import StoreForm from '@/features/vendor/store/components/store-form';

export default function StorePage() {
  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <StoreForm />
        </SectionLayout>
      </MainLayout>
    </>
  );
}
