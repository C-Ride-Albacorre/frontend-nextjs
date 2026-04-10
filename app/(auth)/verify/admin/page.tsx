import { VerifyPageSkeleton } from '@/features/auth/components/verify/verify-page-skeleton';
import AdminVerifyWrapper from '@/features/auth/components/verify/admin-verify-wrapper';
import { getCookie } from '@/utils/cookies';
import { maskIdentifier } from '@/utils/mask-identifier';
import { Suspense } from 'react';

export default async function AdminVerifyPage() {
  const identifier = await getCookie('verify_identifier');
  const maskedIdentifier = identifier
    ? maskIdentifier(identifier, 'email')
    : '';

  return (
    <Suspense fallback={<VerifyPageSkeleton />}>
      <AdminVerifyWrapper identifier={maskedIdentifier} method="email" />
    </Suspense>
  );
}
