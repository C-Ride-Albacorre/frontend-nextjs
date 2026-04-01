'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { createSubcategoryAction } from '@/features/admin/category/action';
import {
  Category,
  CreateSubcategoryState,
} from '@/features/admin/category/types';
import Modal from '@/components/layout/modal';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import { Select } from '@/components/ui/inputs/select';
import { Button } from '@/components/ui/buttons/button';
import ToggleSwitch from '@/components/ui/buttons/toggle-switch';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
  preselectedCategoryId?: string;
}

const initialState: CreateSubcategoryState = {
  status: 'idle',
};
export default function CreateSubcategoryModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
  preselectedCategoryId,
}: Props) {
  const [categoryId, setCategoryId] = useState(preselectedCategoryId || '');

  const [state, action, isPending] = useActionState(
    createSubcategoryAction,
    initialState,
  );

  const isError = state.status === 'error';

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
      onClose();
      onSuccess();
    }

    if (isError && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (state.data?.categoryId) {
      setCategoryId(state.data.categoryId);
    }
  }, [state.data]);

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <form action={action} className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-neutral-900">
            Create Subcategory
          </h2>
          <p className="text-sm text-neutral-500">
            Add a new subcategory under an existing category
          </p>
        </div>

        <div className="space-y-6">
          <Select
          id='categoryId'
            name="categoryId"
            label="Parent Category"
            options={categoryOptions}
            value={categoryId}
            onChange={setCategoryId}
            errorMessage={isError ? state.errors?.categoryId?.[0] : undefined}
          />

          <Input
            id="sub-name"
            name="name"
            label="Subcategory Name"
            placeholder="e.g. Italian Restaurant"
            defaultValue={state.data?.name || ''}
            errorMessage={isError ? state.errors?.name?.[0] : undefined}
            disabled={isPending}
          />

          <Textarea
            id="sub-description"
            name="description"
            label="Description"
            placeholder="Describe this subcategory"
            defaultValue={state.data?.description || ''}
            errorMessage={isError ? state.errors?.description?.[0] : undefined}
            disabled={isPending}
          />

          <Input
            id="sub-displayOrder"
            name="displayOrder"
            label="Display Order"
            type="number"
            placeholder="1"
            defaultValue={String(state.data?.displayOrder) || ''}
            errorMessage={isError ? state.errors?.displayOrder?.[0] : undefined}
            disabled={isPending}
          />

          <div className="flex items-center gap-8">
            <label htmlFor="sub-isActive" className="text-sm font-medium">
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
            loading={isPending}
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create Subcategory'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
