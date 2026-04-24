'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

export default function HeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') || '';

  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ Get geolocation once
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
      },
    );
  }, []);

  // ✅ Navigate ONLY on button click
  const buildAndPush = useCallback(
    (query: string) => {
      const params = new URLSearchParams();

      if (coords?.lat !== undefined) params.set('latitude', String(coords.lat));
      if (coords?.lng !== undefined)
        params.set('longitude', String(coords.lng));
      if (query.trim()) params.set('search', query.trim());

      router.push(`/stores?${params.toString()}`);
    },
    [coords, router],
  );

  // ❌ NO navigation while typing search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // ✅ Address autocomplete (debounced)
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setIsLoading(true);

        // 🔥 Replace with your backend OR Google/Mapbox
        const res = await fetch(`/api/location?q=${value}`);
        const data = await res.json();

        setSuggestions(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  const handleSelectSuggestion = (item: any) => {
    setAddress(item.name);
    setCoords({ lat: item.lat, lng: item.lng });
    setSuggestions([]);
  };

  const handleButtonClick = () => {
    buildAndPush(searchQuery);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="flex w-full items-center justify-center"
    >
      <div className="relative flex flex-col md:flex-row w-full max-w-3xl items-center gap-4 rounded-2xl p-3 mx-4 md:mx-0 md:border md:border-border">
        {/* ADDRESS INPUT */}
        <div className="relative w-full">
          <Input
            aria-label="Delivery address"
            variant="fill"
            leftIcon={<MapPin className="h-5 w-5 text-neutral-500" />}
            placeholder={
              coords ? 'Location detected ✓' : 'Enter delivery address'
            }
            className="py-4"
            value={address}
            onChange={handleAddressChange}
          />

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white shadow-md rounded-md z-50 max-h-60 overflow-y-auto">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSelectSuggestion(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEARCH INPUT */}
        <Input
          ariaLabel="Search items"
          variant="fill"
          leftIcon={<Search className="h-5 w-5 text-neutral-500" />}
          placeholder="What can we get you"
          className="flex-1 py-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* BUTTON */}
        <Button
          size="md"
          variant="primary"
          className="shadow-sm px-8"
          onClick={handleButtonClick}
        >
          Search
        </Button>
      </div>
    </motion.div>
  );
}
