import AuthFormHeader from '@/components/ui/headers/auth-form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { Eye } from 'lucide-react';
import NewPasswordForm from '@/features/auth/components/reset/new-password-form';
import { Suspense } from 'react';
import { NewPasswordSkeleton } from '@/features/auth/components/reset/new-password-skeleton';

export default function NewPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  return (
    <>
      <Suspense fallback={<NewPasswordSkeleton />}>
        <NewPasswordForm />
      </Suspense>
    </>
  );
}
