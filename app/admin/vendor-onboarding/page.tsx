import MainLayout from '@/components/layout/main-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import SectionLayout from '@/components/layout/section-layout';
import VendorPageSection from '@/features/admin/vendor-onboarding/components/vendors-page-section';
import { getVendorsAction } from '@/features/admin/vendor-onboarding/action';

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
  }>;
};

export default async function VendorOnboardingPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const status = params.status || '';
  const search = params.search || '';

  let vendors = [];
  let meta = { total: 0, page: 1, limit: 10, totalPages: 1 };
  let error: string | null = null;

  try {
    const data = await getVendorsAction(
      page,
      limit,
      status || undefined,
      search || undefined,
    );
    vendors = data.vendors;
    meta = data.meta;
  } catch (error) {
    error = error instanceof Error ? error.message : 'Failed to load vendors';
  }

  return (
    <MainLayout>
      <AdminDashboardHeader />
      <SectionLayout>
        <VendorPageSection
          vendors={vendors}
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
