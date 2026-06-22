import { DeliveryLocationPageProps } from '@/app/user/delivery/[id]/[slug]/delivery-location/page';
import { fetchSavedAddressesService } from '../../address/service';

import { fetchVendorAddressService } from '../service';

import DeliveryLocationClient from './delivery-location-client';
import ErrorState from '@/components/layout/error-state';
import { MapPinHouse } from 'lucide-react';

export default async function DeliveryLocationData({
  params,
}: DeliveryLocationPageProps) {
  const { id, slug } = await params;

  

  console.log(' [DeliveryLocationData Baby] id:', id, '; slug:', slug);

  try {
    const [vendorRes, addresses] = await Promise.all([
      fetchVendorAddressService(slug),
      fetchSavedAddressesService(),
    ]);

    console.log(' vendorRes', vendorRes, '; addresses', addresses);

    return (
      <DeliveryLocationClient
        storeId={vendorRes?.data?.storeId ?? ''}
        slug={slug}
        vendor={vendorRes?.data ?? null}
        address={addresses ?? []}
      />
    );
  } catch (error) {
    console.error('[DeliveryLocationData]', error);

    return (
      <ErrorState
        icon={<MapPinHouse size={36} className="text-orange-500" />}
        title="Failed to load delivery location data"
        message="Please try again later."
      />
    );
  }
}
