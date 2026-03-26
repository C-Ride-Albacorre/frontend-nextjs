'use client';

import Image from 'next/image';
import { useCategories } from '../fetch';
import Link from 'next/link';
import CategoriesSkeleton from './categories-skeleton';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Card from '@/components/layout/card';
import { Store } from 'lucide-react';

type Category = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
};

export default function Categories() {
  const { data: categories, isPending, isError } = useCategories();

  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
  }>({});

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      toast.error('Geolocation is not supported on this device.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Location access was denied.'
            : error.code === error.POSITION_UNAVAILABLE
              ? 'Your location is currently unavailable.'
              : error.code === error.TIMEOUT
                ? 'Location request timed out.'
                : 'Unable to get your location.';

        toast.error(message);
      },
    );
  }, []);

  console.log('data', categories);

  if (isPending) {
    return <CategoriesSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load categories.
      </div>
    );
  }

  if (!Array.isArray(categories) || !categories.length) {
    return (
      <Card className="mt-6  bg-white text-sm text-neutral-500 flex flex-col items-center gap-2 h-48 justify-center">
        <Store size={24} className="text-neutral-400" />

        <p>No categories found.</p>
      </Card>
    );
  }

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories?.map((item: any) => (
          <Link
            href={`/user/delivery/${item.id}?name=${encodeURIComponent(item.name)}&latitude=${location.latitude ?? ''}&longitude=${location.longitude ?? ''}`}
            key={item.id}
            className="relative flex  items-center justify-between rounded-2xl bg-primary px-6 py-4  text-left transition hover:opacity-95 cursor-pointer"
          >
            {/* Left */}
            <div className="flex flex-col justify-around h-full py-2">
              {/* <item.icon className="h-6 w-6 text-primary-text-100" /> */}
              <p className="mt-6 font-medium text-primary-text-100 ">
                {item.name}
              </p>
            </div>

            {/* Image */}
            <div className="relative h-32 w-36 overflow-hidden rounded-xl">
              <Image
                src={item.image ? item.image : '/assets/image/nigerian.jpg'}
                alt={item.name}
                fill
                className="object-cover"
                unoptimized
              />

              {/* Display Order */}
              <span className="absolute right-1 top-1 rounded-full bg-white w-6 h-6 flex justify-center items-center shrink-0 aspect-square text-[10px] font-medium text-primary-text-100 shadow-2xl">
                {item.displayOrder}
              </span>

              <div className="absolute inset-0 hidden md:block [background:linear-gradient(180deg,rgba(153,153,153,0)_54.34%,#201F23_95.39%)]" />

              {/* Text */}
              <div className="absolute bottom-1 left-1 text-[10px] text-white">
                <p className="font-medium">
                  {item.description || 'No description available'}
                </p>
                <p className="opacity-80">{item.meta}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
