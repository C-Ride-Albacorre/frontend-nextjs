'use client';


import ErrorState from '@/components/layout/error-state';
import { Barcode, Layers } from 'lucide-react';

export default function Error(error: Error) {
  return (
    <ErrorState
      icon={<Layers size={36} className="text-orange-500" />}
      title="Something went wrong"
      message={error.message ?? 'An unexpected error occurred.'}
    />
  );
}
