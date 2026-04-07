'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import {
  CreateCategoryPayload,
  CreateCategoryState,
} from '@/features/admin/category/types';
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
  onSuccess?: () => void;
}

const initialState: CreateCategoryState = {
  status: 'idle',
  message: '',
  errors: {},
  data: {},
};

export default function CreateCategoryModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateCategoryModalProps) {
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [state, action, isPending] = useActionState(
    createCategoryAction,
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

  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <form action={action} className="space-y-6">
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
            defaultValue={isError ? state.data?.name : ''}
            errorMessage={isError ? state.errors?.name?.[0] : undefined}
            disabled={isPending}
          />

          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Describe this category"
            defaultValue={isError ? state.data?.description : ''}
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
          />

          <FileDropzone
            label="Category Image"
            accept="image/png, image/jpeg"
            maxSizeMB={10}
            name="image"
            value={imageFile}
            onChange={setImageFile}
          />

          <Input
            name="displayOrder"
            type="number"
            defaultValue="1"
            label="Display Order"
            errorMessage={isError ? state.errors?.displayOrder?.[0] : undefined}
          />

          <div className="flex items-center gap-8">
            <label htmlFor="isActive" className="text-sm font-medium">
              Active
            </label>

            <input
              type="hidden"
              name="isActive"
              value={String(state.data?.isActive ?? true)}
            />

            <ToggleSwitch
              checked={state.data?.isActive ?? true}
              onChange={() => {
                const input = document.querySelector(
                  'input[name="isActive"]',
                ) as HTMLInputElement;

                const newVal = input.value !== 'true';
                input.value = String(newVal);
              }}
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
            loading={isPending}
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
