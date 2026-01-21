import LoginForm from '@/features/auth/components/login-form';
import AuthFooter from '@/features/auth/components/layout/auth-footer';

export default function LoginPage() {
  return (
    <>
      <LoginForm />

      <AuthFooter variant="login" />
    </>
  );
}
