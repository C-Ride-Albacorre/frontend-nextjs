'use client';

import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/buttons/button';
import Image from 'next/image';

export default function Error() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
        <div className="flex items-center gap-1 sm:gap-2">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-neutral-800">
            4
          </h1>

          <Image
            src="/assets/image/Logo/not-found.png"
            alt="404 error"
            width={80}
            height={80}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-neutral-800">
            4
          </h1>
        </div>

        <div className="mt-8 space-y-4 max-w-md sm:max-w-lg">
          <h2 className="text-lg  md:text-xl font-semibold text-neutral-700">
            Oops! The page you are looking for cannot be found.
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            We cannot find the page you’re looking for or it may have been
            removed. Please check the URL and try again.
          </p>

          <div className="pt-2">
            <Button size="lg" href="/">
              Go back to Homepage
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
