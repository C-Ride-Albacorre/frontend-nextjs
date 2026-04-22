import UserLoginForm from '@/features/auth/components/user/user-form/login';

import AuthFooter from '@/components/layout/auth-footer';
import { Suspense } from 'react';
import { LoginFormSkeleton } from '@/features/auth/components/user/login-form-skeleton';
import ErrorMessage from '@/components/layout/error-message';

interface SearchParams {
  expired?: string;
  reason?: string;
  callbackUrl?: string;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { expired, reason, callbackUrl } = await searchParams;

  let message: string | null = null;

  if (expired === 'true') {
    if (reason === 'verification_expired') {
      message =
        'Your verification session expired. Please login again to continue.';
    } else {
      message = 'Session expired. Please login again.';
    }
  }

  return (
    <>
      {expired === 'true' && (
        <div className="mb-4">
          <ErrorMessage
            message={message ?? 'Your verification session expired. Please register again to get a new code.'}
          />
        </div>
      )}

      <Suspense fallback={<LoginFormSkeleton />}>
        <UserLoginForm callbackUrl={callbackUrl} />
      </Suspense>

      <AuthFooter variant="login" href="/user/register" />
    </>
  );
}
