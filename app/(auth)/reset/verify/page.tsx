import ResetVerifyClient from '@/features/auth/components/reset-verify-client';
import { Suspense } from 'react';

export default function VerifyPage() {
  return (
    <Suspense fallback={<div />}>
      <ResetVerifyClient />
    </Suspense>
  );
}
