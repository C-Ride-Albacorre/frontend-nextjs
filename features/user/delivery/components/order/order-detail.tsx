import { Loader, MapPin, Phone, User } from 'lucide-react';
import { useOrderDetails } from '../../hooks/use-orders';
import { formatDate } from '@/helpers/date-formatter';

import Image from 'next/image';
import Card from '@/components/layout/card';

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

export default function OrderDetail({ orderId }: { orderId: string }) {
  const { data: order, isLoading, error } = useOrderDetails(orderId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center min-h-50">
        <Loader size={24} className="animate-spin text-primary" />
        <p className="text-primary">Loading Order Details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
      </div>

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
              <Card border='none' gap="xs" className="bg-foreground-200 text-sm">
                <p className="font-medium text-xs text-neutral-500">
                  Delivery To
                </p>
                <p className="text-sm flex items-center gap-2">
                  <User size={14} className="text-neutral-400" />
                  {order.recipientName}
                </p>
                <p className="text-sm capitalize flex items-center gap-2">
                  <MapPin size={14} className="text-neutral-400" />
                  {[loc.address, loc.city, loc.state]
                    .filter(Boolean)
                    .join(', ')
                    .toLocaleLowerCase()}
                </p>
                {order.recipientPhone && (
                  <p className="text-sm flex items-center gap-2">
                    <Phone size={14} className="text-neutral-400" />
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
                      {item.product?.productName?.toLowerCase()} ×{' '}
                      {item.quantity}
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
      </div>
    </>
  );
}
