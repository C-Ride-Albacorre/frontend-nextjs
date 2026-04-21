import { getStoreAction } from '@/features/vendor/store/action';
import AddStore from '@/features/vendor/store/components/add-store';
import StoreCatalogueWrapper from '@/features/vendor/store/components/store-catalogue-wrapper';

export default async function StorePage() {
  const storeData = await getStoreAction();

  console.log(' Store Data:', storeData);

  return (
    <>
      <AddStore />

      <StoreCatalogueWrapper storeData={storeData} />
    </>
  );
}
