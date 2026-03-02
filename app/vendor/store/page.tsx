import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import { getStoreAction } from '@/features/vendor/store/action';
import AddStore from '@/features/vendor/store/components/add-store';
import StoreCatalogueWrapper from '@/features/vendor/store/components/store-catalogue-wrapper';

export default async function StorePage() {
  const storeData = await getStoreAction();

  return (
    <>
      <AddStore />

      <StoreCatalogueWrapper storeData={storeData} />
    </>
  );
}
