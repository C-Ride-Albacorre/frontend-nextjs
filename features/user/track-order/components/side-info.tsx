import { Star, Phone, MessageCircle, AlertCircle, Stars } from 'lucide-react';
import Card from '@/components/layout/card';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';

export default function SideInfo() {
  return (
    <>
      <div className="space-y-8">
        {/* DRIVER */}
        <Card gap="md" className="bg-foreground-200">
          <h3 className="font-medium">Your Driver</h3>

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

          <Card border="none" gap="sm" className="text-sm bg-white">
            <p className="text-xs text-neutral-500">Vehicle</p>

            <p className="font-medium">Mercedes E-Class</p>

            <p className="text-neutral-500">LAG-567-XY</p>
          </Card>

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
        </Card>

        {/* ORDER DETAILS */}
        <Card gap="md" className="bg-foreground-200">
          <h3 className="font-medium">Order Details</h3>

          <ul className="space-y-6 text-sm">
            <li className="flex justify-between">
              <p className="text-neutral-500">Order ID</p>
              <p className="text-right">CRD-2024-1234</p>
            </li>

            <li className="flex justify-between">
              <p className="text-neutral-500">Type</p>
              <p className="text-right">Food Delivery</p>
            </li>

            <li className="flex justify-between">
              <p className="text-neutral-500">Delivery Fee</p>
              <p className="text-right">₦500</p>
            </li>

            <li className="flex justify-between border-t border-border pt-4">
              <p className="font-medium">Total Paid</p>
              <p className="text-right font-medium">₦1,500</p>
            </li>
          </ul>
        </Card>

        {/* SUPPORT */}
        <Card gap="md" className="bg-foreground-200">
          <div className="space-y-2">
            <h3 className="font-medium">Need Assistance?</h3>
            <p className="text-sm text-neutral-500">
              Our care team is here to help
            </p>
          </div>

          <Button
            leftIcon={<AlertCircle size={16} />}
            size="full"
            variant="red"
          >
            Report Issue
          </Button>
        </Card>

        {/* PREMIUM */}
        <Card className="bg-primary/10 flex items-start gap-4">
          <Stars size={32} className="text-primary" />

          <div className="space-y-4">
            <p className="font-medium">Premium Service Guarantee</p>
            <p className="text-neutral-500  text-sm leading-6">
              Your delivery is handled with care by verified premium drivers
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
