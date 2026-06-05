import Image from 'next/image';
import clsx from 'clsx';
import {
  Calendar,
  Check,
  CheckCircle,
  Code,
  CreditCard,
  Loader,
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

  console.log(' Order details in modal:', order);

  const customerName = order
    ? `${order.user?.firstName ?? ''} ${order.user?.lastName ?? ''}`
    : '';

  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={onClose}
      wrapperClassName="max-w-4xl"
    >
      {loading ? (
        <div className="flex flex-col items-center gap-4 justify-center min-h-[85vh]">
          <Loader size={24} className="animate-spin text-primary" />
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

            <p className="text-sm text-neutral-500">
              Order Code #{order.orderCode}
            </p>
          </div>

          <div className="space-y-12">
            {/* Order Overview */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Order Overview
              </h3>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <InfoCard
                  icon={<ShoppingBag size={16} className='text-neutral-400' />}
                  label="Order Number"
                    value={order.orderNumber}
                />

                <InfoCard
                  icon={<Code size={16} className='text-neutral-400' />}
                  label="Order Code"
                  value={order.orderCode}
                />

                <InfoCard
                  icon={<Package size={16} className='text-neutral-400' />}
                  label="Status"
                  value={
                    <span
                      className={clsx(
                        'rounded-full px-2 py-1 text-xs font-medium',
                        {
                          'bg-blue-100 text-blue-600':
                            order.orderStatus === 'CONFIRMED',
                          'bg-emerald-100 text-emerald-600':
                            order.orderStatus === 'COMPLETED',
                          'bg-amber-100 text-amber-600':
                            order.orderStatus === 'PENDING',
                        },
                      )}
                    >
                      {order.orderStatus}
                    </span>
                  }
                />

                <InfoCard
                  icon={<CreditCard size={16} className='text-neutral-400' />}
                  label="Payment"
                  value={
                    <span
                      className={clsx(
                        'rounded-full px-2 py-1 text-xs font-medium',
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
                      {order.paymentStatus}
                    </span>
                  }
                />
              </div>
            </section>

            {/* Customer */}
            <section className='space-y-4'>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Customer Information
              </h3>

              <Card spacing='none' border='none' >
                <div className="flex gap-4">
                  <Avatar
                    src={order.user?.profilePicture}
                    name={customerName}
                    size={56}
                  />

                  <div className="flex-1 space-y-1">
                  {  <p className="font-medium">{customerName}</p>}

                   {order.user?.email && (
                     <p className=" text-sm text-neutral-500">
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
            <section className='space-y-4'>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Delivery Information
              </h3>

              <Card spacing='none' border="none" >
               <div className=' flex flex-col gap-6'>
                 <div className="flex gap-3 mb-0">
                  <User size={18} className=" text-neutral-400" />

                  <div className='space-y-1'>
                    <p className="font-medium">{order.recipientName}</p>

                    <p className="text-sm text-neutral-500">
                      {order.recipientPhone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mb-0">
                  <MapPin size={18} className="mt-0.5 text-neutral-400" />

              <div className='space-y-1'>
                    <p className="font-medium">Delivery Address</p>

                    <p className="text-sm text-neutral-500">
                      {order.dropoffLocation?.address}
                    </p>

                    <p className="text-sm text-neutral-500">
                      {order.dropoffLocation?.state},{' '}
                      {order.dropoffLocation?.country}
                    </p>
                  </div>
                </div>

                {order.deliveryInstructions && (
             <div className='space-y-1'>
                    <p className="text-xs font-medium text-neutral-400">
                      DELIVERY INSTRUCTIONS
                    </p>

                    <p className="mt-1 text-sm">{order.deliveryInstructions}</p>
                  </div>
                )}
               </div>
              </Card>
            </section>

            {/* Items */}
            <section className='space-y-4'>
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
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg ">
                        <Image
                          src={item.product.image}
                          alt={item.product.productName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium">{item.product.productName}</p>

                        <p className="text-neutral-500 text-xs">
                          Quantity: x {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold">
                      ₦{item.totalPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <section className='space-y-4'>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Order Summary
              </h3>

              <div className='space-y-4'>
                <div className="flex items-center justify-between">
                  <p className="text-neutral-500 text-sm">Total Items</p>

                  <p className="font-medium">{order.vendorSummary.itemCount}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-neutral-500 text-sm">Total Quantity</p>

                  <p className="font-medium">
                    {order.vendorSummary.totalQuantity}
                  </p>
                </div>

                <div className="mt-4 pt-4 flex items-center justify-between">
                  <p className="font-medium">Grand Total</p>

                  <p className="text-2xl font-semibold text-primary">
                    ₦{order.vendorSummary.subtotal.toLocaleString()}
                  </p>
                </div>
              </div>
            </section>

            {/* Created Date */}
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Calendar size={14} />

              <span className='text-sm'>Created {new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </div>


         <div className='flex justify-around items-center gap-4'>
          <Button variant='red-secondary' leftIcon={<XCircle size={16} />} size='icon' onClick={onDecline}>
            Decline Order
          </Button>


          <Button variant='green' leftIcon={<CheckCircle size={16} />} size='icon' onClick={onAccept}>
            Accept Order
          </Button>
         </div>

        </div>
      )}
    </Modal>
  );
}


