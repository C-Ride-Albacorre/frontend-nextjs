'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Menu, X, ChevronRight, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/buttons/button';
import { IconButton } from '../ui/buttons/icon-button';
import Image from 'next/image';
import { div } from 'framer-motion/client';

type NavBarProps = {
  isLoggedIn: boolean;
  role?: string | null;
};

const getDashboardLink = (role?: string | null) => {
  switch (role) {
    case 'VENDOR':
      return '/vendor/store';
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return '/admin/dashboard';
    case 'CUSTOMER':
    default:
      return '/user/dashboard';
  }
};

const NavBar = ({ isLoggedIn, role }: NavBarProps) => {
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
          <div className=" flex-1">
            <Link href="/">
              <Image
                src="/assets/svg/logo-main.svg"
                alt="C-ride logo"
                width={120}
                height={48}
                priority
                className="select-none"
              />
            </Link>
          </div>

          <div className="hidden md:flex gap-12  justify-between items-center">
            <ul className="flex items-center gap-6 text-sm font-body  text-white">
              <li>
                <Button href="/vendor" size="sm" variant="white-nav-link">
                  Vendor
                </Button>
              </li>

              <li>
                <Button
                  href="/fulfillment-partner"
                  size="sm"
                  variant="white-nav-link"
                >
                  Drivers
                </Button>
              </li>

              <li>
                <Button href="/" size="sm" variant="white-nav-link">
                  How It Works
                </Button>
              </li>

              <li>
                <Button href="/" size="sm" variant="white-nav-link">
                  Contact Us
                </Button>
              </li>
            </ul>

            {/* <div className="flex items-center gap-3">
              <Button href="/user/login" size="md" variant="white-outline">
                Login
              </Button>

              <Button href="/user/register" size="md" variant="primary">
                Get Started
              </Button>
            </div> */}

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <Button
                  href={getDashboardLink(role)}
                  variant="white-outline"
                  leftIcon={<User size={16} className="text-white" />}
                  size="icon"
                  rounded="full"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button href="/user/login" variant="white-outline">
                    Login
                  </Button>

                  <Button href="/user/register" variant="primary">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <IconButton
            onClick={toggleMenu}
            ariaLabel="Open menu"
            className="md:hidden text-primary-text-100"
            highlightOnRoutes={['/vendor', '/fulfillment-partner']}
          >
            <Menu size={20} />
          </IconButton>
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
              className="fixed flex flex-col justify-between inset-0 z-60 h-[75vh] bg-white origin-top-right "
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
                <div className="flex items-center justify-between px-4 py-6 border-b border-border bg-white">
                  <Link href="/">
                    <Image
                      src="/assets/svg/logo-main.svg"
                      alt="C-ride logo"
                      width={120}
                      height={48}
                      priority
                      className="select-none"
                    />
                  </Link>

                  <IconButton
                    onClick={toggleMenu}
                    aria-label="Close menu"
                    className="md:hidden"
                  >
                    <X size={20} />
                  </IconButton>
                </div>

                {/* MENU LINKS */}
                <ul className="p-2 space-y-2 ">
                  <Link
                    href="/vendor"
                    className="flex items-center justify-between py-6 px-2 text-base border-b border-border"
                    onClick={toggleMenu}
                  >
                    Vendor
                    <ChevronRight size={18} />
                  </Link>

                  <Link
                    href="/fulfillment-partner"
                    className="flex items-center justify-between py-6 px-2 text-base border-b border-border"
                    onClick={toggleMenu}
                  >
                    Driver
                    <ChevronRight size={18} />
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center justify-between py-6 px-2 text-base border-b border-border"
                    onClick={toggleMenu}
                  >
                    How It Works
                    <ChevronRight size={18} />
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center justify-between py-6 px-2 text-base border-b border-border"
                    onClick={toggleMenu}
                  >
                    Contact Us
                    <ChevronRight size={18} />
                  </Link>
                </ul>
              </div>

              {/* ACTION BUTTONS */}
              {isLoggedIn ? (
                <div className="px-6 pb-6">
                  <Button
                    href={getDashboardLink(role)}
                    variant="outline"
                    leftIcon={<User size={16} />}
                    size="full"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="px-6 pb-6 space-y-4">
                  <Button
                    href="/user/login"
                    size="full"
                    variant="outline"
                    onClick={toggleMenu}
                  >
                    Login
                  </Button>

                  <Button
                    href="/user/register"
                    size="full"
                    variant="primary"
                    onClick={toggleMenu}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
