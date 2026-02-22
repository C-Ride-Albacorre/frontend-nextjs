export type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
  children: React.ReactNode;
};
