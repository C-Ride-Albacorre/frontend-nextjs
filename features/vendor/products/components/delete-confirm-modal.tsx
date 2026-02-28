'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { deleteProductAction } from '../action';
import { DeleteConfirmModalProps } from '../type';

export default function DeleteConfirmModal({
  isModalOpen,
  setIsModalOpen,
  product,
  storeId,
  onSuccess,
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
        setIsModalOpen(false);
        onSuccess?.();
      } else {
        setError(result.message);
      }
    } catch {
      setError('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="py-6 text-center">
        {/* Warning Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Delete Product
        </h2>

        {/* Message */}
        <p className="text-neutral-600 mb-2">
          Are you sure you want to delete{' '}
          <span className="font-medium text-neutral-900">
            &quot;{product.productName}&quot;
          </span>
          ?
        </p>
        <p className="text-sm text-neutral-500 mb-6">
          This action cannot be undone. The product will be permanently removed
          from your store.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
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
            {isDeleting ? 'Deleting...' : 'Delete Product'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
