'use client';

import Image from 'next/image';
import { useState } from 'react';

const Avatar = ({
  src,
  name,
  size = 96,
  alt = 'User avatar',
}: {
  src?: string;
  name?: string;
  size?: number;
  alt?: string;
}) => {
  const [error, setError] = useState(false);

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium"
      style={{ width: size, height: size }}
    >
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="select-none" style={{ fontSize: size * 0.4 }}>
          {initials || '?'}
        </span>
      )}
    </div>
  );
};

export default Avatar;
