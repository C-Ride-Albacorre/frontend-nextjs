'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { ButtonProps } from '@/types/button';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  leftIcon,
  rightIcon,
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus:outline-none',
    {
      // variants
      'text-primary': variant === 'default',

      'bg-primary text-primary-text-100 hover:bg-primary-hover':
        variant === 'primary',

      'bg-white text-primary-text-100 hover:bg-foreground-100':
        variant === 'secondary',

      'bg-transparent border border-border  text-white hover:bg-white-hover-100 ':
        variant === 'white-outline',

      'border border-border bg-foreground-100 hover:bg-foreground-200':
        variant === 'outline',

      'border border-primary text-primary hover:bg-primary hover:text-primary-text-100':
        variant === 'primary-outline',

      'bg-transparent hover:bg-foreground-100': variant === 'ghost',

      'opacity-90 hover:opacity-100': variant === 'white-nav-link',

      'bg-green-100 hover:bg-green-600': variant === 'green',

      // sizes
      'px-4 py-3 text-sm': size === 'sm',
      'px-6 py-4 text-sm': size === 'md',
      'px-8 py-4 text-sm': size === 'lg',
      'w-full px-6 py-4 text-sm': size === 'full',
    },
    className,
  );

  // LINK MODE
  if (href) {
    return (
      <Link href={href} className={classes}>
        {leftIcon}
        {children}
        {rightIcon}
      </Link>
    );
  }

  // BUTTON MODE
  return (
    <button className={classes} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
