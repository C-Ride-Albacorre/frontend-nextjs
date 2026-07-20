'use client';

// import Input from '@/components/ui/inputs/input';
// import { Button } from '@/components/ui/buttons/button';
// import { useActionState, useEffect, useMemo, useState } from 'react';
// import { saveLocationAction } from '../action';
// import { LocationState } from '../schema';
// import { Select } from '@/components/ui/inputs/select';
// import { Country, State } from 'country-state-city';
// import { toast } from 'sonner';
// import { useQueryClient } from '@tanstack/react-query';
// import { error } from 'console';
// import ErrorMessage from '@/components/layout/error-message';

// type Option = {
//   label: string;
//   value: string;
// };

// export default function ManualAddressForm({
//   isDefault,
//   onSuccess,
// }: {
//   isDefault?: boolean;
//   onSuccess?: () => void;
// }) {
//   const [countryCode, setCountryCode] = useState('');
//   const [stateCode, setStateCode] = useState('');
//   const [city, setCity] = useState('');
//   const [postalCode, setPostalCode] = useState('');

//   const [state, action, isPending] = useActionState(
//     saveLocationAction,
//     undefined as LocationState,
//   );

//   const queryClient = useQueryClient();

//   useEffect(() => {
//     if (state?.status === 'success') {
//       toast.success(state.message || 'Location saved successfully!');

//       onSuccess?.();

//       queryClient.invalidateQueries({
//         queryKey: ['addresses'],
//       });


//       if (typeof window !== 'undefined' && window.history.replaceState) {
//         const url = new URL(window.location.href);

//         url.searchParams.delete('newUser');

//         window.history.replaceState({}, '', url.pathname + url.search);
//       }
//     }
//   }, [state, onSuccess, queryClient]);


//   const countryOptions = useMemo<Option[]>(() => {
//     return Country.getAllCountries().map((country) => ({
//       label: country.name,
//       value: country.isoCode,
//     }));
//   }, []);


//   const stateOptions = useMemo<Option[]>(() => {
//     if (!countryCode) return [];

//     return State.getStatesOfCountry(countryCode).map((state) => ({
//       label: state.name,
//       value: state.isoCode,
//     }));
//   }, [countryCode]);

//   const isError = state?.status === 'error';

//   return (
//     <div className="space-y-3">
//       {isError && (
//         <ErrorMessage
//           message={
//             state?.message || 'An error occurred while saving the location.'
//           }
//         />
//       )}

//       <form action={action} className="space-y-5">
  
//         <Input
//           label="Location Name"
//           name="locationName"
//           type="text"
//           placeholder="e.g. Home, Office, Gym"
//           spacing="sm"
//           errorMessage={isError ? state.errors?.label?.[0] : undefined}
//         />

   
//         <Input
//           label="Street Address"
//           name="streetAddress"
//           type="text"
//           placeholder="House/Building number and street"
//           spacing="sm"
//           errorMessage={isError ? state.errors?.address?.[0] : undefined}
//         />

     
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Select
//             id="country"
//             name="country"
//             label="Country"
//             spacing="sm"
//             options={countryOptions}
//             value={countryCode}
//             onChange={(value) => {
//               setCountryCode(value);
//               setStateCode('');
//             }}
//             placeholder="Select country"
//           />

//           <Select
//             id="state"
//             name="state"
//             label="State"
//             spacing="sm"
//             options={stateOptions}
//             value={stateCode}
//             onChange={setStateCode}
//             placeholder="Select state"
//             disabled={!countryCode}
//           />
//         </div>


//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="City"
//             name="city"
//             type="text"
//             placeholder="Enter your city"
//             spacing="sm"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           />

//           <Input
//             label="Postal Code"
//             name="postalCode"
//             type="text"
//             placeholder="e.g. 100001"
//             spacing="sm"
//             value={postalCode}
//             onChange={(e) => setPostalCode(e.target.value)}
//           />
//         </div>

   
//         <input
//           type="hidden"
//           name="isDefault"
//           value={isDefault ? 'true' : 'false'}
//         />

    
//         <div className="text-center pt-4">
//           <Button
//             variant="primary"
//             size="lg"
//             className="px-12"
//             disabled={isPending}
//           >
//             {isPending ? 'Saving...' : 'Save & Use Location'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }



