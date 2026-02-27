'use client';

import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { businessAddressAction } from '../../action';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function BusinessAddressForm() {
  const [fields, setFields] = useState({
    address: '',
    city: '',
    state: '',
  });

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const [state, action, pending] = useActionState(
    businessAddressAction,
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

      setTimeout(() => router.push('/onboarding/business-bank'), 1500);
    }
  }, [state, router]);

  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Business Address"
        subtitle="Where is your business located?"
        headerIcon={<MapPin size={24} className="text-primary" />}
      />

      <form action={action} className="space-y-6">
        <Input
          id="address"
          name="address"
          label="Business Street Address"
          type="text"
          placeholder="123 Business Street"
          value={fields.address}
          onChange={handleChange('address')}
          errorMessage={
            isError ? state?.errors?.address?.[0] : undefined
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            id="city"
            name="city"
            label="City"
            type="text"
            placeholder="Lekki"
            value={fields.city}
            onChange={handleChange('city')}
            errorMessage={
              isError ? state?.errors?.city?.[0] : undefined
            }
          />

          <Input
            id="state"
            name="state"
            label="State"
            type="text"
            placeholder="Lagos"
            value={fields.state}
            onChange={handleChange('state')}
            errorMessage={
              isError ? state?.errors?.state?.[0] : undefined
            }
          />
        </div>

        <div className="mt-12  flex items-center justify-between lg:justify-around">
          <Button
            href="/onboarding/business-contact"
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
              !fields.address.trim() ||
              !fields.city.trim() ||
              !fields.state.trim()
            }
            rightIcon={<ChevronRight size={16} />}
          >
            Save & Proceed
          </Button>
        </div>
      </form>
    </section>
  );
}
