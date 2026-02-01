'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AuthCarouselType } from '@/features/auth/types';
import { ChevronLeft } from 'lucide-react';

type Props = {
  slides: AuthCarouselType[];
};

export default function AuthCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white cursor-pointer z-10 bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition"
      >
        <ChevronLeft /> Back
      </Link>
      {/* TEXT */}
      <div className="absolute bottom-20 left-6 right-6 z-10 max-w-sm text-white">
        <h2 className="text-2xl font-semibold leading-snug">
          {slides[index].title}
        </h2>
        <p className="mt-2 text-sm text-white/80">{slides[index].subtitle}</p>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-6 left-6 flex gap-2 z-10">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-primary' : 'w-4 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
