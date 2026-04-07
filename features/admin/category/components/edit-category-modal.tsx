'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  UpdateCategoryPayload,
  CreateCategoryState,
  Category,
} from '@/features/admin/category/types';
import Modal from '@/components/layout/modal';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import FileDropzone from '@/components/ui/inputs/file-dropzone';
import { Button } from '@/components/ui/buttons/button';
import ToggleSwitch from '@/components/ui/buttons/toggle-switch';
import { updateCategoryAction } from '../action';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  category: Category | null;
}

const initialState: CreateCategoryState = {
  status: 'idle',
  message: '',
  errors: {},
  data: {},
};

export default function EditCategoryModal({
  isOpen,
  onClose,
  onSuccess,
  category,
}: EditCategoryModalProps) {
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(category?.isActive ?? true);

  const [state, action, isPending] = useActionState<
    CreateCategoryState,
    FormData
  >((state, formData) => {
    if (!category) return Promise.reject(new Error('No category selected'));
    return updateCategoryAction(category.id, formData);
  }, initialState);

  const isError = state.status === 'error';

  // Populate form data if edit fails
  const [formDefaults, setFormDefaults] = useState({
    name: '',
    description: '',
    displayOrder: '1',
    existingIcon: '',
    existingImage: '',
  });

  useEffect(() => {
    if (category) {
      setFormDefaults({
        name: category.name,
        description: category.description ?? '',
        displayOrder: String(category.displayOrder ?? 1),
        existingIcon: category.icon ?? '',
        existingImage: category.image ?? '',
      });
      setIsActive(category.isActive);
      setIconFile(null);
      setImageFile(null);
    }
  }, [category]);

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
      onClose();
      onSuccess?.();
    }
    if (isError && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  // Restore isActive from error data
  useEffect(() => {
    if (state.data?.isActive !== undefined) {
      setIsActive(state.data.isActive);
    }
  }, [state.data]);

  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <form action={action} className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-neutral-900">
            Edit Category
          </h2>
          <p className="text-sm text-neutral-500">Update category details</p>
        </div>

        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            label="Category Name"
            placeholder="e.g. Restaurants"
            defaultValue={isError ? state.data?.name : formDefaults.name}
            errorMessage={isError ? state.errors?.name?.[0] : undefined}
            disabled={isPending}
          />

          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Describe this category"
            defaultValue={
              isError ? state.data?.description : formDefaults.description
            }
            errorMessage={isError ? state.errors?.description?.[0] : undefined}
            disabled={isPending}
          />

          <FileDropzone
            label="Icon Image"
            accept="image/png, image/jpeg, image/svg+xml"
            name="icon"
            maxSizeMB={5}
            value={iconFile}
            onChange={setIconFile}
            existingImageUrl={formDefaults.existingIcon}
          />

          <FileDropzone
            label="Category Image"
            accept="image/png, image/jpeg"
            maxSizeMB={10}
            name="image"
            value={imageFile}
            onChange={setImageFile}
            existingImageUrl={formDefaults.existingImage}
          />

          <Input
            name="displayOrder"
            type="number"
            defaultValue={
              isError
                ? String(state.data?.displayOrder ?? 1)
                : formDefaults.displayOrder
            }
            label="Display Order"
            errorMessage={isError ? state.errors?.displayOrder?.[0] : undefined}
            disabled={isPending}
          />

          <div className="flex items-center gap-8">
            <label htmlFor="isActive" className="text-sm font-medium">
              Active
            </label>

            <input type="hidden" name="isActive" value={String(isActive)} />

            <ToggleSwitch
              checked={isActive}
              onChange={() => setIsActive((prev) => !prev)}
              disabled={isPending}
            />
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
            loading={isPending}
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
