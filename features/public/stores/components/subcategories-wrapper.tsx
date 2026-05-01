import {
  fetchCategoriesAction,
  fetchSubcategoriesAction,
} from '@/features/user/delivery/action';
import SubCategoryIcons from './subcategory-icons';

export default async function SubCategoriesWrapper({ id }: { id: string }) {
  let subCategories: any[] = [];

  console.log('category id in SubCategoriesWrapper:', id);

  if (id) {
    subCategories = await fetchSubcategoriesAction(id);
  } else {
    const categories = await fetchCategoriesAction();
    subCategories = categories.flatMap((cat: any) => cat.subcategories || []);
  }

  return <SubCategoryIcons subCategories={subCategories} />;
}
