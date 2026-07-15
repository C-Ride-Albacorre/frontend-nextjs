import ErrorState from '@/components/layout/error-state';
import StoreCatalogueWrapper from './store-catalogue-wrapper';
import { getStoreService } from '@/features/vendor/store/service';
import { AlertCircle } from 'lucide-react';
import EmptyState from '@/components/layout/empty-state';
export default async function StoreCatalogueData() {
  try {
    const storeData = await getStoreService();

    if (!storeData || !storeData.data || storeData.data.length === 0) {
      return (
        <EmptyState
          icon={<AlertCircle size={36} className="text-neutral-500" />}
          title="No Store Found"
          message="We couldn't find any store data. Please add a store to continue."
          buttonText="Add Store"
          urlPath="/vendor/store/new-store"
        />
      );
    }

    return <StoreCatalogueWrapper storeData={storeData.data} />;
  } catch (error) {
    console.error('Error fetching store data:', error);
    return (
      <ErrorState
        icon={<AlertCircle size={36} className="text-orange-500" />}
        title="Something went wrong!"
        message={
          error instanceof Error
            ? error.message
            : 'Failed to load store data. Please try again later.'
        }
      />
    );
  }
}
