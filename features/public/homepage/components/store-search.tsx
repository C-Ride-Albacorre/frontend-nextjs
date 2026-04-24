'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/buttons/button';

type StoreSuggestion = {
  id: string;
  storeName: string;
  storeAddress: string;
  storeCategory: string;
};

export default function StoreSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const [suggestions, setSuggestions] = useState<StoreSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // ✅ Added: geolocation coords like HeroSearch
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ Added: detect geolocation on mount (mirrors HeroSearch)
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

  // Build a clean URL — keeps location params, drops category id and old search
  const buildCleanSearchUrl = useCallback(
    (search: string) => {
      const params = new URLSearchParams();

      // Prefer live coords; fall back to URL params
      const lat = coords?.lat ?? (searchParams.get('latitude') ? parseFloat(searchParams.get('latitude')!) : undefined);
      const lng = coords?.lng ?? (searchParams.get('longitude') ? parseFloat(searchParams.get('longitude')!) : undefined);
      const radiusKm = searchParams.get('radiusKm');

      if (lat !== undefined) params.set('latitude', String(lat));
      if (lng !== undefined) params.set('longitude', String(lng));
      if (radiusKm) params.set('radiusKm', radiusKm);
      if (search.trim()) params.set('search', search.trim());
      params.set('page', '1');

      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams, coords],
  );

  const fetchSuggestions = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('search', term.trim());
        params.set('limit', '6');

        // ✅ Use live coords first (like HeroSearch), fallback to URL params
        const lat = coords?.lat ?? (searchParams.get('latitude') ? parseFloat(searchParams.get('latitude')!) : undefined);
        const lng = coords?.lng ?? (searchParams.get('longitude') ? parseFloat(searchParams.get('longitude')!) : undefined);
        const radiusKm = searchParams.get('radiusKm');

        if (lat !== undefined) params.set('lat', String(lat));
        if (lng !== undefined) params.set('lng', String(lng));
        if (radiusKm) params.set('radiusKm', radiusKm);

        const res = await fetch(`/api/stores/nearby?${params.toString()}`);
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
    [searchParams, coords],
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

  // ✅ Click suggestion → navigate immediately (same as HeroSearch)
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

  // Sync input when URL search param changes externally (e.g. browser back)
  useEffect(() => {
    setQuery(searchParams.get('search') ?? '');
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            aria-label="Search stores or products"
            placeholder="Search stores, dishes or products..."
            value={query}
            onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            className="w-full bg-transparent outline-none text-base md:text-sm placeholder:text-sm placeholder:text-neutral-400 focus:outline-none py-3"
          />

          {isLoading && (
            <Loader2 className="h-5 w-5 text-neutral-400 animate-spin shrink-0" />
          )}

          {query && !isLoading && (
            <Button type="button" variant="default-inverted" onClick={handleClear} size="xs">
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