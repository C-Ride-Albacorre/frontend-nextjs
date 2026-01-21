import Hero from '@/features/public/homepage/components/hero-content';
import FoodMarquee from '@/features/public/homepage/components/food-marquee';
import Location from '@/features/public/homepage/components/location';
import FulfillmentPartner from '@/features/public/homepage/components/fulfillment-partner';

export default function HomePage() {
  return (
    <main className="w-full bg-white">
      <Hero />
      <FoodMarquee />
      <Location />
      <FulfillmentPartner />
    </main>
  );
}
