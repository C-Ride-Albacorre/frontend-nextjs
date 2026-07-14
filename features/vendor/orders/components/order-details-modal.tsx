import Image from 'next/image';
import clsx from 'clsx';
import {
  Calendar,
  Check,
  CheckCircle,
  Code,
  CreditCard,
  LoaderCircle,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  User,
  XCircle,
} from 'lucide-react';

import Modal from '@/components/layout/modal';
import Avatar from '@/components/ui/avatar';
import { getVendorOrderIdAction } from '../action';
import { useEffect, useState } from 'react';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import InfoCard from './info-card';
import { formatDate } from '@/helpers/date-formatter';

interface OrderDetailsModalProps {
  orderId: string;
  isModalOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export default function OrderDetailsModal({
  orderId,
  isModalOpen,
  onClose,
  onAccept,
  onDecline,
}: OrderDetailsModalProps) {
  const [order, setOrder] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  console.log(' Order ID for details modal:', orderId);

  useEffect(() => {
    if (!isModalOpen) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);

        const response = await getVendorOrderIdAction({
          orderId,
        });

        setOrder(response.orderDetails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [isModalOpen, orderId]);

  // console.log(' Order details in modal:', order.items);

  const customerName = order
    ? `${order.user?.firstName ?? ''} ${order.user?.lastName ?? ''}`
    : '';

  const orderStatusText =
    order?.orderStatus === 'CONFIRMED'
      ? 'Confirmed'
      : order?.orderStatus === 'PENDING'
        ? 'Pending'
        : order?.orderStatus === 'COMPLETED'
          ? 'Completed'
          : order?.orderStatus === 'CANCELLED'
            ? 'Cancelled'
            : order?.orderStatus === 'REJECTED'
              ? 'Rejected'
              : order?.orderStatus === 'FAILED'
                ? 'Failed'
                : order?.orderStatus === 'DELIVERED'
                  ? 'Delivered'
                  : order?.orderStatus === 'PICKED_UP'
                    ? 'Picked Up'
                    : order?.orderStatus === 'ORDER_ASSIGNED'
                      ? 'Order Assigned'
                      : order?.orderStatus === 'ORDER_ACCEPTED'
                        ? 'Order Accepted'
                        : order?.orderStatus;

  const paymentStatusText =
    order?.paymentStatus === 'PAID'
      ? 'Paid'
      : order?.paymentStatus === 'PENDING'
        ? 'Pending'
        : order?.paymentStatus === 'FAILED'
          ? 'Failed'
          : order?.paymentStatus;

  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={onClose}
      wrapperClassName="max-w-4xl"
    >
      {loading ? (
        <div className="flex flex-col items-center gap-4 justify-center min-h-[85vh]">
          <LoaderCircle size={32} className="animate-spin text-primary" />
        </div>
      ) : !order ? (
        <div className="flex flex-col items-center gap-4 justify-center min-h-[85vh]">
          <Package size={48} className="text-neutral-400" />
          <p className="text-center text-sm text-neutral-500 max-w-md">
            Failed to load order details. Please try again later.
          </p>
        </div>
      ) : (
        <div className="overflow-y-auto space-y-8 pb-12">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Order Details</h2>
          </div>

          <div className="space-y-8">
            {/* Order Overview */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Overview
              </h3>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <InfoCard
                  icon={<ShoppingBag size={16} className="text-green-100" />}
                  label="Order Number"
                  value={order.orderNumber}
                />

                <InfoCard
                  icon={<Code size={16} className="text-green-100" />}
                  label="Order Code"
                  value={order.orderCode}
                />

                <InfoCard
                  icon={<Package size={16} className="text-green-100" />}
                  label="Status"
                  value={
                    <span
                      className={clsx(
                        'rounded-full px-2 py-1 text-[10px] font-medium uppercase',
                        {
                          'bg-blue-100 text-blue-600':
                            order.orderStatus === 'CONFIRMED',
                          'bg-amber-100 text-amber-600':
                            order.orderStatus === 'PENDING',
                          'bg-emerald-100 text-emerald-600':
                            order.orderStatus === 'COMPLETED',
                          'bg-emerald-100 text-emerald-700':
                            order.orderStatus === 'ORDER_ASSIGNED',
                          'bg-red-100 text-red-600':
                            order.orderStatus === 'CANCELLED',
                          'bg-red-100 text-red-700':
                            order.orderStatus === 'REJECTED',

                          'bg-neutral-100 text-neutral-600':
                            order.orderStatus === 'FAILED',

                          'bg-green-100/10 text-green-700':
                            order.orderStatus === 'DELIVERED',

                          'bg-amber-100 text-amber-700':
                            order.orderStatus === 'PICKED_UP',

                          'bg-purple-100 text-purple-700':
                            order.orderStatus === 'ORDER_ACCEPTED',

                          'bg-blue-100 text-blue-700':
                            order.orderStatus === 'ORDER_ASSIGNED',
                        },
                      )}
                    >
                      {orderStatusText}
                    </span>
                  }
                />

                <InfoCard
                  icon={<CreditCard size={16} className="text-green-100" />}
                  label="Payment"
                  value={
                    <span
                      className={clsx(
                        'rounded-full px-2 py-1 text-[10px] font-medium uppercase',
                        {
                          'bg-emerald-100 text-emerald-600':
                            order.paymentStatus === 'PAID',
                          'bg-red-100 text-red-600':
                            order.paymentStatus === 'FAILED',
                          'bg-amber-100 text-amber-600':
                            order.paymentStatus === 'PENDING',
                        },
                      )}
                    >
                      {paymentStatusText}
                    </span>
                  }
                />
              </div>
            </section>

            {/* Items */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Order Items
              </h3>

              <div>
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg ">
                        <Image
                          src={
                            item.product?.image ??
                            '/assets/image/product-placeholder.png'
                          }
                          alt={item.product?.productName ?? 'Product Image'}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="font-medium text-sm">
                          {item.product?.productName ?? 'Unknown Product'}
                        </h2>

                        <div className="flex  gap-2">
                          {item.variant && (
                            <p className="text-neutral-500 text-xs">
                              {item.variant.variantName}
                            </p>
                          )}

                          {item.addons && (
                            <p className="text-neutral-500 text-xs">
                              {item.addons
                                .map((addon: any) => addon.addonName)
                                .join(', ')}
                            </p>
                          )}
                        </div>

                        <p className="text-neutral-500 text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <h2 className="font-semibold">
                      NGN {item.totalPrice.toLocaleString()}
                    </h2>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-neutral-500 text-sm">Total Items</p>

                  <p className="font-medium text-sm">
                    {order.vendorSummary.itemCount}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-neutral-500 text-sm">Total Quantity</p>

                  <p className="font-medium text-sm">
                    {order.vendorSummary.totalQuantity}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="font-medium">Grand Total</h2>

                  <h2 className="text-lg font-semibold text-primary">
                    NGN {order.vendorSummary.subtotal.toLocaleString()}
                  </h2>
                </div>
              </div>
            </section>

            {/* Customer */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Customer Information
              </h3>

              <Card spacing="none" border="none">
                <div className="flex gap-4">
                  <Avatar
                    src={order.user?.profilePicture}
                    name={customerName}
                    size={56}
                  />

                  <div className="flex-1 space-y-1">
                    {<h2 className="font-medium capitalize">{customerName}</h2>}

                    {order.user?.email && (
                      <p className=" text-xs text-neutral-500">
                        {order.user.email}
                      </p>
                    )}

                    {order.user?.phoneNumber && (
                      <p className="mt-1 text-sm text-neutral-500">
                        {order.user.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </section>

            {/* Delivery */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Delivery Information
              </h3>

              <Card spacing="none" border="none">
                <div className=" flex flex-col gap-6">
                  <div className="flex gap-3 mb-0">
                    <User size={16} className=" text-green-100" />

                    <div className="space-y-1">
                      <h2 className="font-medium text-sm">
                        {order.recipientName}
                      </h2>

                      <p className="text-xs text-neutral-500">
                        {order.recipientPhone}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mb-0">
                    <MapPin size={16} className=" text-green-100" />

                    <div className="space-y-1">
                      <h2 className="font-medium text-sm">Delivery Address</h2>

                      <p className="text-xs text-neutral-500">
                        {order.dropoffLocation?.address}
                      </p>

                      <p className="text-xs text-neutral-500">
                        {order.dropoffLocation?.state},{' '}
                        {order.dropoffLocation?.country}
                      </p>
                    </div>
                  </div>

                  {order.deliveryInstructions && (
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                        DELIVERY INSTRUCTIONS
                      </h3>

                      <p className="text-sm">{order.deliveryInstructions}</p>
                    </div>
                  )}
                </div>
              </Card>
            </section>

            {/* Created Date */}
            <div className="flex items-center gap-2 text-sm text-neutral-400 border-t border-border pt-6">
              <Calendar size={14} className="text-green-100" />

              <span className="text-xs">
                Created {formatDate(order.createdAt)}
              </span>
            </div>
          </div>

          {order?.orderStatus === 'CONFIRMED' && (
            <div className="flex justify-around items-center gap-4">
              <Button
                variant="red-secondary"
                leftIcon={<XCircle size={16} />}
                size="icon"
                onClick={onDecline}
              >
                Decline Order
              </Button>

              <Button
                variant="green"
                size="icon"
                leftIcon={<CheckCircle size={16} />}
                onClick={onAccept}
              >
                Accept Order
              </Button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
