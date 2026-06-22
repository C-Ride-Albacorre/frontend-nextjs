'use client';

import { Button } from '@/components/ui/buttons/button';
import { ChevronRight } from 'lucide-react';
import { useCartStore } from '../hooks/store';

export default function ProceedButton({
  store,
  slug,
  storeSlug,
}: {
  store: any;
  slug: string;
  storeSlug: string;
}) {
  const { cart, isLoading, updatingItems } = useCartStore();

  const items = cart?.items ?? [];

  if (items.length === 0) return null;

  return (
    <Button
      href={`/user/delivery/${storeSlug}/${slug}/delivery-type`}
      variant="primary"
      size="lg"
      disabled={
        store.data.products?.length === 0 ||
        store.data.status?.toLocaleLowerCase() !== 'active'|| isLoading

      }
      rightIcon={<ChevronRight size={16} />}
    >
      Proceed to Delivery
    </Button>
  );
}
