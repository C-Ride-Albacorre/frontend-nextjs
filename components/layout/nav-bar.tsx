'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Menu, X, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300
          ${
            isAtTop
              ? 'bg-transparent md:backdrop-blur-none'
              : 'bg-white md:bg-black/30 md:backdrop-blur-sm shadow-sm'
          }
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-3">
          <Link href="/" className="lg:w-full">
            <Image
              src="/assets/Svg/logo-main.svg"
              alt="Logo"
              width={120}
              height={40}
              priority
            />
          </Link>

          <div className="hidden md:flex gap-10 lg:gap-0 justify-between items-center lg:w-full">
            <div className="flex items-center gap-6 lg:gap-10 text-sm font-body  text-white">
              <Link href="/" className="opacity-90 hover:opacity-100 p-2">
                Membership
              </Link>
              <Link href="/" className="opacity-90 hover:opacity-100">
                How it Works
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-2xl border border-border hover:bg-white-hover-100 px-6 py-4 text-sm text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-2xl  bg-primary px-6 py-4 text-sm text-primary-text-100 hover:bg-primary-hover font-medium shadow-sm"
              >
                Get started
              </Link>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-primary-text-100"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
            />

            <motion.div
              className="fixed flex flex-col justify-between inset-0 z-60 h-[60vh] bg-white origin-top-right p-4"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
              }}
            >
              <div>
                {/* HEADER */}
                <div className="flex items-center justify-between px-4 py-6 border-b border-border">
                  <Image
                    src="/assets/Svg/logo-main.svg"
                    alt="Logo"
                    width={100}
                    height={48}
                  />
                  <button onClick={toggleMenu} aria-label="Close menu">
                    <X size={26} />
                  </button>
                </div>

                {/* MENU LINKS */}
                <div className="p-2 space-y-2 ">
                  <Link
                    href="/"
                    className="flex items-center justify-between py-6 px-2 text-base border-b border-border"
                    onClick={toggleMenu}
                  >
                    Membership
                    <ChevronRight size={18} />
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center justify-between py-6 px-2 text-base border-b border-border"
                    onClick={toggleMenu}
                  >
                    How it Works
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="px-6 pb-6 space-y-4">
                <Link
                  href="/login"
                  className="block w-full rounded-2xl border border-border py-4 text-center text-sm"
                  onClick={toggleMenu}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="block w-full rounded-2xl bg-primary py-4 text-center text-sm font-medium text-primary-text-100"
                  onClick={toggleMenu}
                >
                  Get started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
