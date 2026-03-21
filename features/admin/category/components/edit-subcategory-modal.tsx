'use client';

import { useState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { updateSubcategoryAction } from '@/features/admin/category/action';
import {
  Subcategory,
  UpdateSubcategoryPayload,
  Category,
} from '@/features/admin/category/types';
import Modal from '@/components/layout/modal';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import { Select } from '@/components/ui/inputs/select';
import { Button } from '@/components/ui/buttons/button';
import ToggleSwitch from '@/components/ui/buttons/toggle-switch';

interface EditSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subcategory: Subcategory | null;
  categories: Category[];
}

export default function EditSubcategoryModal({
  isOpen,
  onClose,
  onSuccess,
  subcategory,
  categories,
}: EditSubcategoryModalProps) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: '',
    description: '',
    categoryId: '',
    isActive: true,
    displayOrder: 1,
  });

  useEffect(() => {
    if (subcategory) {
      setForm({
        name: subcategory.name ?? '',
        description: subcategory.description ?? '',
        categoryId: subcategory.categoryId ?? '',
        isActive: subcategory.isActive ?? true,
        displayOrder: subcategory.displayOrder ?? 1,
      });
    }
  }, [subcategory]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!subcategory) return;

    if (!form.name.trim()) {
      toast.error('Subcategory name is required');
      return;
    }

    startTransition(async () => {
      const payload: UpdateSubcategoryPayload = {
        name: form.name.trim(),
        description: form.description?.trim() || undefined,
        categoryId: form.categoryId || undefined,
        isActive: form.isActive,
        displayOrder: Number(form.displayOrder) || 1,
      };

      console.log('[EditSubcategory] Submitting payload:', payload);

      const result = await updateSubcategoryAction(subcategory.id, payload);

      console.log('[EditSubcategory] Result:', result);

      if (result.success) {
        toast.success(result.message);
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
            Edit Subcategory
          </h2>
          <p className="text-sm text-neutral-500">Update subcategory details</p>
        </div>

        <div className="space-y-4">
          <Select
            id="edit-sub-categoryId"
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
            id="edit-sub-name"
            name="name"
            label="Subcategory Name"
            placeholder="e.g. Italian Restaurant"
            value={form.name}
            onChange={handleChange}
            disabled={isPending}
          />

          <Textarea
            id="edit-sub-description"
            name="description"
            label="Description"
            placeholder="Describe this subcategory"
            value={form.description}
            onChange={handleChange}
            disabled={isPending}
          />

          <Input
            id="edit-sub-displayOrder"
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
            <label htmlFor="edit-sub-isActive" className="text-sm font-medium">
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
              id="edit-sub-isActive"
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
            Update Subcategory
          </Button>
        </div>
      </div>
    </Modal>
  );
}
