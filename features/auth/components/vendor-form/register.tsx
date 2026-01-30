import { Eye } from 'lucide-react';

import PhoneInput from '@/components/ui/inputs/phone-input';
import FormHeader from '@/components/ui/headers/form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

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
          <Input
            type="text"
            label="First Name"
            spacing="sm"
            placeholder="First name"
          />
          <Input
            type="text"
            label="Last Name"
            spacing="sm"
            placeholder="Last name"
          />
        </div>

        <Input
          type="email"
          label="Email Address"
          spacing="sm"
          placeholder="Enter your email"
        />

        {/* PHONE */}

        <PhoneInput />

        {/* PASSWORD */}
        <Input
          type="password"
          label="Password"
          placeholder="Enter a strong password"
          spacing="sm"
          inputInfo="Password must contain at least one number"
          rightIcon={<Eye size={18} className="text-neutral-500" />}
        />

        {/* REFERRAL */}
        <Input
          type="text"
          label="Referral Code (Optional)"
          spacing="sm"
          placeholder="Enter code"
        />

        {/* CTA */}
        <Button
          href="/onboarding/business-info"
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
