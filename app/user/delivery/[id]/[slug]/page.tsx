import { Button } from '@/components/ui/buttons/button';

import Image from 'next/image';
import {
  Dot,
  Clock,
  Minus,
  Plus,
  X,
  ChevronRight,
  Package,
} from 'lucide-react';

import { fetchStoreDetailsAction } from '@/features/user/delivery/action';
import Card from '@/components/layout/card';
import OrderSummary from '@/features/user/delivery/components/order/order-summary';
import ProductCard from '@/features/user/delivery/components/product-card';

export default async function StoreVendorsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const store = await fetchStoreDetailsAction(slug);

   const storeSlug = store.storeName
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  return (
    <main>
      <div className="space-y-12">
        {/* Vendor */}
        <Card className="bg-foreground-200 flex items-start sm:items-center justify-between gap-4">
          <div className="lg:flex items-center flex-1 gap-6 space-y-6 lg:space-y-0 mb-0">
            <div>
              <Image
                src={store?.image || '/assets/image/nigerian.jpg'}
                alt={store?.storeName || 'Store Image'}
                width={100}
                height={100}
                priority
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <p className="font-medium">
                  {store?.storeName || 'Store Name'}
                </p>
                <span className="rounded-full bg-primary font-medium px-2 py-0.5 text-[0.65rem] capitalize">
                  {store?.status?.toLocaleLowerCase()}
                </span>
              </div>

              <p className="mt-1 text-xs text-neutral-500 flex gap-1 items-center space-x-2">
                {store?.storeSubcategories?.length !== 0 &&
                  store.storeSubcategories?.map((sub: string, idx: number) => (
                    <span key={idx} className="flex items-center gap-1">
                      {sub}
                      {idx < store.storeSubcategories.length - 1 && (
                        <Dot size={16} />
                      )}
                    </span>
                  ))}
                <span className="text-green-100">
                  Min Order: {store?.minimumOrder ?? 'N/A'}
                </span>
              </p>

              <p className="mt-1 text-xs text-neutral-500 flex gap-4">
                {/* <span className="flex gap-2">
                  <Star fill="#D4AF37" stroke="0" size={16} /> 4.8 (318)
                </span>{' '} */}
                <span className="flex gap-2">
                  {' '}
                  <Clock size={16} />{' '}
                  {store?.preparationTime
                    ? `${store.preparationTime} mins`
                    : 'N/A'}
                </span>
              </p>
            </div>
          </div>

          <Button
            href={`/user/delivery/${store.storeCategory}`}
            variant="white"
            size="icon"
          >
            Change Store
          </Button>
        </Card>

        {/* Select Items */}
        {/* <div className="mt-12 space-y-4 md:space-y-0 md:flex items-center justify-between">
          <h2 className="text-lg font-semibold flex-1">Select Items</h2>

          <div className="flex items-center gap-3">
         

            <div className="w-56">
              <Select
                id="sort"
                value={sort}
                onChange={setSort}
                placeholder="Sort items"
                variant="fill"
                spacing="none"
                options={CATEGORIES.map((category) => ({
                  label: category,
                  value: category.toLowerCase(),
                }))}
                rightIcon={(open) => (
                  <span className="flex flex-col">
                    <ChevronUp
                      size={14}
                      className={clsx('-mb-1 transition-transform', {
                        'rotate-180 text-primary': open,
                      })}
                    />
                    <ChevronDown
                      size={14}
                      className={clsx('transition-transform', {
                        'rotate-180 text-primary': open,
                      })}
                    />
                  </span>
                )}
              />
            </div>

            <div className="w-64">
              <Input
                leftIcon={<Search size={16} />}
                placeholder="Search for item"
                spacing="none"
                variant="fill"
              />
            </div>
          </div>
        </div> */}

        {/* Products */}
        {/* Products Section */}
        <ul className=" grid grid-cols-1 md:grid-cols-2 gap-8">
          {store?.products?.length > 0 ? (
            store.products.map((item: any) => (
              <li key={item.id}>
                <ProductCard item={item} />
              </li>
            ))
          ) : (
            <Card gap='sm' spacing='lg' className="text-center text-neutral-500 col-span-2">
              <Package size={32} className="text-neutral-400 mx-auto" />

              <p>No products available for this store.</p>
            </Card>
          )}
        </ul>

        <OrderSummary />

        <div className=" flex items-center justify-center">
          <Button
          href={`/user/delivery/${storeSlug}/${slug}/delivery-type`}
            variant="primary"
            size="lg"
            rightIcon={<ChevronRight size={16} />}
          >
            Continue to Delivery
          </Button>
        </div>
      </div>
    </main>
  );
}
