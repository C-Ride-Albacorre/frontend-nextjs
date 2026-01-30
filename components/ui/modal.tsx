import { X } from 'lucide-react';
import { ModalProps } from '@/types/modal';
import { IconButton } from './buttons/icon-button';

export default function Modal({ isModalOpen, onClose, children }: ModalProps) {
  if (!isModalOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-8"
    >
      {/* MODAL SHELL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-3xl
          bg-white
          rounded-2xl
          max-h-[calc(100vh-4rem)]
          flex
          flex-col
        "
      >
        {/* CLOSE BUTTON (STICKY) */}
       

        <IconButton
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
          "
        >
          <X size={20} />
        </IconButton>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
