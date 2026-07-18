'use client';

import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { businessAddressAction } from '../../action';
import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useOnboardingStore, useOnboardingHydrated } from '../../store';

import { AddressSuggestion, searchAddress } from '@/helpers/address-search';
import { getGoogleMapsEmbedUrl } from '@/helpers/google-maps-embed';

export default function BusinessAddressForm() {
  const hydrated = useOnboardingHydrated();
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const addressInputRef = useRef<HTMLDivElement>(null);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        addressInputRef.current &&
        !addressInputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isFocused]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const results = await searchAddress(addressInfo.address);

      setSuggestions(results);
    }, 300);

    return () => clearTimeout(timeout);
  }, [addressInfo.address]);

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
        <div className="relative" ref={addressInputRef}>
          <Input
            id="address"
            name="address"
            label="Business Street Address"
            type="text"
            placeholder="123 Business Street"
            value={addressInfo.address}
            onChange={(e) => setAddressInfo({ address: e.target.value })}
            errorMessage={isError ? state?.errors?.address?.[0] : undefined}
            inputMode="text"
            required
          />

          {isFocused && suggestions.length > 0 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-white shadow-lg overflow-hidden">
              {suggestions.map((item) => (
                <button
                  key={Math.random()}
                  type="button"
                  className="w-full border-b border-border px-4 py-3 text-left hover:bg-neutral-50 last:border-b-0 text-sm text-neutral-700 cursor-pointer transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setAddressInfo({ address: item.description });
                    setSuggestions([]);
                    setIsFocused(false);
                  }}
                >
                  <div className="flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="text-neutral-500 mt-0.5 shrink-0"
                    />
                    <div className="flex-1">{item.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Preview */}
        {addressInfo.address && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-900">
              Location Preview
            </label>
            <iframe
              title="store-location"
              width="100%"
              height="300"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={getGoogleMapsEmbedUrl(addressInfo.address)}
              className="rounded-lg "
            ></iframe>
          </div>
        )}

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
            inputMode="text"
            required
          />

          <Input
            id="state"
            name="state"
            label="State"
            type="text"
            placeholder="Lagos"
            value={addressInfo.state}
            onChange={(e) => setAddressInfo({ state: e.target.value })}
            required
            errorMessage={isError ? state?.errors?.state?.[0] : undefined}
            inputMode="text"
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
