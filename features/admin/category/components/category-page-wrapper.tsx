import ErrorState from '@/components/layout/error-state';
import { getCategoriesService } from '../service';
import CategoryPageSection from './category-page-section';
import {  LayersPlus } from 'lucide-react';


export default async function CategoryPageWrapper() {
  try {
    const response = await getCategoriesService();


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
