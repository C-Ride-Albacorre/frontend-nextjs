'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/layout/card';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';

export default function CategoriesError() {
  const router = useRouter();

  return (
    <Card className="flex flex-col justify-center items-center mt-8">
      <Package size={24} className="text-red-500" />
      <p className="text-red-500">Failed to load categories.</p>
      <Button onClick={() => router.refresh()}>
        Retry
      </Button>
    </Card>
  );
}