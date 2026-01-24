import Link from 'next/link';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';
export default function HeroSearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
      className="flex  w-full items-center justify-center"
    >
      <div className="flex flex-col md:flex-row w-full max-w-3xl items-center gap-4 rounded-2xl p-3 mx-4 md:mx-0 md:border md:border-border">
        <div className="w-full flex md:flex-1 items-center gap-2 rounded-xl bg-foreground-100  px-4 py-4">
          <MapPin className="h-5 w-5 text-neutral-500" />
          <input
            aria-label="Delivery address"
            placeholder="Enter delivery address"
            className="w-full bg-transparent text-base md:text-sm outline-none"
          />
        </div>
        <div className="w-full flex md:flex-1 items-center gap-2 rounded-xl bg-foreground-100 px-4 py-4">
          <Search className="h-5 w-5 text-neutral-500" />
          <input
            aria-label="Search items"
            placeholder="What can we get you"
            className="w-full bg-transparent text-base md:text-sm outline-none"
          />
        </div>
        <Link
          href="/user/register"
          className="w-auto rounded-2xl bg-primary px-12 md:px-5 py-4 text-sm font-medium text-primary-text-100 hover:bg-primary-hover shadow-sm mt-4 md:mt-0"
        >
          Search
        </Link>
      </div>
    </motion.div>
  );
}
