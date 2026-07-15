import ErrorState from '@/components/layout/error-state';
import { getCategoriesService } from '../service';
import CategoryPageSection from './category-page-section';
import { Barcode, LayersPlus } from 'lucide-react';
import EmptyState from '@/components/layout/empty-state';

export default async function CategoryPageWrapper() {
  try {
    const response = await getCategoriesService();

    console.log(' [CategoryPageWrapper] Response:', response);

    const data = response?.data ?? [];

    return <CategoryPageSection data={data} />;
  } catch (error) {
    console.error('Error fetching categories:', error);

    return (
      <ErrorState
        icon={<LayersPlus size={36} className="text-orange-500" />}
        title="Failed to load categories"
        message={
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.'
        }
      />
    );
  }
}
