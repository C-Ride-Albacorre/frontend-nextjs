'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { MapPin, Search, LoaderCircle, Store, Locate } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { BASE_URL } from '@/config/api';
import { reverseGeocode } from '@/helpers/reverse-geocode-result';

type StoreSuggestion = {
  id: string;
  storeName: string;
  storeAddress: string;
  storeCategory: string;
};

type AddressSuggestion = {
  placeId: string;
  description: string;
};

const DEFAULT_COORDS = {
  lat: 6.5244,
  lng: 3.3792,
};

export default function HeroSearch() {
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [suggestions, setSuggestions] = useState<StoreSuggestion[]>([]);
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([]);

  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const debounceStoreRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceAddressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addressRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [addressPos, setAddressPos] = useState({ top: 0, left: 0, width: 0 });
  const [storePos, setStorePos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setCoords(DEFAULT_COORDS);
      },
      { timeout: 8000 },
    );
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const result = await reverseGeocode(coords.lat, coords.lng);

        if (result) {
          setAddress(result.address);
        }
      } catch {}
    };
    fetchAddress();
  }, [coords]);

  const updatePositions = useCallback(() => {
    if (addressRef.current) {
      const r = addressRef.current.getBoundingClientRect();
      setAddressPos({ top: r.bottom + 8, left: r.left, width: r.width });
    }
    if (storeRef.current) {
      const r = storeRef.current.getBoundingClientRect();
      setStorePos({ top: r.bottom + 8, left: r.left, width: r.width });
    }
  }, []);

  useLayoutEffect(() => {
    updatePositions();
  }, [
    showAddressDropdown,
    showStoreDropdown,
    addressSuggestions,
    suggestions,
    updatePositions,
  ]);

  useEffect(() => {
    window.addEventListener('scroll', updatePositions);
    window.addEventListener('resize', updatePositions);
    return () => {
      window.removeEventListener('scroll', updatePositions);
      window.removeEventListener('resize', updatePositions);
    };
  }, [updatePositions]);

  const fetchStores = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setSuggestions([]);
        setShowStoreDropdown(false);
        return;
      }
      setIsLoadingSuggestions(true);
      try {
        const params = new URLSearchParams();
        params.set('search', term);
        params.set('lat', String(coords.lat));
        params.set('lng', String(coords.lng));
        const res = await fetch(`${BASE_URL}/customer/stores?${params}`);
        const data = await res.json();
        const stores = data?.data?.data ?? [];
        setSuggestions(stores.slice(0, 6));
        setShowStoreDropdown(stores.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    },
    [coords],
  );

const fetchAddresses = useCallback(async (term: string) => {
  if (!term.trim()) {
    setAddressSuggestions([]);
    setShowAddressDropdown(false);
    return;
  }

  try {
    const res = await fetch(
      `/api/google-autocomplete?q=${encodeURIComponent(term)}`
    );

    const data = await res.json();

    setAddressSuggestions(data);
    setShowAddressDropdown(data.length > 0);
  } catch {
    setAddressSuggestions([]);
    setShowAddressDropdown(false);
  }
}, []);

  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearchQuery(v);
    if (debounceStoreRef.current) clearTimeout(debounceStoreRef.current);
    debounceStoreRef.current = setTimeout(() => fetchStores(v), 400);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setAddress(v);
    if (debounceAddressRef.current) clearTimeout(debounceAddressRef.current);
    debounceAddressRef.current = setTimeout(() => fetchAddresses(v), 400);
  };

const buildAndPush = (
  query: string,
  overrideCoords?: { lat: number; lng: number },
  overrideAddress?: string,
) => {
  const c = overrideCoords ?? coords;

  const params = new URLSearchParams();

  params.set('latitude', String(c.lat));
  params.set('longitude', String(c.lng));

  params.set(
    'address',
    overrideAddress ?? address,
  );

  if (query) {
    params.set('search', query);
  }

  router.push(`/stores?${params}`);
};

  const handleSearch = () => {
    setShowStoreDropdown(false);
    setShowAddressDropdown(false);
    buildAndPush(searchQuery);
  };

  const selectStore = (store: StoreSuggestion) => {
    setSearchQuery(store.storeName);
    setShowStoreDropdown(false);
    buildAndPush(store.storeName);
  };

