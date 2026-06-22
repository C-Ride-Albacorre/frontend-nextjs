import { fetchCategoriesService } from '@/features/user/delivery/service';
import FoodMarquee from './food-marquee';
// import { fetchCategoriesAction } from '@/features/user/delivery/action';
import FoodMarqueeSkeleton from './food-marquee-skeleton';
import { Suspense } from 'react';
import ErrorState from '@/components/layout/error-state';
import { Package } from 'lucide-react';

export default async function FoodMarqueeWrapper() {
  try {
    const { data } = await fetchCategoriesService();

    const categories = data;

    console.log(' categories in FoodMarqueeWrapper:', categories);

    return (
      <Suspense fallback={<FoodMarqueeSkeleton />}>
        <FoodMarquee categories={categories} />
      </Suspense>
    );
  } catch (error) {
    console.error('Failed to load categories:', error);
    return (
      <ErrorState
        icon={<Package size={36} className="text-orange-500" />}
        title="Failed to load categories"
        message="Please try again later."
      />
    );
  }
}
