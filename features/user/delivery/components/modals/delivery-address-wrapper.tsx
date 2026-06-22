import { fetchSavedAddressesService } from '@/features/user/address/service';
import DeliveryAddressModal from './delivery-address-modal';

export default async function DeliveryAddressWrapper({
  shouldShowModal,
}: {
  shouldShowModal: boolean;
}) {
  try {
    const { data } = await fetchSavedAddressesService();

    return (
      <DeliveryAddressModal
        savedAddresses={data}
        shouldShowModal={shouldShowModal}
      />
    );
  } catch (error) {
    console.error('[DeliveryAddressWrapper]', error);

    return (
      <DeliveryAddressModal
        savedAddresses={[]}
        shouldShowModal={shouldShowModal}
      />
    );
  }
}
