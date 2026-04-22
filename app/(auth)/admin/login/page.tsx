import ErrorMessage from '@/components/layout/error-message';
import AdminLoginForm from '@/features/auth/components/admin/login';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

interface SearchParams {
  expired?: string;
  reason?: string;
  callbackUrl?: string;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { expired, reason } = await searchParams;

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
    <Suspense
      fallback={
        <Loader2 size={24} className="animate-spin text-primary mx-auto" />
      }
    >
      {expired === 'true' && (
        <div className="mb-4">
          <ErrorMessage
            message={
              message ??
              'Your verification session expired. Please login again to get a new code.'
            }
          />
        </div>
      )}
      <AdminLoginForm />

    </Suspense>
  );
}
