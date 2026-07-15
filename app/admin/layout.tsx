import AdminCard from '@/features/admin/admin-card';
import AdminSidebarWrapper from '@/features/admin/admin-sidebar-wrapper';
import VendorStoreCardSkeleton from '@/features/vendor/store-card-skeleton';
import { Suspense } from 'react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col lg:flex-row h-dvh bg-[#FDFDFB]">
      <AdminSidebarWrapper
        sideBarCard={
          <Suspense fallback={<VendorStoreCardSkeleton />}>
            <AdminCard />
          </Suspense>
        }
      />

      {/* MAIN */}
      <div className="flex flex-1 flex-col min-h-0">
        {/* PAGE CONTENT (natural scroll) */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </section>
  );
}
