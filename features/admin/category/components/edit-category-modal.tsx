'use client';

import { useState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { updateCategoryAction } from '@/features/admin/category/action';
import {
  Category,
  UpdateCategoryPayload,
} from '@/features/admin/category/types';
import Modal from '@/components/layout/modal';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import FileDropzone from '@/components/ui/inputs/file-dropzone';
import { Button } from '@/components/ui/buttons/button';
import ToggleSwitch from '@/components/ui/buttons/toggle-switch';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: Category | null;
}

export default function EditCategoryModal({
  isOpen,
  onClose,
  onSuccess,
  category,
}: EditCategoryModalProps) {
  const [isPending, startTransition] = useTransition();
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    existingIcon: '' as string | null,
    existingImage: '' as string | null,
    isActive: true,
    displayOrder: 1,
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name ?? '',
        description: category.description ?? '',
        existingIcon: category.icon ?? '',
        existingImage: category.image ?? '',
        isActive: category.isActive ?? true,
        displayOrder: category.displayOrder ?? 1,
      });
      setIconFile(null);
      setImageFile(null);
    }
  }, [category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!category) return;

    if (!form.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    startTransition(async () => {
      const payload: UpdateCategoryPayload = {
        name: form.name.trim(),
        description: form.description?.trim() || undefined,
        icon: iconFile
          ? URL.createObjectURL(iconFile)
          : form.existingIcon || undefined,
        image: imageFile
          ? URL.createObjectURL(imageFile)
          : form.existingImage || undefined,
        isActive: form.isActive,
        displayOrder: Number(form.displayOrder) || 1,
      };

      console.log('[EditCategory] Submitting payload:', payload);

      const result = await updateCategoryAction(category.id, payload);

      console.log('[EditCategory] Result:', result);

      if (result.success) {
        toast.success(result.message);
        onSuccess();
        onClose();
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
            Edit Category
          </h2>
          <p className="text-sm text-neutral-500">Update category details</p>
        </div>

        <div className="space-y-6">
          <Input
            id="edit-name"
            name="name"
            label="Category Name"
            placeholder="e.g. Restaurants"
            value={form.name}
            onChange={handleChange}
            disabled={isPending}
          />

          <Textarea
            id="edit-description"
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
            existingImageUrl={form.existingIcon}
          />

          <FileDropzone
            label="Category Image"
            accept="image/png, image/jpeg"
            maxSizeMB={10}
            value={imageFile}
            onChange={setImageFile}
            existingImageUrl={form.existingImage}
          />

          <Input
            id="edit-displayOrder"
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
            <label htmlFor="edit-isActive" className="text-sm font-medium">
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
              id="edit-isActive"
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

        <div className="flex justify-between md:justify-around gap-3 pt-4">
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
            Update Category
          </Button>
        </div>
      </div>
    </Modal>
  );
}
