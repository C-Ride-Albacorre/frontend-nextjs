import clsx from 'clsx';

import { IconButtonProps } from '@/types/button';
import { usePathname } from 'next/navigation';

export function IconButton({
  children,
  size = 'md',
  variant = 'default',
  className,
  ariaLabel,
  highlightOnRoutes,
  ...props
}: IconButtonProps) {
  const pathname = usePathname();

  const isHighlighted =
    highlightOnRoutes?.some((route) => pathname === route) ?? false;

  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={clsx(
        'inline-flex items-center justify-center rounded-full border transition cursor-pointer z-10 focus:outline-none',
        {
          'p-2': size === 'md',
          'p-1.5': size === 'sm',

          'border-border hover:bg-neutral-100': variant === 'default',
          'border-transparent hover:bg-neutral-100': variant === 'ghost',

          //  route-based styling
          'text-white border-border/10 hover:bg-white/10': isHighlighted,
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
