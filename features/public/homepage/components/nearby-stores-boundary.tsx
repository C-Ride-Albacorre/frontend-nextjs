'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, ReactNode } from 'react';
import NearbyStoresSkeleton from './food-marquee-skeleton';
import NearbyStoresError from './nearby-stores-error';

export default function NearbyStoresBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <NearbyStoresError
          errorTitle="Could not load nearby stores."
          errorMessage="Please try again later."
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
    >
      <Suspense fallback={<NearbyStoresSkeleton />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
