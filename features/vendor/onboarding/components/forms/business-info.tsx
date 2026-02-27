'use client';

import { useActionState, useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ChevronLeft, ChevronRight, Store } from 'lucide-react';
import { toast } from 'sonner';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import OnboardingFormHeader from '../form-header';
import { Button } from '@/components/ui/buttons/button';
import { businessInfoAction } from '../../action';

export default function BusinessInfoForm() {
  const [fields, setFields] = useState({
    businessName: '',
    businessType: '',
    registrationNumber: '',
    taxId: '',
    description: '',
  });

  const router = useRouter();

  const [state, action, pending] = useActionState(
    businessInfoAction,
    undefined,
  );
  const isError = state?.status === 'error';

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
    };

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }

    if (state?.status === 'success') {
      toast.success(state.message ?? 'Saved successfully!');

      setTimeout(() => router.push('/onboarding/business-contact'), 1500);
    }
  }, [state, router]);

  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Business Information"
        subtitle="Tell us about your business"
        headerIcon={<Store size={24} className="text-primary" />}
      />

      <form action={action} className="space-y-6">
        <Input
          id="businessName"
          name="businessName"
          label="Business Name"
          type="text"
          placeholder="Enter your business name"
          value={fields.businessName}
          onChange={handleChange('businessName')}
          errorMessage={isError ? state.errors?.businessName?.[0] : undefined}
        />

        <Input
          id="businessType"
          name="businessType"
          label="Business Type"
          type="text"
          placeholder="Enter your business type"
          value={fields.businessType}
          onChange={handleChange('businessType')}
          errorMessage={isError ? state.errors?.businessType?.[0] : undefined}
        />

        <Input
          id="registrationNumber"
          name="registrationNumber"
          label="Business Registration No."
          type="text"
          placeholder="Enter your business registration number"
          value={fields.registrationNumber}
          onChange={handleChange('registrationNumber')}
          errorMessage={
            isError ? state.errors?.registrationNumber?.[0] : undefined
          }
        />

        <Input
          id="taxId"
          name="taxId"
          label="TIN No."
          type="text"
          placeholder="Enter your TIN number"
          value={fields.taxId}
          onChange={handleChange('taxId')}
          errorMessage={isError ? state.errors?.taxId?.[0] : undefined}
        />

        <Textarea
          id="description"
          name="description"
          label="Business Description"
          placeholder="Briefly describe what your business offers"
          value={fields.description}
          onChange={handleChange('description')}
        />

        <div className="mt-12 flex items-center justify-between lg:justify-around">
          <Button
            href="/vendor/register"
            type="button"
            variant="white"
            size="lg"
            leftIcon={<ChevronLeft size={16} />}
          >
            Previous
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={pending}
            disabled={
              pending ||
              !fields.businessName.trim() ||
              !fields.businessType.trim() ||
              !fields.registrationNumber.trim() ||
              !fields.taxId.trim()
            }
            rightIcon={<ChevronRight size={16} />}
          >
            {`${pending ? 'Saving...' : 'Save & Proceed'}`}
          </Button>
        </div>
      </form>
    </section>
  );
}
