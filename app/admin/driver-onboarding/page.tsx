
import DriverPageWrapper from '@/features/admin/driver-onboarding/components/driver-page-wrapper';

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

  return (
    <DriverPageWrapper
      page={page}
      limit={limit}
      status={status}
      search={search}
    />
  );
}
