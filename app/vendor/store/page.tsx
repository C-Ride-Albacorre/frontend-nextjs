import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import { Button } from '@/components/ui/buttons/button';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import StoreImageUpload from '@/features/vendor/store/components/image-upload';
import {
  OperatingHours,
  StoreDetails,
  StoreInformation,
} from '@/features/vendor/store/components/section';
import { CheckCircle } from 'lucide-react';

export default function StorePage() {
  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StoreInformation />
            <OperatingHours />
            <div className="md:col-span-2">
              <StoreDetails />
            </div>

            <div className="md:col-span-2">
              <StoreImageUpload />
            </div>

            <div className="flex justify-end items-center">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                leftIcon={<CheckCircle size={18} />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </SectionLayout>
      </MainLayout>
    </>
  );
}
