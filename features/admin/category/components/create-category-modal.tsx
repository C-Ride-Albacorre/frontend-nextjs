'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { CreateCategoryPayload } from '@/features/admin/category/types';
import Modal from '@/components/layout/modal';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import FileDropzone from '@/components/ui/inputs/file-dropzone';
import { Button } from '@/components/ui/buttons/button';
import ToggleSwitch from '@/components/ui/buttons/toggle-switch';
import { createCategoryAction } from '../action';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCategoryModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateCategoryModalProps) {
  const [isPending, startTransition] = useTransition();
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    isActive: true,
    displayOrder: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    startTransition(async () => {
      const payload: CreateCategoryPayload = {
        name: form.name.trim(),
        ...(form.description && { description: form.description.trim() }),
        ...(iconFile && { icon: URL.createObjectURL(iconFile) }),
        ...(imageFile && { image: URL.createObjectURL(imageFile) }),
        isActive: form.isActive,
        displayOrder: Number(form.displayOrder) || 1,
      };

      console.log('[CreateCategory] Submitting payload:', payload);

      const result = await createCategoryAction(payload);

      console.log('[CreateCategory] Result:', result);

      if (result.success) {
        toast.success(result.message);
        setForm({
          name: '',
          description: '',
          isActive: true,
          displayOrder: 1,
        });
        setIconFile(null);
        setImageFile(null);
        onClose();
        onSuccess();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-neutral-900">
            Create Category
          </h2>
          <p className="text-sm text-neutral-500">
            Add a new product/service category
          </p>
        </div>

        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            label="Category Name"
            placeholder="e.g. Restaurants"
            value={form.name}
            onChange={handleChange}
            disabled={isPending}
          />

          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Describe this category"
            value={form.description}
            onChange={handleChange}
            disabled={isPending}
          />

          <FileDropzone
            label="Icon Image"
            accept="image/png, image/jpeg, image/svg+xml"
            maxSizeMB={5}
            value={iconFile}
            onChange={setIconFile}
          />

          <FileDropzone
            label="Category Image"
            accept="image/png, image/jpeg"
            maxSizeMB={10}
            value={imageFile}
            onChange={setImageFile}
          />

          <Input
            id="displayOrder"
            name="displayOrder"
            label="Display Order"
            type="number"
            placeholder="1"
            value={String(form.displayOrder)}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                displayOrder: Number(e.target.value),
              }))
            }
            disabled={isPending}
          />

          <div className="flex items-center gap-8">
            <label htmlFor="isActive" className="text-sm font-medium">
              Active
            </label>

            <ToggleSwitch
              checked={form.isActive}
              onChange={() =>
                !isPending &&
                setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
              disabled={isPending}
            />
            {/* <button
              id="isActive"
              type="button"
              role="switch"
              aria-checked={form.isActive}
              onClick={() =>
                !isPending &&
                setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.isActive ? 'bg-primary' : 'bg-neutral-300'
              } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button> */}
          </div>
        </div>

        <div className="flex justify-between md:justify-around  pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="icon"
            onClick={handleSubmit}
            loading={isPending}
            disabled={isPending}
          >
            Create Category
          </Button>
        </div>
      </div>
    </Modal>
  );
}
