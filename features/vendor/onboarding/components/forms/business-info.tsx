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
import { Select } from '@/components/ui/inputs/select';
import { useBusinessTypes } from '../../fetch';
import { useOnboardingStore, useOnboardingHydrated } from '../../store';

export default function BusinessInfoForm() {
  const hydrated = useOnboardingHydrated();

  const router = useRouter();

  const [state, action, pending] = useActionState(
    businessInfoAction,
    undefined,
  );
  const isError = state?.status === 'error';

  const { businessInfo, setBusinessInfo } = useOnboardingStore();

  const { data: businessTypes, isPending, error } = useBusinessTypes();

  const options =
    businessTypes?.map((type: any) => ({
      value: type.name,
      label: type.name,
    })) ?? [];

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }

    if (state?.status === 'success') {
      toast.success(state.message ?? 'Saved successfully!');

      router.push('/onboarding/business-contact');
    }
  }, [state, router]);

  if (!hydrated) {
    return (
      <section className="space-y-12">
        <OnboardingFormHeader
          title="Business Information"
          subtitle="Tell us about your business"
          headerIcon={<Store size={24} className="text-primary" />}
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
          value={businessInfo.businessName}
          onChange={(e) => setBusinessInfo({ businessName: e.target.value })}
          errorMessage={isError ? state.errors?.businessName?.[0] : undefined}
        />

        <Select
          id="businessType"
          name="businessType"
          label="Business Type"
          value={businessInfo.businessType}
          onChange={(value) => setBusinessInfo({ businessType: value })}
          options={
            isPending
              ? [{ value: '', label: 'Loading Business Types...' }]
              : options
          }
          errorMessage={isError ? state.errors?.businessType?.[0] : undefined}
        />

        <Input
          id="registrationNumber"
          name="registrationNumber"
          label="Business Registration No."
          type="text"
          placeholder="Enter your business registration number"
          value={businessInfo.registrationNumber}
          onChange={(e) =>
            setBusinessInfo({ registrationNumber: e.target.value })
          }
          errorMessage={
            isError ? state.errors?.registrationNumber?.[0] : undefined
          }
        />

        <Input
          id="taxId"
          name="taxId"
          label="Tax ID"
          type="text"
          placeholder="Enter your Tax ID number"
          value={businessInfo.taxId}
          onChange={(e) => setBusinessInfo({ taxId: e.target.value })}
          errorMessage={isError ? state.errors?.taxId?.[0] : undefined}
        />

        <Textarea
          id="description"
          name="description"
          label="Business Description"
          placeholder="Briefly describe what your business offers"
          value={businessInfo.description}
          onChange={(e) => setBusinessInfo({ description: e.target.value })}
          errorMessage={isError ? state.errors?.description?.[0] : undefined}
        />

        <div className="mt-12 flex items-center justify-between lg:justify-around">
          <Button
            href="/vendor/register"
            type="button"
            variant="white"
            size="lg"
            leftIcon={<ChevronLeft size={16} />}
          >
            Go to Registration
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={pending}
            disabled={pending}
            rightIcon={<ChevronRight size={16} />}
          >
            {`${pending ? 'Saving...' : 'Save & Proceed'}`}
          </Button>
        </div>
      </form>
    </section>
  );
}
