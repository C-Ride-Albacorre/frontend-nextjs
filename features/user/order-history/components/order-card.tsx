'use client';

import { useState } from 'react';

import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { Order } from '../types';
import { formatDate } from '@/helpers/date-formatter';
import { MapPinHouse, Package, User } from 'lucide-react';
import OrderDetailsModal from './order-details-modal';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-green-100/10 text-green-700';

    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700';

    case 'DELIVERED':
      return 'bg-blue-100 text-blue-700';

    case 'CANCELLED':
      return 'bg-red-100 text-red-700';

    case 'PAID':
      return 'bg-green-100/10 text-green-700';

    case 'AWAITING_PAYMENT':
      return 'bg-yellow-100 text-yellow-700';

    case 'FAILED':
      return 'bg-red-100 text-red-700';

    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function OrderCard({ order }: { order: Order }) {
  const [isOrderDetailsModal, setIsOrderDetailsModalOpen] =
    useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<string>();

  const orderStatus = order.orderStatus?.toLowerCase().replaceAll('_', ' ');

  const paymentStatus = order.paymentStatus?.toLowerCase().replaceAll('_', ' ');

  const handleViewDetails = () => {
    setSelectedOrder(order.id);
    setIsOrderDetailsModalOpen(true);
  };

  return (
    <>
      <Card
        spacing="none"
        gap="md"
        className="bg-white border rounded-xl shadow-md p-2 h-full flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-start px-2 py-4 border-b border-border">
          <div className="flex justify-between items-center gap-4 w-full">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-primary-text-100 text-sm">
                Order #{order.orderCode}
              </p>

              <span
                className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize ${getStatusColor(
                  order.orderStatus,
                )}`}
              >
                {orderStatus}
              </span>
            </div>

            {/* <p className="text-xs text-neutral-500">{order.orderNumber}</p> */}

            {/* Date */}
            <div className="text-xs text-neutral-500">
              {formatDate(order.createdAt)}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="pb-4 px-2 space-y-2">
          <div className="text-xs text-neutral-500 flex items-center gap-1">
            <Package size={14} /> <span>Items</span>
          </div>

          <div className="space-y-2 ">
            {order.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between gap-2 text-sm">
                <span className="truncate">
                  {item.product.productName} × {item.quantity}
                </span>

                <span className="shrink-0">
                  ₦{item.totalPrice.toLocaleString()}
                </span>
              </div>
            ))}

            {order.items.length > 3 && (
              <p className="text-xs text-neutral-500">
                +{order.items.length - 3} more items
              </p>
            )}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="pb-4 px-2 space-y-2">
          <div className="text-xs text-neutral-500 flex items-center gap-1">
            <MapPinHouse size={14} /> <span>Delivery Address</span>
          </div>

          <div className="space-y-1">
            <p className="text-sm line-clamp-2">
              {order.dropoffLocation.address}
            </p>

            <p className="text-sm">
              {order.dropoffLocation.city}, {order.dropoffLocation.state}
            </p>

            <p className="text-sm">
              {order.dropoffLocation.country},{' '}
              {order.dropoffLocation.postalCode}
            </p>
          </div>
        </div>

        <div className="pb-4 px-2 space-y-2">
          <div className="text-xs text-neutral-500 flex items-center gap-1">
            <User size={14} /> <span>Recipient Details</span>
          </div>

          <div className="space-y-1">
            <p className="text-sm ">{order.recipientName}</p>

            <p className="text-sm ">{order.recipientPhone}</p>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          {/* Payment */}
          <div className="flex justify-between text-sm px-2 pb-4 border-b border-border">
            <span>Payment</span>

            <span
              className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize ${getStatusColor(
                order.paymentStatus,
              )}`}
            >
              {paymentStatus}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center px-2">
            <span className="font-medium">Total</span>

            <span className="font-bold">
              ₦{order.totalAmount.toLocaleString()}
            </span>
          </div>

          {/* Action */}
          <Button
            variant="primary-inverted"
            size="icon"
            className="w-full"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </Card>

      {/* Reorder Confirmation Modal */}
      {/* {openReorderModal && (
        <ReorderConfirmation
          isModalOpen={openReorderModal}
          onClose={() => setOpenReorderModal(false)}
          order={order}
        />
      )} */}

      <Modal
        isModalOpen={isOrderDetailsModal}
        onClose={() => setIsOrderDetailsModalOpen(false)}
      >
        <OrderDetailsModal selectedOrder={selectedOrder ?? null} />
      </Modal>
    </>
  );
}
