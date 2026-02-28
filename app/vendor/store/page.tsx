import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import StoreForm from '@/features/vendor/store/components/store-form';
import { getStoreAction } from '@/features/vendor/store/action';

export default async function StorePage() {
  const storeData = await getStoreAction();

  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <StoreForm initialData={storeData} />
        </SectionLayout>
      </MainLayout>
    </>
  );
}
