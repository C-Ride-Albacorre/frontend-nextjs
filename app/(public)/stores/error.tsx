'use client';

import RetryButton from '@/components/ui/buttons/retry-button';

export default function StoreError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  gap-4">
      <h1 className="text-5xl font-bold bg-linear-to-r from-[#d4af37] to-[#bca03a] bg-clip-text text-transparent">
        Something went wrong!
      </h1>

      <p className="mt-2 text-center text-neutral-600">
        An error occurred while loading the stores. Please try again later.
      </p>

      <RetryButton />
    </div>
  );
}
