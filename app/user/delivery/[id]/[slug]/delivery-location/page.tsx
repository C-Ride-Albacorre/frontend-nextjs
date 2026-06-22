import { Suspense } from 'react';
import DeliveryLocationClient from '@/features/user/delivery/components/delivery-location-client';
import DeliveryLocationSkeleton from '@/features/user/delivery/components/delivery-location-skeleton';
import DeliveryLocationData from '@/features/user/delivery/components/delivery-location-data';


export interface DeliveryLocationPageProps{
  params: Promise<{ id: string; slug: string }>;
}
export default async function Page({ params }: DeliveryLocationPageProps) {
  




  return (
    <Suspense fallback={<DeliveryLocationSkeleton />}>
      <DeliveryLocationData params={params} />
    </Suspense>
  );
}
