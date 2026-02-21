'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';

const PRIMARY_COLORS = [
  '#2563EB', // blue-600
  '#DC2626', // red-600
  '#16A34A', // green-600
  '#7C3AED', // violet-600
  '#EA580C', // orange-600
  '#DB2777', // pink-600
  '#0891B2', // cyan-600
  '#4F46E5', // indigo-600
];

function getColorFromName(name?: string) {
  if (!name) return PRIMARY_COLORS[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return PRIMARY_COLORS[Math.abs(hash) % PRIMARY_COLORS.length];
}

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

  const backgroundColor = useMemo(() => getColorFromName(name), [name]);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full flex items-center justify-center text-white font-medium"
      style={{
        width: size,
        height: size,
        backgroundColor,
      }}
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
