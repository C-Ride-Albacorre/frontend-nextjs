'use client';

import { Donut, Drumstick, IceCreamCone, Pizza, Tag } from 'lucide-react';
import { useSubcategories } from '../fetch';
import CategoryIconsSkeleton from './category-icon-skeleton';

type Subcategory = {
  id: string;
  name: string;
  description?: string;
  storeCount?: number;
};

export default function CategoryIcons({ id }: { id: string }) {
  const { data: subcategories, isError, isPending } = useSubcategories(id);

  if (isPending) {
    return <CategoryIconsSkeleton />;
  }

  if (isError) {
    return <p className="text-sm text-red-500">Failed to load subcategories</p>;
  }

  if (!subcategories?.length) {
    return <p className="text-sm text-neutral-500">No subcategories found</p>;
  }

  return (
    <section>
      <div className="flex flex-wrap gap-12 justify-center md:justify-between items-center">
        {subcategories.map((cat: Subcategory) => (
          <div
            key={cat.id}
            className="flex flex-col justify-center items-center"
          >
            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-primary hover:bg-primary-hover cursor-pointer flex items-center justify-center">
              <Tag />
            </div>

            <p className="mt-3 text-xs md:text-sm text-primary-text-100">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
