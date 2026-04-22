'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { completeVerificationAction } from '../../actions/complete-verify-session';

type VerificationSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  redirectTo: string;
};

export default function VerificationSuccessModal({
  isOpen,
  onClose,
  redirectTo,
}: VerificationSuccessModalProps) {
  const handleContinue = async () => {
    await completeVerificationAction(); // clear now, just before leaving
    window.location.href = redirectTo; // hard nav to avoid middleware cache issues
  };

  return (
    <Modal isModalOpen={isOpen}>
      <div className="flex flex-col items-center text-center py-4 space-y-8">
        {/* Success Icon */}
        <div className="mb-6 flex items-center justify-center w-16 h-16 bg-[#10B981] rounded-full">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        <div className="space-y-2">
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-neutral-900 ">
            Verification Complete!
          </h2>

          {/* Success Message */}
          <p className="text-neutral-600 ">
            Your email and phone number have been successfully verified.
          </p>
        </div>

        {/* Onboarding Info */}
        <div className="bg-neutral-50 rounded-xl p-5 mb-6 w-full max-w-md space-y-4">
          <h3 className="font-medium text-neutral-900">
            Next: Complete Your Business Profile
          </h3>

          <ul className="text-sm text-neutral-600 space-y-4 text-left">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                1
              </span>
              Business Information
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                2
              </span>
              Contact Information
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                3
              </span>
              Business Location
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                4
              </span>
              Bank Details
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                5
              </span>
              Business Documents
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          // href={redirectTo}
          onClick={handleContinue}
          variant="primary"
          size="6xl"
          className="w-full max-w-md"
          rightIcon={<ChevronRight size={18} />}
        >
          Start Onboarding
        </Button>
      </div>
    </Modal>
  );
}
