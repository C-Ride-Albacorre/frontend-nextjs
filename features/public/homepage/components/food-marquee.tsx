'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

const items = [
  { title: 'Nigerian', count: '45+', category: 'Popular', status: true },
  { title: 'Asian', count: '25+', category: 'Newly added', status: false },
  { title: 'Burgers', count: '35+', category: 'Popular', status: true },
  { title: 'Swallow', count: '28+', category: 'Popular', status: null },
  { title: 'Italian', count: '28+', category: 'Newly added', status: false },
  { title: 'Pizza', count: '15+', category: 'Popular', status: true },
];

export default function FoodMarquee() {
  const controls = useAnimation();

  return (
    <section className="bg-white py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="flex gap-6 w-max"
          animate={controls}
          initial={{ x: 0 }}
          onHoverStart={() => controls.stop()}
          onHoverEnd={() =>
            controls.start({
              x: ['0%', '-50%'],
              transition: {
                duration: 30,
                ease: 'linear',
                repeat: Infinity,
              },
            })
          }
          onViewportEnter={() =>
            controls.start({
              x: ['0%', '-50%'],
              transition: {
                duration: 30,
                ease: 'linear',
                repeat: Infinity,
              },
            })
          }
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="relative h-48 min-w-55 overflow-hidden rounded-2xl"
            >
              <Image
                src={`/assets/image/foods/${item.title}.jpg`}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-white px-2 py-1 text-xs text-primary-text-100">
                  {item.category}
                </span>
              </div>

              {/* Status indicator */}
              <div className="absolute top-4 right-4">
                {item.status === true && (
                  <span className="block h-3 w-3 rounded-full bg-green-400" />
                )}
                {item.status === false && (
                  <span className="block h-3 w-3 rounded-full bg-primary" />
                )}
                {item.status === null && (
                  <span className="block h-3 w-3 rounded-full bg-[#2B2B2B]" />
                )}
              </div>

              {/* Text */}
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-semibold font-heading">
                  {item.title}
                </p>
                <p className="text-sm opacity-80">{item.count} restaurants</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
