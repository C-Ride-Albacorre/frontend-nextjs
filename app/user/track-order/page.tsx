
import MapOrderInfo from '@/features/user/track-order/components/map-order-info';
import Header from '@/features/user/track-order/components/header';
import SideInfo from '@/features/user/track-order/components/side-info';

export default function TrackingDeliveryPage() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      {/* ================= HEADER ================= */}
      <Header />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= MAP ================= */}
        <section className="lg:col-span-2 ">
          <MapOrderInfo />
        </section>

        {/* ================= SIDEBAR ================= */}

        <section>
          <SideInfo />
        </section>
      </section>
    </main>
  );
}
