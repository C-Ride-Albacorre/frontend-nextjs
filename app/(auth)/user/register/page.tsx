import AuthFooter from '@/components/layout/auth-footer';
import ErrorMessage from '@/components/layout/error-message';
import UserRegisterForm from '@/features/auth/components/user/user-form/register';

export default async function SignupPage() {
  return (
    <>
      <UserRegisterForm />

      <AuthFooter variant="register" href="/user/login" />
    </>
  );
}
