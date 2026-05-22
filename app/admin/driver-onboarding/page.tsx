import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import { getDriverByIdAction, getDriversAction } from '@/features/admin/driver-onboarding/action';
import DriverPageSection from '@/features/admin/driver-onboarding/components/drivers-page-section';

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
  }>;
};

export default async function DriverOnboardingPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const status = params.status || '';
  const search = params.search || '';

  let drivers = [];
  let meta = { total: 0, page: 1, limit: 10, totalPages: 1 };
  let error: string | null = null;

  try {
    const data = await getDriversAction(
      page,
      limit,
      status || undefined,
      search || undefined,
    );
    drivers = data.drivers;
    meta = data.meta;

    console.log(' Driver Onboarding Page - Drivers:', drivers);
  } catch (error) {
    error = error instanceof Error ? error.message : 'Failed to load drivers';
  }
  return (
    <MainLayout>
      <AdminDashboardHeader />

      <SectionLayout>
        <DriverPageSection
          drivers={drivers}
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
