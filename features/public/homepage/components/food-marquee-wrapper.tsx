import FoodMarquee from './food-marquee';
import { fetchCategoriesAction } from '@/features/user/delivery/action';

export default async function FoodMarqueeWrapper() {
  const categories = await fetchCategoriesAction();

  return <FoodMarquee categories={categories} />;
}
