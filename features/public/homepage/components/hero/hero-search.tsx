'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

type StoreSuggestion = {
  id: string;
  storeName: string;
  storeAddress: string;
  storeCategory: string;
};

export default function HeroSearch() {
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [suggestions, setSuggestions] = useState<StoreSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Get geolocation on mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.warn('Geolocation error:', err.message),
    );
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        const params = new URLSearchParams();
        params.set('search', term.trim());
        if (coords?.lat) params.set('lat', String(coords.lat));
        if (coords?.lng) params.set('lng', String(coords.lng));

        const res = await fetch(`/api/stores/nearby?${params.toString()}`);
        const data = await res.json();
        const stores: StoreSuggestion[] = data?.data?.data ?? [];
        setSuggestions(stores.slice(0, 6));
        setShowDropdown(stores.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    },
    [coords],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 400);
  };

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

  const handleSuggestionClick = (store: StoreSuggestion) => {
    setSearchQuery(store.storeName);
    setShowDropdown(false);
    buildAndPush(store.storeName);
  };

  const handleButtonClick = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setShowDropdown(false);
    buildAndPush(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
      className="flex w-full items-center justify-center"
    >
      <div
        ref={wrapperRef}
        className="relative flex flex-col md:flex-row w-full max-w-3xl items-center gap-4 rounded-2xl p-3 mx-4 md:mx-0 md:border md:border-border"
      >
        {/* ADDRESS INPUT */}

        <div className='w-full md:w-auto'>
          <Input
            aria-label="Delivery address"
            variant="fill"
            leftIcon={<MapPin className="h-5 w-5 text-neutral-500" />}
            spacing="none"
            placeholder={
              coords ? 'Location detected ✓' : 'Enter delivery address'
            }
            className="flex-1 py-4 mt-0"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
        </div>

        {/* SEARCH INPUT + DROPDOWN */}
        <div className="relative flex-1 w-full md:w-auto">
          <Input
            ariaLabel="Search items"
            variant="fill"
            leftIcon={
              isLoadingSuggestions ? (
                <Loader2 className="h-5 w-5 text-neutral-400 animate-spin" />
              ) : (
                <Search className="h-5 w-5 text-neutral-500" />
              )
            }
            spacing="none"
            placeholder="What can we get you"
            className="w-full py-4 mt-0"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />

          {/* Suggestions dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute z-50 top-full mt-2 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden">
              {suggestions.map((store) => (
                <li key={store.id}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(store)}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-100 transition cursor-pointer flex flex-col gap-0.5"
                  >
                    <span className="text-sm font-medium text-neutral-800">
                      {store.storeName}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {store.storeCategory} · {store.storeAddress}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <Button
          size="md"
          variant="primary"
          className="shadow-sm mt-4 md:mt-0 px-12 md:px-8"
          onClick={handleButtonClick}
        >
          Search
        </Button>
      </div>
    </motion.div>
  );
}
