import Location from '@/features/public/homepage/components/location';
import StoreHeader from '@/features/public/stores/components/store-header';
import StoreSearch from '@/features/public/stores/components/store-search';
import { CartInitializer } from '@/helpers/cart-initializer';

export default async function StoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartInitializer />
      <div className="min-h-screen mx-auto max-w-6xl px-4 xl:px-0 py-24 md:py-28">
        <StoreHeader />

        <div className="container">{children}</div>
      </div>

      <Location />
    </>
  );
}
