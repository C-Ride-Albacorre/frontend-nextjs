import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import {
  Car,
  CheckCircle,
  Eye,
  MapPin,
  Navigation,
  Package,
  Phone,
  Star,
  Truck,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import DeliveryDetailsModal from './delivery-details-modal';
import { OrderProps } from '../type';
import DriverTrackingModal from './driver-tracking-modal';

export default function ActiveDeliveriesCard({
  orderId,
  status,
  percent,
  scheduleType,
  customer,
  address,
  distance,
  fee,
  driver,
  items,
  timeline,
}: OrderProps) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!barRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  let statusIcon = null;
  let statusClass = '';
  let scheduleClass = '';

  if (scheduleType === 'Scheduled') {
    scheduleClass = 'bg-[#1447E6]/10 text-[#1447E6]';
  }

  if (status === 'In Transit') {
    statusIcon = <Navigation size={18} className="text-[#E17100]" />;
    statusClass = 'bg-[#FFF4E5] text-[#E17100]';
  }

  return (
    <>
      <Card gap="lg" className="px-4 md:px-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {statusIcon}

          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-sm">{orderId}</span>

                <span
                  className={`text-xs ${statusClass} px-2 py-1 rounded-full`}
                >
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

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-14">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span className="text-sm">{customer}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Truck size={18} />
                    <span className="text-sm">{driver.name}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star stroke="0" fill="#D4AF37" size={15} />
                    <span className="text-xs text-primary">
                      {driver.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-neutral-400 flex sm:items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">{address}</span>
              </div>
            </div>

            <div className="sm:text-right space-y-4">
              <p className="text-primary text-lg font-medium">{fee}</p>
              <p className="text-sm">{distance}</p>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
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

        {/* ITEMS */}
        <div className="bg-primary/10 border border-border p-4 rounded-lg space-y-8">
          <p className="text-sm">Order items</p>

          <ul className="space-y-8 text-sm">
            {items.map((item) => (
              <li key={item.name} className="flex justify-between items-center">
                <p>{item.name}</p>
                <p>x{item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* TIMELINE */}
        <div className="flex flex-col sm:flex-row gap-4 justify-around sm:items-center">
          {timeline.map((step) => (
            <div key={step.label} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-100" />
              <p className="text-sm text-neutral-500">
                {step.label}: {step.time}
              </p>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
              type="submit"
              variant="primary"
              className="w-full"
            >
              <Eye size={18} />
              View Details
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              onClick={() => setOpenModal(true)}
              variant="green"
              className="w-full text-white"
            >
              <Navigation size={18} />
              Track Driver
            </Button>

            <Button type="submit" variant="outline" className="w-full">
              <Phone size={18} />
              Call
            </Button>
          </div>
        </div>
      </Card>

      <DeliveryDetailsModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        statusClass={statusClass}
        status={status}
        scheduleType={scheduleType}
        scheduleClass={scheduleClass}
        percent={percent}
        barRef={barRef}
        visible={visible}
        customer={customer}
        address={address}
        driver={driver}
        items={items}
        timeline={timeline}
        fee={fee}
      />

      <DriverTrackingModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
