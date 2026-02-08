import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import Benefits from '@/features/vendor/partner-program/components/benefits';
import FeeStructure from '@/features/vendor/partner-program/components/fee-structure';
import {
  PartnershipSummary,
  FeeInfo,
} from '@/features/vendor/partner-program/components/section';

export default function PartnerProgramPage() {
  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <Benefits />

          <FeeStructure />

          <PartnershipSummary />

          <FeeInfo />
        </SectionLayout>
      </MainLayout>
    </>
  );
}
