'use client';

import { useState } from 'react';
import { motion, easeOut, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeUp } from '@/components/animations/fade-up';

import { FAQs } from '../data';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <>
      {/* ================= FAQ ================= */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-5xl px-6 xl:px-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <span className="inline-block rounded-xl bg-primary/10 p-4 text-xs text-primary">
              Similar questions asked
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-primary-text-100">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="mt-14 space-y-4">
            {FAQs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-border p-6"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="flex w-full items-center justify-between text-left cursor-pointer"
                >
                  <span className="font-medium text-primary-text-100 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      activeIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeIndex === i && faq.answer && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="mt-4 text-sm text-neutral-500 overflow-hidden"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
