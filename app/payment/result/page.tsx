import Header from '@/components/ui/headers/user-route-header';
import PaymentResultContent from '@/features/user/delivery/components/modals/payment-result';
import { Suspense } from 'react';

export default function PaymentResultPage() {
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
        <PaymentResultContent />
      </Suspense>
    </main>
  );
}
