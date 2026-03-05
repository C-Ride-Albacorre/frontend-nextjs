'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { deleteStoresAction } from '../action';
import { DeleteStoreModalProps } from '../types';
import ErrorMessage from '@/components/layout/error-message';
import { toast } from 'sonner';

export default function DeleteStoreModal({
  isModalOpen,
  setIsModalOpen,
  stores,
  onSuccess,
}: DeleteStoreModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (stores.length === 0) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteStoresAction(stores.map((s) => s.id));

      if (!result.success) {
        setError(result.message);
        toast.error(result.message);
      } else {
        setIsModalOpen(false);
        toast.success(
          stores.length === 1
            ? 'Store deleted successfully'
            : `${stores.length} stores deleted successfully`,
        );
        onSuccess?.();
      }
    } catch {
      const msg = 'Failed to delete store(s). Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      wrapperClassName="max-w-md"
    >
      <div className="py-6 text-center space-y-8">
        {/* Warning Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle size={24} className=" text-red-600" />
        </div>

        <div className="space-y-4">
          {/* Title */}
          <h2 className="text-xl font-semibold text-neutral-900 ">
            {stores.length === 1
              ? 'Delete Store'
              : `Delete ${stores.length} Stores`}
          </h2>

          <div className="space-y-2">
            {/* Message */}
            <p className="text-neutral-500 text-sm leading-6 ">
              {stores.length === 1 ? (
                <>
                  Are you sure you want to delete{' '}
                  <span className="font-medium text-neutral-900">
                    &quot;{stores[0].storeName}&quot;
                  </span>
                  ?
                </>
              ) : (
                <>
                  Are you sure you want to delete these{' '}
                  <span className="font-medium text-neutral-900">
                    {stores.length} stores
                  </span>
                  ?
                </>
              )}
            </p>
            <p className="text-neutral-500 text-sm leading-6 ">
              This action cannot be undone. The store and all its associated
              data will be permanently removed.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Actions */}
        <div className="flex justify-around">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsModalOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>

          <Button
            variant="red"
            size="lg"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting
              ? 'Deleting...'
              : stores.length === 1
                ? 'Delete Store'
                : `Delete ${stores.length} Stores`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
