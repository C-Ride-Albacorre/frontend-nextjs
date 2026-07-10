import Link from 'next/link';
import { StoreCardProps } from '../types';
import { Clock3, MapPin, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

export default function StoreCard({
  id,
  image,
  tag,
  name,
  cuisine,
  location,
  time,
  delivery,
  isOpen,
}: StoreCardProps & { isOpen?: boolean }) {
  const store = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  return (
    <Link
      href={`/stores/${id}`}
      className="
        group
        block
        overflow-hidden
        rounded-3xl
        border
        border-border/60
        bg-white
        shadow-sm
        transition-all
        duration-300
       hover:-translate-y-1
       hover:border-primary/20
       hover:shadow-xl
      "
    >
      {/* Cover */}
      <div className="relative h-56 overflow-hidden bg-foreground-200">
        <Image
          src={image || '/assets/image/store-placeholder.png'}
          alt={name || 'Store Image'}
          fill
          loading="lazy"
          className={`${image ? 'object-cover' : 'object-contain'} transition-transform duration-700 group-hover:scale-105`}
        />

        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" /> */}

        {/* Category */}
        {tag && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-text-100 shadow-md">
              {tag}
            </span>
          </div>
        )}

        {/* Open / Closed */}
        <div className="absolute right-4 top-4">
          <span
            className={clsx(
              'rounded-full px-3 py-1 text-xs font-medium shadow-xl',
              isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
            )}
          >
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        {/* Prep Time */}
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg">
            <Clock3 size={14} className="text-primary" />

            <span className="text-xs font-medium">
              Ready in {time || 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-1 text-lg font-semibold capitalize text-neutral-900">
              {name}
            </h3>

            <p className="mt-1 line-clamp-1 text-sm text-neutral-500">
              {cuisine}
            </p>
          </div>

          <ChevronRight
            size={18}
            className="mt-1 shrink-0 text-neutral-300 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>

        {/* Marketplace Tags */}
        <div className="mt-4 flex flex-wrap items-center  justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-green-100">
            <Image
              src="/assets/image/Logo/not-found.png"
              alt="C-Ride"
              width={14}
              height={14}
            />
            Delivered by C-Ride
          </div>

          {delivery && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-medium text-green-700">
              {delivery}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="mt-4 flex items-start gap-2 text-sm text-neutral-500">
          <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />

          <span className="line-clamp-2 capitalize text-sm">{location}</span>
        </div>
      </div>
    </Link>
  );
}
