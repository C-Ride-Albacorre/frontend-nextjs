'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { createSubcategoryAction } from '@/features/admin/category/action';
import {
  CreateSubcategoryPayload,
  Category,
} from '@/features/admin/category/types';
import Modal from '@/components/layout/modal';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import { Select } from '@/components/ui/inputs/select';
import { Button } from '@/components/ui/buttons/button';

interface CreateSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
  preselectedCategoryId?: string;
}

export default function CreateSubcategoryModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
  preselectedCategoryId,
}: CreateSubcategoryModalProps) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: '',
    description: '',
    categoryId: preselectedCategoryId ?? '',
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
      toast.error('Subcategory name is required');
      return;
    }
    if (!form.categoryId) {
      toast.error('Please select a parent category');
      return;
    }

    startTransition(async () => {
      const payload: CreateSubcategoryPayload = {
        name: form.name.trim(),
        categoryId: form.categoryId,
        ...(form.description && { description: form.description.trim() }),
        isActive: form.isActive,
        displayOrder: Number(form.displayOrder) || 1,
      };

      console.log('[CreateSubcategory] Submitting payload:', payload);

      const result = await createSubcategoryAction(payload);

      console.log('[CreateSubcategory] Result:', result);

      if (result.success) {
        toast.success(result.message);
        setForm({
          name: '',
          description: '',
          categoryId: preselectedCategoryId ?? '',
          isActive: true,
          displayOrder: 1,
        });
        onSuccess();
        onClose();
      } else {
        toast.error(result.message);
      }
    });
  };

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-neutral-900">
            Create Subcategory
          </h2>
          <p className="text-sm text-neutral-500">
            Add a new subcategory under an existing category
          </p>
        </div>

        <div className="space-y-4">
          <Select
            id="categoryId"
            name="categoryId"
            label="Parent Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={form.categoryId}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, categoryId: value }))
            }
            disabled={isPending}
          />

          <Input
            id="sub-name"
            name="name"
            label="Subcategory Name"
            placeholder="e.g. Italian Restaurant"
            value={form.name}
            onChange={handleChange}
            disabled={isPending}
          />

          <Textarea
            id="sub-description"
            name="description"
            label="Description"
            placeholder="Describe this subcategory"
            value={form.description}
            onChange={handleChange}
            disabled={isPending}
          />

          <Input
            id="sub-displayOrder"
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

          <div className="flex items-center justify-between">
            <label htmlFor="sub-isActive" className="text-sm font-medium">
              Active
            </label>
            <button
              id="sub-isActive"
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
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            loading={isPending}
            disabled={isPending}
          >
            Create Subcategory
          </Button>
        </div>
      </div>
    </Modal>
  );
}
