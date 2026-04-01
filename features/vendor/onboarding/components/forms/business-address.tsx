'use client';

import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { businessAddressAction } from '../../action';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useOnboardingStore, useOnboardingHydrated } from '../../store';

export default function BusinessAddressForm() {
  const hydrated = useOnboardingHydrated();
  const [state, action, pending] = useActionState(
    businessAddressAction,
    undefined,
  );

  const { addressInfo, setAddressInfo } = useOnboardingStore();

  const isError = state?.status === 'error';

  const router = useRouter();

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }

    if (state?.status === 'success') {
      toast.success(state.message ?? 'Saved successfully!');

      router.push('/onboarding/business-bank');
    }
  }, [state, router]);

  if (!hydrated) {
    return (
      <section className="space-y-12">
        <OnboardingFormHeader
          title="Business Address"
          subtitle="Where is your business located?"
          headerIcon={<MapPin size={24} className="text-primary" />}
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
          value={addressInfo.address}
          onChange={(e) => setAddressInfo({ address: e.target.value })}
          errorMessage={isError ? state?.errors?.address?.[0] : undefined}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            id="city"
            name="city"
            label="City"
            type="text"
            placeholder="Lekki"
            value={addressInfo.city}
            onChange={(e) => setAddressInfo({ city: e.target.value })}
            errorMessage={isError ? state?.errors?.city?.[0] : undefined}
          />

          <Input
            id="state"
            name="state"
            label="State"
            type="text"
            placeholder="Lagos"
            value={addressInfo.state}
            onChange={(e) => setAddressInfo({ state: e.target.value })}
            errorMessage={isError ? state?.errors?.state?.[0] : undefined}
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
