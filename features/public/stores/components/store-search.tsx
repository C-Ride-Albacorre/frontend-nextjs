'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/buttons/button';
import { BASE_URL } from '@/config/api';

type StoreSuggestion = {
  id: string;
  storeName: string;
  storeAddress: string;
  storeCategory: string;
};

interface StoreSearchProps {
  initialSearch?: string;
}

export default function StoreSearch({ initialSearch = '' }: StoreSearchProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(initialSearch);
  const [suggestions, setSuggestions] = useState<StoreSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ Get current URL params (client-safe)
  const getCurrentParams = () => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  };

  // ✅ Geolocation
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

  // ✅ Build URL
  const buildCleanSearchUrl = useCallback(
    (search: string) => {
      const currentParams = getCurrentParams();
      const params = new URLSearchParams();

      const lat =
        coords?.lat ??
        (currentParams.get('latitude')
          ? parseFloat(currentParams.get('latitude')!)
          : undefined);

      const lng =
        coords?.lng ??
        (currentParams.get('longitude')
          ? parseFloat(currentParams.get('longitude')!)
          : undefined);

      const radiusKm = currentParams.get('radiusKm');

      if (lat !== undefined) params.set('latitude', String(lat));
      if (lng !== undefined) params.set('longitude', String(lng));
      if (radiusKm) params.set('radiusKm', radiusKm);
      if (search.trim()) params.set('search', search.trim());

      params.set('page', '1');

      return `${pathname}?${params.toString()}`;
    },
    [pathname, coords],
  );

  // ✅ Fetch suggestions
  const fetchSuggestions = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);

      try {
        const currentParams = getCurrentParams();
        const params = new URLSearchParams();

        params.set('search', term.trim());
        params.set('limit', '6');

        const lat =
          coords?.lat ??
          (currentParams.get('latitude')
            ? parseFloat(currentParams.get('latitude')!)
            : undefined);

        const lng =
          coords?.lng ??
          (currentParams.get('longitude')
            ? parseFloat(currentParams.get('longitude')!)
            : undefined);

        const radiusKm = currentParams.get('radiusKm');

        if (lat !== undefined) params.set('lat', String(lat));
        if (lng !== undefined) params.set('lng', String(lng));
        if (radiusKm) params.set('radiusKm', radiusKm);

        const res = await fetch(`${BASE_URL}/customer/stores?${params.toString()}`);
        const data = await res.json();

        const stores: StoreSuggestion[] = data?.data?.data ?? [];

        setSuggestions(stores);
        setShowDropdown(stores.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [coords],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    router.replace(buildCleanSearchUrl(query));
  };

  const handleSuggestionClick = (store: StoreSuggestion) => {
    setQuery(store.storeName);
    setShowDropdown(false);
    router.replace(buildCleanSearchUrl(store.storeName));
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    router.replace(buildCleanSearchUrl(''));
  };

  // ✅ Sync with browser navigation (back/forward)
  useEffect(() => {
    const params = getCurrentParams();
    setQuery(params.get('search') ?? '');
  }, [pathname]);

  // Click outside
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

  // Cleanup debounce
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex items-center gap-2 rounded-xl border px-4 py-1 border-border bg-foreground-200">
          <Search className="h-4 w-4 text-neutral-500 shrink-0" />

          <input
            type="text"
            placeholder="Search stores, dishes or products..."
            value={query}
            onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            className="w-full bg-transparent outline-none text-base md:text-sm placeholder:text-sm placeholder:text-neutral-400 py-3"
          />

          {isLoading && (
            <Loader2 className="h-5 w-5 text-neutral-400 animate-spin shrink-0" />
          )}

          {query && !isLoading && (
            <Button
              type="button"
              variant="default-inverted"
              onClick={handleClear}
              size="xs"
            >
              Clear
            </Button>
          )}

          <Button size="icon" type="submit">
            Search
          </Button>
        </div>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full mt-2 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((store) => (
            <li key={store.id}>
              <button
                type="button"
                onClick={() => handleSuggestionClick(store)}
                className={clsx(
                  'w-full text-left px-4 py-3 hover:bg-neutral-100 transition cursor-pointer',
                  'flex flex-col gap-0.5',
                )}
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
  );
}
