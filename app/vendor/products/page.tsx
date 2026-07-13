import ProductsPageSection from '@/features/vendor/products/components/products-page-section';
import { getStoresAction } from '@/features/vendor/store/action';
import EmptyState from '@/components/layout/empty-state';
import { Store } from 'lucide-react';
import ErrorState from '@/components/layout/error-state';

type Props = {
  searchParams: Promise<{
    storeId?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  try {
    const stores = await getStoresAction();

    if (stores.length === 0) {
      return (
        <EmptyState
          icon={<Store size={36} className="text-neutral-500" />}
          title="No stores found"
          message="Please add a store to manage products."
          buttonText="Create Store"
          urlPath="/vendor/store/new-store"
        />
      );
    }

    return (
      <>
        <ProductsPageSection stores={stores} />
      </>
    );
  } catch (error) {
    console.error(error);

    return (
      <ErrorState
        icon={<Store size={36} className="text-orange-500" />}
        title="Failed to load products"
        message="Please try again later."
      />
    );
  }
}
