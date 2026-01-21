'use client';

import { useState } from 'react';

import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT, HeroKey } from '../data';
import { HeroTabs } from './hero/hero-tabs';
import HeroSearch from './hero/hero-search';
import HeroHeadline from './hero/hero-headline';

export default function Hero() {
  const [active, setActive] = useState<HeroKey>('food');

  return (
    <section className="relative md:h-screen w-full overflow-hidden">
      {/* ================= DESKTOP BACKGROUND IMAGE ONLY ================= */}
      <div className="absolute inset-0 bg-[#201F23] hidden md:block" />

      <AnimatePresence>
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 hidden md:block"
        >
          <Image
            src={HERO_CONTENT[active].image}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ================= DESKTOP GRADIENT OVERLAY ONLY ================= */}
      <div className="absolute inset-0 hidden md:block [background:linear-gradient(180deg,rgba(153,153,153,0)_74.34%,#201F23_95.39%)]" />

      {/* ================= CONTENT ================= */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-around">
        {/* ================= CATEGORY TABS ================= */}
        <HeroTabs active={active} setActive={setActive} />

        {/* ================= HEADLINE + SOCIAL PROOF ================= */}
        <HeroHeadline active={active} />

        {/* ================= SEARCH BAR ================= */}
        <HeroSearch />

        {/* ================= MOBILE IMAGE  ================= */}
        <div className="my-12 w-full md:hidden">
          <div className="relative h-70 w-full">
            <div className="absolute inset-0 bg-[#201F23] md:hidden block" />

            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 md:hidden "
              >
                <Image
                  src={HERO_CONTENT[active].image}
                  alt="Food, grocery and gift delivery"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
