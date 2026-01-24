import DashboardHeader from '@/components/ui/headers/dashboard-header';
import CategoryIcons from '@/features/delivery/components/category-icons';
import Filters from '@/features/delivery/components/filters';
import LocationChips from '@/features/delivery/components/location-chips';
import StoreGrid from '@/features/delivery/components/store-grid';
import Location from '@/features/public/homepage/components/location';
import { Search } from 'lucide-react';

export default function FoodDeliveryPage() {
  return (
    <section>
      <DashboardHeader name="Adewale" />

      <div className="px-4 py-8 xl:px-0 md:py-12 mx-auto max-w-6xl space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Food / Category</h2>
          <p className="text-sm text-neutral-500">
            Select from our premium vendors
          </p>
        </div>

        <div className="w-full flex items-center gap-2 rounded-2xl border border-border px-4 py-3 bg-foreground-200">
          <Search className="h-6 w-6 text-neutral-500" />

          <input
            aria-label="Search items"
            placeholder="Find what you want today"
            className="w-full bg-transparent  outline-none text-base md:text-sm"
          />

          <button className="h-full px-5 py-3 bg-primary hover:bg-primary-hover rounded-xl font-medium text-sm cursor-pointer">
            Search
          </button>
        </div>

        <CategoryIcons />

        <Filters />

        <LocationChips />
        <StoreGrid />
      </div>

      <div>
        <Location />
      </div>
    </section>
  );
}
