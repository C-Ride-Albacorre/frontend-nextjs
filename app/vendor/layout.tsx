import VendorSidebarWrapper from '@/features/vendor/sidebar-wrapper';
import VendorStoreCard from '@/features/vendor/store-card';
import VendorStoreCardSkeleton from '@/features/vendor/store-card-skeleton';
import { Suspense } from 'react';

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-dvh bg-[#FDFDFB]">
      <VendorSidebarWrapper
        sideBarCard={
          <Suspense fallback={<VendorStoreCardSkeleton />}>
            <VendorStoreCard />
          </Suspense>
        }
      />

      {/* MAIN */}
      <div className="flex flex-1 flex-col min-h-0">
        {/* PAGE CONTENT (natural scroll) */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
