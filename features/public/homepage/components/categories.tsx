import Image from 'next/image';
import { Category } from '../../type';
import { Store } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/components/layout/empty-state';

export default function Categories({ categories }: { categories: Category[] }) {
  console.log(' Categories component rendered with categories:', categories);
  if (!Array.isArray(categories) || !categories.length) {
    return (
      <EmptyState
        icon={<Store size={36} className="text-neutral-400" />}
        title="No categories found"
        message="Please try again later."
      />
    );
  }

  return (
    <>
      {categories?.map((item, index) => {
        const title = item.name?.trim();
        const image = item.image;
        const isActive = item.isActive;

        return (
          <Link
            // href={`/stores?categoryId=${item.id}&name=${encodeURIComponent(item.name)}`}

            href={`/stores?categoryId=${item.id}`}
   
            key={`${item.id}-${index}`}
            className="relative h-60 min-w-56 overflow-hidden rounded-2xl"
          >
            <Image
              src={image}
              alt={title}
              fill
              priority={index < 5}
              className="object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 h-48 md:h-54 bg-linear-to-t from-black to-transparent" />

            {/* Category badge */}
            {/* <div className="absolute top-4 left-4">
              <span className="rounded-full bg-white px-2 py-1 text-xs">
                Category
              </span>
            </div> */}

            {/* Status */}
            <div className="absolute top-4 right-4">
              <span
                className={`block h-3 w-3 rounded-full ${
                  isActive ? 'bg-green-400' : 'bg-gray-400'
                }`}
              />
            </div>

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-lg">{title}</h2>
              {/* <p className="text-sm opacity-80">
                {item._count?.stores ?? 0} stores
              </p> */}
            </div>
          </Link>
        );
      })}
    </>
  );
}
