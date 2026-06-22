'use client';

import { Tag } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import EmptyState from '@/components/layout/empty-state';

type SubCategory = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
};

export default function SubCategoryIcons({
  subCategories,
}: {
  subCategories: SubCategory[] | undefined | null;
}) {
  const safeCategories = Array.isArray(subCategories) ? subCategories : [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  console.log('safeCategories', safeCategories);

  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const bathPathname = pathname.includes('/stores') ? '/stores' : pathname;

  const handleCategorySelect = (subcategoryId: string) => {
    setSelectedId(subcategoryId);

    const params = new URLSearchParams(searchParams.toString());
    params.set('subcategoryId', subcategoryId);

    router.push(`${bathPathname}?${params.toString()}`);
  };

  if (!safeCategories.length) {
    return (
      <EmptyState
        icon={<Tag size={36} className="text-neutral-400" />}
        title="No subcategories found"
        message="Please try again later."
      />
    );
  }

  return (
    <section>
      <div
        className={`flex md:p-4 overflow-scroll  ${
          safeCategories.length < 3
            ? 'gap-8 md:gap-14'
            : 'md:justify-between items-start gap-8 md:gap-14'
        }`}
      >
        {safeCategories.map((cat: SubCategory, index: number) => {
          const isActive = selectedId === cat.id;

          const isFirst = index === 0;
          const isLast = index === safeCategories.length - 1;

          return (
            <div
              key={cat.id}
              className="relative flex flex-col items-center text-center justify-center group"
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* ICON */}
              <motion.div
                whileHover={{
                  y: -6,
                  scale: isActive ? 1.08 : 1.05,
                }}
                animate={{
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="rounded-full"
              >
                <IconButton
                  className={`shrink-0 aspect-square overflow-hidden transition-all duration-300 bg-linear-to-t from-primary-hover to-primary ${
                    isActive
                      ? 'ring-2 ring-offset-2 ring-primary'
                      : 'hover:shadow-[0_10px_30px_rgba(var(--primary),0.35)] hover:scale-105'
                  }`}
                  onClick={() => handleCategorySelect(cat.id)}
                  size="md"
                >
                  <div className="relative w-8 h-8 md:w-12 md:h-12 justify-center items-center flex">
                    {cat.icon ? (
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        fill
                        className="object-cover rounded-full"
                        priority
                      />
                    ) : (
                      <Tag size={20} />
                    )}
                  </div>
                </IconButton>
              </motion.div>

              {/* TEXT */}
              <p className="mt-3 text-xs text-primary-text-100 group-hover:text-primary transition-colors duration-300 cursor-default text-center">
                {cat.name}
              </p>

              {/* HOVER BUBBLE */}
              {/* <AnimatePresence>
                {hoveredId === cat.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`absolute bottom-full mb-3 px-3 py-2 rounded-xl bg-black text-white text-xs shadow-xl z-50 max-w-[180px] text-center whitespace-normal
                      ${
                        isFirst
                          ? 'left-0 translate-x-0'
                          : isLast
                          ? 'right-0 translate-x-0'
                          : 'left-1/2 -translate-x-1/2'
                      }
                    `}
                  >
                    { cat.name}

                  
                    <div
                      className={`absolute -bottom-1 w-2 h-2 bg-black rotate-45
                        ${
                          isFirst
                            ? 'left-4'
                            : isLast
                            ? 'right-4'
                            : 'left-1/2 -translate-x-1/2'
                        }
                      `}
                    />
                  </motion.div>
                )}
              </AnimatePresence> */}
            </div>
          );
        })}
      </div>
    </section>
  );
}
