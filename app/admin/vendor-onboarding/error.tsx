'use client';

import ErrorState from '@/components/layout/error-state';
import { UsersRound } from 'lucide-react';

export default function Error(error: Error) {
  return (
    <ErrorState
      icon={<UsersRound size={36} className="text-orange-500" />}
      title="Something went wrong"
      message={
        error.message ??
        ' An error occurred while fetching the vendor data. Please try again later.'
      }
    />
  );
}
