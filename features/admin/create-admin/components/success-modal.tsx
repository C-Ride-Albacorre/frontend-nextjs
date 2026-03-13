import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { AdminCreateFormData } from '../schema';
import { CircleCheckBig, Home } from 'lucide-react';

type SuccessModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  state: {
    status: 'success';
    fields: Partial<AdminCreateFormData>;
  };
};

export default function SuccessModal({
  isModalOpen,
  setIsModalOpen,
  state,
}: SuccessModalProps) {
  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      isModalOpen={isModalOpen}
      wrapperClassName="max-w-xl mx-auto"
    >
      <div className="p-4 space-y-12 ">
        <div className="text-center space-y-4">
          <CircleCheckBig size={48} className="mx-auto text-[#10B981]" />

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Admin Created</h2>
            <p className="text-sm text-neutral-400">
              The new admin account has been successfully created.
            </p>
          </div>
        </div>

        <ul className="space-y-3 text-sm">
          <li className="flex items-center justify-between">
            <span className="text-neutral-500 text-xs">Email</span>{' '}
            <span>{state.fields?.email}</span>{' '}
          </li>
          <li className="flex items-center justify-between">
            <span className="text-neutral-500 text-xs">First Name</span>{' '}
            <span>{state.fields?.firstName}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-neutral-500 text-xs">Last Name</span>
            <span>{state.fields?.lastName}</span>
          </li>
        </ul>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Button
            href="/admin/dashboard"
            size="icon"
            leftIcon={<Home size={16} />}
            variant="outline"
            className="w-full"
          >
            Go to Admin Dashboard
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            size="icon"
            className="w-full"
          >
            Create Another
          </Button>
        </div>
      </div>
    </Modal>
  );
}
