'use client';

import { ClipboardList, Loader, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCartStore } from '@/features/user/delivery/hooks/store';
import CartModal from '@/features/user/delivery/components/modals/cart-modal';
import OrdersModal from '@/features/user/delivery/components/modals/orders-modal';

export default function StoreHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const path = usePathname();
  const { cart, isLoading, openCart } = useCartStore();
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const itemCount = cart?.itemCount ?? 0;
  const subTotal = cart?.subTotal ?? 0;

  return (
    <div className="flex flex-col items-end mb-0">
      {/* Header */}
      {/* <header className="flex items-center justify-between mb-0">
        <Button size="icon" href="/stores" variant="white">
          Return to Stores
        </Button>
      </header> */}

      <>
        {/* Cart & Orders */}
        {/* <div className="flex justify-end gap-3 text-primary-text-100 lg:text-white">
          {isLoggedIn && (
            <button
              onClick={() => setIsOrdersOpen(true)}
              className="flex items-center gap-4 rounded-full px-4 py-2 bg-foreground-100 lg:bg-foreground-200/10 hover:bg-foreground-100/20 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 text-xs">
                <ClipboardList size={14} />
                Orders
              </span>
            </button>
          )}

          <button
            onClick={openCart}
            className="flex items-center gap-4 rounded-full  px-4 py-2 bg-foreground-100 lg:bg-foreground-200/10 hover:bg-foreground-100/20 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 text-xs">
              <ShoppingCart size={14} />
              {isLoading ? (
                <Loader size={14} className="animate-spin text-primary" />
              ) : (
                `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`
              )}
            </span>
         
          </button>
        </div> */}
      </>

      {/* Cart Modal */}
      <CartModal />

      {/* Orders Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </div>
  );
}
