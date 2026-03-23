'use client';

import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { useActionState, useEffect, useMemo, useState } from 'react';
import ErrorMessage from '@/components/layout/error-message';
import { saveLocationAction } from '../action';
import { LocationState } from '../schema';
import { Select } from '@/components/ui/inputs/select';
import { Country, State } from 'country-state-city';
import { toast } from 'sonner';

type Option = {
  label: string;
  value: string;
};

function moveSelectedToTop(options: Option[], selectedValue: string) {
  if (!selectedValue) return options;

  const selected = options.find((opt) => opt.value === selectedValue);
  const rest = options.filter((opt) => opt.value !== selectedValue);

  return selected ? [selected, ...rest] : options;
}

export default function ManualAddressForm({
  isDefault,
  onSuccess,
}: {
  isDefault?: boolean;
  onSuccess?: () => void;
}) {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [detectedCountryCode, setDetectedCountryCode] = useState('');
  const [detectedStateCode, setDetectedStateCode] = useState('');

  const [state, action, isPending] = useActionState(
    saveLocationAction,
    undefined as LocationState,
  );

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message || 'Location saved successfully!');
      // Remove ?newUser=true from URL so modal does not show again
      if (typeof window !== 'undefined' && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.delete('newUser');
        window.history.replaceState({}, '', url.pathname + url.search);
      }
      if (onSuccess) onSuccess();
    }
  }, [state, onSuccess]);

  const allCountries = useMemo<Option[]>(() => {
    return Country.getAllCountries().map((country) => ({
      label: country.name,
      value: country.isoCode,
    }));
  }, []);

  const countryOptions = useMemo(() => {
    return moveSelectedToTop(allCountries, countryCode || detectedCountryCode);
  }, [allCountries, countryCode, detectedCountryCode]);

  const allStates = useMemo<Option[]>(() => {
    if (!countryCode) return [];

    return State.getStatesOfCountry(countryCode).map((state) => ({
      label: state.name,
      value: state.isoCode,
    }));
  }, [countryCode]);

  const stateOptions = useMemo(() => {
    return moveSelectedToTop(allStates, stateCode || detectedStateCode);
  }, [allStates, stateCode, detectedStateCode]);

  const isError = state?.status === 'error';

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({ latitude, longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                Accept: 'application/json',
              },
            },
          );

          if (!res.ok) {
            throw new Error('Failed to reverse geocode location');
          }

          const data = await res.json();
          const address = data.address || {};

          const detectedCountryName = address.country || '';
          const detectedStateName = address.state || '';
          const detectedCity =
            address.city || address.town || address.village || '';
          const detectedPostalCode = address.postcode || '';

          setCity(detectedCity);
          setPostalCode(detectedPostalCode);

          const matchedCountry = Country.getAllCountries().find(
            (country) =>
              country.name.toLowerCase() === detectedCountryName.toLowerCase(),
          );

          if (matchedCountry) {
            setCountryCode(matchedCountry.isoCode);
            setDetectedCountryCode(matchedCountry.isoCode);

            const states = State.getStatesOfCountry(matchedCountry.isoCode);

            const matchedState = states.find(
              (state) =>
                state.name.toLowerCase() === detectedStateName.toLowerCase(),
            );

            if (matchedState) {
              setStateCode(matchedState.isoCode);
              setDetectedStateCode(matchedState.isoCode);
            }
          }
        } catch (err) {
          setError(
            'We got your coordinates, but could not fully detect your address details.',
          );
        }
      },
      () => {
        setError('Unable to retrieve your location');
      },
    );
  }, []);

  return (
    <>
      {error && <ErrorMessage message={error} />}

      <form action={action} className="space-y-5">
        <Input
          label="Location Name"
          name="locationName"
          type="text"
          placeholder="e.g. Home, Office, Gym"
          spacing="sm"
          errorMessage={isError ? state.errors?.label?.[0] : undefined}
        />

        <Input
          label="Street Address"
          name="streetAddress"
          type="text"
          placeholder="Home/Building number and street"
          spacing="sm"
          errorMessage={isError ? state.errors?.address?.[0] : undefined}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Postal Code"
            name="postalCode"
            type="text"
            placeholder="eg. 100001"
            spacing="sm"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <Input
            label="City"
            name="city"
            type="text"
            placeholder="Select your city"
            spacing="sm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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

        <input type="hidden" name="latitude" value={location.latitude ?? ''} />
        <input
          type="hidden"
          name="longitude"
          value={location.longitude ?? ''}
        />

        <input
          type="hidden"
          name="isDefault"
          value={isDefault ? 'true' : 'false'}
        />

        {/* <Textarea
          id="deliveryInstructions"
          label="Delivery Instructions (Optional)"
          placeholder="Add any specific delivery instructions..."
          rows={4}
        /> */}

        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            className="px-12"
            disabled={isPending}
          >
            Save & Use Location
          </Button>
        </div>
      </form>
    </>
  );
}
