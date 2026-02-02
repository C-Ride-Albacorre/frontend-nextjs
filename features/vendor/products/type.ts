export type ProductRowProps = {
  name: string;
  price: string;
  category: string;
  onEdit: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
  status: 'active' | 'inactive';
  stock: 'in' | 'low';
};
