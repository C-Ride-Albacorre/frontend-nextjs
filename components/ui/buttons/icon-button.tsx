'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconButtonProps } from '@/types/button';

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
        'inline-flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer z-10 focus:outline-none',
        {
          'p-2': size === 'md',
          'p-1.5': size === 'sm',

          'border-border hover:bg-neutral-100': variant === 'default',
          'border-transparent hover:bg-neutral-100': variant === 'ghost',

          'text-white border-border/10 hover:bg-white/10': shouldHighlight,
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
