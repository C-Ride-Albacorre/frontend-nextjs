'use client';

import clsx from 'clsx';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { SelectProps } from '@/types/input';

export function Select({
  id,
  name,
  label,
  ariaLabel,
  options,
  value,
  placeholder = 'Select option',
  onChange,
  variant = 'default',
  spacing = 'sm',
  errorMessage,
  inputInfo,
  className,
  leftIcon,
  rightIcon,
  disabled,
  required,
  searchable = false,
}: SelectProps & {
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Filter options
  const filteredOptions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return options;

    return options?.filter((item) =>
      item.label.toLowerCase().includes(normalizedSearch),
    );
  }, [options, searchTerm]);

  // Selected label
  const selectedLabel =
    options?.find((opt) => opt.value === value)?.label ?? placeholder;

  const resolvedRightIcon =
    typeof rightIcon === 'function' ? rightIcon(open) : rightIcon;

  const wrapperClasses = clsx(
    'relative flex w-full items-center gap-2 rounded-xl px-4 py-3.5 text-base md:text-sm outline-none cursor-pointer',
    'border border-border focus-within:ring focus-within:ring-primary text-xs',
    {
      'bg-white': variant === 'default',
      'bg-foreground-100': variant === 'fill',

      'border-red-500 focus-within:ring-red-500': errorMessage,

      'opacity-60 cursor-not-allowed bg-gray-50': disabled,

      // spacing
      'mt-0': spacing === 'none',
      'mt-2': spacing === 'sm',
      'mt-4': spacing === 'md',
      'mt-6': spacing === 'lg',
    },
    className,
  );

  return (
    <div className="space-y-2 w-full" ref={selectRef}>
      {/* Label */}
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}

          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Hidden form input */}
      {name && <input type="hidden" name={name} value={value ?? ''} />}

      {/* Select trigger */}
      <div
        id={id}
        role="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => {
          if (!disabled) {
            setOpen((prev) => !prev);

            if (open) {
              setSearchTerm('');
            }
          }
        }}
        className={wrapperClasses}
      >
        {leftIcon}

        <span
          className={clsx('flex-1 truncate', {
            'text-neutral-400': !value,
          })}
        >
          {selectedLabel}
        </span>

        {resolvedRightIcon ?? (
          <ChevronDown
            size={18}
            className={clsx('transition-transform', {
              'rotate-180': open,
            })}
          />
        )}

        {/* Dropdown */}
        {open && (
          <div className="absolute left-0 z-30 top-full mt-2 w-full rounded-xl border border-border bg-white shadow-lg">
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-border">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            )}

            {/* Options */}
            <div className="max-h-56 overflow-y-auto">
              {filteredOptions?.length ? (
                filteredOptions.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      onChange?.(item?.value);

                      setOpen(false);
                      setSearchTerm('');
                    }}
                    className={clsx(
                      'w-full px-4 py-3 text-left text-sm hover:bg-foreground-100 cursor-pointer transition-colors',
                      {
                        'bg-foreground-100 font-medium': item.value === value,
                      },
                    )}
                  >
                    {item.label}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-neutral-400">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}

      {/* Input info */}
      {inputInfo && <p className="text-xs text-neutral-500">{inputInfo}</p>}
    </div>
  );
}
