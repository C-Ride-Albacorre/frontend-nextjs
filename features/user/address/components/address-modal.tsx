import Modal from '@/components/layout/modal';
import AddressWrapper from './address-wrapper';
import { Address, AddressItem } from '../service';

export default function AddressModal({
  isModalOpen,
  onClose,
  shouldShowModal,
  onSuccess,
  savedAddresses,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  shouldShowModal?: boolean;
  onSuccess?: () => void;
  savedAddresses: AddressItem[];
}) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="py-8">
        <h2 className="text-xl font-semibold">Select Delivery Location</h2>
        <p className="text-sm text-gray-500">
          Use Google Maps search, manual entry, or choose from saved locations
        </p>

        <AddressWrapper
          shouldShowModal={shouldShowModal}
          onSuccess={onSuccess}
          savedAddresses={savedAddresses}
        />
      </div>
    </Modal>
  );
}
