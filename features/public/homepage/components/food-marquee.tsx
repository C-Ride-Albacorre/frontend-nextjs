'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Categories from './categories';
import { Category } from '../../type';

export default function FoodMarquee({
  categories,
}: {
  categories: Category[];
}) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const speed = 0.5;

  const loop = () => {
    const width = containerRef.current?.scrollWidth ?? 0;

    let current = x.get();
    current -= speed;

    if (Math.abs(current) >= width / 2) {
      current += width / 2;
    }

    x.set(current);

    animationRef.current = requestAnimationFrame(loop);
  };

  const start = () => {
    // ✅ prevent multiple loops
    if (animationRef.current) return;

    animationRef.current = requestAnimationFrame(loop);
  };

  const stop = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null; // ✅ IMPORTANT
    }
  };

  useEffect(() => {
    start();

    return () => stop();
  }, []);

  return (
    <section className="bg-white py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={containerRef}
          className="flex gap-6 w-max cursor-grab active:cursor-grabbing will-change-transform"
          style={{ x }}
          // ✅ Drag
          drag="x"
          dragElastic={0.1}
          dragMomentum={false}
          // ✅ Pause on hover (no restart issues)
          onMouseEnter={stop}
          onMouseLeave={start}
          // ✅ Drag behavior
          onDragStart={stop}
          onDragEnd={start}
        >
          <Categories categories={categories} />
          <Categories categories={categories} />
        </motion.div>
      </div>
    </section>
  );
}
