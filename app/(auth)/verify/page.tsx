import VerifyClient from '@/features/auth/components/verify-client';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { VerifyPageSkeleton } from '@/features/auth/components/verify-page-skeleton';

function maskIdentifier(identifier: string, method: 'email' | 'phone') {
  if (method === 'email') {
    const [name, domain] = identifier.split('@');
    return `${name.slice(0, 2)}****@${domain}`;
  }
  return `${identifier.slice(0, 4)}****${identifier.slice(-2)}`;
}

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ method?: string }>;
}) {
  const { method } = await searchParams;
  const resolvedMethod: 'email' | 'phone' =
    method === 'phone' ? 'phone' : 'email';

  const cookieStore = await cookies();
  const identifier = cookieStore.get('verify_identifier')?.value;

  if (!identifier) {
    redirect('/user/register');
  }

  const maskedIdentifier = maskIdentifier(identifier, resolvedMethod);

  return (
    <Suspense fallback={<VerifyPageSkeleton />}>
      <VerifyClient identifier={maskedIdentifier} method={resolvedMethod} />
    </Suspense>
  );
}
