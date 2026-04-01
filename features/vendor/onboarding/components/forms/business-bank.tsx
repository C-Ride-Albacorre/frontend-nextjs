'use client';

import { ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';

import { Button } from '@/components/ui/buttons/button';
import { useActionState, useState } from 'react';
import { businessBankAction } from '../../action';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useOnboardingStore, useOnboardingHydrated } from '../../store';

export default function BusinessBankForm() {
  const hydrated = useOnboardingHydrated();
  const [state, action, pending] = useActionState(
    businessBankAction,
    undefined,
  );

  const { bankInfo, setBankInfo } = useOnboardingStore();

  const isError = state?.status === 'error';

  const router = useRouter();

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }

    if (state?.status === 'success') {
      toast.success(state.message ?? 'Saved successfully!');

      router.push('/onboarding/business-document');
    }
  }, [state, router]);

  if (!hydrated) {
    return (
      <section className="space-y-12">
        <OnboardingFormHeader
          title="Bank Details"
          subtitle="For receiving payments"
          headerIcon={<CreditCard size={24} className="text-primary" />}
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
        title="Bank Details"
        subtitle="For receiving payments"
        headerIcon={<CreditCard size={24} className="text-primary" />}
      />

      <form action={action} className="space-y-6">
        <Input
          id="bankName"
          name="bankName"
          label="Business Bank Name"
          type="text"
          placeholder="Enter your business Bank name"
          value={bankInfo.bankName}
          onChange={(e) => setBankInfo({ bankName: e.target.value })}
          errorMessage={isError ? state?.errors?.bankName?.[0] : undefined}
        />

        <Input
          id="accountNumber"
          name="accountNumber"
          label="Business Account Number"
          type="text"
          placeholder="Enter your business account number"
          value={bankInfo.accountNumber}
          onChange={(e) =>
            setBankInfo({ accountNumber: e.target.value.replace(/\s/g, '') })
          }
          errorMessage={isError ? state?.errors?.accountNumber?.[0] : undefined}
        />

        <Input
          id="accountName"
          name="accountName"
          label="Business Account Name"
          type="text"
          placeholder="Enter your account name"
          inputInfo="Must match your business name"
          value={bankInfo.accountName}
          onChange={(e) => setBankInfo({ accountName: e.target.value })}
          errorMessage={isError ? state?.errors?.accountName?.[0] : undefined}
        />

        <div className="mt-12  flex items-center justify-between lg:justify-around">
          <Button
            href="/onboarding/business-address"
            variant="white"
            size="lg"
            leftIcon={<ChevronLeft size={16} />}
          >
            Previous
          </Button>

          <Button
            type="submit"
            loading={pending}
            disabled={pending}
            variant="primary"
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
