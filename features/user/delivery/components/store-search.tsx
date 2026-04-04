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
};

export default function StoreSearch({ categoryId }: { categoryId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const [suggestions, setSuggestions] = useState<StoreSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildSearchUrl = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set('search', search.trim());
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const fetchSuggestions = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);

      const params = new URLSearchParams();
      params.set('search', term.trim());
      params.set('limit', '5');

      const lat = searchParams.get('latitude');
      const lng = searchParams.get('longitude');
      const radiusKm = searchParams.get('radiusKm');
      const subcategoryId = searchParams.get('subcategoryId');

      if (lat) params.set('lat', lat);
      if (lng) params.set('lng', lng);
      if (radiusKm) params.set('radiusKm', radiusKm);
      if (subcategoryId) params.set('subcategoryId', subcategoryId);

      try {
        const res = await fetch(
          `/api/category-stores/${categoryId}?${params.toString()}`,
        );
        const data = await res.json();
        setSuggestions(data.stores ?? []);
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [categoryId, searchParams],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    router.push(buildSearchUrl(query));
  };

  const handleSuggestionClick = (store: StoreSuggestion) => {
    setQuery(store.storeName);
    setShowDropdown(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', store.storeName);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    router.push(buildSearchUrl(''));
  };

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

  // Cleanup debounce on unmount
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
            placeholder="Find what you want today"
            value={query}
            onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            className="w-full bg-transparent outline-none text-base md:text-sm placeholder:text-sm placeholder:text-neutral-400 focus:outline-none"
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
                  {store.storeAddress}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
