'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/components/animations/fade-up';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl">
        {/* ================= NEWSLETTER ================= */}
        <div className="mx-auto max-w-5xl px-6 xl:px-0 pt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <p className="text-2xl md:text-4xl  text-white/30">
              Subscribe to our Newsletter
            </p>

            <div className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-xl border border-border p-2">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/40"
              />
              <button className="rounded-xl bg-white hover:bg-white/90 px-6 py-3 text-sm font-medium text-black cursor-pointer">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        {/* ================= LINKS ================= */}
        <div className="mx-auto  px-6 xl:px-0 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-1 gap-16 md:grid-cols-4"
          >
            {/* Company */}
            <div>
              <h4 className="mb-6  font-semibold">Company</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Our Story</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Press Kit</Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-6 font-semibold">Services</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <Link href="#">Food Delivery</Link>
                </li>
                <li>
                  <Link href="#">Restaurant Partnership</Link>
                </li>
                <li>
                  <Link href="#">Corporate Catering</Link>
                </li>
                <li>
                  <Link href="#">Membership Tiers</Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-6 font-semibold">Legal</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <Link href="#">Terms of Service</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Cookie Policy</Link>
                </li>
                <li>
                  <Link href="#">Acceptable Use</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-6 font-semibold">Contact</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  hello@c-ride.co
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  +234 800 CRIDE 00
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  Lagos, Nigeria
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-primary/60" />

        {/* ================= BOTTOM ================= */}
        <div className="mx-auto  px-6 xl:px-0 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Logo */}
            <div>
              <Image
                src="/assets/svg/logo-main.svg"
                alt="C-ride"
                width={120}
                height={40}
              />
              <p className="mt-2 text-xs text-white/50">
                Beyond Delivery, it’s Care
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <Link href="#" className="rounded-full bg-white/10 p-3">
                <Instagram className="h-4 w-4 text-primary" />
              </Link>
              <Link href="#" className="rounded-full bg-white/10 p-3">
                <Twitter className="h-4 w-4 text-primary" />
              </Link>
              <Link href="#" className="rounded-full bg-white/10 p-3">
                <Linkedin className="h-4 w-4 text-primary" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-primary/10" />

        <div className="mx-auto px-6 xl:px-0 py-10">
          <div className="mt-4 flex flex-col gap-4 text-xs text-white/40 md:flex-row md:justify-between">
            <p>
              © 2025 C-Ride. All rights reserved | Serving: Lekki Phase 1,
              Ikoyi, Victoria Island, Banana Island
            </p>

            <p className="flex items-center gap-2 text-green-100">
              <Image
                src="/assets/Svg/leaf.svg"
                alt="Leaf Icon"
                width={16}
                height={16}
              />{' '}
              Designed Sustainably
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
