import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import StoreImageUpload from '@/features/vendor/store/components/image-upload';
import {
  OperatingHours,
  StoreDetails,
  StoreInformation,
} from '@/features/vendor/store/components/section';

export default function StorePage() {
  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StoreInformation />
            <OperatingHours />
            <div className="md:col-span-2">
              <StoreDetails />
            </div>

            <div className="md:col-span-2">
              <StoreImageUpload />
            </div>
          </div>
        </SectionLayout>
      </MainLayout>
    </>
  );
}
