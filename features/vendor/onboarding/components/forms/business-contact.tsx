'use client';

import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { useActionState, useEffect, useState } from 'react';
import { businessContactAction } from '../../action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function BusinessContactInfoForm() {
  const [fields, setFields] = useState({
    businessEmail: '',
    businessPhone: '',
  });

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const [state, action, pending] = useActionState(
    businessContactAction,
    undefined,
  );

  const isError = state?.status === 'error';

  const router = useRouter();

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }

    if (state?.status === 'success') {
      toast.success(state.message ?? 'Saved successfully!');

      setTimeout(() => router.push('/onboarding/business-address'), 1500);
    }
  }, [state, router]);

  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Contact Details"
        subtitle="How can we reach you ?"
        headerIcon={<Mail size={24} className="text-primary" />}
      />

      <form action={action} className="space-y-6">
        <Input
          id="businessEmail"
          name="businessEmail"
          label="Business Email Address"
          type="email"
          placeholder="Enter your business email"
          value={fields.businessEmail}
          onChange={handleChange('businessEmail')}
          errorMessage={isError ? state?.errors?.businessEmail?.[0] : undefined}
        />

        <Input
          id="businessPhone"
          name="businessPhone"
          label="Business Phone Number"
          type="tel"
          placeholder="Enter your business phone number"
          inputInfo="For urgent order update"
          value={fields.businessPhone}
          onChange={(e) =>
            setFields((prev) => ({
              ...prev,
              businessPhone: e.target.value.replace(/\s/g, ''),
            }))
          }
          errorMessage={isError ? state?.errors?.businessPhone?.[0] : undefined}
        />

        <div className="mt-12  flex items-center justify-between lg:justify-around">
          <Button
            href="/onboarding/business-info"
            type="button"
            variant="white"
            size="lg"
            leftIcon={<ChevronLeft size={16} />}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            type="submit"
            loading={pending}
            disabled={
              pending ||
              !fields.businessEmail.trim() ||
              !fields.businessPhone.trim()
            }
            size="lg"
            rightIcon={<ChevronRight size={16} />}
          >
            {pending ? 'Saving...' : 'Save & Proceed'}
          </Button>
        </div>
      </form>
    </section>
  );
}
