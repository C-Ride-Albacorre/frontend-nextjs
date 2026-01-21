'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/components/animations/fade-up';
import { TabKey } from '@/features/public/homepage/data';
import HowItWorksTab from './how-it-works/how-it-works-tab';
import HowItWorksBody from './how-it-works/how-it-works-body';

/* ================= COMPONENT ================= */
export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<TabKey>('Onboarding');

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 xl:px-0">
        {/* ================= HEADER ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-primary-text-100">
            How It Works
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            Three simple steps to a premium experience
          </p>
        </motion.div>

        <HowItWorksTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <HowItWorksBody activeTab={activeTab} />
      </div>
    </section>
  );
}
