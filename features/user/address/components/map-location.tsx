'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { MapPin, Navigation } from 'lucide-react';
import {  useState } from 'react';

const locations = [
  'Victoria Island',
  'Lekki Phase 1',
  'Ikoyi',
  'Banana Island',
  'Ikeja',
  'Surulere',
  'Eko Atlantic',
  'Yaba',
];

export default function MapLocations() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [error, setError] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const handleUseCurrentLocation = () => {

    setIsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
        },
        () => {
          // Error callback (e.g., user denied permission)
          setError('Unable to retrieve your location');
          setIsLoading(false);
        },
      );
    } else {
      // Geolocation not supported
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  };


  const locationPayload = {
    latitude: location.latitude,
    longitude: location.longitude,
  }

  return (
    <div className=" space-y-6">
      <Card gap="sm" className="bg-foreground-200 flex flex-col">
        {error && <p className="text-red-500">{error}</p>}


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

      <Card className=" bg-foreground-200 flex items-start gap-4 ">
        <MapPin size={20} className="text-primary mb-0" />

        <div className="flex-1 space-y-4">
          <p className="font-medium flex items-center gap-2 text-sm">
            Selected Location <span className='text-primary text-xs'>GPS</span>
          </p>

          <p className="text-xs text-neutral-500 flex items-center gap-4">
            <span>Lat: {location.latitude} </span>
            <span>Lng: {location.longitude}</span>
          </p>
        </div>
      </Card>

      <div className="text-center">
        <Button size="lg" className="w-full md:w-auto" disabled={!location.latitude || !location.longitude}>
          Continue with Selected Location
        </Button>
      </div>

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
