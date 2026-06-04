'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';

const GRADIENTS = [
  ['#2563EB', '#60A5FA'], // blue
  ['#DC2626', '#F87171'], // red
  ['#16A34A', '#4ADE80'], // green
  ['#7C3AED', '#A78BFA'], // violet
  ['#EA580C', '#FB923C'], // orange
  ['#DB2777', '#F472B6'], // pink
  ['#0891B2', '#22D3EE'], // cyan
  ['#4F46E5', '#818CF8'], // indigo
];

function getGradientFromName(name?: string) {
  if (!name) return GRADIENTS[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
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

  const gradient = useMemo(() => getGradientFromName(name), [name]);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full flex items-center justify-center text-white font-medium"
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
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
        <span
          className="select-none font-medium"
          style={{ fontSize: size * 0.4 }}
        >
          {initials || '?'}
        </span>
      )}
    </div>
  );
};

export default Avatar;
