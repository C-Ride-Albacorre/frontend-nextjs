import Link from 'next/link';

import { Eye } from 'lucide-react';

import FormHeader from '@/components/ui/headers/form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

export default function VendorLoginForm() {
  return (
    <>
      <FormHeader
        title="Login to your account"
        subtitle="Please enter your credentials below."
      />
      {/* FORM */}
      <form className="space-y-5 ">
        {
          <Input
            type="email"
            label="Email Address"
            spacing="sm"
            placeholder="Enter your email"
          />
        }

        <div>
          {/* PASSWORD */}

          <Input
            type="password"
            label="Password"
            placeholder="Enter a strong password"
            spacing="sm"
            inputInfo="Password must contain at least one number"
            rightIcon={<Eye size={18} className="text-neutral-500" />}
          />

          <Link
            href="/reset"
            className="mt-4 text-sm  text-right block  text-primary"
          >
            Forgot Password?
          </Link>
        </div>

        {/* CTA */}
        <Button
          href="/vendor/onboarding"
          size="full"
          variant="primary"
          className="mt-4"
        >
          Continue
        </Button>
      </form>
    </>
  );
}
