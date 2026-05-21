'use client';

import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { saveLocationAction } from '../action';
import { LocationState } from '../schema';
import { Select } from '@/components/ui/inputs/select';
import { Country, State } from 'country-state-city';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { error } from 'console';
import ErrorMessage from '@/components/layout/error-message';

type Option = {
  label: string;
  value: string;
};

export default function ManualAddressForm({
  isDefault,
  onSuccess,
}: {
  isDefault?: boolean;
  onSuccess?: () => void;
}) {
  const [countryCode, setCountryCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [state, action, isPending] = useActionState(
    saveLocationAction,
    undefined as LocationState,
  );

  const queryClient = useQueryClient();

  // Success handling
  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message || 'Location saved successfully!');

      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });

      // Remove newUser query param
      if (typeof window !== 'undefined' && window.history.replaceState) {
        const url = new URL(window.location.href);

        url.searchParams.delete('newUser');

        window.history.replaceState({}, '', url.pathname + url.search);
      }
    }
  }, [state, onSuccess, queryClient]);

  // Countries
  const countryOptions = useMemo<Option[]>(() => {
    return Country.getAllCountries().map((country) => ({
      label: country.name,
      value: country.isoCode,
    }));
  }, []);

  // States
  const stateOptions = useMemo<Option[]>(() => {
    if (!countryCode) return [];

    return State.getStatesOfCountry(countryCode).map((state) => ({
      label: state.name,
      value: state.isoCode,
    }));
  }, [countryCode]);

  const isError = state?.status === 'error';

  return (
    <div className="space-y-3">
      {isError && (
        <ErrorMessage
          message={
            state?.message || 'An error occurred while saving the location.'
          }
        />
      )}

      <form action={action} className="space-y-5">
        {/* Location Name */}
        <Input
          label="Location Name"
          name="locationName"
          type="text"
          placeholder="e.g. Home, Office, Gym"
          spacing="sm"
          errorMessage={isError ? state.errors?.label?.[0] : undefined}
        />

        {/* Street Address */}
        <Input
          label="Street Address"
          name="streetAddress"
          type="text"
          placeholder="House/Building number and street"
          spacing="sm"
          errorMessage={isError ? state.errors?.address?.[0] : undefined}
        />

        {/* Country + State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="country"
            name="country"
            label="Country"
            spacing="sm"
            options={countryOptions}
            value={countryCode}
            onChange={(value) => {
              setCountryCode(value);
              setStateCode('');
            }}
            placeholder="Select country"
          />

          <Select
            id="state"
            name="state"
            label="State"
            spacing="sm"
            options={stateOptions}
            value={stateCode}
            onChange={setStateCode}
            placeholder="Select state"
            disabled={!countryCode}
          />
        </div>

        {/* Postal Code + City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            name="city"
            type="text"
            placeholder="Enter your city"
            spacing="sm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <Input
            label="Postal Code"
            name="postalCode"
            type="text"
            placeholder="e.g. 100001"
            spacing="sm"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        {/* Default Address */}
        <input
          type="hidden"
          name="isDefault"
          value={isDefault ? 'true' : 'false'}
        />

        {/* Submit */}
        <div className="text-center pt-4">
          <Button
            variant="primary"
            size="lg"
            className="px-12"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save & Use Location'}
          </Button>
        </div>
      </form>
    </div>
  );
}
