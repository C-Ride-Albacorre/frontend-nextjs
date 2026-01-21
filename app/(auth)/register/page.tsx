import RegisterForm from '@/features/auth/components/register-form';

import AuthFooter from '@/features/auth/components/layout/auth-footer';

export default function SignupPage() {
  return (
    <>
      <RegisterForm />

      <AuthFooter variant="register" />
    </>
  );
}
