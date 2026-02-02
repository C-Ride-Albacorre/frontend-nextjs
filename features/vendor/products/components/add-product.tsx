import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import FormHeader from '@/components/ui/headers/form-header';
import FileDropzone from '@/components/ui/inputs/file-dropzone';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import Textarea from '@/components/ui/inputs/textarea';
import { useState } from 'react';

export default function AddProduct({
  isModalOpen,
  setIsModalOpen,
  onEdit,
  setOnEdit,
}: {
  isModalOpen: boolean;
  onEdit: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setOnEdit: (onEdit: boolean) => void;
}) {
  const [image, setImage] = useState<File | null>(null);

  return (
    <>
      <Modal
        onClose={() => {
          setIsModalOpen(false);
          setOnEdit(false);
        }}
        isModalOpen={isModalOpen}
      >
        <form action="#" className="space-y-6 py-4">
          <FormHeader
            title={onEdit ? 'Edit Product' : 'Add New Product'}
            subtitle={
              onEdit
                ? 'Update your product details'
                : 'Create a new product for your store'
            }
            className="text-left"
          />

          <div className="space-y-6">
            <Input
              id="product-name"
              label="Product Name"
              placeholder="E.g.. Signature Jollof Rice"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Select
                id="product-category"
                label="Category"
                placeholder="Select category"
                onChange={() => setIsModalOpen(false)}
              />

              <Input
                id="product-sku"
                label="SKU (Optional)"
                placeholder="e.g., JR-001"
              />
            </div>

            <Input
              id="product-price"
              label="Price (₦)"
              type="number"
              placeholder="e.g., 4500"
            />

            <Textarea
              id="product-description"
              label="Description"
              placeholder="Describe your product here...."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Select
                id="product-stock"
                label="Stock Quantity"
                placeholder="Select stock quantity"
                onChange={() => setIsModalOpen(false)}
              />

              <Select
                id="product-status"
                label="Status"
                placeholder="Select status"
                onChange={() => setIsModalOpen(false)}
              />
            </div>

            <FileDropzone
              label="Product Image"
              value={image}
              onChange={setImage}
            />
          </div>

          <div className="flex items-center justify-between md:justify-center gap-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" size="lg" variant="primary">
              {onEdit ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
