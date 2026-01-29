import Link from 'next/link';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
export default function HeroSearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
      className="flex  w-full items-center justify-center"
    >
      <div className="flex flex-col md:flex-row w-full max-w-3xl items-center gap-4 rounded-2xl p-3 mx-4 md:mx-0 md:border md:border-border">
        <Input
          aria-label="Delivery address"
          variant="fill"
          leftIcon={<MapPin className="h-5 w-5 text-neutral-500" />}
          spacing="none"
          placeholder="Enter delivery address"
          className="flex-1 py-4 mt-0"
        />

        <Input
          ariaLabel="Search items"
          variant="fill"
          leftIcon={<Search className="h-5 w-5 text-neutral-500" />}
          spacing="none"
          placeholder="What can we get you"
          className="flex-1 py-4 mt-0"
        />

        <Button
          href="/user/register"
          size="md"
          variant="primary"
          className="shadow-sm mt-4 md:mt-0 px-12 md:px-8"
        >
          Search
        </Button>
      </div>
    </motion.div>
  );
}
