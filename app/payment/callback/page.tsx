'use client';


import PaymentCallbackContent from '@/features/user/delivery/components/modals/payment-callback';

import Header from '@/components/ui/headers/user-route-header';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function PaymentCallbackPage() {
  return (
    <main  className="max-w-7xl mx-auto p-6 space-y-8">
     <Header />

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 size={48} className="animate-spin text-primary" />
            <p className="text-neutral-500">Loading...</p>
          </div>
        }
      >
        <PaymentCallbackContent />
      </Suspense>
    </main>
  );
}
