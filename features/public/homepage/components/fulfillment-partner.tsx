'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

import { ChevronRight } from 'lucide-react';
import { fadeUp } from '@/components/animations/fade-up';
import { Button } from '@/components/ui/buttons/button';

export default function Fulfillment() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-6 xl:px-0 py-28">
        {/* ================= HEADER ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-primary-text-100">
            Be a fulfillment Partner
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            Start earning with your car today – flexible hours, competitive
            rates
          </p>
        </motion.div>

        {/* ================= VENDOR SECTION ================= */}
        <div className="md:mt-24 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col gap-6 order-2 md:order-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF371A]">
              <Box className="h-6 w-6 text-primary" />
            </div>

            <h3 className="text-xl font-semibold text-primary-text-100">
              Become A Vendor
            </h3>

            <p className="max-w-sm text-sm text-neutral-500">
              Manage orders, track deliveries, and access performance analytics.
            </p>

            <Button
              href="/vendor"
              variant="primary"
              size="md"
              rightIcon={<ChevronRight size={18} />}
              className="w-fit"
            >
              Onboard Now{' '}
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative h-80 md:h-128 w-full overflow-hidden rounded-xl order-1 md:order-2"
          >
            <Image
              src="/assets/image/vendor.jpg"
              alt="Vendor"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* ================= PARTNER SECTION ================= */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative h-80 md:h-128 w-full overflow-hidden rounded-xl"
          >
            <Image
              src="/assets/image/driver.jpg"
              alt="Fulfillment Partner"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col gap-6"
          >
            <div className="flex h-12 w-12  items-center justify-center rounded-xl bg-green-50">
              <Truck className="h-6 w-6 text-green-100" />
            </div>

            <h3 className="text-xl font-semibold text-primary-text-100">
              Delivery Partner
            </h3>

            <p className="max-w-sm text-sm text-neutral-500">
              Accept delivery requests, navigate routes, and track your
              performance.
            </p>

            <Button
              href="/fulfillment-partner"
              variant="green"
              size="md"
              rightIcon={<ChevronRight size={18} />}
              className="w-fit"
            >
              Join Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
