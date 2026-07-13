'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteProductAction } from '../action';
import { DeleteConfirmModalProps } from '../type';

export default function DeleteConfirmModal({
  isModalOpen,
  setIsModalOpen,
  product,
  storeId,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!product) return null;


  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteProductAction(storeId, product.id);

      if (result.success) {
        
        toast.success('Product deleted successfully');

        setIsModalOpen(false);

      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to delete product. Please try again.',
      );
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
      <div className="py-6 text-center space-y-5">
        {/* Warning Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center ">
          <AlertTriangle size={32} className=" text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-neutral-900 ">
          Delete Product
        </h2>

        {/* Message */}
        <div className="text-neutral-600 text-sm leading-7">
          Are you sure you want to delete{' '}
          <h2 className="font-semibold text-neutral-900 inline">
            &quot;{product.productName}&quot;
          </h2>
          ? This action cannot be undone. The product will be permanently
          removed from your store.
        </div>
        <p className="text-sm text-neutral-500 mb-6"></p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button
            variant="white"
            size="icon"
            onClick={() => setIsModalOpen(false)}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            variant="red"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete Product'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
