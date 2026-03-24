import DeliveryHeader from '@/features/user/delivery/components/delivery-header';
import DeliveryAddressModal from '@/features/user/delivery/components/delivery-address-modal';
import Categories from '@/features/user/delivery/components/categories';

export default async function CreateDeliveryPage({
  searchParams,
}: {
  searchParams: Promise<{
    newUser?: string;
  }>;
}) {
  const { newUser } = await searchParams;
  const shouldShowModal = newUser === 'true';

  return (
    <>
      <DeliveryAddressModal shouldShowModal={shouldShowModal} />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          {/* Header */}
          <DeliveryHeader />

          {/* Subtitle */}
          <div className="mt-10">
            <h2 className="text-lg font-medium text-primary-text-100">
              What are you sending?
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Select the type of item for delivery
            </p>
          </div>

          {/* Categories */}
          <Categories />
        </div>
      </main>
    </>
  );
}
