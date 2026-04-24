'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { completeVerificationAction } from '../../actions/complete-verify-session';

type VerificationSuccessModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  redirectTo: string;
};

export default function VerificationSuccessModal({
  isOpen,
  onClose,
  redirectTo,
}: VerificationSuccessModalProps) {
  const handleContinue = async () => {
    await completeVerificationAction();
    window.location.href = redirectTo;
  };

  return (
    <Modal isModalOpen={isOpen} wrapperClassName='max-w-xl'>
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
            Your account has been successfully verified. You can now access all
            features and start using C-ride.
          </p>
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
          Let's Get Started
        </Button>
      </div>
    </Modal>
  );
}