const selectAddress = async (suggestion: AddressSuggestion) => {
  try {
    const res = await fetch(
      `/api/place-details?placeId=${suggestion.placeId}`
    );

    if (!res.ok) return;

    const place = await res.json();

    const newCoords = {
      lat: place.lat,
      lng: place.lng,
    };

    setAddress(place.address);
    setCoords(newCoords);
    setShowAddressDropdown(false);

    buildAndPush(
      searchQuery,
      newCoords,
      place.address
    );
  } catch (error) {
    console.error(error);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full justify-center relative"
    >
      <div className="relative flex flex-col md:flex-row w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl items-center gap-4 rounded-2xl p-3 mx-4 md:mx-0 md:border md:border-border">
        {/* ADDRESS */}
        <div ref={addressRef} className="relative flex-1 w-full md:w-auto">
          <Input
            leftIcon={<MapPin className="h-5 w-5 text-neutral-500" />}
            placeholder="Enter delivery address"
            value={address}
            onChange={handleAddressChange}
            spacing="none"
          />
        </div>

        {/* STORE */}
        <div ref={storeRef} className="relative flex-1 w-full md:w-auto">
          <Input
            leftIcon={
              isLoadingSuggestions ? (
                <LoaderCircle className="animate-spin h-5 w-5 text-primary" />
              ) : (
                <Search className="h-5 w-5 text-neutral-500" />
              )
            }
            placeholder="What can we get you"
            value={searchQuery}
            onChange={handleStoreChange}
            spacing="none"
          />
        </div>

        <Button size="lg" onClick={handleSearch}>
          Search
        </Button>

        {/* ADDRESS DROPDOWN PORTAL */}
        {mounted &&
          showAddressDropdown &&
          addressSuggestions.length > 0 &&
          createPortal(
            <ul
              className="fixed z-9999 bg-white border border-border rounded-2xl shadow-2xl overflow-y-auto"
              style={{
                top: addressPos.top,
                left: addressPos.left,
                width: addressPos.width,
                maxHeight: 220,
              }}
            >
              {addressSuggestions.map((a, i) => (
                <li
                  key={i}
                  className="border-b border-neutral-100 last:border-b-0"
                >
                  <button
                    onClick={() => selectAddress(a)}
                    className="w-full px-4 py-3 text-left hover:bg-neutral-50 grid grid-cols-[16px_1fr] gap-2 items-start cursor-pointer"
                  >
                    <MapPin
                      size={16}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-xs text-neutral-800 wrap-break-word">
                      {a.description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>,
            document.body,
          )}

        {/* STORE DROPDOWN PORTAL */}
        {mounted &&
          showStoreDropdown &&
          suggestions.length > 0 &&
          createPortal(
            <ul
              className="fixed z-9999 bg-white border border-border rounded-2xl shadow-2xl overflow-y-auto"
              style={{
                top: storePos.top,
                left: storePos.left,
                width: storePos.width,
                maxHeight: 220,
              }}
            >
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  className="border-b border-neutral-100 last:border-b-0"
                >
                  <button
                    onClick={() => selectStore(s)}
                    className="w-full px-4 py-3 text-left hover:bg-neutral-50 cursor-pointer"
                  >
                    <div className="flex gap-2 items-center">
                      <Store size={16} className="text-primary shrink-0" />
                      <span className="text-sm font-medium text-neutral-800">
                        {s.storeName}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 ml-6 block mt-0.5">
                      {s.storeCategory} · {s.storeAddress}
                    </span>
                  </button>
                </li>
              ))}
            </ul>,
            document.body,
          )}
      </div>
    </motion.div>
  );
}
