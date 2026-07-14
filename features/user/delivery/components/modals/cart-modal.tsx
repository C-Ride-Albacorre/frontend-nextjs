import { ChevronRight, LoaderCircle, Minus, Plus, Trash2 } from 'lucide-react';

import Modal from '@/components/layout/modal';

import { useCartStore } from '../../hooks/store';

import { Button } from '@/components/ui/buttons/button';

import { IconButton } from '@/components/ui/buttons/icon-button';

import Image from 'next/image';

import { usePathname, useRouter } from 'next/navigation';

export default function CartModal() {
  const {
    cart,
    isLoading,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    updatingItems,
  } = useCartStore();

  const pathname = usePathname();
  const router = useRouter();

  console.log(
    ' Cart Modal Rendered. Cart:',
    cart,
    'isCartOpen:',
    isCartOpen,
    'pathname:',
    pathname,
  );

  const storeId = cart?.storeId;

  const storeName = cart?.storeName;

  const storeSlug = storeName
    ?.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  console.log(
    ' Cart Modal Rendered. Store ID:',
    storeId,
    'Store Name:',
    storeName,
  );

  const handleProceed = () => {
    closeCart();

    router.push(`/user/delivery/${storeSlug}/${storeId}/delivery-type`);
  };

  const items = cart?.items ?? [];

  const isUpdatingCart = updatingItems.length > 0;

  console.log('[CartModal] Items:', items);

  return (
    <Modal isModalOpen={isCartOpen} onClose={closeCart}>
      <div className="max-h-[80vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex  gap-3 pt-8 items-center  justify-between md:pt-6">
       <div className="flex flex-col gap-1">
           <h2 className="text-xl font-semibold">
            Your Cart ({cart?.itemCount ?? 0})
          </h2>

          <h6 className="font-medium text-xs capitalize">
            {storeName ? `From: ${storeName}` : 'No store selected'}
          </h6>
       </div>

          {items.length > 0 && (
            <Button
              type="button"
              variant="red-secondary"
              size="icon"
              onClick={() => clearCart()}
              disabled={isLoading}
              leftIcon={<Trash2 size={14} />}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Empty */}
        {items.length === 0 && (
          <p className="py-12 text-center text-neutral-400">
            Your cart is empty
          </p>
        )}

        {/* Items */}
        <ul className="divide-y divide-border">
          {items.map((item) => {
            const itemKey = item.productId ?? item.id;

            const isUpdating = updatingItems.includes(itemKey);

            return (
              <li
                key={item.id}
                className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {item.imageUrl && (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16">
                      <Image
                        src={item.imageUrl}
                        alt={item.productName || 'Product Image'}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 justify-between">
                    <p className="truncate text-sm font-medium capitalize">
                      {item.productName}
                    </p>

                    <p
                      className={`text-sm text-neutral-500 transition-opacity ${
                        isUpdating ? 'opacity-60' : 'opacity-100'
                      }`}
                    >
                      {isUpdating ? (
                        <LoaderCircle
                          size={16}
                          className="animate-spin text-primary"
                        />
                      ) : (
                        <>
                          NGN{' '}
                          {(
                            item.totalPrice ?? item.unitPrice * item.quantity
                          ).toLocaleString()}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <p className="w-full text-xs text-neutral-500 sm:w-auto">
                    NGN {item.unitPrice?.toLocaleString()} x {item.quantity}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <IconButton
                      variant="primary-outline"
                      size="icon"
                      rounded="full"
                      disabled={isLoading || isUpdating || item.quantity <= 1}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={12} />
                    </IconButton>

                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>

                    <IconButton
                      variant="primary"
                      size="icon"
                      rounded="full"
                      disabled={isLoading || isUpdating}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </IconButton>
                  </div>

                  {/* Remove */}
                  <div className="flex justify-end">
                    <IconButton
                      variant="red"
                      rounded="md"
                      disabled={isLoading || isUpdating || isUpdatingCart}
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={14} />
                    </IconButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        {items.length > 0 && (
          <div className="space-y-4 border-t border-border pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-base font-semibold">
              <h4>Subtotal</h4>

              {isLoading || isUpdatingCart ? (
                <LoaderCircle size={16} className="animate-spin text-primary" />
              ) : (
                <h4>NGN {(cart?.subTotal ?? 0).toLocaleString()}</h4>
              )}
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              rightIcon={<ChevronRight size={16} />}
              onClick={handleProceed}
              disabled={isLoading || isUpdatingCart}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
