import AuthFooter from '@/components/layout/auth-footer';
import ErrorMessage from '@/components/layout/error-message';
import VendorRegisterForm from '@/features/auth/components/vendor/vendor-form/register';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string }>;
}) {
  const { expired } = await searchParams;

  return (
    <>
      {expired === 'true' && (
        <div className="mb-4">
          <ErrorMessage
            message="Your verification session expired. Please register again to get a new
          code."
          />
        </div>
      )}

      <VendorRegisterForm />

      <AuthFooter variant="register" href="/vendor/login" />
    </>
  );
}
