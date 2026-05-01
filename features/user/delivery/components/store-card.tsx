import Link from 'next/link';
import { StoreCardProps } from '../types';
import { Bike, MapPin, Star } from 'lucide-react';
import Image from 'next/image';

export default function StoreCard({
  id,
  image,
  tag,
  name,
  cuisine,
  rating,
  location,
  delivery,
  time,
}: StoreCardProps) {
  const store = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  return (
    <Link
      href={`/user/delivery/${store}/${id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image section */}
      <div className="relative h-52 overflow-hidden">
        <Image
          alt={name}
          src={image ? image : '/assets/image/nigerian.jpg'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          fill
        />

        {tag && (
          <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs shadow text-primary-text-100">
            {tag}
          </span>
        )}

        {/* Delivery badge */}
        <span className="flex items-center gap-2 absolute bottom-3 right-3 bg-white px-3 py-1.5 shadow-2xl rounded-xl text-xs transition-all duration-300 group-hover:scale-105">
          <Bike className="h-4 w-4 text-green-100 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          {time}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 py-6 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-neutral-700 transition-colors duration-300 group-hover:text-primary">
            {name}
          </h3>

          <span className="text-xs flex items-center gap-1 font-medium text-neutral-600">
            <Star
              className="w-4 h-4 text-primary"
              fill="currentColor"
              stroke="none"
            />
            {rating}
          </span>
        </div>

        <div className="mt-2 flex gap-1 items-center">
          <p className="text-xs text-neutral-600">{cuisine}</p>
        </div>

        <div className="grid grid-cols-6 mt-3 gap-2">
          <div className="flex items-start gap-1 text-xs text-neutral-500 col-span-5">
            <MapPin size={14} className="text-green-100" />
            <span className="wrap-break-word">{location}</span>
          </div>

          <p className="text-green-100 text-xs col-span-1 text-end">
            {delivery}
          </p>
        </div>
      </div>
    </Link>
  );
}
