import Link from 'next/link';
import { StoreCardProps } from '../types';
import { Bike, Dot, MapPin, Star } from 'lucide-react';

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
  return (
    <Link
      href={`/dashboard/delivery/food/${id}`}
      className="bg-white rounded-2xl overflow-hidden border border-border"
    >
      <div className="relative h-52">
        <img alt={name} src={image} className="w-full h-full object-cover" />

        {tag && (
          <span className="absolute top-3 left-3 bg-primary px-3 py-1  rounded-full text-xs">
            {tag}
          </span>
        )}

        <span className="flex justify-center items-center gap-2 absolute bottom-3 right-3 bg-white px-3 py-1.5 shadow-2xl rounded-xl text-xs">
          <Bike className="h-4 w-4 text-green-100" />
          {time}
        </span>
      </div>

      <div className="px-4 py-8 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold ">{name}</h3>
          <span className="text-sm flex justify-center items-center gap-1 p-1.5 rounded-md bg-green-100/10 font-medium">
            <Star
              className="w-4 h-4 text-primary"
              fill="currentColor"
              stroke="none"
            />
            {rating}
          </span>
        </div>

        <div className="mt-2 flex gap-1 items-center">
          <p className="text-sm text-neutral-500">{cuisine}</p>
          <Dot className="w-4 h-4 text-neutral-500" />
          <p className="text-sm text-neutral-500">{cuisine}</p>
        </div>

        <div className="flex justify-between items-center   mt-3">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <MapPin size={16} />
            <span>{location}</span>
          </div>

          <p className="text-green-100 text-sm">{delivery}</p>
        </div>
      </div>
    </Link>
  );
}
