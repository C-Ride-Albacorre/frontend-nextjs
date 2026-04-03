'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttons/button';
import { RefreshCcw } from 'lucide-react';

export default function RetryButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.refresh()}
      variant="white"
      size="icon"
      leftIcon={<RefreshCcw size={16} />}
    >
      Retry
    </Button>
  );
}
