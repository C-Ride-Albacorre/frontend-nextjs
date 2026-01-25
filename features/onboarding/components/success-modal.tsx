import ButtonPrevious from '@/components/ui/buttons/button-previous';
import ButtonProceed from '@/components/ui/buttons/button-proceed';
import Modal from '@/components/ui/modal';
import { Check, Mail, Stars } from 'lucide-react';

export default function SuccessModal({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className=" p-4 md:p-8 space-y-12 text-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-b from-primary to-[#B8941F] mx-auto flex items-center justify-center">
          <Stars size={48} className="text-white" />
        </div>

        <div className="space-y-3">
          <p className="font-medium">Registration Submitted Successfully</p>

          <span className=" text-xs md:text-sm text-neutral-500">
            Welcome to C-Ride, The Place. Your application is now under review
            by our care team. We'll notify you within 24-48 hours once your
            account is approved.
          </span>
        </div>

        <div className="bg-primary/10 text-left px-4 py-8 md:px-8 md:py-8  space-y-6 md:space-y-8 md:flex md:gap-6 rounded-2xl  md:items-start">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto md:mx-0">
            <Mail size={20} />
          </div>

          <div className="space-y-5">
            <p className="font-medium md:text-left text-center">
              What Happens Next?
            </p>

            <ul className="space-y-4">
              <li className="flex items-center text-xs md:text-sm gap-3 text-neutral-700 ">
                <Check size={16} className="text-green-500" /> We'll verify your
                business documents
              </li>

              <li className="flex items-center text-xs md:text-sm gap-3 text-neutral-700 ">
                <Check size={16} className="text-green-500" /> Our team will
                review your application
              </li>

              <li className="flex items-center text-xs md:text-sm gap-3 text-neutral-700 ">
                <Check size={16} className="text-green-500" /> You’ll receive an
                email at Ziondavid17@yahoo.com
              </li>

              <li className="flex items-center text-xs md:text-sm gap-3 text-neutral-700 ">
                <Check size={16} className="text-green-500" /> Start accepting
                orders once approved
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12  flex flex-col md:flex-row items-center justify-between lg:justify-around gap-4">
          <ButtonPrevious href="" buttonText="Contact Support" />

          <ButtonProceed href="/" buttonText="Return to Homepage" />
        </div>

        <div className="py-6 border-t border-border ">
          <p className=" text-xs md:text-sm">Application ID: VEN-39200022</p>
        </div>
      </div>
    </Modal>
  );
}
