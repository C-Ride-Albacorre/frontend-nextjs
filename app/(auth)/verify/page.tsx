import VerifyClient from '@/features/auth/components/verify-client';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { VerifyPageSkeleton } from '@/features/auth/components/verify-page-skeleton';
import { getCookie } from '@/utils/cookies';

function maskIdentifier(identifier: string, method: 'email' | 'phone') {
  if (method === 'email') {
    const [name, domain] = identifier.split('@');
    return `${name.slice(0, 2)}****@${domain}`;
  }
  return `${identifier.slice(0, 4)}****${identifier.slice(-2)}`;
}

export default async function VerifyPage() {
  const registrationMethod = await getCookie('registration_method');

  const identifier = await getCookie('verify_identifier');

  if (!identifier || !registrationMethod) {
    redirect('/user/register');
  }

  // now both are guaranteed strings
  const method: 'email' | 'phone' =
    registrationMethod === 'phone' ? 'phone' : 'email';

  const maskedIdentifier = maskIdentifier(identifier, method);

  return (
    <Suspense fallback={<VerifyPageSkeleton />}>
      <VerifyClient identifier={maskedIdentifier} method={method} />
    </Suspense>
  );
}
