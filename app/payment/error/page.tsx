import Header from '@/components/ui/headers/user-route-header';
import PaymentErrorContent from '@/features/user/delivery/components/modals/payment-error';
import { Suspense } from 'react';

export default function PaymentErrorPage() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-neutral-500">Loading...</p>
          </div>
        }
      >
        <PaymentErrorContent />
      </Suspense>
    </main>
  );
}
