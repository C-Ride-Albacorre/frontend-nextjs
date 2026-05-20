'use client';
import { useRef } from 'react';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconButtonProps } from '@/types/button';

export function IconButton({
  children,
  size = 'md',
  variant = 'default',
  rounded = 'full',
  disabled = false,
  className,
  ariaLabel,
  highlightOnRoutes,
  ...props
}: IconButtonProps) {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);

  const isAtTopRef = useRef(true);

  // Track scroll position
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const atTop = window.scrollY === 0;
          setIsAtTop((prev) => (prev !== atTop ? atTop : prev));
          ticking = false;
        });

        ticking = true;
      }
    };

    handleScroll();

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
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center border transition-all duration-200 cursor-pointer z-10 focus:outline-none',
        {
          'p-0': size === 'none',
          'p-1': size === 'icon',
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

          'border-border bg-white hover:bg-neutral-50': variant === 'white',

          'bg-primary border-primary hover:bg-primary-hover':
            variant === 'primary',

          'border-primary hover:bg-primary-hover/10':
            variant === 'primary-outline',

          'border-transparent hover:bg-neutral-100': variant === 'ghost',

          'border-red-200 hover:bg-red-50 text-red-500 bg-white':
            variant === 'red',

          'border-transparent text-neutral-500 hover:text-neutral-600':
            variant === 'gray',

          'text-white border-border/10 hover:bg-white/10': shouldHighlight,

          // disabled
          'disabled:opacity-50 disabled:cursor-not-allowed': true,
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
