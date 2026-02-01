import { Button } from '@/components/ui/buttons/button';
import Modal from '@/components/ui/modal';
import {
  Check,
  HomeIcon,
  Mail,
  Phone,
  Stars,
} from 'lucide-react';

export default function SuccessModal({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="py-6  md:py-8 space-y-12 text-center">
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
                <Check size={16} className="text-green-500" /> <p>We'll verify your
                business documents</p> 
              </li>

              <li className="flex items-center text-xs md:text-sm gap-3 text-neutral-700 ">
                <Check size={16} className="text-green-500" /><p>Our team will
                review your application</p> 
              </li>

              <li className="flex items-center text-xs md:text-sm gap-3 text-neutral-700 ">
                <Check size={16} className="text-green-500" />
                <p>
                  You’ll receive an email at{' '}
                  <span className="block lg:inline font-medium mt-2 lg:mt-0 text-neutral-900">
                    Ziondavid17@yahoo.com
                  </span>
                </p>
              </li>

              <li className="flex items-center text-xs md:text-sm gap-3 text-neutral-700 ">
                <Check size={16} className="text-green-500" /> <p>Start accepting
                orders once approved</p> 
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12  flex flex-col md:flex-row items-center justify-between lg:justify-around gap-4">
          <Button
            href="/vendor/register"
            variant="outline"
            size="lg"
            leftIcon={<Phone size={16} />}
            className="order-2 md:order-1 w-full md:w-auto"
          >
            Contact Support
          </Button>

          <Button
            href="/"
            variant="primary"
            size="lg"
            leftIcon={<HomeIcon size={16} />}
            className="order-1 md:order-2 w-full md:w-auto"
          >
            Return to Homepage
          </Button>
        </div>

        <div className="py-6 border-t border-border ">
          <p className=" text-xs md:text-sm">Application ID: VEN-39200022</p>
        </div>
      </div>
    </Modal>
  );
}
