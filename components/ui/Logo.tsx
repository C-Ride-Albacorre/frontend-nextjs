import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { LogoProps } from '@/types/button';

const sizes = {
  sm: { width: 80, height: 32 },
  md: { width: 100, height: 48 },
  lg: { width: 120, height: 48 },
};

export function Logo({
  size = 'md',
  href,
  priority = true,
  className,
}: LogoProps) {
  const image = (
    <Image
      src="/assets/svg/logo-main.svg"
      alt="C-ride logo"
      width={sizes[size].width}
      height={sizes[size].height}
      priority={priority}
      className={clsx('select-none', className)}
    />
  );

  if (href) {
    return <Link href={href}>{image}</Link>;
  }

  return image;
}
