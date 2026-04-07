'use client';

import { useEffect, useActionState, useState } from 'react';
import { toast } from 'sonner';
import {
  Subcategory,
  Category,
  CreateSubcategoryState,
} from '@/features/admin/category/types';
import Modal from '@/components/layout/modal';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import { Select } from '@/components/ui/inputs/select';
import { Button } from '@/components/ui/buttons/button';
import ToggleSwitch from '@/components/ui/buttons/toggle-switch';
import { updateSubcategoryAction } from '../action';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  subcategory: Subcategory | null;
  categories: Category[];
}

const initialState: CreateSubcategoryState = {
  status: 'idle',
};

export default function EditSubcategoryModal({
  isOpen,
  onClose,
  onSuccess,
  subcategory,
  categories,
}: Props) {
  const [categoryId, setCategoryId] = useState(subcategory?.categoryId ?? '');
  const [isActive, setIsActive] = useState(subcategory?.isActive ?? true);

  const boundAction = subcategory
    ? updateSubcategoryAction.bind(null, subcategory.id)
    : async (_state: CreateSubcategoryState) => initialState;

  const [state, action, isPending] = useActionState(boundAction, initialState);
  const isError = state.status === 'error';

  useEffect(() => {
    if (subcategory) {
      setCategoryId(subcategory.categoryId);
      setIsActive(subcategory.isActive);
    }
  }, [subcategory]);

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

  // Restore form state from error data
  useEffect(() => {
    if (state.data?.categoryId) {
      setCategoryId(state.data.categoryId);
    }
    if (state.data?.isActive !== undefined) {
      setIsActive(state.data.isActive);
    }
  }, [state.data]);

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <form action={action} className="space-y-6">
        <h2 className="text-xl font-semibold">Edit Subcategory</h2>

        {/* CATEGORY */}
        <Select
          id="categoryId"
          name="categoryId"
          label="Parent Category"
          options={categoryOptions}
          value={categoryId}
          onChange={setCategoryId}
          disabled={isPending}
          errorMessage={isError ? state.errors?.categoryId?.[0] : undefined}
        />

        {/* NAME */}
        <Input
          name="name"
          label="Subcategory Name"
          defaultValue={isError ? state.data?.name : subcategory?.name}
          errorMessage={isError ? state.errors?.name?.[0] : undefined}
          disabled={isPending}
        />

        {/* DESCRIPTION */}
        <Textarea
          id="desc"
          name="description"
          label="Description"
          defaultValue={
            isError ? state.data?.description : (subcategory?.description ?? '')
          }
          errorMessage={isError ? state.errors?.description?.[0] : undefined}
          disabled={isPending}
        />

        {/* DISPLAY ORDER */}
        <Input
          name="displayOrder"
          type="number"
          label="Display Order"
          defaultValue={
            isError
              ? String(state.data?.displayOrder ?? 1)
              : String(subcategory?.displayOrder ?? 1)
          }
          errorMessage={isError ? state.errors?.displayOrder?.[0] : undefined}
          disabled={isPending}
        />

        {/* TOGGLE */}
        <input type="hidden" name="isActive" value={String(isActive)} />

        <ToggleSwitch
          checked={isActive}
          onChange={() => setIsActive((prev) => !prev)}
          disabled={isPending}
        />

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button loading={isPending}>
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
