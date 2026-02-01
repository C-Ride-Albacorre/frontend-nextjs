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
      <div className="space-y-6 pb-8">
        <VendorDashboardHeader
          pageTitle="Store Management"
          pageDescription="The Place Restaurant - Victoria Island, Lagos"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8  px-4 lg:px-8">
          <StoreInformation />
          <OperatingHours />
          <div className="md:col-span-2">
            <StoreDetails />
          </div>

          <div className="md:col-span-2">
            <StoreImageUpload />
          </div>
        </div>
      </div>
    </>
  );
}
