'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Check, ChevronRight, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

import { fadeUp } from '@/components/animations/fade-up';
import { Button } from '../ui/buttons/button';

export default function PublicContent({
  title,
  subtitle,
  href,
  heroImageSrc,
  publicData,
  publicImageSrc,
  partner,
  label,
  partnerTitle,
  partnerSubtitle,
  partnerHref,
}: {
  title: string;
  subtitle: string;
  href: string;
  heroImageSrc: string;
  publicData: { title: string; desc: string }[];
  publicImageSrc: string;
  partner?: boolean;
  label?: React.ReactNode;
  partnerTitle?: string;
  partnerSubtitle?: string;
  partnerHref?: string;
}) {
  return (
    <section className="bg-white">
      {/* ================= HERO ================= */}
      <div className="overflow-visible bg-primary-text-100 text-white relative">
        <div className="absolute top-20 lg:top-36 right-12 lg:right-20 w-12 h-12 lg:w-20 lg:h-20 rounded-full border-2  border-green-100/20" />
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
          className="mx-auto max-w-4xl px-6 py-28 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-medium leading-tight">
            {title}
          </h1>

          <p className="mt-6 text-neutral-400 max-w-2xl mx-auto">{subtitle}</p>

          <div className="flex justify-center items-center">
            <Button
              href={href}
              variant="primary"
              size="lg"
              rightIcon={<ChevronRight size={18} />}
              className="mt-10 shadow"
            >
              Join Now
            </Button>
          </div>
        </motion.div>

        <div className="relative h-128 w-full">
          <Image
            src={heroImageSrc}
            alt="Driver"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      <div className=" py-24 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center max-w-6xl mx-auto ">
        <div
          className="
            flex flex-col gap-6
            z-20  w-full
          "
        >
          <ul className="space-y-4">
            {publicData.map((item: any) => (
              <motion.li
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                key={item.title}
                className=" rounded-xl bg-foreground-200 p-4 text-black flex gap-6 items-start"
              >
                <div className="p-2">
                  <Check className="col-span-1 bg-primary p-2 h-7 w-7  rounded-md  text-primary-text-100 " />
                </div>

                <div className="col-span-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-neutral-500">{item.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Image  */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative h-full w-full overflow-hidden rounded-xl"
        >
          <Image
            src={publicImageSrc}
            alt="Public Content"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full min-h-80 sm:min-h-full rounded-xl overflow-hidden"
        >
          <Image
            src={publicImageSrc}
            alt="Public Content"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* ================= GOLD CTA SECTION ================= */}
      {partner && (
        <section className="bg-primary text-black">
          <div
            className="
      mx-auto max-w-6xl
      px-4 sm:px-6 lg:px-0
      py-16 sm:py-20 lg:py-24
      grid grid-cols-1 md:grid-cols-3
      gap-10 md:gap-14 lg:gap-16
      items-center
    "
          >
            {/* ================= CONTENT CARD ================= */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="
        col-span-1
        bg-white rounded-2xl
        px-6 sm:px-8
        py-8 sm:py-10 lg:py-12
        space-y-8
        max-w-md mx-auto md:mx-0
      "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foreground-100">
                {label}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-text-100">
                  {partnerTitle}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {partnerSubtitle}
                </p>
              </div>

              {partnerHref && (
                <Button
                  href={partnerHref}
                  variant="primary"
                  size="lg"
                  rightIcon={<ChevronRight size={18} />}
                  className="w-fit shadow-sm"
                >
                  Join Now
                </Button>
              )}
            </motion.div>

            {/* ================= IMAGE ================= */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="
        col-span-1 md:col-span-2
        w-full
      "
            >
              {/* Aspect ratio wrapper */}
              <div
                className="
          relative w-full
          aspect-[16/9]
          sm:aspect-[3/2]
          lg:aspect-[4/2]
          rounded-2xl
          overflow-hidden
        "
              >
                <Image
                  src="/assets/image/lagos-ride.png"
                  alt="Vendor"
                  fill
                  priority={false}
                  className="object-contain"
                  sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 66vw,
            800px
          "
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </section>
  );
}
