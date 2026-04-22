import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { VerifyPageSkeleton } from '@/features/auth/components/verify/verify-page-skeleton';
import { COOKIE_KEYS, getCookie } from '@/utils/cookies';
import { maskIdentifier } from '@/utils/mask-identifier';
import VendorEmailWrapper from '@/features/auth/components/verify/vendor-email-wrapper';

export default async function VendorVerifyEmailPage() {
  const identifier = await getCookie(COOKIE_KEYS.VENDOR_EMAIL);

  if (!identifier) {
    redirect('/vendor/register');
  }

  const method = 'email';

  const maskedIdentifier = maskIdentifier(identifier, method);

  return (
    <Suspense fallback={<VerifyPageSkeleton />}>
      <VendorEmailWrapper identifier={maskedIdentifier} method={method} />
    </Suspense>
  );
}
