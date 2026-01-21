import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT, HeroKey } from '../../data';
export default function HeroHeadline({ active }: { active: HeroKey }) {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="flex w-full flex-col items-center text-center"
      >
        <AnimatePresence mode="wait">
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: 'easeOut' },
              },
            }}
            className="max-w-4xl text-4xl font-semibold leading-tight text-primary-text-100 md:text-white md:text-5xl my-10 md:my-0 mx-6 xl:mx-0"
          >
            {HERO_CONTENT[active].title.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' },
            },
          }}
          className="mb-8 md:mb-0 md:mt-4 flex items-center gap-2 text-sm"
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
            Over{' '}
            <span className=" text-primary-text-100 md:text-white">+2000</span>{' '}
            people are using C-ride
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}
