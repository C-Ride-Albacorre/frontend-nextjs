import Location from '@/features/public/homepage/components/location';

import { CartInitializer } from '@/helpers/cart-initializer';
export default async function StoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { isAuthenticated, role } = await getAuthInfo();
  return (
    <>
      <CartInitializer />
      <div className="min-h-screen mx-auto max-w-6xl px-4 xl:px-0 py-24 md:py-28">
  

        <div>{children}</div>
      </div>

      <Location />
    </>
  );
}
