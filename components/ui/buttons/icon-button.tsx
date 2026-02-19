'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconButtonProps } from '@/types/button';

export function IconButton({
  children,
  size = 'md',
  variant = 'default',
  rounded = 'full',
  className,
  ariaLabel,
  highlightOnRoutes,
  ...props
}: IconButtonProps) {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    handleScroll(); // run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRouteMatched =
    highlightOnRoutes?.some((route) => pathname === route) ?? false;

  const shouldHighlight = isRouteMatched && isAtTop;

  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={clsx(
        'inline-flex items-center justify-center border transition-all duration-200 cursor-pointer z-10 focus:outline-none',
        {
          'p-0': size === 'none',
          'p-1.5': size === 'sm',
          'p-2': size === 'md',

          'rounded-none': rounded === 'none',
          'rounded-sm': rounded === 'sm',
          'rounded-md': rounded === 'md',
          'rounded-lg': rounded === 'lg',
          'rounded-xl': rounded === 'xl',
          'rounded-2xl': rounded === '2xl',
          'rounded-full': rounded === 'full',

          'border-border hover:bg-neutral-100': variant === 'default',
          'border-border bg-foreground-200 hover:bg-neutral-100':
            variant === 'fill',

          'border-transparent hover:bg-neutral-100': variant === 'ghost',

          'border-[#EF4444] hover:bg-[#E7000B] hover:text-white text-[#EF4444] bg-white':
            variant === 'red',

          'border-transparent text-neutral-500 hover:text-neutral-600':
            variant === 'gray',

          'text-white border-border/10 hover:bg-white/10': shouldHighlight,
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
