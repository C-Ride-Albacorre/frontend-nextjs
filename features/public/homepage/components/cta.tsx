'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, easeOut } from 'framer-motion';
import { fadeUp } from '@/components/animations/fade-up';

export default function Cta() {
  return (
    <section className="bg-primary-text-100 py-28 mx-auto flex flex-col items-center ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto max-w-3xl px-6 text-center text-white"
      >
        <h2 className="text-3xl md:text-5xl font-semibold">
          Ready for <span className="text-primary">Restaurant-Quality</span>{' '}
          Delivery?
        </h2>

        <p className="mt-8 text-white font-medium">Download Our App</p>

        <p className="mt-6 text-sm text-[#F1F1F1]/70 leading-6">
          Get the best experience on our Mobile <br /> Download for Android &
          iOS device
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <button className="rounded-xl bg-black px-12 md:px-10 py-4 text-sm text-white flex items-center justify-center gap-6 cursor-pointer w-full md:w-fit ">
            <Image
              src="/assets/svg/google-play-icon.svg"
              alt="play-store"
              priority
              width={32}
              height={32}
            />
            <p className="md:text-left text-xs space-y-2">
              <span> Get on</span>

              <span className="block text-base mt-1">Play Store</span>
            </p>
          </button>

          <button className="rounded-xl bg-black px-12 md:px-10 py-4 text-sm text-white flex items-center justify-center gap-6 cursor-pointer w-full md:w-fit ">
            <Image
              src="/assets/svg/apple.svg"
              alt="apple-store"
              priority
              width={32}
              height={32}
            />
            <p className="md:text-left md:text-xs space-y-2">
              <span> Get on</span>

              <span className="block text-base mt-1">Apple Store</span>
            </p>
          </button>
        </div>

        <h6 className="mt-10 text-xl text-white/50">
          Own a restaurant or corporate catering needs?
        </h6>

        <Link
          href="mailto:restaurants@c-ride.co"
          target="_blank"
          className=" block text-xl font-medium text-green-100 font-heading my-4 hover:underline"
        >
          restaurants@c-ride.co
        </Link>

        <p className="text-sm text-white/40">
          SSL Encrypted | Background Checked Drivers | Insurance Covered
        </p>
      </motion.div>
    </section>
  );
}
