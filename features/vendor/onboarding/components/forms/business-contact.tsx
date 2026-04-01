'use client';

import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { useActionState, useEffect, useState } from 'react';
import { businessContactAction } from '../../action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useOnboardingStore, useOnboardingHydrated } from '../../store';

export default function BusinessContactInfoForm() {
  const hydrated = useOnboardingHydrated();
  const [state, action, pending] = useActionState(
    businessContactAction,
    undefined,
  );

  const { contactInfo, setContactInfo } = useOnboardingStore();

  const isError = state?.status === 'error';

  const router = useRouter();

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }

    if (state?.status === 'success') {
      toast.success(state.message ?? 'Saved successfully!');

      router.push('/onboarding/business-address');
    }
  }, [state, router]);

  if (!hydrated) {
    return (
      <section className="space-y-12">
        <OnboardingFormHeader
          title="Contact Details"
          subtitle="How can we reach you ?"
          headerIcon={<Mail size={24} className="text-primary" />}
        />
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </section>
    );
  }

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
          value={contactInfo.businessEmail}
          onChange={(e) => setContactInfo({ businessEmail: e.target.value })}
          errorMessage={isError ? state?.errors?.businessEmail?.[0] : undefined}
        />

        <Input
          id="businessPhone"
          name="businessPhone"
          label="Business Phone Number"
          type="tel"
          placeholder="Enter your business phone number"
          inputInfo="For urgent order update"
          value={contactInfo.businessPhone}
          onChange={(e) =>
            setContactInfo({ businessPhone: e.target.value.replace(/\s/g, '') })
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
            disabled={pending}
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
