import MainLayout from '@/components/layout/main-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import SectionLayout from '@/components/layout/section-layout';
import StoresPageSection from '@/features/admin/stores/components/stores-page-section';
import { getStoresAction } from '@/features/admin/stores/action';

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
  }>;
};

export default async function StoresPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const status = params.status || '';
  const search = params.search || '';

  let stores = [];
  let meta = { total: 0, page: 1, limit: 10, totalPages: 1 };
  let error: string | null = null;

  try {
    const data = await getStoresAction(
      page,
      limit,
      status || undefined,
      search || undefined,
    );
    stores = data.stores;
    meta = data.meta;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load stores';
  }

  return (
    <MainLayout>
      <AdminDashboardHeader />
      <SectionLayout>
        <StoresPageSection
          stores={stores}
          meta={meta}
          currentPage={page}
          currentStatus={status}
          currentSearch={search}
          error={error}
        />
      </SectionLayout>
    </MainLayout>
  );
}
