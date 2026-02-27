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
    bankName: '',
    accountNumber: '',
    accountName: '',
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
          id="bankName"
          name="bankName"
          label="Business Bank Name"
          type="text"
          placeholder="Enter your business Bank name"
          value={fields.bankName}
          onChange={handleChange('bankName')}
          errorMessage={isError ? state?.errors?.bankName?.[0] : undefined}
        />

        <Input
          id="accountNumber"
          name="accountNumber"
          label="Business Account Number"
          type="text"
          placeholder="Enter your business account number"
          value={fields.accountNumber}
          onChange={(e) =>
            setFields((prev) => ({
              ...prev,
              accountNumber: e.target.value.replace(/\D/g, ''),
            }))
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
          value={fields.accountName}
          onChange={handleChange('accountName')}
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
            disabled={
              pending ||
              !fields.bankName.trim() ||
              !fields.accountNumber.trim() ||
              !fields.accountName.trim()
            }
            variant="primary"
            size="lg"
            rightIcon={<ChevronRight size={16} />}
          >
            {pending ? 'Submitting...' : 'Save & Proceed'}
          </Button>
        </div>
      </form>
    </section>
  );
}
