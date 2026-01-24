import AuthFooter from '@/features/auth/components/layout/auth-footer';
import UserRegisterForm from '@/features/auth/components/user-form/register';

export default function SignupPage() {
  return (
    <>
      <UserRegisterForm />

      <AuthFooter variant="register" href="/user/login" />
    </>
  );
}
