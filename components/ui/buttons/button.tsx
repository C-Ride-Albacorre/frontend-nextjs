'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { ButtonProps } from '@/types/button';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  spacing = 'md',
  href,
  disabled,
  loading,
  leftIcon,
  rightIcon,
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
    {
      // variants
      'text-primary': variant === 'default',

      'bg-primary text-primary-text-100 hover:bg-primary-hover':
        variant === 'primary',

      'bg-primary  text-primary-text-100  hover:bg-primary-text-100  hover:text-primary':
        variant === 'primary-inverted',

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

      'bg-primary-text-100  text-primary hover:bg-primary hover:text-primary-text-100':
        variant === 'black',

      'bg-[#E7000B] hover:bg-[#B0000A] text-white': variant === 'red',

      // sizes

      'p-0 text-sm': size === 'none',

      'px-3 py-2.5 text-sm md:px-4 md:py-3': size === 'sm',

      'px-3 py-3 text-sm md:px-6 md:py-3.5': size === 'md',

      'px-4 py-4 text-sm md:px-8 md:py-4': size === 'lg',

      'px-4 py-4 text-sm md:px-10 md:py-4': size === 'xl',

      'px-5 py-4 text-sm md:px-12 md:py-4': size === '2xl',

      'px-8 py-3.5 text-sm md:px-14 md:py-4.5': size === '3xl',

      'px-10 py-4 text-sm md:px-16 md:py-5': size === '4xl',

      'px-12 py-4 text-sm md:px-18 md:py-5': size === '5xl',

      // special layouts
      'w-full max-w-md mx-auto px-6 py-4 text-sm': size === '6xl',

      'w-full px-5 py-3 text-sm md:px-6 md:py-4': size === 'full',

      //square buttons
      'p-2 text-xs md:p-4': size === 'icon',

      //spacing
      'gap-1': spacing === 'sm',
      'gap-2': spacing === 'md',
      'gap-3': spacing === 'lg',
      'gap-4': spacing === 'xl',

      // disabled
      'disabled:opacity-50 disabled:cursor-not-allowed': true,
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
    <button className={classes} disabled={disabled || loading} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
