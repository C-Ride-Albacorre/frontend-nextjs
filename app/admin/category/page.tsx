import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import CategoryPageSection from '@/features/admin/category/components/category-page-section';

export default function CategoryPage() {
  return (
    <MainLayout>
      <AdminDashboardHeader />

      <SectionLayout>
        <CategoryPageSection />
      </SectionLayout>
    </MainLayout>
  );
}
