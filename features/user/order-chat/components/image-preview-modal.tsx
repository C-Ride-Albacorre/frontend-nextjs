'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';

type Props = {
  imageUrl: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function ImagePreviewModal({
  imageUrl,
  onConfirm,
  onCancel,
  isLoading = false,
}: Props) {
  return (
    <div
      className="
        fixed
        inset-0
        bg-black/80
        bg-opacity-50
        flex
        items-center
        justify-center
        z-50
      "
      onClick={onCancel}
    >
      <div
        className="
          bg-white
          rounded-lg
          p-4
          max-w-sm
          w-full
          mx-4
          shadow-xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="
            flex
            justify-between
            items-center
            mb-4
          "
        >
          <h3 className="text-sm font-semibold">Image Preview</h3>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-neutral-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="
            relative
            w-full
            bg-neutral-100
            rounded-lg
            overflow-hidden
            mb-4
          "
        >
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full max-h-96 object-cover"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="black"
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  );
}
