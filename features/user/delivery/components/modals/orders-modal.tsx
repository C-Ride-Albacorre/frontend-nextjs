'use client';

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  MapPin,
  Phone,
  User,
  X,
} from 'lucide-react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import Card from '@/components/layout/card';
import { initializePaymentAction } from '../../action';
import { useOrderStore } from '../../order-store';
import {
  useOrders,
  useOrderDetails,
  useCancelOrder,
} from '../../hooks/use-orders';
import { toast } from 'sonner';
import Image from 'next/image';

interface OrderItem {
  id: string;
  productName?: string;
  name?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: {
    productName?: string;
    productImages?: { imageUrl?: string | null }[];
  };
}

interface OrderSummary {
  id: string;
  orderId?: string;
  status?: string;
  orderStatus?: string;
  paymentStatus?: string;
  paymentReference?: string;
  monnifyReference?: string;
  totalAmount?: number;
  amount?: number;
  createdAt?: string;
  itemCount?: number;
  items?: OrderItem[];
}

interface OrderDetail extends OrderSummary {
  items?: OrderItem[];
  deliveryFee?: number;
  serviceFee?: number;
  vat?: number;
  recipientName?: string;
  recipientPhone?: string;
  dropoffLocation?: {
    address?: string;
    city?: string;
    state?: string;
  };
}

