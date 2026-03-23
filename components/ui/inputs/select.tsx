'use client';

import clsx from 'clsx';
import { useState } from 'react';
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
}: SelectProps) {
  const [open, setOpen] = useState(false);

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

  const selectedLabel =
    options?.find((opt) => opt.value === value)?.label ?? placeholder;

  const resolvedRightIcon =
    typeof rightIcon === 'function' ? rightIcon(open) : rightIcon;

  return (
    <div className="space-y-2 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}

      {name && <input type="hidden" name={name} value={value ?? ''} />}

      <div
        id={id}
        role="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => !disabled && setOpen((prev) => !prev)}
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

        {open && (
          <div className="absolute left-0 top-full z-30 mt-2 w-full max-h-60 overflow-y-scroll rounded-xl border border-border bg-white shadow-lg">
            {options?.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(item.value);
                  setOpen(false);
                }}
                className={clsx(
                  'w-full px-4 py-3 text-left text-sm hover:bg-foreground-100',
                  {
                    'bg-foreground-100 font-medium': item.value === value,
                  },
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}

      {inputInfo && <p className="text-xs text-neutral-500">{inputInfo}</p>}
    </div>
  );
}
