import AuthFooter from '@/components/layout/auth-footer';
import VendorRegisterForm from '@/features/auth/components/vendor-form/register';

export default function SignupPage() {
  return (
    <>
      <VendorRegisterForm />

      <AuthFooter variant="register" href="/vendor/login" />
    </>
  );
}
