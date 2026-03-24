'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { MapPin, Navigation } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { saveLocationAction } from '../action';
import { LocationState } from '../schema';
import { useQueryClient } from '@tanstack/react-query';
import ErrorMessage from '@/components/layout/error-message';
import { toast } from 'sonner';

// const locations = [
//   'Victoria Island',
//   'Lekki Phase 1',
//   'Ikoyi',
//   'Banana Island',
//   'Ikeja',
//   'Surulere',
//   'Eko Atlantic',
//   'Yaba',
// ];

export default function MapLocations({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [place, setPlace] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  }, [state, onSuccess]);

  const handleUseCurrentLocation = () => {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({ latitude: lat, longitude: lng });

        // ✅ reverse geocode
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lng}`,
          );

          const data = await res.json();
          const addr = data.address || {};

          const city = addr.city || addr.town || addr.village || '';
          const state = addr.state || '';
          const country = addr.country || '';
          const postalCode = addr.postcode || '';

          setPlace(data.display_name);

          setAddressData({
            address: data.display_name || '',
            city,
            state,
            country,
            postalCode,
          });
        } catch {
          setPlace('Unknown location');
        }

        setIsLoading(false);
      },
      () => {
        setError('Unable to retrieve your location');
        setIsLoading(false);
      },
    );
  };

  return (
    <div className=" space-y-6">
      {state?.status === 'error' && (
        <ErrorMessage
          message={state?.message || error || 'An error occurred'}
        />
      )}

      <Card gap="sm" className="bg-foreground-200 flex flex-col">
        <span className="text-neutral-500 text-xs ">
          Select a popular location or use your current GPS location
        </span>
        <Button
          variant="white"
          size="icon"
          className="w-fit hover:bg-white/80 hover:shadow transition"
          disabled={isLoading}
          leftIcon={<Navigation size={18} className="text-neutral-700" />}
          onClick={handleUseCurrentLocation}
        >
          {isLoading ? 'Locating...' : 'Use My Current Location'}
        </Button>
      </Card>

      <form action={action} className="space-y-4">
        <Card className=" bg-foreground-200 flex items-start gap-4 ">
          <MapPin size={20} className="text-primary mb-0" />

          <div className="flex-1 space-y-4 mb-0">
            <p className="font-medium flex items-center gap-2 text-sm">
              Selected Location{' '}
              <span className="text-primary text-xs">GPS</span>
            </p>

            <p className="text-xs text-neutral-500">
              {addressData.address || place || 'No location selected'}
            </p>

            {addressData.city || addressData.state || addressData.country ? (
              <p className="text-xs text-neutral-500 flex items-center gap-6">
                {addressData.city && <span>{addressData.city}</span>}
                {addressData.state && <span>{addressData.state}</span>}
                {addressData.country && <span>{addressData.country}</span>}
              </p>
            ) : null}

            <p className="text-xs text-neutral-500 flex items-center gap-6">
              <span>Lat: {location.latitude} </span>
              <span>Lng: {location.longitude}</span>
            </p>
          </div>

          <input type="hidden" name="locationName" value="Map Address" />

          <input
            type="hidden"
            name="streetAddress"
            value={addressData.address ?? ''}
          />
          <input type="hidden" name="city" value={addressData.city ?? ''} />

          <input type="hidden" name="state" value={addressData.state ?? ''} />
          <input
            type="hidden"
            name="country"
            value={addressData.country ?? ''}
          />
          <input
            type="hidden"
            name="postalCode"
            value={addressData.postalCode ?? ''}
          />
          <input
            type="hidden"
            name="latitude"
            value={location.latitude ?? ''}
          />
          <input
            type="hidden"
            name="longitude"
            value={location.longitude ?? ''}
          />
        </Card>

        <div className="text-center">
          <Button
            size="2xl"
            className="w-full md:w-auto"
            disabled={!location.latitude || !location.longitude || isPending}
            leftIcon={<Navigation size={18} />}
          >
            {isPending ? 'Saving...' : 'Continue with Selected Location'}
          </Button>
        </div>
      </form>

      {/* <div className="border border-border rounded-2xl p-4">
        <h5 className="font-semibold flex items-center gap-2 mb-6 text-primary-text-100">
          <MapIcon size={20} className="text-primary" /> Popular Lagos Locations
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locations.map((loc) => (
            <div
              key={loc}
              className="border border-border rounded-xl p-4 text-sm flex flex-col gap-3 text-gray-400 cursor-pointer hover:bg-foreground-200"
            >
              <MapPin size={18} />
              <p className="font-medium text-primary-text-100 text-sm">{loc}</p>
              <p className="text-xs text-gray-600">6.4281, 3.4219</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
