import AuthFooter from '@/components/layout/auth-footer';
import { LoginFormSkeleton } from '@/features/auth/components/user/login-form-skeleton';
import VendorLoginForm from '@/features/auth/components/vendor/vendor-form/login';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />} >
      <VendorLoginForm />

      <AuthFooter variant="login" href="/vendor/register" />
    </Suspense>
  );
}
