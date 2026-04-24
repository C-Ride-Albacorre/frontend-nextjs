import { NearbyStoreParams } from '@/features/public/service';
import getNearByStores from '@/features/public/service';
import FoodMarquee from './food-marquee';
import { fetchCategoriesAction } from '@/features/user/delivery/action';

interface NearbyStoresProps {
  searchParams?: Promise<{
    lat?: string;
    lng?: string;
    radiusKm?: string;
    search?: string;
  }>;
}

export default async function NearbyStores({
  searchParams,
}: NearbyStoresProps) {
  //   const resolvedParams = await searchParams;
  //   const params: NearbyStoreParams = {};

  //   if (resolvedParams?.lat) params.lat = parseFloat(resolvedParams.lat);
  //   if (resolvedParams?.lng) params.lng = parseFloat(resolvedParams.lng);
  //   if (resolvedParams?.radiusKm)
  //     params.radiusKm = parseFloat(resolvedParams.radiusKm);
  //   if (resolvedParams?.search) params.search = resolvedParams.search;

  //   const stores = await getNearByStores(params);

  const stores = await fetchCategoriesAction();

  console.log('Nearby stores:', stores);

  return <>
  </>
}
