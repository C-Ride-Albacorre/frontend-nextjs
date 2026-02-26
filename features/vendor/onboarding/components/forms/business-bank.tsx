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

export default function BusinessBankForm() {
  const [fields, setFields] = useState({
    businessBankName: '',
    businessAccountNumber: '',
    businessAccountName: '',
  });

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const [state, action, pending] = useActionState(
    businessBankAction,
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

      setTimeout(() => router.push('/onboarding/business-document'), 1500);
    }
  }, [state, router]);

  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Bank Details"
        subtitle="For receiving payments"
        headerIcon={<CreditCard size={24} className="text-primary" />}
      />

      <form action={action} className="space-y-6">
        <Input
          id="businessBankName"
          name="businessBankName"
          label="Business Bank Name"
          type="text"
          placeholder="Enter your business Bank name"
          value={fields.businessBankName}
          onChange={handleChange('businessBankName')}
          errorMessage={
            isError ? state?.errors?.businessBankName?.[0] : undefined
          }
        />

        <Input
          id="businessAccountNumber"
          name="businessAccountNumber"
          label="Business Account Number"
          type="number"
          placeholder="Enter your business account number"
          value={fields.businessAccountNumber}
          onChange={handleChange('businessAccountNumber')}
          errorMessage={
            isError ? state?.errors?.businessAccountNumber?.[0] : undefined
          }
        />

        <Input
          id="businessAccountName"
          name="businessAccountName"
          label="Business Account Name"
          type="text"
          placeholder="Enter your account name"
          inputInfo="Must match your business name"
          value={fields.businessAccountName}
          onChange={handleChange('businessAccountName')}
          errorMessage={
            isError ? state?.errors?.businessAccountName?.[0] : undefined
          }
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
            href="/onboarding/business-document"
            type="submit"
            loading={pending}
            disabled={
              pending ||
              !fields.businessBankName.trim() ||
              !fields.businessAccountNumber.trim() ||
              !fields.businessAccountName.trim()
            }
            variant="primary"
            size="lg"
            rightIcon={<ChevronRight size={16} />}
          >
            Save & Proceed
          </Button>
        </div>
      </form>
    </section>
  );
}
