'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  id: string;
  label?: string;
  ariaLabel?: string;

  options?: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;

  variant?: 'default' | 'fill';
  spacing?: 'none' | 'sm' | 'md' | 'lg';

  errorMessage?: string;
  inputInfo?: string;

  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode | ((open: boolean) => React.ReactNode);
}

export function Select({
  id,
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
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const wrapperClasses = clsx(
    'relative flex w-full items-center gap-2 rounded-xl px-4 py-3 text-base md:text-sm outline-none cursor-pointer',
    'border border-border focus-within:ring-2 focus-within:ring-primary',
    {
      'bg-white': variant === 'default',
      'bg-foreground-100': variant === 'fill',
      'border-red-500 focus-within:ring-red-500': errorMessage,

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

      <div
        id={id}
        role="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
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
          <div className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
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
