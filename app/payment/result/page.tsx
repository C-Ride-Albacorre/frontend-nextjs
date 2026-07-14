import Header from '@/components/ui/headers/user-route-header';
import PaymentResultContent from '@/features/user/delivery/components/modals/payment-result';
import { LoaderCircle } from 'lucide-react';
import { Suspense } from 'react';

export default function PaymentResultPage() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <Header />
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <LoaderCircle size={48} className="animate-spin text-primary" />
            <p className="text-primary">Verifying Payment...</p>
          </div>
        }
      >
        <PaymentResultContent />
      </Suspense>
    </main>
  );
}
