'use client';

import { Button } from '@/components/ui/buttons/button';
import Modal from '@/components/layout/modal';
import {
  BadgeCheck,
  CheckIcon,
  Clock,
  HomeIcon,
  Mail,
  Phone,
  Store,
  StoreIcon,
  UserCheck,
} from 'lucide-react';
import Card from '@/components/layout/card';

export default function SuccessfulVerificationModal({
  isModalOpen,
  onClose,
  email,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  email?: string;
}) {
  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="py-6 md:py-8 space-y-8 text-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-b from-primary to-[#B8941F] mx-auto flex items-center justify-center">
          <BadgeCheck size={48} className="text-white" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-medium">
            Account Successfully Verified
          </h2>

          <p className="text-sm text-neutral-500">
            Your account has been successfully verified. You can now proceed to
            onboarding to set up your store and start delivering with C-ride.
          </p>
        </div>

        <Card className="bg-primary/10 text-left  max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row  items-start gap-4">
            <UserCheck size={18} className="text-primary shrink-0" />

            <div className="space-y-2">
              <h3 className="font-medium text-neutral-900">
                Next: Complete Your Onboarding and Set Up Your Store-front
              </h3>

              <ul className="text-sm text-neutral-600 space-y-6 text-left">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    1
                  </span>

                  <span>Business Information</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    2
                  </span>

                  <span>Business Contact Details</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    3
                  </span>

                  <span>Business Address</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    4
                  </span>

                  <span>Business Bank Details</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    5
                  </span>

                  <span>Required Document</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button
            href="mailto:support@c-ride.com"
            variant="outline"
            size="lg"
            leftIcon={<Phone size={16} />}
            className="w-full md:w-auto"
          >
            Contact Support
          </Button>

          <Button
            href="/onboarding/business-info"
            variant="primary"
            size="lg"
            leftIcon={<Store size={16} />}
            className="w-full md:w-auto"
          >
            Go to Onboarding
          </Button>
        </div>
      </div>
    </Modal>
  );
}
