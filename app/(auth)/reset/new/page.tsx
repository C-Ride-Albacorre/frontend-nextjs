import Link from 'next/link';

import AuthFormHeader from '@/components/ui/headers/auth-form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { Eye } from 'lucide-react';

export default function NewPasswordPage() {
  return (
    <section className="min-h-screen bg-neutral-50 flex justify-center px-4 py-4">
      <div className="w-full max-w-3xl bg-white border border-border rounded-3xl px-8 py-14 text-center">
        {/* LOGO */}
        <AuthFormHeader />

        <form className="space-y-8 max-w-xl text-left mx-auto ">
          {/* PASSWORD */}
          <Input
            id="new-password"
            label="New Password"
            type="password"
            placeholder="Enter a strong password"
            errorMessage="Password must contain at least one number"
            rightIcon={<Eye size={18} className="text-neutral-500" />}
          />

          {/* CONFIRM PASSWORD */}
          <Input
            id="confirm-new-password"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm your new password"
            rightIcon={<Eye size={18} className="text-neutral-500" />}
          />

          {/* CTA */}

          <Button href="/user/login" size="full">
            Continue
          </Button>
        </form>
      </div>
    </section>
  );
}
