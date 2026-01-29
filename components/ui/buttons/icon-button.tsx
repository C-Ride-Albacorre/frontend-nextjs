import clsx from 'clsx';

import { IconButtonProps } from '@/types/button';

export function IconButton({
  children,
  size = 'md',
  variant = 'default',
  className,
  ariaLabel,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={clsx(
        'inline-flex items-center justify-center rounded-full border transition',
        {
          'p-2': size === 'md',
          'p-1.5': size === 'sm',

          'border-border hover:bg-neutral-100': variant === 'default',
          'border-transparent hover:bg-neutral-100': variant === 'ghost',
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
