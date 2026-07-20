'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { LoaderCircle, MapPin, Navigation } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { saveLocationAction } from '../action';
import { LocationState } from '../schema';
import { useQueryClient } from '@tanstack/react-query';
import ErrorMessage from '@/components/layout/error-message';
import { toast } from 'sonner';
import { reverseGeocode } from '@/helpers/reverse-geocode-result';
import { getGoogleMapsEmbedUrl } from '@/helpers/google-maps-embed';



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
  setError('');

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({
          latitude: lat,
          longitude: lng,
        });

        const result = await reverseGeocode(lat, lng);

        if (!result) {
          setError('Unable to determine address.');
          return;
        }

        setPlace(result.address);

        setAddressData({
          address: result.address,
          city: result.city,
          state: result.state,
          country: result.country,
          postalCode: result.postalCode,
        });
      } catch {
        setError('Unable to determine your address.');
      } finally {
        setIsLoading(false);
      }
    },
    () => {
      setError('Unable to retrieve your location');
      setIsLoading(false);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    },
  );
};

  return (
    <div className=" space-y-6">
      {state?.status === 'error' ? (
        <ErrorMessage message={state?.message || 'An error occurred'} />
      ) : error ? (
        <ErrorMessage message={error || 'An error occurred'} />
      ) : null}

      <Card border='none' gap="sm" className="bg-foreground-200 flex flex-col">
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

              {addressData.address && (
  <div className="space-y-4">
    <label className="text-sm font-medium">
      Location Preview
    </label>

    <iframe
      title="selected-location"
      width="100%"
      height="300"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={getGoogleMapsEmbedUrl(addressData.address)}
      className="rounded-xl"
    />
  </div>
)}

        <Card border='none' className=" bg-foreground-200 flex items-start gap-4 ">
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
            leftIcon={
              isPending ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Navigation size={18} />
              )
            }
          >
            {isPending ? 'Saving...' : 'Continue with Selected Location'}
          </Button>
        </div>
      </form>
    </div>
  );
}
