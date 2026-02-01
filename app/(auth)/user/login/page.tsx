import UserLoginForm from '@/features/auth/components/user-form/login';

import AuthFooter from '@/components/layout/auth-footer';

export default function LoginPage() {
  return (
    <>
      <UserLoginForm />

      <AuthFooter variant="login" href="/user/register" />
    </>
  );
}
