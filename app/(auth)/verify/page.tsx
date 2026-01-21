import VerifyClient from '@/features/auth/components/verify-client';
import { Suspense } from 'react';
export default function VerifyPage() {
  return (
    <Suspense fallback={<div />}>
      <VerifyClient />
    </Suspense>
  );
}
