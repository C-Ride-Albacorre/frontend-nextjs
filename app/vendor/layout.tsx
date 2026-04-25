import VendorLayoutClient from '@/features/vendor/layout-client';
import { getStoreAction } from '@/features/vendor/store/action';

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await getStoreAction();

  console.log('Store data in layout:', store);

  

  return <VendorLayoutClient store={store}>{children}</VendorLayoutClient>;
}
