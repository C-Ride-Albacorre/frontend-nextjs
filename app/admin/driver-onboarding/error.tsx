'use client';

import ErrorState from '@/components/layout/error-state';
import { Car} from 'lucide-react';

export default function Error(error: Error) {
  return (
    <ErrorState
      icon={<Car size={36} className="text-orange-500" />}
      title="Something went wrong"
      message={
        error.message ??
        ' An error occurred while fetching the dashboard data. Please try again later.'
      }
    />
  );
}
