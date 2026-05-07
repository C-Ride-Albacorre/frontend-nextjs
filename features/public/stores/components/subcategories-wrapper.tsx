import {
  fetchCategoriesAction,
  fetchSubcategoriesAction,
} from '@/features/user/delivery/action';
import SubCategoryIcons from './subcategory-icons';

export default async function SubCategoriesWrapper({
  categoryId,
}: {
  categoryId?: string;
}) {
  let subCategories: any[] = [];

  console.log('category id in SubCategoriesWrapper:', categoryId);



  if (categoryId) {
    subCategories = await fetchSubcategoriesAction(categoryId);
  } else {
    const categories = await fetchCategoriesAction();
    subCategories = categories.flatMap((cat: any) => cat.subcategories || []);
  }

  return <SubCategoryIcons subCategories={subCategories} />;
}
