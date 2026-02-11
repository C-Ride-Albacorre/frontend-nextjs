import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { MessageCircle, Phone, Star, Truck } from 'lucide-react';
import { RouteItem } from '../../track-order/components/section';
import Avatar from '@/components/ui/avatar';

export default function ActiveDeliveries() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Truck className="text-primary" size={24} />

          <h3 className="font-semibold">Active Deliveries</h3>
        </div>

        <Button variant="default" size="none">
          View All
        </Button>
      </div>

      <Card gap="lg" className="bg-foreground-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 ">
            <span className="p-2 text-xs bg-[#10B981] text-white rounded-full">
              On Route
            </span>

            <p className="text-xs text-neutral-500">CRD-2024-1234</p>
          </div>

          <p className="text-sm text-[#10B981]">ETA 12 mins</p>
        </div>

        <Card border="none" spacing="none" gap="md">
          <p className="font-medium text-sm">Food Delivery</p>

          <div className="flex flex-col gap-8">
            <RouteItem
              title="Pickup"
              address="Eko Hotel Restaurant, Victoria Island"
              time="2:15 PM"
            />

            <RouteItem
              title="Drop-off"
              address="12 Admiralty Way, Lekki Phase 1"
              time="2:47 PM (ETA)"
              highlight
            />
          </div>
        </Card>

        <Card gap="md" spacing="none" border="none">
          <p className="font-medium text-sm">Your Driver</p>

          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar
                src="/assets/image/driver.jpg"
                alt="driver"
                name="Chukwudi Okonkwo"
                size={54}
              />
              <div className="text-sm space-y-3">
                <p className="font-medium ">Chukwudi Okonkwo</p>
                <p className="text-xs flex items-center gap-1">
                  <Star size={14} fill="#D4AF37" stroke="0" />
                  4.9 <span className="text-neutral-400">(1247 trips)</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                leftIcon={<Phone size={16} />}
                variant="primary-inverted"
                size="full"
              >
                Call
              </Button>
              <Button
                variant="black"
                size="full"
                leftIcon={<MessageCircle size={16} />}
              >
                Message
              </Button>
            </div>
          </div>
        </Card>
      </Card>

      <div>
        <p className="text-sm text-[#10B981]">Your order is now in care.</p>
      </div>
    </div>
  );
}
