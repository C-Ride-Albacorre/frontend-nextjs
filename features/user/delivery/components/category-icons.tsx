'use client';

import { Donut, Drumstick, IceCreamCone, Pizza, Tag } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { use, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Subcategory = {
  id: string;
  name: string;
  description?: string;
  storeCount?: number;
};

export default function CategoryIcons({
  subcategories,
}: {
  
  subcategories: Subcategory[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubcategorySelect = (id: string) => {
    setSelectedId(id);


    const params = new URLSearchParams(searchParams.toString());
    params.set('subcategoryId', id);
    router.push(`?${params.toString()}`);
  };

  return (
    <section>
      <div
        className={`flex flex-wrap   ${
          subcategories.length < 3
            ? ' gap-8 md:gap-14'
            : 'justify-center md:justify-between items-center gap-8 md:gap-12'
        }  `}
      >
        {subcategories.map((cat: Subcategory) => (
          <div
            key={cat.id}
            className="flex flex-col justify-center items-center"
          >
            <IconButton
              className={`bg-primary hover:bg-primary-hover ${
                selectedId === cat.id ? 'ring-2 ring-offset-2 ring-primary' : ''
              }`}
              onClick={() => handleSubcategorySelect(cat.id)}
            >
              <Tag size={20} />
            </IconButton>

            <p className="mt-3 text-xs md:text-sm text-primary-text-100">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
