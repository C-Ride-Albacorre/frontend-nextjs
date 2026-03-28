import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { VerifyPageSkeleton } from '@/features/auth/components/verify/verify-page-skeleton';
import { getCookie } from '@/utils/cookies';
import { maskIdentifier } from '@/utils/mask-identifier';
import VerifyWrapper from '@/features/auth/components/verify/verify-wrapper';

export default async function VerifyPage() {
  
  const registrationMethod = await getCookie('registration_method');
  const identifier = await getCookie('verify_identifier');

  if (!identifier || !registrationMethod) {
    redirect('/user/register');
  }

  const method: 'email' | 'phone number' =
    registrationMethod === 'phone' ? 'phone number' : 'email';

    console.log('Registration Method:', registrationMethod);

  const maskedIdentifier = maskIdentifier(identifier, method);

  return (
    <Suspense fallback={<VerifyPageSkeleton />}>
      <VerifyWrapper identifier={maskedIdentifier} method={method} />
    </Suspense>
  );
}
