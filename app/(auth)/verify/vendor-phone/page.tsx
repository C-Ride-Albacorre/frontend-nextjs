import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { VerifyPageSkeleton } from '@/features/auth/components/verify/verify-page-skeleton';
import { getCookie } from '@/utils/cookies';
import { maskIdentifier } from '@/utils/mask-identifier';
import VendorPhoneWrapper from '@/features/auth/components/verify/vendor-phone-wrapper';

export default async function VendorVerifyPhonePage() {
  const identifier = await getCookie('vendor_phone_number');

  if (!identifier) {
    redirect('/vendor/register');
  }

  const method = 'phone number';

  const maskedIdentifier = maskIdentifier(identifier, method);

  return (
    <Suspense fallback={<VerifyPageSkeleton />}>
      <VendorPhoneWrapper identifier={maskedIdentifier} method={method} />
    </Suspense>
  );
}
