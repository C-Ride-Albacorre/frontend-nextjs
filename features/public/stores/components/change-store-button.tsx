'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttons/button';

export default function ChangeStoreButton() {
  const router = useRouter();

  return (
    <Button variant="white" size="icon" onClick={() => router.back()}>
      Change Store
    </Button>
  );
}
