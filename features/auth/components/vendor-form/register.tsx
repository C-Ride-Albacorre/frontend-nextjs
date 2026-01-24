import { Eye } from 'lucide-react';

import PhoneInput from '@/components/ui/inputs/phone-input';
import EmailInput from '@/components/ui/inputs/email-input';
import FormHeader from '@/components/ui/headers/form-header';
import Link from 'next/link';

export default function VendorRegisterForm() {
  return (
    <>
      <FormHeader
        title="Create an Account"
        subtitle="Please enter your credentials below."
      />

      {/* FORM */}
      <form className="space-y-5">
        {/* NAMES */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="First name"
              className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm  outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Last name"
              className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm  outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <EmailInput />

        <PhoneInput />

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative mt-2">
            <input
              type="password"
              placeholder="Enter a strong password"
              className="w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm  outline-none focus:ring-2 focus:ring-primary"
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

        {/* REFERRAL */}
        <div>
          <label className="text-sm font-medium">
            Referral Code (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter code"
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm  outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* CTA */}

        <Link
          href="/onboarding/business-info"
          className="w-full block text-center rounded-xl bg-primary py-4 text-sm font-medium text-primary-text-100 hover:bg-primary-hover transition"
        >
          Continue
        </Link>
      </form>
    </>
  );
}
