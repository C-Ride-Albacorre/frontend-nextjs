import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { ChevronRight } from 'lucide-react';

export default function RegisterSuccessModal({
  icon,
  showSuccessModal,
  setShowSuccessModal,
  messageTitle,
  message,
  buttonHref,
  buttonText,
}: {
  icon: React.ReactNode;
  showSuccessModal: boolean;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  messageTitle: string;
  message: React.ReactNode;
  buttonHref: string;
  buttonText: string;
}) {
  return (
    <Modal
      isModalOpen={showSuccessModal}
      onClose={() => setShowSuccessModal(false)}
    >
      <section className="flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 bg-[#10B981] flex justify-center items-center aspect-square shrink-0 rounded-full ">
          {icon}
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-900 ">
            {messageTitle}
          </h2>

          <div className="bg-neutral-50 rounded-xl p-5 mb-6 w-full max-w-lg space-y-6">
            <h3 className="font-medium text-neutral-900">
              Next: Verify Your Business Email and Phone Number
            </h3>

            {message}
          </div>
        </div>

        <Button
          rightIcon={<ChevronRight size={18} />}
          href={buttonHref}
          size="6xl"
        >
          {buttonText}
        </Button>
      </section>
    </Modal>
  );
}
