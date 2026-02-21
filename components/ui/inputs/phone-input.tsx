'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';

type Country = {
  name: string;
  code: string;
  dial: string;
};

const DEFAULT_COUNTRY: Country = {
  name: 'Nigeria',
  code: 'NG',
  dial: '+234',
};

interface PhoneInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string | React.ReactNode;
  inputInfo?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PhoneInput({
  id,
  name,
  placeholder = 'Enter phone number',
  value = '',
  errorMessage,
  inputInfo,
  onChange,
}: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selected, setSelected] = useState<Country>(DEFAULT_COUNTRY);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,idd,cca2',
        );
        const raw = await res.json();

        const parsed: Country[] = raw
          .filter((c: any) => c.idd?.root && c.idd?.suffixes?.length)
          .map((c: any) => {
            const suffix = c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : '';
            return {
              name: c.name.common,
              code: c.cca2,
              dial: `${c.idd.root}${suffix}`,
            };
          })
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(parsed);
      } catch {
        // fallback to DEFAULT_COUNTRY
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const match = countries.find((c) => c.code === data.country_code);
        if (match) setSelected(match);
      } catch {
        // silently fall back
      }
    }
    if (countries.length > 0) detectCountry();
  }, [countries]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search),
  );

  // ✅ Full value sent to form action
  const fullValue = value ? `${selected.dial}${value}` : '';

  return (
    <div className="space-y-2 w-full">
      <label className="text-sm font-medium">Phone Number</label>

      <div className="mt-2 flex w-full relative" ref={dropdownRef}>
        {/* ✅ Fixed width country selector */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          disabled={loading}
          className="flex items-center gap-1.5 w-28 shrink-0 px-3 rounded-l-xl border border-r-0 border-border text-sm hover:bg-neutral-50 transition-colors disabled:opacity-50"
        >
          <img
            src={`https://flagcdn.com/w40/${selected.code.toLowerCase()}.png`}
            alt={selected.name}
            width={20}
            height={15}
            className="rounded-sm object-cover shrink-0"
          />
          <span className="text-neutral-700 truncate">{selected.dial}</span>
          <ChevronDown
            size={14}
            className="text-neutral-400 shrink-0 ml-auto"
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
              <Search size={14} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Search country or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm outline-none"
                autoFocus
              />
            </div>

            <ul className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-neutral-400">
                  No countries found
                </li>
              ) : (
                filtered.map((country) => (
                  <li key={country.code}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(country);
                        setOpen(false);
                        setSearch('');
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors
                        ${selected.code === country.code ? 'bg-primary/5 text-primary font-medium' : ''}
                      `}
                    >
                      {/* ✅ Image flags in dropdown too */}
                      <img
                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                        alt={country.name}
                        width={20}
                        height={15}
                        className="rounded-sm object-cover shrink-0"
                      />
                      <span className="flex-1 text-left">{country.name}</span>
                      <span className="text-neutral-400">{country.dial}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Hidden input — full value with dial code */}
        <input type="hidden" name={name} value={fullValue} />

        {/* Visible input — number only */}
        <input
          type="tel"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`min-w-0 w-full rounded-r-xl border px-4 py-3 text-base md:text-sm outline-none placeholder:text-sm
            focus:ring-2 focus:ring-primary
            ${errorMessage ? 'border-red-500' : 'border-border'}
          `}
        />
      </div>

      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
      {inputInfo && <p className="text-xs text-neutral-500">{inputInfo}</p>}
    </div>
  );
}
