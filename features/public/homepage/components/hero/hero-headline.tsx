import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT, HeroKey } from '../../data';

export default function HeroHeadline({ active }: { active: HeroKey }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: 'easeOut' },
              },
            }}
            className="max-w-4xl text-4xl font-semibold leading-tight text-primary-text-100 md:text-white md:text-5xl my-6 md:my-0 mx-6 xl:mx-0"
          >
            {HERO_CONTENT[active].title.map((line, i) => (
              <span key={`${active}-title-${i}`}>{line}</span>
            ))}
          </motion.h1>

          {HERO_CONTENT[active].description && (
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
                },
              }}
              className="mt-4 md:mt-0 mx-6 md:mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-[#B2B2AF] md:text-[#d9d9d9] text-center"
            >
              {HERO_CONTENT[active].description}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8 md:mb-0 mt-6 md:mt-4 mx-6 md:mx-0 flex items-center gap-2 text-sm"
      >
        <div className="hidden md:flex -space-x-1">
          <Image
            src="/assets/image/user1.png"
            alt="User"
            width={24}
            height={24}
            className="rounded-full"
          />
          <Image
            src="/assets/image/user2.png"
            alt="User"
            width={24}
            height={24}
            className="rounded-full"
          />
          <Image
            src="/assets/image/user3.png"
            alt="User"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>

        <p className="text-[#B2B2AF] md:text-[#D7D7D7]">
          Trusted by professionals and families across Lekki, Ikoyi & VI
        </p>
      </motion.div>
    </div>
  );
}
