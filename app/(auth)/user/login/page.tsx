import UserLoginForm from '@/features/auth/components/user/user-form/login';

import AuthFooter from '@/components/layout/auth-footer';
import { Suspense } from 'react';
import { LoginFormSkeleton } from '@/features/auth/components/user/login-form-skeleton';

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<LoginFormSkeleton />}>
        <UserLoginForm />
      </Suspense>

      <AuthFooter variant="login" href="/user/register" />
    </>
  );
}