export default function OrdersModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);

  const { setOrderId } = useOrderStore();

  // React Query hooks
  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useOrders(isOpen);

  console.log(' [OrdersModal] Orders:', orders);
  const {
    data: selectedOrder,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useOrderDetails(selectedOrderId);

  console.log(' [OrdersModal] Selected order details:', selectedOrder);

  const cancelMutation = useCancelOrder();

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleBack = () => {
    setSelectedOrderId(null);
  };

  const handleClose = () => {
    setSelectedOrderId(null);
    onClose();
  };

  const handleCancel = (orderId: string) => {
    cancelMutation.mutate(orderId, {
      onSuccess: () => setSelectedOrderId(null),
    });
  };

  const handlePayNow = async (order: OrderDetail) => {
    const orderId = order.id;
    if (!orderId) {
      toast.error('Order ID not found');
      return;
    }

    setIsInitiatingPayment(true);

    // If order already has both references, verify the monnify one directly
    if (order.paymentReference && order.monnifyReference) {
      console.log(
        '[OrdersModal] Verifying existing monnifyReference:',
        order.monnifyReference,
      );
      window.location.href = `/payment/callback?paymentReference=${encodeURIComponent(order.monnifyReference)}`;
      return;
    }

    // Otherwise initialize a new payment
    const callbackUrl = `${window.location.origin}/payment/callback`;
    const result = await initializePaymentAction({
      orderId,
      paymentMethod: 'CARD',
      callbackUrl,
    });

    console.log('[OrdersModal] Initialize payment:', result);
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

  const isCancellable = (status?: string) => {
    if (!status) return false;
    const s = status.toUpperCase();
    return s === 'PENDING' || s === 'AWAITING_PAYMENT' || s === 'CREATED';
  };

  const isPayable = (status?: string) => {
    if (!status) return false;
    const s = status.toUpperCase();
    return s === 'PENDING' || s === 'AWAITING_PAYMENT' || s === 'CREATED';
  };

  const statusColor = (status?: string) => {
    if (!status) return 'bg-neutral-200 text-neutral-600';
    const s = status.toUpperCase();
    if (s === 'DELIVERED' || s === 'PAID' || s === 'CONFIRMED')
      return 'bg-green-100/20 text-green-700';
    if (s === 'CANCELLED') return 'bg-red-100/30 text-red-700';
    if (s === 'AWAITING_PAYMENT' || s === 'CREATED')
      return 'bg-blue-100/20 text-blue-700';
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
    <Modal
      wrapperClassName=" mx-auto"
      isModalOpen={isOpen}
      onClose={handleClose}
    >
      <div className="space-y-6 ">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          {selectedOrderId ? (
            <Button
              rounded="full"
              variant="white"
              size="xs"
              onClick={handleBack}
              leftIcon={<ChevronLeft size={14} />}
            >
              Back to Orders
            </Button>
          ) : (
            <h2 className="text-xl font-semibold">Your Orders</h2>
          )}
        </div>

        {/* ── Loading ── */}
        {(isLoadingOrders || isLoadingDetails) && (
          <div className="flex justify-center py-12">
            <Loader2 size={24} className="animate-spin text-primary" />
          </div>
        )}

        {/* ── Error ── */}
        {ordersError && !isLoadingOrders && (
          <p className="py-8 text-center text-red-500 text-sm">
            {(ordersError as Error).message || 'Failed to load orders'}
          </p>
        )}

        {/* ── Order list ── */}
        {!isLoadingOrders && !selectedOrderId && !ordersError && (
          <>
            {orders.length === 0 ? (
              <p className="py-12 text-center text-neutral-400">
                No orders yet
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-4 max-h-[75vh] overflow-y-auto">
                {orders.map((order) => {
                  const id = order.id ?? order.orderId ?? '';
                  return (
                    <li key={id}>
                      <Card gap="md" className="bg-foreground-200 ">
                        <div className="flex items-center justify-between mb-6">
                          <p className="text-xs font-medium">
                            #{order.orderNumber}
                          </p>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[0.65rem] capitalize ${statusColor(
                              order.orderStatus,
                            )}`}
                          >
                            {order.orderStatus
                              ?.toLowerCase()
                              .replace(/_/g, ' ') ?? 'unknown'}
                          </span>
                        </div>

                        <div className="space-y-6">
                          {/* <div className=" text-xs text-neutral-500 space-y-1">
                            <p>Items:</p>
                            <p className="text-primary-text-100 text-sm">
                              {order.items?.length ?? 0}
                            </p>
                          </div> */}
                          <div className="flex justify-between items-center">
                            <div className=" text-xs text-neutral-500 space-y-1">
                              <p>Order Date:</p>
                              <p className="text-primary-text-100 text-sm">
                                {formatDate(order.createdAt)}
                              </p>
                            </div>

                            <div className=" text-xs text-neutral-500 space-y-1 text-right">
                              <p>Payment Status:</p>
                              <span
                                className={`text-right rounded-full w-fit px-2 py-0.5 text-[0.65rem] font-medium capitalize ${statusColor(order.paymentStatus)}`}
                              >
                                {order.paymentStatus
                                  ?.toLowerCase()
                                  .replace(/_/g, ' ') ?? 'unknown'}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <p>Total:</p>
                            <p className="font-medium  text-primary-text-100">
                              ₦
                              {(
                                order.totalAmount ??
                                order.amount ??
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="primary-inverted"
                          size="icon"
                          className="w-full"
                          rightIcon={<ChevronRight size={14} />}
                          onClick={() => handleViewDetails(id)}
                        >
                          View Details
                        </Button>
                      </Card>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}

        {/* ── Order detail ── */}
        {selectedOrder && !isLoadingDetails && (
          <div className="space-y-6">
            {/* Status badge + ID */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium text-xs text-neutral-500">
                  Order Number{' '}
                </p>
                <p className="text-sm">
                  {(selectedOrder.orderNumber ?? '').toUpperCase()}
                </p>
              </div>

              <span
                className={`rounded-full px-2 py-0.5 text-[0.65rem] font-medium capitalize ${statusColor(
                  selectedOrder.orderStatus,
                )}`}
              >
                {selectedOrder.orderStatus?.toLowerCase().replace(/_/g, ' ') ??
                  'unknown'}
              </span>
            </div>

            {/* Delivery info */}
            {selectedOrder.dropoffLocation &&
              (() => {
                const loc =
                  typeof selectedOrder.dropoffLocation === 'string'
                    ? JSON.parse(selectedOrder.dropoffLocation)
                    : selectedOrder.dropoffLocation;
                return (
                  <Card gap="xs" className="bg-foreground-200 text-sm">
                    <p className="font-medium text-xs text-neutral-500">
                      Delivery To
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <User size={14} className="text-neutral-400" />
                      {selectedOrder.recipientName}
                    </p>
                    <p className="text-sm capitalize flex items-center gap-2">
                      <MapPin size={14} className="text-neutral-400" />
                      {[loc.address, loc.city, loc.state]
                        .filter(Boolean)
                        .join(', ')
                        .toLocaleLowerCase()}
                    </p>
                    {selectedOrder.recipientPhone && (
                      <p className="text-sm flex items-center gap-2">
                        <Phone size={14} className="text-neutral-400" />
                        {selectedOrder.recipientPhone}
                      </p>
                    )}
                  </Card>
                );
              })()}

            {/* Items */}
            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm font-medium">Items</p>
                <ul className="divide-y divide-border text-sm">
                  {selectedOrder.items.map((item: OrderItem) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between py-4 gap-2 md:gap-8"
                    >
                      <Image
                        src={item.product?.productImages?.[0]?.imageUrl ?? ''}
                        alt={item.product?.productName ?? ''}
                        width={40}
                        height={40}
                        priority
                        className="rounded-md"
                      />
                      <div className="capitalize  bg-amber-500 w-full text-left">
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
              {selectedOrder.serviceFee !== undefined && (
                <div className="flex justify-between text-neutral-500">
                  <span>Service Fee</span>
                  <span>₦{selectedOrder.serviceFee.toLocaleString()}</span>
                </div>
              )}
              {selectedOrder.deliveryFee !== undefined && (
                <div className="flex justify-between text-neutral-500">
                  <span>Delivery Fee</span>
                  <span>₦{selectedOrder.deliveryFee.toLocaleString()}</span>
                </div>
              )}
              {selectedOrder.vat !== undefined && (
                <div className="flex justify-between text-neutral-500">
                  <span>VAT</span>
                  <span>₦{selectedOrder.vat.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total</span>
                <span className="text-primary">
                  ₦
                  {(
                    selectedOrder.totalAmount ??
                    selectedOrder.amount ??
                    0
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Date */}
            <p className="text-xs text-neutral-400">
              Placed {formatDate(selectedOrder.createdAt)}
            </p>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-3">
              {isPayable(
                selectedOrder.orderStatus ??
                  selectedOrder.paymentStatus ??
                  selectedOrder.status,
              ) && (
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  leftIcon={
                    isInitiatingPayment ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <CreditCard size={16} />
                    )
                  }
                  onClick={() => handlePayNow(selectedOrder)}
                  disabled={isInitiatingPayment || cancelMutation.isPending}
                >
                  {isInitiatingPayment
                    ? 'Processing...'
                    : selectedOrder.paymentReference
                      ? `Continue Payment - ₦${(selectedOrder.totalAmount ?? 0).toLocaleString()}`
                      : `Pay - ₦${(selectedOrder.totalAmount ?? 0).toLocaleString()}`}
                </Button>
              )}

              {isCancellable(
                selectedOrder.orderStatus ?? selectedOrder.status,
              ) && (
                <Button
                  variant="red-secondary"
                  size="lg"
                  className="flex-1"
                  leftIcon={
                    cancelMutation.isPending ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <X size={16} />
                    )
                  }
                  onClick={() =>
                    handleCancel(
                      selectedOrder.id ?? selectedOrder.orderId ?? '',
                    )
                  }
                  disabled={cancelMutation.isPending || isInitiatingPayment}
                >
                  {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
