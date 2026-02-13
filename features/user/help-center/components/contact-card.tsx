import Card from '@/components/layout/card';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export default function ContactCard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          gap="md"
          className="bg-foreground-200 text-sm flex flex-col items-center text-center"
        >
          <Phone size={24} className="text-[#10B981]" />
          <div className="space-y-3">
            <p>Call Us</p>

            <p className="text-primary">+234 700 CARE-RIDE</p>

            <p className="text-neutral-500">Available 24/7</p>
          </div>
        </Card>

        <Card
          gap="md"
          className="bg-foreground-200 text-sm flex flex-col items-center text-center"
        >
          <Mail size={24} className="text-[#10B981]" />
          <div className="space-y-3">
            <p>Email Support</p>

            <p className="text-primary">care@c-ride.ng</p>

            <p className="text-neutral-500">Response within 2 hours</p>
          </div>
        </Card>

        <Card
          gap="md"
          className="bg-foreground-200 text-sm flex flex-col items-center text-center"
        >
          <MessageCircle size={24} className="text-[#10B981]" />
          <div className="space-y-3">
            <p>Live Chat</p>

            <p className="text-primary">Start conversation</p>

            <p className="text-neutral-500">Average wait: 2 minutes</p>
          </div>
        </Card>
      </div>
    </>
  );
}
