'use client';

import { useActionState, useState, useEffect } from 'react';
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
    businessDescription: '',
  });

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
  }, [state]);

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

        <Textarea
          id="businessDescription"
          name="businessDescription"
          label="Business Description"
          placeholder="Briefly describe what your business offers"
          value={fields.businessDescription}
          onChange={handleChange('businessDescription')}
        />

        <div className="mt-12 flex items-center justify-between lg:justify-around">
          <Button
            href="/vendor/register"
            type="button"
            variant="outline"
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
              !fields.businessType.trim()
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
