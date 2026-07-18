import MainLayout from '@/components/layout/main-layout';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import SectionLayout from '@/components/layout/section-layout';
import VendorPageSection from '@/features/admin/vendor-onboarding/components/vendors-page-section';
import { getVendorsAction } from '@/features/admin/vendor-onboarding/action';
import VendorsPageWrapper from '@/features/admin/vendor-onboarding/components/vendors-page-wrapper';

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

  return (
    <VendorsPageWrapper
      page={page}
      limit={limit}
      status={status}
      search={search}
    />
  );
}
