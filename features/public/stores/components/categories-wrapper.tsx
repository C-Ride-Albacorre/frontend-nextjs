

import RetryButton from '@/components/ui/buttons/retry-button';
import { fetchCategoriesAction } from '@/features/user/delivery/action';
import CategoryIcons from './category-icons';
import { div } from 'framer-motion/client';

export default async function CategoriesWrapper() {
  try {
    const categories = await fetchCategoriesAction();
    return  <CategoryIcons categories={categories} />;
  } catch (err) {
    console.error(err);
    return <RetryButton />;
  }
}
