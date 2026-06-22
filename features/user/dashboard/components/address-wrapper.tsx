
import { fetchSavedAddressesService } from '../../address/service';
import { MapPinHouse } from 'lucide-react';
import ErrorState from '@/components/layout/error-state';
import DashboardAddress from './address';

export default async function DashboardAddressWrapper() {
  try {
    const { data } = await fetchSavedAddressesService();

    // console.log(' [AddressWrapper] fetched addresses:', data);

    return <DashboardAddress savedAddresses={data} />;
  } catch (error) {
    console.error('[AddressWrapper] Error fetching saved addresses:', error);

    return (
      <ErrorState
        icon={<MapPinHouse size={36} className="text-orange-500" />}
        title="Failed to load addresses"
        message="An error occurred while fetching your saved addresses. Please try again later."
      />
    );
  }
}
