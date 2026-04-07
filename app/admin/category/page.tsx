import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import { getCategoriesAction } from '@/features/admin/category/action';
import CategoryPageSection from '@/features/admin/category/components/category-page-section';

export default async function CategoryPage() {


  const data = await getCategoriesAction()

  return (
    <MainLayout>
      <AdminDashboardHeader />

      <SectionLayout>
        <CategoryPageSection data={data} />
      </SectionLayout>
    </MainLayout>
  );
}
