import AuthFooter from '@/components/layout/auth-footer';
import ErrorMessage from '@/components/layout/error-message';
import { LoginFormSkeleton } from '@/features/auth/components/user/login-form-skeleton';
import VendorLoginForm from '@/features/auth/components/vendor/vendor-form/login';
import { Suspense } from 'react';

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
    <Suspense fallback={<LoginFormSkeleton />}>
      {expired === 'true' && (
        <div className="mb-4">
          <ErrorMessage message={message ?? 'Your verification session expired. Please login again to get a new code.'} />
        </div>
      )}

      <VendorLoginForm callbackUrl={callbackUrl} />

      <AuthFooter variant="login" href="/vendor/register" />
    </Suspense>
  );
}
