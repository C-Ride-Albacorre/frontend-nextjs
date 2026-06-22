import {
  fetchCategoriesService,
  fetchSubcategoriesService,
} from '@/features/user/delivery/service';
import SubCategoryIcons from './subcategory-icons';
import ErrorState from '@/components/layout/error-state';
import { Tag } from 'lucide-react';

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

    return <SubCategoryIcons subCategories={subCategories} />;
  } catch (error) {
    console.error('Failed to load subcategories:', error);

    return (
   <ErrorState icon={<Tag size={36} className="text-orange-500" />}  title="Failed to load subcategories" message="Please try again later." />
    );
  }
}
