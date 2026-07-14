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
        gap="none"
        className="bg-white border rounded-xl h-full flex flex-col  transition-all duration-300 hover:shadow-lg hover:-translate-y-1  "
      >
        {/* Header */}
        <div className="flex justify-between items-start p-4 border-b border-border">
          <div className="flex justify-between items-center gap-4 w-full">
            <div className="">
              <p className="font-medium text-neutral-500 text-xs">Order Code</p>

              <h4 className="font-semibold text-primary-text-100 text-lg">
                {order.orderCode}
              </h4>
            </div>

            {/* <p className="text-xs text-neutral-500">{order.orderNumber}</p> */}

            <div className="flex flex-col items-end gap-1 ">
              <div className="text-[10px] text-neutral-500">
                {formatDate(order.createdAt)}
              </div>

              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize w-fit ${getStatusColor(
                    order.orderStatus,
                  )}`}
                >
                  {orderStatus}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize ${getStatusColor(
                    order.paymentStatus,
                  )}`}
                >
                  {paymentStatus}
                </span>
              </div>
            </div>
            {/* Date */}
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4 flex-1">
          {/* Items */}
          <div className="space-y-3">
            <div className="text-xs text-neutral-500 flex items-center gap-1">
              <Package size={14} className="text-green-100" /> <h4>Items</h4>
            </div>

            <div className="space-y-2">
              {order.items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-2 text-sm"
                >
                  <div className="flex flex-col gap-1">
                    <span className="truncate text-sm">
                      {item.product?.productName ?? 'Unknown Product'}
                    </span>
                    <span className="text-xs text-neutral-500">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <h4 className="font-semibold text-neutral-900">
                    NGN {item.totalPrice.toLocaleString()}
                  </h4>
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
          <div className="space-y-2">
            <div className="text-xs text-neutral-500 flex items-center gap-1">
              <MapPinHouse size={14} className="text-green-100" />{' '}
              <h4>Delivery Address</h4>
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

          <div className=" space-y-2">
            <div className="text-xs text-neutral-500 flex items-center gap-1">
              <User size={14} className="text-green-100" />{' '}
              <span>Recipient Details</span>
            </div>

            <div className="space-y-1">
              <p className="text-sm ">{order.recipientName}</p>

              <p className="text-sm ">{order.recipientPhone}</p>
            </div>
          </div>


          {/* Total */}
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Total</h2>

            <h2 className="font-bold">
              NGN {order.totalAmount.toLocaleString()}
            </h2>
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
