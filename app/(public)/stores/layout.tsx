import Location from '@/features/public/homepage/components/location';
import StoreHeader from '@/features/public/stores/components/store-header';
import StoreSearch from '@/features/public/stores/components/store-search';
import { CartInitializer } from '@/helpers/cart-initializer';
import { getAuthInfo } from '@/utils/cookies';

export default async function StoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, role } = await getAuthInfo();
  return (
    <>
      <CartInitializer />
      <div className="min-h-screen mx-auto max-w-6xl px-4 xl:px-0 py-24 md:py-28">
        {/* <StoreHeader isLoggedIn={isAuthenticated} /> */}

        <div className="container">{children}</div>
      </div>

      <Location />
    </>
  );
}
