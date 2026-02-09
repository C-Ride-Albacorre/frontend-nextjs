import Modal from '@/components/layout/modal';
import { DeliveryDetailsModalProps, OrderProps } from '../type';
import Card from '@/components/layout/card';
import { Package, Star, Truck, User } from 'lucide-react';

export default function DeliveryDetailsModal({
  openModal,
  onClose,
  statusClass,
  status,
  scheduleType,
    scheduleClass,
  percent,
  barRef,
  visible,
  customer,
  address,
  driver,
  items,
  timeline,
  fee,
}: DeliveryDetailsModalProps) {
  return (
    <>
      <Modal isModalOpen={openModal} onClose={onClose}>
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <span className={`text-xs ${statusClass} px-2 py-1 rounded-full`}>
              {status}
            </span>

            {scheduleType && (
              <span
                className={`text-xs ${scheduleClass} px-2 py-1 rounded-full`}
              >
                {scheduleType}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <p>Delivery Progress</p>

            <div className="w-full h-2.5 rounded-full bg-neutral-200 overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                style={{ width: visible ? `${percent}%` : '0%' }}
              />
            </div>
          </div>

          <Card gap="md" className="p-4">
            <div className="flex gap-2">
              <User size={20} className="text-primary" />
              <span className="text-sm">Customer Information</span>
            </div>

            <ul className=" text-sm text-primary-text-100 space-y-4">
              <li className="flex justify-between">
                <span className="text-neutral-500">Name:</span> {customer}
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-500">Phone:</span> +234 802 345
                6789
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-500">Address:</span> {address}
              </li>
            </ul>
          </Card>

          <Card gap="md" className="p-4">
            <div className="flex gap-2">
              <Truck size={20} className="text-primary" />
              <span className="text-sm">Driver Information</span>
            </div>

            <ul className=" text-sm text-primary-text-100 space-y-4">
              <li className="flex justify-between">
                <span className="text-neutral-500">Name:</span> {customer}
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-500">Phone:</span> +234 802 345
                6789
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-500">Ratings:</span>{' '}
                <span className="flex gap-2 items-center">
                  <Star stroke="0" fill="#D4AF37" size={15} />
                  {driver.rating} / 5
                </span>
              </li>
            </ul>
          </Card>

          <Card gap="md" className="p-4">
            <div className="flex gap-2">
              <Package size={20} className="text-primary" />
              <span className="text-sm">Order Items</span>
            </div>

            <ul className=" text-sm text-primary-text-100 space-y-4">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-center"
                >
                  <p className="text-neutral-500">{item.name}</p>
                  <p className="p-2 rounded-full border border-border shrink-0 aspect-square flex items-center justify-center w-8 h-8">
                    x{item.quantity}
                  </p>
                </li>
              ))}

              <li className="py-4 border-t border-border flex justify-between items-center">
                <p>
                  <span className="text-neutral-500">Total Fee:</span>
                </p>

                <p className="text-primary font-medium">{fee}</p>
              </li>
            </ul>
          </Card>

          <Card gap="md" className="p-4">
            <div className="flex gap-2">
              <Truck size={20} className="text-primary" />
              <span className="text-sm">Delivery Timeline</span>
            </div>

            <ul className=" text-sm text-primary-text-100 space-y-4">
              {timeline.map((step) => (
                <li
                  key={step.label}
                  className="flex justify-between items-center"
                >
                  <p className="text-neutral-500">{step.label}</p>
                  <p className="text-neutral-500">{step.time}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Modal>
    </>
  );
}
