'use client';

import clsx from 'clsx';
import { Search } from 'lucide-react';

type ActionInputProps = {
  placeholder: string;
  ariaLabel: string;

  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  leftIcon?: React.ReactNode;

  buttonText: string;
  onButtonClick?: () => void;
  buttonVariant?: 'primary' | 'white';

  wrapperClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

export default function ActionInput({
  placeholder,
  ariaLabel,
  type = 'text',
  value,
  onChange,
  leftIcon,
  buttonText,
  onButtonClick,
  buttonVariant = 'primary',
  wrapperClassName,
  inputClassName,
  buttonClassName,
}: ActionInputProps) {
  return (
    <div
      className={clsx(
        'w-full flex items-center gap-2 rounded-xl border px-4 py-2',
        {
          'border-border bg-foreground-200': buttonVariant === 'primary',
          'bg-neutral-secondary-medium border border-default-medium text-heading':
            buttonVariant === 'white',
        },
        wrapperClassName,
      )}
    >
      {leftIcon}

      <input
        type={type}
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          'w-full bg-transparent outline-none text-base md:text-sm placeholder:text-sm placeholder:text-white/40 focus:outline-none',
          inputClassName,
        )}
      />

      <button
        type="button"
        onClick={onButtonClick}
        className={clsx(
          'px-4 py-3 rounded-xl font-medium text-sm transition',
          buttonVariant === 'primary' &&
            'bg-primary hover:bg-primary-hover text-primary-text-100',
          buttonVariant === 'white' &&
            'bg-white border border-border text-primary-text-100 hover:bg-foreground-100',
          buttonClassName,
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}
