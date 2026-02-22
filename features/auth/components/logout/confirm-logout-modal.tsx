import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';

export default function ConfirmLogoutModal({
  confirmLogout,
  setConfirmLogout,
  handleLogout,
  isPending,
}: {
  confirmLogout: boolean;
  setConfirmLogout: (value: boolean) => void;
  handleLogout: () => void;
  isPending: boolean;
}) {
  return (
    <>
      <Modal
        isModalOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        wrapperClassName="max-w-md"
      >
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="flex flex-col justify-center items-center space-y-4">
            <h4 className="text-lg md:text-xl font-medium">Confirm Logout</h4>
            <p className="text-neutral-500 text-sm text-center leading-6">
              Are you sure you want to logout? You will need to login again to
              access your account and deliveries.
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              variant="green"
              onClick={() => setConfirmLogout(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="red"
              onClick={handleLogout}
              loading={isPending}
              disabled={isPending}
            >
              {isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
