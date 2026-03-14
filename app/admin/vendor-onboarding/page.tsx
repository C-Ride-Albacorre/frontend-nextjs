import MainLayout from '@/components/layout/main-layout';
import AdminDashboard from '../dashboard/page';
import AdminDashboardHeader from '@/components/ui/headers/admin-dashboard';
import SectionLayout from '@/components/layout/section-layout';
import VendorToolbar from '@/components/layout/vendor-tool-bar';
import VendorPageSection from '@/features/admin/vendor-onboarding/vendors-page-section';

export default function VendorOnboardingPage() {
  return (
    <>
      <MainLayout>
        <AdminDashboardHeader />

        <SectionLayout>
          {/* <VendorToolbar
            searchPlaceholder="Search vendors by name, email or ID..."
            sort=""
            onSortChange={() => {}}
            categories={['All   Categories', 'Food', 'Retail', 'Services']}
          /> */}

          <VendorPageSection />
        </SectionLayout>
      </MainLayout>
    </>
  );
}
