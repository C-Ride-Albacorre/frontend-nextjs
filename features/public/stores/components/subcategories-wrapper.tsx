import {
  fetchCategoriesService,
  fetchSubcategoriesService,
} from '@/features/user/delivery/service';
import SubCategoryIcons from './subcategory-icons';
import ErrorState from '@/components/layout/error-state';
import { Tag } from 'lucide-react';
import EmptyState from '@/components/layout/empty-state';

export default async function SubCategoriesWrapper({
  categoryId,
}: {
  categoryId?: string;
}) {
  try {
    const subCategories = categoryId
      ? (await fetchSubcategoriesService(categoryId))?.data || []
      : (await fetchCategoriesService()).data.flatMap(
          (cat: any) => cat.subcategories || [],
        );

    if (subCategories.length === 0) {
      return (
        <EmptyState icon={<Tag size={36} className="text-neutral-500" />} title="No subcategories found" message="Please check back later." />
      );
    }

    return <SubCategoryIcons subCategories={subCategories} />;
  } catch (error) {
    console.error('Failed to load subcategories:', error);

    return (
   <ErrorState icon={<Tag size={36} className="text-orange-500" />}  title="Failed to load subcategories" message="Please try again later." />
    );
  }
}
