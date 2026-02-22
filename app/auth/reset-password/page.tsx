import AuthFormHeader from '@/components/ui/headers/auth-form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { Eye } from 'lucide-react';
import NewPasswordForm from '@/features/auth/components/reset/new-password-form';
import { Suspense } from 'react';

export default function NewPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  return (
    <section className="min-h-screen bg-neutral-50 flex justify-center px-4 py-4">
      <div className="w-full max-w-3xl bg-white border border-border rounded-3xl px-8 py-14 text-center">
        {/* LOGO */}
        <AuthFormHeader />

        <Suspense fallback={<div>Loading...</div>}>
          <NewPasswordForm searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
