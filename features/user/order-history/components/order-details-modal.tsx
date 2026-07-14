'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, LoaderCircle, MapPin, Phone, User, X } from 'lucide-react';
import { toast } from 'sonner';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { formatDate } from '@/helpers/date-formatter';
import {
  useOrderDetails,
  useCancelOrder,
} from '@/features/user/delivery/hooks/use-orders';
import { initializePaymentAction } from '@/features/user/delivery/action';

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: {
    productName?: string;
    productImages?: { imageUrl?: string | null }[];
  };
}

const statusColor = (status?: string) => {
  switch (status?.toUpperCase()) {
    case 'CONFIRMED':
    case 'PAID':
      return 'bg-green-100/10 text-green-700';
    case 'PENDING':
    case 'AWAITING_PAYMENT':
      return 'bg-yellow-100 text-yellow-700';
    case 'DELIVERED':
      return 'bg-blue-100 text-blue-700';
    case 'CANCELLED':
    case 'FAILED':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const isPayable = (status?: string) => {
  if (!status) return false;
  const s = status.toUpperCase();
  return ['AWAITING_PAYMENT', 'PENDING', 'PAYMENT_FAILED'].includes(s);
};

const isCancellable = (status?: string) => {
  if (!status) return false;
  const s = status.toUpperCase();
  const nonCancellable = [
    'DELIVERED',
    'CANCELLED',
    'IN_TRANSIT',
    'COMPLETED',
    'CONFIRMED',
  ];
  return !nonCancellable.includes(s);
};

export default function OrderDetailsModal({
  selectedOrder,
}: {
  selectedOrder: string | null;
}) {
  const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);
  const router = useRouter();
  const cancelMutation = useCancelOrder();

  const { data: order, isLoading, error } = useOrderDetails(selectedOrder);

  const handlePayNow = async () => {
    const orderId = order?.id;
    if (!orderId) {
      toast.error('Order ID not found');
      return;
    }

    setIsInitiatingPayment(true);

    if (order?.paymentReference && order?.monnifyReference) {
      router.push(
        `/payment/callback?paymentReference=${encodeURIComponent(order.monnifyReference)}`,
      );
      return;
    }

    const callbackUrl =
      'https://backend-service-1rc7.onrender.com/api/v1/payment/callback';
    const result = await initializePaymentAction({
      orderId,
      paymentMethod: 'CARD',
      callbackUrl,
    });

    setIsInitiatingPayment(false);

    if (!result.success) {
      toast.error(result.error || 'Payment initialization failed');
      return;
    }

    const checkoutUrl =
      result.data?.checkoutUrl ??
      result.data?.responseBody?.checkoutUrl ??
      null;
    if (checkoutUrl) {
      router.push(checkoutUrl);
      return;
    }

    toast.error('Could not get payment checkout URL. Please try again.');
  };

  const handleCancel = (orderId: string) => {
    cancelMutation.mutate(orderId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoaderCircle size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-neutral-500">
          Failed to load order details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status badge + ID */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium text-xs text-neutral-500">Order Number</p>
          <p className="text-sm">
            {(order.orderCode ?? order.orderNumber ?? '').toUpperCase()}
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-0.5 text-[0.65rem] font-medium capitalize ${statusColor(
            order.orderStatus,
          )}`}
        >
          {order.orderStatus?.toLowerCase().replace(/_/g, ' ') ?? 'unknown'}
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
            <Card gap="xs" className="bg-foreground-200 text-sm">
              <p className="font-medium text-xs text-neutral-500">
                Delivery To
              </p>
              <p className="text-sm flex items-center gap-3">
                <User size={14} className="text-green-100" />
                {order.recipientName}
              </p>
              <p className="text-sm capitalize flex items-center gap-3">
                <MapPin size={14} className="text-green-100" />
                {[loc.address, loc.city, loc.state]
                  .filter(Boolean)
                  .join(', ')
                  .toLocaleLowerCase()}
              </p>
              {order.recipientPhone && (
                <p className="text-sm flex items-center gap-3">
                  <Phone size={14} className="text-green-100" />
                  {order.recipientPhone}
                </p>
              )}
            </Card>
          );
        })()}

      {/* Items */}
      {order.items && order.items.length > 0 && (
        <div className="space-y-4 mb-0">
          <p className="text-sm font-medium">Items</p>
          <ul className="divide-y divide-border text-sm space-y-8">
            {order.items.map((item: OrderItem) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-6 gap-4 md:gap-12 mb-0"
              >
                <div className="relative w-32 h-16">
                  <Image
                    src={item.product?.productImages?.[0]?.imageUrl ?? ''}
                    alt={item.product?.productName ?? ''}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="capitalize w-full text-left">
                  <p>
                    {item.product?.productName?.toLowerCase()} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium">
                  ₦{item.totalPrice.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Totals */}
      <div className="border-t border-border pt-4 space-y-2 text-sm">
        {order.serviceFee !== undefined && (
          <div className="flex justify-between text-neutral-500">
            <span>Service Fee</span>
            <span>₦{order.serviceFee.toLocaleString()}</span>
          </div>
        )}
        {order.deliveryFee !== undefined && (
          <div className="flex justify-between text-neutral-500">
            <span>Delivery Fee</span>
            <span>₦{order.deliveryFee.toLocaleString()}</span>
          </div>
        )}
        {order.vat !== undefined && (
          <div className="flex justify-between text-neutral-500">
            <span>VAT</span>
            <span>₦{order.vat.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-base pt-2">
          <span>Total</span>
          <span className="text-primary">
            ₦{(order.totalAmount ?? order.amount ?? 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Date */}
      <p className="text-xs text-neutral-400">
        Placed {formatDate(order.createdAt)}
      </p>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3">
        {isPayable(
          order.paymentStatus ?? order.orderStatus ?? order.status,
        ) && (
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            leftIcon={
              isInitiatingPayment ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <CreditCard size={16} />
              )
            }
            onClick={handlePayNow}
            disabled={isInitiatingPayment || cancelMutation.isPending}
          >
            {isInitiatingPayment
              ? 'Processing...'
              : order.paymentReference
                ? `Continue Payment - ₦${(order.totalAmount ?? 0).toLocaleString()}`
                : `Pay - ₦${(order.totalAmount ?? 0).toLocaleString()}`}
          </Button>
        )}

        {isCancellable(order.orderStatus ?? order.status) && (
          <Button
            variant="red-secondary"
            size="lg"
            className="flex-1"
            leftIcon={
              cancelMutation.isPending ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <X size={16} />
              )
            }
            onClick={() => handleCancel(order.id ?? order.orderId ?? '')}
            disabled={cancelMutation.isPending || isInitiatingPayment}
          >
            {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
          </Button>
        )}
      </div>
    </div>
  );
}
