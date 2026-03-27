import DeliveryHeader from '@/features/user/delivery/components/delivery-header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-12">
        <DeliveryHeader />

        {children}
      </div>
    </div>
  );
}
