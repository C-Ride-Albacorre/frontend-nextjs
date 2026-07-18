'use client';

import ErrorState from '@/components/layout/error-state';
import { Store } from 'lucide-react';

export default function Error(error: Error) {
  return (
    <ErrorState
      icon={<Store size={36} className="text-orange-500" />}
      title="Something went wrong"
      message={
        error.message ??
        ' An error occurred while fetching the store data. Please try again later.'
      }
    />
  );
}
