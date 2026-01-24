
import AuthFooter from '@/features/auth/components/layout/auth-footer';
import VendorLoginForm from '@/features/auth/components/vendor-form/login';

export default function LoginPage() {
  return (
    <>
      <VendorLoginForm />

      <AuthFooter variant="login" href="/vendor/register" />
    </>
  );
}
