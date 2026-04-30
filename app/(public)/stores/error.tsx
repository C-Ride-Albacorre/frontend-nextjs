'use client';

import RetryButton from '@/components/ui/buttons/retry-button';

export default function StoreError() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl text-clip bg-linear-to-r from-primary to-primary-hover font-bold">
        Something went wrong
      </h1>
      <p className="mt-2 text-center text-neutral-600">
        An error occurred while loading the stores. Please try again later.
      </p>

      <RetryButton />
    </div>
  );
}
