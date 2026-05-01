'use client';

import RetryButton from '@/components/ui/buttons/retry-button';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center h-[60vh]">
      <h1 className="text-5xl font-bold bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent">
        Something went wrong!
      </h1>

      <p className="mt-2 text-neutral-600 max-w-md">
        An error occurred while loading the page. Please try again later.
      </p>

      <div className="mt-4">
        <RetryButton />
      </div>
    </div>
  );
}
