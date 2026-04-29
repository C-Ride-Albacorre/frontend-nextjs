import FoodMarquee from './food-marquee';
import { fetchCategoriesAction } from '@/features/user/delivery/action';
import FoodMarqueeSkeleton from './food-marquee-skeleton';
import { Suspense } from 'react';

export default async function FoodMarqueeWrapper() {
  const categories = await fetchCategoriesAction();

  return (
    <Suspense fallback={<FoodMarqueeSkeleton />}>
      <FoodMarquee categories={categories} />
    </Suspense>
  );
}
