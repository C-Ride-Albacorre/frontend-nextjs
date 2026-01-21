import DeliveryHeader from '@/features/delivery/components/layout/delivery-header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <DeliveryHeader id="" />

        {children}
      </div>
    </div>
  );
}
