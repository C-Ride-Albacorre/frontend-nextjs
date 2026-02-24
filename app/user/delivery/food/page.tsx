import DashboardHeader from '@/components/ui/headers/user-dashboard-header';
import CategoryIcons from '@/features/user/delivery/components/category-icons';
import Filters from '@/features/user/delivery/components/filters';
import LocationChips from '@/features/user/delivery/components/location-chips';
import StoreGrid from '@/features/user/delivery/components/store-grid';
import Location from '@/features/public/homepage/components/location';
import { Search } from 'lucide-react';
import ActionInput from '@/components/ui/inputs/action-input';

export default function FoodDeliveryPage() {
  return (
    <section>
      <DashboardHeader />

      <div className="px-4 py-8 xl:px-0 md:py-12 mx-auto max-w-6xl space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Food / Category</h2>
          <p className="text-sm text-neutral-500">
            Select from our premium vendors
          </p>
        </div>

        <form action="">
          <ActionInput
            ariaLabel="Search items"
            placeholder="Find what you want today"
            leftIcon={<Search className="h-6 w-6 text-neutral-500" />}
            buttonText="Search"
          />
        </form>

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
