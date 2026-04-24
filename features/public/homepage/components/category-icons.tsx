'use client';

import { Tag } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Category = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
};

export default function CategoryIcons({
  categories,
}: {
  categories: Category[] | undefined | null;
}) {
  const safeCategories = Array.isArray(categories) ? categories : [];
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategorySelect = (id: string) => {
    setSelectedId(id);

    const params = new URLSearchParams(searchParams.toString());
    params.set('id', id);

    router.push(`/stores?${params.toString()}`);
  };

  return (
    <section>
      <div
        className={`flex flex-wrap ${
          safeCategories.length < 3
            ? 'gap-12 md:gap-14'
            : 'justify-center md:justify-between items-center gap-12 md:gap-14'
        }`}
      >
        {safeCategories.map((cat: Category) => (
          <div
            key={cat.id}
            className="flex flex-col justify-center items-center"
          >
            <IconButton
              className={`bg-primary hover:bg-primary-hover ${
                selectedId === cat.id ? 'ring-2 ring-offset-2 ring-primary' : ''
              }`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              {cat.icon ? (
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <Tag size={20} />
              )}
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
