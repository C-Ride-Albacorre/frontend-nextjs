import DashboardHeader from '@/components/ui/headers/user-dashboard-header';
import CategoryIcons from '@/features/user/delivery/components/category-icons';
import LocationChips from '@/features/user/delivery/components/location-chips';
import StoreGrid from '@/features/user/delivery/components/store-grid';
import Location from '@/features/public/homepage/components/location';

export default async function CategoryDeliveryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    name?: string;
    latitude?: string;
    longitude?: string;
  }>;
}) {
  const { id } = await params;
  const { name, latitude, longitude } = await searchParams;

  console.log('Params Details:', params);
  console.log('Search Params Details:', searchParams);

  return (
    <section>
      <DashboardHeader />

      <div className="px-4 py-8 xl:px-0 md:py-12 mx-auto max-w-6xl space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {`${name} / Stores` || 'Category / Stores'}
          </h2>
          <p className="text-sm text-neutral-500">
            Select from our premium vendors
          </p>
        </div>

        {/* <form action="">
          <ActionInput
            ariaLabel="Search items"
            placeholder="Find what you want today"
            leftIcon={<Search className="h-6 w-6 text-neutral-500" />}
            buttonText="Search"
          />
        </form> */}

        <CategoryIcons id={id} />

        {/* <Filters /> */}

        <LocationChips />
        <StoreGrid id={id} latitude={latitude} longitude={longitude} />
      </div>

      <div>
        <Location />
      </div>
    </section>
  );
}