import { Button } from '@/components/ui/buttons/button';
import Input from '@/components/ui/inputs/input';
import { LoaderCircle, MapPin } from 'lucide-react';
import { useActionState, useEffect, useState, useRef } from 'react';
import { saveLocationAction } from '../action';
import { LocationState } from '../schema';
import { useQueryClient } from '@tanstack/react-query';
import ErrorMessage from '@/components/layout/error-message';
import { toast } from 'sonner';
import { AddressSuggestion, searchAddress } from '@/helpers/address-search';
import { getGoogleMapsEmbedUrl } from '@/helpers/google-maps-embed';

export default function ManualAddressForm({
  isDefault,
  onSuccess,
}: {
  isDefault?: boolean;
  onSuccess?: () => void;
}) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const addressInputRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressData, setAddressData] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  const queryClient = useQueryClient();

  const [state, action, isPending] = useActionState(
    saveLocationAction,
    undefined as LocationState,
  );

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message || 'Location saved successfully!');

      queryClient.invalidateQueries({ queryKey: ['addresses'] });

      if (onSuccess) onSuccess();
    }
  }, [state, onSuccess, queryClient]);

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

  // Search for address suggestions
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchValue.trim()) {
        const results = await searchAddress(searchValue);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const isError = state?.status === 'error';

  const handleSelectAddress = (description: string) => {
    setSelectedAddress(description);
    setSearchValue(description);
    setAddressData({
      address: description,
      city: '',
      state: '',
      country: 'Nigeria',
      postalCode: '',
    });
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div className="space-y-6">
      {isError && (
        <ErrorMessage message={state?.message || 'An error occurred'} />
      )}

      <form action={action} className="space-y-6">
        {/* Address Search with Map Preview */}

          {/* Location Name */}
        <Input
          id="locationName"
          name="locationName"
          label="Location Name"
          type="text"
          placeholder="e.g. Home, Office, Gym"
          errorMessage={isError ? state?.errors?.label?.[0] : undefined}
          spacing="sm"
        />



        <div className="relative" ref={addressInputRef}>
          <Input
            id="address"
            name="streetAddress"
            label="Search Delivery Location"
            type="text"
            placeholder="Enter address or location name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            errorMessage={isError ? state?.errors?.address?.[0] : undefined}
            inputMode="text"
            required
          />

          {/* Address Suggestions Dropdown */}
          {isFocused && suggestions.length > 0 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-white shadow-lg overflow-hidden">
              {suggestions.map((item) => (
                <button
                  key={Math.random()}
                  type="button"
                  className="w-full border-b border-border px-4 py-3 text-left hover:bg-neutral-50 last:border-b-0 text-sm text-neutral-700 cursor-pointer transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectAddress(item.description);
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
        {selectedAddress && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-900">
              Location Preview
            </label>
            <iframe
              title="delivery-location"
              width="100%"
              height="300"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={getGoogleMapsEmbedUrl(selectedAddress)}
              className="rounded-lg"
            ></iframe>
          </div>
        )}

        {/* Address Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <Input
            id="city"
            name="city"
            label="City"
            type="text"
            placeholder="e.g. Lagos"
            value={addressData.city}
            onChange={(e) =>
              setAddressData({ ...addressData, city: e.target.value })
            }
            errorMessage={isError ? state?.errors?.city?.[0] : undefined}
            inputMode="text"
          /> */}

          {/* <Input
            id="state"
            name="state"
            label="State"
            type="text"
            placeholder="e.g. Lagos"
            value={addressData.state}
            onChange={(e) =>
              setAddressData({ ...addressData, state: e.target.value })
            }
            errorMessage={isError ? state?.errors?.state?.[0] : undefined}
            inputMode="text"
          /> */}
        </div>

      

        {/* Country */}
        <Input
          id="country"
          name="country"
          label="Country"
          type="text"
          placeholder="Nigeria"
          value={addressData.country}
          onChange={(e) =>
            setAddressData({ ...addressData, country: e.target.value })
          }
          inputMode="text"
          disabled
        />

        {/* Postal Code */}
        <Input
          id="postalCode"
          name="postalCode"
          label="Postal Code (Optional)"
          type="text"
          placeholder="e.g. 100001"
          value={addressData.postalCode}
          onChange={(e) =>
            setAddressData({ ...addressData, postalCode: e.target.value })
          }
          inputMode="text"
        />

        {/* Default Address */}
        <input
          type="hidden"
          name="isDefault"
          value={isDefault ? 'true' : 'false'}
        />

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="px-12"
            disabled={!selectedAddress || isPending}
            leftIcon={
              isPending ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <MapPin size={18} />
              )
            }
          >
            {isPending ? 'Saving...' : 'Save Delivery Location'}
          </Button>
        </div>
      </form>
    </div>
  );
}
