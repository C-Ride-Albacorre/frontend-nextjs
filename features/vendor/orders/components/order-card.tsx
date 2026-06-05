'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';
import { CheckCircle, Eye, XCircle } from 'lucide-react';
import { useState } from 'react';
import OrderActionModal from './order-action-modal';
import Image from 'next/image';
import Avatar from '@/components/ui/avatar';
import { set } from 'zod';
import OrderDetailsModal from './order-details-modal';
import { getVendorOrderIdAction } from '../action';

type Item = {
  name: string;
  quantity: number;
  totalPrice: number;
  image: string;
};

interface OrderCardProps {
  id: string;
  orderCode: string;
  profilePicture: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  email: string;
  createdAt: string;
  customer: string;
  items: Item[];
  totalPrice?: number;
  subtotal: number;
  phoneNumber?: string;
}

export default function OrderCard({
  id,
  orderCode,
  orderNumber,
  profilePicture,
  orderStatus,
  paymentStatus,
  email,
  phoneNumber,
  createdAt,
  customer,
  items,
  subtotal,
}: OrderCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [actionStatus, setActionStatus] = useState<'ACCEPT' | 'DECLINE'>(
    'ACCEPT',
  );

  const handleAcceptAction = () => {
    setActionStatus('ACCEPT');
    setIsModalOpen(true);
  };

  const handleRejectAction = () => {
    setActionStatus('DECLINE');
    setIsModalOpen(true);
  };

  const handleViewAction = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <Card
        className="flex h-full flex-col bg-white shadow hover:shadow-sm"
        spacing="none"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border mb-0 px-4 py-3">
          <div>
            <p className="text-xs text-neutral-500">ORDER CODE</p>
            <p className="font--medium">#{orderCode}</p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className={clsx(
                'rounded-full px-2 py-1 text-[10px] font-medium',
                {
                  'bg-blue-100 text-blue-600': orderStatus === 'CONFIRMED',
                  'bg-amber-100 text-amber-600': orderStatus === 'PENDING',
                  'bg-emerald-100 text-emerald-600':
                    orderStatus === 'COMPLETED',
                },
              )}
            >
              {orderStatus}
            </span>

            <span
              className={clsx(
                'rounded-full px-2 py-1 text-[10px] font-medium',
                {
                  'bg-emerald-100 text-emerald-600': paymentStatus === 'PAID',
                  'bg-amber-100 text-amber-600': paymentStatus === 'PENDING',
                  'bg-red-100 text-red-600': paymentStatus === 'FAILED',
                },
              )}
            >
              {paymentStatus}
            </span>
          </div>
        </div>

        {/* Customer */}
        <div className="border-b border-border mb-0 px-4 py-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-400">
            Customer
          </p>

          <div>
            <div className="flex gap-3">
              <Avatar
                src={profilePicture}
                alt="Customer Image"
                name={customer}
                size={52}
              />

              <div className="flex justify-between flex-1">
                <div className=" space-y-1">
                  <p className="font-medium">{customer}</p>

                  <p className="text-xs text-neutral-500">{email || 'N/A'}</p>

                  {phoneNumber && (
                    <p className="text-xs text-neutral-500">{phoneNumber}</p>
                  )}
                </div>

                <p className="mt-2 text-xs text-neutral-500">
                  {new Date(createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-0 px-4 py-3">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-400">
            Order Items
          </p>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.name}-${item.quantity}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 ">
                  <div className="h-12 w-12 overflow-hidden rounded-sm relative">
                    <Image src={item.image} alt={item.name} fill priority />
                  </div>

                  <p className="text-sm text-neutral-700 space-x-1">
                    <span className="flex-wrap">{item.name}</span>
                    <span className="text-neutral-400">× {item.quantity}</span>
                  </p>
                </div>

                <p className="text-sm font-medium">
                  ₦ {item.totalPrice.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-border px-4 py-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-neutral-500">Total Amount</p>

            <p className="text-xl font-semibold text-primary">
              ₦{subtotal.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <Button
              size="icon"
              variant="outline"
              className="flex-1"
              leftIcon={<Eye size={16} />}
              onClick={() => handleViewAction(id)}
            >
              View Details
            </Button>

            <Button
              size="icon"
              variant="red-secondary"
              className="flex-1"
              leftIcon={<XCircle size={16} />}
              onClick={handleRejectAction}
            >
              Decline
            </Button>

            <Button
              size="icon"
              variant="green"
              className="flex-1"
              leftIcon={<CheckCircle size={16} />}
              onClick={handleAcceptAction}
            >
              Accept
            </Button>
          </div>
        </div>
      </Card>

      <OrderActionModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={id}
        customer={customer}
        actionStatus={actionStatus}
      />

      {selectedOrderId && (
        <OrderDetailsModal
          isModalOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          orderId={selectedOrderId}
          onAccept={handleAcceptAction}
          onDecline={handleRejectAction}
        />
      )}
    </>
  );
}
