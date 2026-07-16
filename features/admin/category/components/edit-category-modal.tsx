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
import { set } from 'zod';

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
  const [isActive, setIsActive] = useState(category?.isActive);

  useEffect(() => {
    setIsActive(category?.isActive);
  }, [category]);
  

  console.log('EditCategoryModal render', { category, isActive });

  const [state, action, isPending] = useActionState(
    updateCategoryAction,
    initialState,
  );

  const isError = state.status === 'error';

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
        <input type="hidden" name="categoryId" value={category?.id} />

        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            label="Category Name"
            placeholder="e.g. Restaurants"
            defaultValue={isError ? state.data?.name : (category?.name ?? '')}
            errorMessage={isError ? state.errors?.name?.[0] : undefined}
            disabled={isPending}
          />

          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Describe this category"
            defaultValue={
              isError ? state.data?.description : (category?.description ?? '')
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
            existingImageUrl={category?.icon ?? ''}
          />

          <FileDropzone
            label="Category Image"
            accept="image/png, image/jpeg, image/svg+xml"
            maxSizeMB={10}
            name="image"
            value={imageFile}
            onChange={setImageFile}
            existingImageUrl={category?.image ?? ''}
          />

          <Input
            name="displayOrder"
            type="number"
            defaultValue={
              isError
                ? String(state.data?.displayOrder ?? 1)
                : String(category?.displayOrder ?? 1)
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
