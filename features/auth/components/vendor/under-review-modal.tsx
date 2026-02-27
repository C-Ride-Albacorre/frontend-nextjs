'use client';

import { Button } from '@/components/ui/buttons/button';
import Modal from '@/components/layout/modal';
import { Clock, HomeIcon, Mail, Phone } from 'lucide-react';
import Card from '@/components/layout/card';

export default function UnderReviewModal({
  isModalOpen,
  onClose,
  email,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  email?: string;
}) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="py-6 md:py-8 space-y-8 text-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-b from-primary to-[#B8941F] mx-auto flex items-center justify-center">
          <Clock size={48} className="text-white" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-medium">Account Under Review</h2>
        </div>

        <Card className="bg-primary/10 text-left  max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row  items-start gap-4">
            <Mail size={18} className="text-primary shrink-0" />

            <div className='space-y-2'>
              <p className="text-sm text-neutral-700">
                We'll notify you at{' '}
                <span className="font-medium text-neutral-900">
                  {email || 'your registered email'}
                </span>{' '}
                once your account is approved.
              </p>

              <p className="text-sm text-neutral-500 leading-6">
                Please ensure your email inbox is accessible and check your spam
                folder if you don't receive our email within the expected
                timeframe.
              </p>
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
            href="/"
            variant="primary"
            size="lg"
            leftIcon={<HomeIcon size={16} />}
            className="w-full md:w-auto"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </Modal>
  );
}
