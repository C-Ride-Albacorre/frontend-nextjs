'use client';

import { useCartStore } from '@/features/user/delivery/hooks/store';
import { useEffect } from 'react';

export function CartInitializer() {
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return null;
}
