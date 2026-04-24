import Hero from '@/features/public/homepage/components/hero-content';
import Location from '@/features/public/homepage/components/location';
import FulfillmentPartner from '@/features/public/homepage/components/fulfillment-partner';
import { Suspense } from 'react';
import FoodMarqueeSkeleton from '@/features/public/homepage/components/food-marquee-skeleton';
import FoodMarqueeWrapper from '@/features/public/homepage/components/food-marquee-wrapper';

interface HomePageProps {
  searchParams?: Promise<{
    lat?: string;
    lng?: string;
    radiusKm?: string;
    search?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <main className="w-full bg-white">
      <Hero />

      <Suspense fallback={<FoodMarqueeSkeleton />}>
        <FoodMarqueeWrapper />
      </Suspense>

      <Location />
      <FulfillmentPartner />
    </main>
  );
}
