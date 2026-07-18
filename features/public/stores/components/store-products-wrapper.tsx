import { Button } from '@/components/ui/buttons/button';

import Image from 'next/image';
import { Dot, Clock, ChevronRight, Package, MapPin } from 'lucide-react';

import Card from '@/components/layout/card';
import OrderSummary from '@/features/user/delivery/components/order/order-summary';
import ProductCard from '@/features/user/delivery/components/product-card';
import { fetchStoreDetailsService } from '@/features/user/delivery/service';
import ChangeStoreButton from '@/features/public/stores/components/change-store-button';
import EmptyState from '@/components/layout/empty-state';
import ErrorState from '@/components/layout/error-state';
import ProceedButton from '@/features/user/delivery/components/proceed-button';
import { div } from 'framer-motion/client';

export default async function StoreProductsWrapper({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;

    const store = await fetchStoreDetailsService(slug);

    console.log('Store details:', store);
    console.log('Products:', store.data.products);

    const storeSlug = store.data.storeName
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    return (
      <div className="space-y-12">
        {/* Vendor */}
        <Card
          border="none"
          spacing="sm"
          className="bg-foreground-200 flex items-start sm:items-center justify-between"
        >
          <div className="lg:flex items-center flex-1 gap-6 space-y-6 lg:space-y-0 mb-0">
            <div className="relative w-24 h-24 sm:w-40 sm:h-40 lg:w-32 lg:h-32 rounded-xl overflow-hidden">
              <Image
                src={
                  store.data.storeLogo || '/assets/image/store-placeholder.png'
                }
                alt={store.data.storeName || 'Store Image'}
                fill
                priority
                className="rounded-xl object-contain"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-lg md:text-xl font-semibold capitalize">
                  {store.data.storeName}
                </h1>

                <div className="flex gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                      store.data.status === 'ACTIVE'
                        ? 'bg-green-100/10 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {store.data.status?.toLowerCase()}
                  </span>
                  {store.data.category && (
                    <span className="text-[10px] rounded-full px-2 py-0.5 font-medium bg-primary-text-100 text-primary">
                      {store.data.category.name}
                    </span>
                  )}
                </div>
              </div>

              {store.data.storeDescription && (
                <p className="text-sm text-neutral-500 max-w-2xl">
                  {store.data.storeDescription}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                <div className="flex items-start gap-1">
                  <div>
                    {' '}
                    <Clock size={14} className="text-primary" />
                  </div>

                  <span className="flex items-start gap-1 text-neutral-500">
                    {store.data.preparationTime
                      ? `${store.data.preparationTime} mins prep`
                      : 'Preparation time unavailable'}
                  </span>
                </div>

                {store.data.storeAddress && (
                  <div className="flex  items-start gap-1 text-neutral-500">
                    <div>
                      <MapPin size={14} className="text-primary" />
                    </div>

                    <span className="flex items-start gap-1 text-neutral-500">
                      {store.data.storeAddress}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <ChangeStoreButton />
        </Card>

        {/* Select Items */}
        <div className="mt-12 space-y-4 md:space-y-0 md:flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Products</h2>

            <p className="text-sm text-neutral-500">
              Browse products from {store.data.storeName}
            </p>
          </div>

          {/* <div className="w-64">
    <Input
      leftIcon={<Search size={16} />}
      placeholder="Search products"
      spacing="none"
      variant="fill"
    />
  </div> */}
        </div>
        {/* Products */}
        {/* Products Section */}
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {store.data.products?.length > 0 ? (
            store.data.products.map((item: any) => (
              <li key={item.id}>
                <ProductCard item={item} />
              </li>
            ))
          ) : (
            <div className='col-span-1 md:col-span-2 xl:col-span-3'>
              {' '}
              <EmptyState
                icon={<Package size={36} className="text-neutral-400" />}
                title="No products available"
                message="There are currently no products available for this store."
              />
            </div>
          )}
        </ul>

        <OrderSummary />

        <div className=" flex items-center justify-center">
          <ProceedButton store={store} slug={slug} storeSlug={storeSlug} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching store details:', error);

    return (
      <div className="p-8">
        <ErrorState
          icon={<Package size={36} className="text-orange-500" />}
          title="Failed to load store details"
          message="An error occurred while fetching the store details. Please try again later."
        />
      </div>
    );
  }
}
