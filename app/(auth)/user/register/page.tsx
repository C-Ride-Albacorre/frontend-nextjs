import AuthFooter from '@/components/layout/auth-footer';
import ErrorMessage from '@/components/layout/error-message';
import UserRegisterForm from '@/features/auth/components/user/user-form/register';
import { div } from 'framer-motion/client';

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

      <UserRegisterForm />

      <AuthFooter variant="register" href="/user/login" />
    </>
  );
}
