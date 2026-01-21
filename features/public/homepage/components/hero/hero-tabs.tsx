'use client';
import { HERO_CONTENT, HeroKey } from '@/features/public/homepage/data';
import { motion } from 'framer-motion';

export function HeroTabs({
  active,
  setActive,
}: {
  active: HeroKey;
  setActive: (key: HeroKey) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex w-auto md:w-fit md:inline-flex rounded-2xl border border-border p-2 md:gap-2 mt-32 md:mt-16 mx-6 xl:mx-0"
    >
      {Object.entries(HERO_CONTENT).map(([key, item]) => (
        <button
          key={key}
          onClick={() => setActive(key as HeroKey)}
          className={`flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-sm transition-colors md:px-8 cursor-pointer
            ${
              active === key
                ? 'bg-primary font-medium text-primary-text-100 shadow-sm'
                : 'text-primary-text-100 md:text-white hover:bg-white-hover-100'
            }`}
        >
          {item.label}
        </button>
      ))}
    </motion.div>
  );
}
