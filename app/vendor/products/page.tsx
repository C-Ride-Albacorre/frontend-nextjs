import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import ProductsPageSection from '@/features/vendor/products/components/products-page-section';
import { getProductsAction } from '@/features/vendor/products/action';
import { getStoresAction } from '@/features/vendor/store/action';
import { Product } from '@/features/vendor/products/type';

type Props = {
  searchParams: Promise<{
    storeId?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const storeId = params.storeId || null;

  const stores = await getStoresAction();
  let products: Product[] = [];

  if (storeId) {
    products = await getProductsAction(storeId);
  }

  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <ProductsPageSection
            stores={stores}
            products={products}
            selectedStoreId={storeId}
          />
        </SectionLayout>
      </MainLayout>
    </>
  );
}

