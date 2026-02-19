import UserLoginForm from '@/features/auth/components/user-form/login';

import AuthFooter from '@/components/layout/auth-footer';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserLoginForm />

      <AuthFooter variant="login" href="/user/register" />
    </Suspense>
  );
}
