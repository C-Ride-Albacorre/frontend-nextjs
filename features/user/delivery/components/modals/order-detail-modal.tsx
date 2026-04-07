'use client';

import { useState } from 'react';
import {
  CreditCard,
  Loader2,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import Card from '@/components/layout/card';
import { useOrderDetails } from '../../hooks/use-orders';
import { initializePaymentAction } from '../../action';
import { toast } from 'sonner';
import type { CartItem } from '../../types';

interface OrderDetailModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  orderId: string | null;
  cartItems?: CartItem[];
}

export default function OrderDetailModal({
  isModalOpen,
  onClose,
  orderId,
  cartItems = [],
}: OrderDetailModalProps) {
  const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);

  const {
    data: order,
    isLoading,
    error,
  } = useOrderDetails(isModalOpen ? orderId : null);

  // Build a lookup from productId -> cart item for name/image
  const cartLookup = new Map(cartItems.map((ci) => [ci.productId, ci]));

  if (!isModalOpen) return null;

  const handleProceedToPayment = async () => {
    if (!orderId) {
      toast.error('Order not found');
      return;
    }

    setIsInitiatingPayment(true);

    const callbackUrl = `${window.location.origin}/payment/callback`;
    const result = await initializePaymentAction({
      orderId,
      paymentMethod: 'CARD',
      callbackUrl,
    });

    console.log('[OrderDetailModal] Initialize payment:', result);
    setIsInitiatingPayment(false);

    if (!result.success) {
      toast.error(result.error || 'Payment initialization failed');
      return;
    }

    const data = result.data;
    const checkoutUrl =
      data?.checkoutUrl ?? data?.responseBody?.checkoutUrl ?? null;

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }

    toast.error('Could not get payment checkout URL. Please try again.');
  };

  const statusColor = (status?: string) => {
    if (!status) return 'bg-neutral-200 text-neutral-600';
    const s = status.toUpperCase();
    if (s === 'DELIVERED' || s === 'CONFIRMED')
      return 'bg-green-100/20 text-green-700';
    if (s === 'CANCELLED') return 'bg-red-100 text-red-700';
    if (s === 'IN_TRANSIT' || s === 'PROCESSING')
      return 'bg-blue-100 text-blue-700';
    return 'bg-primary-text-100 text-primary';
  };

  const formatDate = (d?: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 size={24} className="animate-spin text-primary" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="py-8 text-center space-y-4">
            <p className="text-red-500 text-sm">
              {(error as Error).message || 'Failed to load order details'}
            </p>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}

        {/* Order details */}
        {order && !isLoading && (
          <>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Order Created!</h3>
              <p className="text-neutral-500 text-sm">
                Review your order before proceeding to payment
              </p>
            </div>

            {/* Order number & status */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-neutral-500">Order Number</p>
                <p className="text-sm font-medium">
                  {(order.orderNumber ?? '').toUpperCase()}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[0.65rem] font-medium capitalize ${statusColor(order.orderStatus)}`}
              >
                {order.orderStatus?.toLowerCase().replace(/_/g, ' ') ??
                  'unknown'}
              </span>
            </div>

            {/* Delivery info */}
            {order.dropoffLocation &&
              (() => {
                const loc =
                  typeof order.dropoffLocation === 'string'
                    ? JSON.parse(order.dropoffLocation)
                    : order.dropoffLocation;
                return (
                  <Card
                    gap="xs"
                    className="bg-foreground-200 text-sm space-y-2"
                  >
                    <p className="font-medium text-xs text-neutral-500">
                      Delivery Details
                    </p>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-neutral-400" />
                      <span>{order.recipientName}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-neutral-400 mt-0.5" />
                      <span className="capitalize">
                        {[loc.address, loc.city, loc.state]
                          .filter(Boolean)
                          .join(', ')
                          .toLowerCase()}
                      </span>
                    </div>
                    {order.recipientPhone && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-neutral-400" />
                        <span>{order.recipientPhone}</span>
                      </div>
                    )}
                  </Card>
                );
              })()}

            {/* Items */}
            {order.items && order.items.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Items</p>
                <ul className="divide-y divide-border text-sm">
                  {order.items.map((item: any) => {
                    const cartItem = cartLookup.get(item.productId);
                    const name =
                      item.product?.productName ??
                      item.productName ??
                      cartItem?.productName ??
                      item.name ??
                      'Item';
                    const image =
                      item.product?.productImages?.[0]?.imageUrl ??
                      cartItem?.productImage ??
                      null;

                    return (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 py-3"
                      >
                        {/* Product image */}
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          {image ? (
                            <Image
                              src={image}
                              alt={name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full">
                              <ShoppingBag
                                size={18}
                                className="text-neutral-400"
                              />
                            </div>
                          )}
                        </div>

                        {/* Name + qty */}
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-medium capitalize truncate">
                            {name.toLowerCase()}
                          </p>
                          <p className="text-xs text-neutral-500">
                            Qty: {item.quantity} &times; ₦
                            {(item.unitPrice ?? 0).toLocaleString()}
                          </p>
                        </div>

                        {/* Price */}
                        <span className="font-medium shrink-0">
                          ₦
                          {(
                            item.totalPrice ?? item.unitPrice * item.quantity
                          ).toLocaleString()}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Totals */}
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              {order.deliveryFee != null && order.deliveryFee > 0 && (
                <div className="flex justify-between text-neutral-500">
                  <span>Delivery Fee</span>
                  <span>₦{order.deliveryFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total</span>
                <span className="text-primary">
                  ₦{(order.totalAmount ?? 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Date */}
            <p className="text-xs text-neutral-400">
              Placed {formatDate(order.createdAt)}
            </p>

            {/* Proceed to payment */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              leftIcon={
                isInitiatingPayment ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <CreditCard size={16} />
                )
              }
              onClick={handleProceedToPayment}
              disabled={isInitiatingPayment}
            >
              {isInitiatingPayment
                ? 'Initializing Payment...'
                : `Proceed to Payment — ₦${(order.totalAmount ?? 0).toLocaleString()}`}
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
