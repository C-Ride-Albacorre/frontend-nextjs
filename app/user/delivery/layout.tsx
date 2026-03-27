'use client';

import { useCartStore } from '@/features/user/delivery/store';
import { useEffect } from 'react';

function CartInitializer() {
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return null;
}

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartInitializer />
      {children}
    </>
  );
}
