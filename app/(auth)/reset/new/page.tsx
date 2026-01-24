import Link from 'next/link';

import { Eye } from 'lucide-react';

import AuthFormHeader from '@/features/auth/components/layout/auth-form-header';

export default function NewPasswordPage() {
  return (
    <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white border border-border rounded-3xl px-8 py-14 text-center">
        {/* LOGO */}
        <AuthFormHeader />

        <form className="space-y-8 max-w-xl text-left mx-auto ">
          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">New Password</label>
            <div className="relative mt-2">
              <input
                type="password"
                placeholder="Enter a strong password"
                className="w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <Eye
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              Password must contain at least one number
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <div className="relative mt-2">
              <input
                type="password"
                placeholder="Confirm your new password"
                className="w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <Eye
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/user/login"
            type="submit"
            className="w-full block text-center rounded-xl bg-primary py-4 text-sm font-medium text-primary-text-100 hover:bg-primary-hover transition"
          >
            Continue
          </Link>
        </form>
      </div>
    </section>
  );
}
